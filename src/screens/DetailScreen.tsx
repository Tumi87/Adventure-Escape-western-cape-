import React, { useState } from 'react';
import { Image, ScrollView, Share, Text, View } from 'react-native';
import Button from '../components/Button';
import Field from '../components/Field';
import { useQuote } from '../context/QuoteContext';
import { adventures } from '../data';
import { common } from '../styles';
import { Navigate } from '../types';
import { isFutureDate } from '../utils';

interface Props { id: number; go: Navigate }

export default function DetailScreen({ id, go }: Props) {
  const a = adventures[id];
  const { quote, saved, toggleQuote, toggleSaved } = useQuote();
  const [date, setDate] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const inQuote = quote.includes(id);
  const isSaved = saved.includes(id);

  const book = (): void => {
    if (!isFutureDate(date.trim())) {
      setDateError('Enter a valid future date as YYYY-MM-DD.');
      return;
    }
    setDateError('');
    go({ name: 'contact', packageId: id });
  };

  const onShare = async (): Promise<void> => {
    try {
      await Share.share({ message: `${a.name} from R${a.price} per person – Adventure Escape SA` });
    } catch {
      setMessage('Sharing is not available on this device.');
    }
  };

  return (
    <ScrollView>
      <Image source={a.image} style={{ width: '100%', height: 220 }} accessibilityLabel={a.imageAlt} />
      <View style={common.pad}>
        <Text style={common.h1}>{a.name}</Text>
        <Text style={common.p}>{a.summary}</Text>
        <Text style={common.muted}>{a.duration} · Free cancellation</Text>
        <Text style={common.h2}>What is included</Text>
        {a.includes.map(x => <Text key={x} style={common.p}>• {x}</Text>)}
        <Text style={common.from}>from <Text style={common.price}>R{a.price}</Text> per person</Text>

        <Field label="Choose a date (YYYY-MM-DD)" value={date} onChangeText={setDate} error={dateError}
          keyboardType="numbers-and-punctuation" maxLength={10} placeholder="2026-12-15" />
        <Button title="Book now" onPress={book} />
        <Button title={inQuote ? 'Remove from quote' : 'Add to quote'} alt onPress={() => {
          toggleQuote(id);
          setMessage(inQuote ? 'Removed from your quote.' : 'Added to your quote.');
        }} />
        <Button title={isSaved ? 'Saved ♥' : 'Save'} alt onPress={() => {
          toggleSaved(id);
          setMessage(isSaved ? 'Removed from saved.' : 'Saved to this device.');
        }} />
        <Button title="Share" alt onPress={onShare} />
        {!!message && <Text style={common.ok}>{message}</Text>}
        <Button title="Back to all adventures" onPress={() => go({ name: 'overview' })} style={{ marginTop: 12 }} />
      </View>
    </ScrollView>
  );
}
