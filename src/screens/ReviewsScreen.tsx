import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Screen, Btn, Card, Chip } from '../components';
import FormField from '../components/FormField';
import { C } from '../theme';

type Review = { who: string; stars: number; text: string; pkg: string };

const INITIAL: Review[] = [
  {
    who: 'Demo family',
    stars: 5,
    text: 'A lovely way to get outside together. The obstacle course was our favourite part.',
    pkg: 'Family Explorer Package · Example review',
  },
  {
    who: 'Demo team',
    stars: 5,
    text: 'Building a raft together gave us a new way to connect as a team.',
    pkg: 'Corporate Team Challenge · Example review',
  },
];

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const avg = (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1);

  const submit = () => {
    if (!name || !rating || !text) {
      Alert.alert('Almost there', 'Add your name, a rating and your experience.');
      return;
    }
    setReviews([{ who: name, stars: rating, text, pkg: 'Your review' }, ...reviews]);
    setName('');
    setRating(0);
    setText('');
  };

  return (
    <Screen title="Reviews" subtitle="Demo feedback to show how reviews will appear.">
      <Card>
        <Text style={{ fontSize: 22, fontWeight: '700', color: C.green }}>{avg} / 5 · Sample score</Text>
        <Text style={{ fontSize: 10, color: C.muted }}>
          Illustrative content only, not actual customer reviews or ratings.
        </Text>
      </Card>

      {reviews.map((r, i) => (
        <Card key={i}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: '700', fontSize: 12 }}>{r.who}</Text>
            <Text style={{ color: C.orange }}>
              {'★'.repeat(r.stars)}
              {'☆'.repeat(5 - r.stars)}
            </Text>
          </View>
          <Text style={{ fontSize: 12, marginVertical: 4 }}>"{r.text}"</Text>
          <Text style={{ fontSize: 10, color: C.muted }}>{r.pkg}</Text>
        </Card>
      ))}

      <Text style={{ fontSize: 17, fontWeight: '700', color: C.green, marginTop: 14, marginBottom: 6 }}>
        Write a review
      </Text>
      <FormField label="Name" placeholder="Your name" value={name} onChangeText={setName} />
      <Text style={{ fontSize: 11, fontWeight: '600', marginBottom: 4 }}>Rating</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Chip key={n} label={`${n} ★`} active={rating === n} onPress={() => setRating(n)} />
        ))}
      </View>
      <FormField
        label="Your experience"
        placeholder="Tell us about your adventure..."
        value={text}
        onChangeText={setText}
        multiline
        style={{ minHeight: 80, textAlignVertical: 'top' }}
      />
      <Btn label="Submit review" onPress={submit} />
    </Screen>
  );
}