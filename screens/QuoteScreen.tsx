import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Btn, Card, Chip, Field, Row, Screen } from '../components/components';
import { useQuote } from '../QuoteContext';
import { C, money } from '../theme';

const GROUPS = ['Family', 'Corporate', 'School', 'Friends'];

export default function QuoteScreen() {
  const nav = useNavigation<any>();
  const q = useQuote();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [group, setGroup] = useState('');
  const [guests, setGuests] = useState('');

  const send = () => {
    if (!name || !email.includes('@') || q.items.length === 0) {
      Alert.alert('Missing details', 'Add your name, a valid email and at least one adventure.');
      return;
    }
    Alert.alert('Quotation requested', 'Thank you. Our team will confirm dates and availability.');
  };

  return (
    <Screen title="Quote" subtitle="Sample quotation. Not a confirmed reservation.">
      <Field label="Name" placeholder="Your full name" value={name} onChangeText={setName} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Field label="Email" placeholder="Email address" value={email}
            onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        </View>
        <View style={{ flex: 1 }}>
          <Field label="Phone number" placeholder="Phone number" value={phone}
            onChangeText={setPhone} keyboardType="phone-pad" />
        </View>
      </View>
      {q.items.length === 0 && (
        <Text style={{ color: C.muted, fontSize: 13 }}>No adventures yet. Choose one below to build your quote.</Text>
      )}
      {q.items.map((a) => (
        <Card key={a.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: C.text, flex: 1 }}>{a.title}</Text>
          <Text style={{ color: C.text, marginRight: 10 }}>{a.priceLabel}</Text>
          <Pressable onPress={() => q.remove(a.id)} hitSlop={8}>
            <Ionicons name="close-circle" size={20} color={C.orange} />
          </Pressable>
        </Card>
      ))}
      <Btn label="Select more activities" variant="outline" onPress={() => nav.navigate('Adventures')} />
      <Field label="Preferred date" placeholder="e.g. 2026-11-20" value={date} onChangeText={setDate} />
      <Text style={{ fontSize: 12, color: C.muted, fontWeight: '600' }}>Group type</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {GROUPS.map((g) => <Chip key={g} label={g} active={g === group} onPress={() => setGroup(g)} />)}
      </View>
      <Field label="Guests" placeholder="Number" value={guests} onChangeText={setGuests} keyboardType="number-pad" />
      <Card>
        <Text style={{ color: C.orange, fontWeight: '800', fontSize: 11 }}>Sample quotation</Text>
        {q.items.map((a) => <Row key={a.id} left={a.title} right={a.priceLabel} />)}
        <Row left="Subtotal" right={money(q.subtotal)} />
        {q.pct > 0 && <Row left={`${q.items.length}-booking discount (${q.pct}%)`} right={`-${money(q.discount)}`} />}
        <Row left="Total" right={money(q.total)} bold />
      </Card>
      <Text style={{ color: C.muted, fontSize: 11 }}>
        Discounts are based on selected bookings. Dates and availability must be confirmed with our team.
      </Text>
      <Btn label="Request quotation" onPress={send} />
      <Btn label="Continue to payment" variant="outline" onPress={() => nav.navigate('Payment')} />
    </Screen>
  );
}