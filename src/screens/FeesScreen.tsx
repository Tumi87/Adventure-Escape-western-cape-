import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen, Btn, Card, Row } from '../components';
import { ADVENTURES } from '../data';
import { C } from '../theme';
import { VAT_RATE, rand, vatOn } from './utils';

const DISCOUNTS = [
  { label: '1 booking', pct: 0 },
  { label: '2 bookings', pct: 5 },
  { label: '3 bookings', pct: 10 },
  { label: 'More than 3 bookings', pct: 15 },
];

export default function FeesScreen() {
  const nav = useNavigation<any>();
  const sampleTotal = 2850;

  return (
    <Screen title="Fees" subtitle="Plan your group with clear package pricing.">
      <Card>
        <Text style={{ fontWeight: '700', color: C.green, marginBottom: 6 }}>Adventure price list</Text>
        {ADVENTURES.map((a) => (
          <Row
            key={a.id}
            left={a.title}
            right={a.price === null ? 'Request pricing' : a.priceLabel}
          />
        ))}
        <Text style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>
          Ziplining, kayaking or rock climbing. All gear included.
        </Text>
      </Card>

      <Card>
        <Text style={{ fontWeight: '700', color: C.green }}>Book more, save more</Text>
        <Text style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>
          Discount is based on the number of selected bookings, not the number of guests.
        </Text>
        {DISCOUNTS.map((d) => (
          <Row key={d.label} left={d.label} right={`${d.pct}% discount`} />
        ))}
      </Card>

      <Text style={{ fontSize: 17, fontWeight: '700', color: C.green, marginTop: 14, marginBottom: 6 }}>
        Sample: two R1,500 packages
      </Text>
      <Card style={{ backgroundColor: C.mint }}>
        <Text style={{ fontSize: 12 }}>
          {rand(3000)} − {rand(150)} (5%) = {rand(sampleTotal)}
        </Text>
        <Text style={{ fontSize: 12 }}>
          + VAT ({VAT_RATE}%) {rand(vatOn(sampleTotal))} ={' '}
          <Text style={{ fontWeight: '700' }}>{rand(sampleTotal + vatOn(sampleTotal))}</Text>
        </Text>
        <Text style={{ fontSize: 10, color: C.muted }}>
          All prices exclude {VAT_RATE}% VAT, which is added to your quote. Illustration only, not a confirmed
          reservation.
        </Text>
      </Card>
      <Btn label="Build your quote" onPress={() => nav.navigate('Quote')} />
    </Screen>
  );
}