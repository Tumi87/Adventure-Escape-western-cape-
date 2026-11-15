import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Field from '../components/Field';
import { useQuote } from '../context/QuoteContext';
import { adventures } from '../data';
import { common } from '../styles';
import { colors } from '../theme';
import { DropdownOption, FormErrors } from '../types';
import { isName } from '../utils';

type ReviewErrors = FormErrors<'adventure' | 'rating' | 'name' | 'text'>;

const adventureOptions: DropdownOption[] = adventures.map(a => ({ value: String(a.id), label: a.name }));
const ratingOptions: DropdownOption[] = [5, 4, 3, 2, 1].map(n => ({ value: String(n), label: `${n} / 5` }));
const stars = (n: number): string => ''.repeat(n) + ''.repeat(5 - n);

export default function ReviewsScreen() {
  const { reviews, addReview, user } = useQuote();
  const [adventure, setAdventure] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [name, setName] = useState<string>(user?.name ?? '');
  const [text, setText] = useState<string>('');
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [done, setDone] = useState<boolean>(false);

  const average = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '–';

  const submit = (): void => {
    const e: ReviewErrors = {};
    if (adventure === null) e.adventure = 'Choose an adventure.';
    if (rating === null) e.rating = 'Choose a rating.';
    if (!isName(name)) e.name = 'Enter a valid name (letters only).';
    if (text.trim().length < 10) e.text = 'Write at least 10 characters.';
    setErrors(e);
    if (Object.keys(e).length === 0 && adventure !== null && rating !== null) {
      addReview({ adventureId: Number(adventure), rating: Number(rating), author: name.trim(), text: text.trim() });
      setText('');
      setAdventure(null);
      setRating(null);
      setDone(true);
    } else {
      setDone(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={common.pad} keyboardShouldPersistTaps="handled">
      <Text style={common.h1}>Reviews</Text>
      <Text style={common.p}>Average rating: {average} / 5 from {reviews.length} review{reviews.length === 1 ? '' : 's'}</Text>

      {reviews.map(r => (
        <View key={r.id} style={{ backgroundColor: colors.sand, borderRadius: 14, padding: 14, marginBottom: 10 }}>
          <Text style={[common.h3, { color: colors.green }]}>{adventures[r.adventureId].name}</Text>
          <Text style={{ color: colors.orange, fontSize: 16 }}>{stars(r.rating)}</Text>
          <Text style={common.p}>{r.text}</Text>
          <Text style={common.muted}>– {r.author}</Text>
        </View>
      ))}

      <Text style={common.h2}>Write a review</Text>
      <Dropdown label="Adventure" value={adventure} options={adventureOptions} onChange={setAdventure}
        placeholder="Choose an adventure..." error={errors.adventure} />
      <Dropdown label="Rating" value={rating} options={ratingOptions} onChange={setRating}
        placeholder="Choose a rating..." error={errors.rating} />
      <Field label="Your name" value={name} onChangeText={setName} error={errors.name} />
      <Field label="Your review" value={text} onChangeText={setText} error={errors.text}
        multiline style={{ minHeight: 90, textAlignVertical: 'top' }} />
      <Button title="Submit review" onPress={submit} />
      {done && <Text style={common.ok}>Thank you! Your review has been added.</Text>}
    </ScrollView>
  );
}
