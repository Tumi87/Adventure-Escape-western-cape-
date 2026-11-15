import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import Field from '../components/Field';
import { useQuote } from '../context/QuoteContext';
import { adventures } from '../data';
import { common } from '../styles';
import { colors } from '../theme';
import { FormErrors, Navigate } from '../types';
import { calculateFees, formatRand, isEmail, isName, isPhone } from '../utils';

type FeeErrors = FormErrors<'name' | 'phone' | 'email'>;

export default function FeesScreen({ go }: { go: Navigate }) {
  const { quote, toggleQuote, removeFromQuote } = useQuote();
  const [calculated, setCalculated] = useState<boolean>(false);
  const [selError, setSelError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<FeeErrors>({});
  const [sent, setSent] = useState<string>('');

  const fees = calculateFees(quote, adventures);
  const show = calculated && quote.length > 0;

  const calc = (): boolean => {
    if (quote.length === 0) { setSelError('Select at least one activity.'); return false; }
    setSelError('');
    setCalculated(true);
    return true;
  };

  const request = (): void => {
    const e: FeeErrors = {};
    if (!isName(name)) e.name = 'Enter a valid name (letters only).';
    if (!isPhone(phone)) e.phone = 'Enter a valid SA phone number, e.g. 0821234567.';
    if (!isEmail(email)) e.email = 'Enter a valid email address.';
    setErrors(e);
    if (!calc()) return;
    if (Object.keys(e).length === 0) {
      setSent(`Quote request sent. ${name.trim()}, a consultant will contact you to confirm: ${quote.map(i => adventures[i].name).join(', ')}. Quoted total: ${formatRand(fees.total)}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={common.pad} keyboardShouldPersistTaps="handled">
      <Text style={common.h1}>Calculate Fees</Text>
      <Text style={common.h2}>Choose your adventures</Text>
      {adventures.map(a => {
        const on = quote.includes(a.id);
        return (
          <TouchableOpacity key={a.id} onPress={() => { toggleQuote(a.id); setSent(''); }}
            style={[styles.row, on && { borderColor: colors.green, backgroundColor: colors.sand }]}
            accessibilityRole="checkbox" accessibilityState={{ checked: on }} accessibilityLabel={`${a.name} R${a.price}`}>
            <Text style={{ fontSize: 22, color: colors.green }}>{on ? '☑' : '☐'}</Text>
            <Text style={[common.p, { flex: 1, marginLeft: 10, marginBottom: 0 }]}>{a.name}</Text>
            <Text style={common.price}>R{a.price}</Text>
          </TouchableOpacity>
        );
      })}
      {!!selError && <Text accessibilityRole="alert" style={common.error}>{selError}</Text>}

      <View style={styles.panel}>
        <Text style={common.h3}>Your Selection ({quote.length} Item{quote.length === 1 ? '' : 's'})</Text>
        {quote.length === 0 && <Text style={common.muted}>No items added yet</Text>}
        {quote.map(i => (
          <View key={i} style={styles.sel}>
            <Text style={[common.p, { flex: 1, marginBottom: 0 }]}>{adventures[i].name} – R{adventures[i].price}</Text>
            <TouchableOpacity style={styles.x} onPress={() => removeFromQuote(i)} accessibilityRole="button"
              accessibilityLabel={`Remove ${adventures[i].name}`}>
              <Text style={{ fontWeight: '700' }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={common.p}>Subtotal: {show ? formatRand(fees.subtotal) : 'R 0'}</Text>
        <Text style={common.p}>Discount: {show ? `${fees.discountPercent}% (-${formatRand(fees.discount)})` : '0%'}</Text>
        <Text style={common.p}>VAT (15%): {show ? formatRand(fees.vat) : 'R 0'}</Text>
        <View style={styles.total}>
          <Text style={{ color: colors.white, fontWeight: '800', fontSize: 18 }}>Total: {show ? formatRand(fees.total) : 'R 0'}</Text>
        </View>
        <Button title="Calculate Total" alt onPress={() => { calc(); }} />
        <Button title="View my quote" alt onPress={() => go({ name: 'quote' })} />
        <Text style={common.muted}>One booking – no discount. Two – 5%. Three – 10%. More than three – 15%. This is a quoted fee only, not a formal invoice.</Text>

        <Text style={[common.h3, { marginTop: 14, marginBottom: 6 }]}>Your details</Text>
        <Field label="Name" value={name} onChangeText={setName} error={errors.name} />
        <Field label="Phone Number" value={phone} onChangeText={setPhone} error={errors.phone} keyboardType="phone-pad" />
        <Field label="Email Address" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
        <Button title="Request Quote" onPress={request} />
        {!!sent && <Text style={common.ok}>{sent}</Text>}
        {!!sent && <Button title="Continue to payment" alt onPress={() => go({ name: 'payment' })} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: colors.border, borderRadius: 12, padding: 12, marginBottom: 8, minHeight: 48 },
  panel: { borderWidth: 2, borderColor: colors.green, borderRadius: 16, padding: 14, marginTop: 12 },
  sel: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 6, paddingLeft: 10, marginVertical: 4 },
  x: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  total: { backgroundColor: '#111', borderRadius: 10, padding: 14, alignItems: 'center', marginVertical: 10 },
});
