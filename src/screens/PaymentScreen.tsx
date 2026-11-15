import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Button from '../components/Button';
import Field from '../components/Field';
import { useQuote } from '../context/QuoteContext';
import { adventures } from '../data';
import { common } from '../styles';
import { FormErrors, Navigate } from '../types';
import { calculateFees, formatRand, isName, isValidExpiry } from '../utils';

type PayErrors = FormErrors<'quote' | 'name' | 'number' | 'expiry' | 'cvv'>;

export default function PaymentScreen({ go }: { go: Navigate }) {
  const { quote } = useQuote();
  const fees = calculateFees(quote, adventures);
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [errors, setErrors] = useState<PayErrors>({});
  const [ok, setOk] = useState<boolean>(false);

  const pay = (): void => {
    const e: PayErrors = {};
    if (quote.length === 0) e.quote = 'Your quote is empty. Add an adventure on the Fees screen.';
    if (!isName(name)) e.name = 'Enter the name on the card.';
    if (!/^\d{16}$/.test(number)) e.number = 'Card number must be 16 digits.';
    if (!isValidExpiry(expiry)) e.expiry = 'Use MM/YY (a date that has not passed).';
    if (!/^\d{3,4}$/.test(cvv)) e.cvv = 'CVV must be 3 or 4 digits.';
    setErrors(e);
    setOk(Object.keys(e).length === 0);
  };

  return (
    <ScrollView contentContainerStyle={common.pad} keyboardShouldPersistTaps="handled">
      <Text style={common.h1}>Payment</Text>
      <Text style={common.h2}>Order Summary</Text>
      {quote.map(i => <Text key={i} style={common.p}>{adventures[i].name} – R{adventures[i].price}</Text>)}
      <Text style={common.p}>Discount ({fees.discountPercent}%): -{formatRand(fees.discount)}</Text>
      <Text style={common.p}>VAT (15%): {formatRand(fees.vat)}</Text>
      <Text style={common.h3}>Total: {formatRand(fees.total)}</Text>
      {!!errors.quote && <Text accessibilityRole="alert" style={common.error}>{errors.quote}</Text>}

      <Text style={common.h2}>Payment Details</Text>
      <Field label="Name on Card" value={name} onChangeText={setName} error={errors.name} autoComplete="cc-name" />
      <Field label="Card Number" value={number} onChangeText={setNumber} error={errors.number} keyboardType="number-pad" maxLength={16} placeholder="16 digits" />
      <Field label="Expiry (MM/YY)" value={expiry} onChangeText={setExpiry} error={errors.expiry} maxLength={5} placeholder="MM/YY" />
      <Field label="CVV" value={cvv} onChangeText={setCvv} error={errors.cvv} keyboardType="number-pad" secureTextEntry maxLength={4} />
      <Button title="Pay Now" onPress={pay} />
      {ok && <Text style={common.ok}>Payment details accepted. This is a demo, so no money was taken.</Text>}
      <Button title="Back to fees" alt onPress={() => go({ name: 'fees' })} />
    </ScrollView>
  );
}
