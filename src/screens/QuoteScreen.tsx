import React from 'react';
import { ScrollView, Text } from 'react-native';
import Button from '../components/Button';
import SimpleTable from '../components/SimpleTable';
import { useQuote } from '../context/QuoteContext';
import { adventures, discountTable } from '../data';
import { common } from '../styles';
import { Navigate } from '../types';
import { calculateFees, formatRand } from '../utils';

export default function QuoteScreen({ go }: { go: Navigate }) {
  const { quote, removeFromQuote } = useQuote();
  const fees = calculateFees(quote, adventures);

  if (quote.length === 0) {
    return (
      <ScrollView contentContainerStyle={common.pad}>
        <Text style={common.h1}>Get a Quote</Text>
        <Text style={common.p}>Your quote is empty. Add adventures on the Fees screen or from any adventure page.</Text>
        <Button title="Choose adventures" onPress={() => go({ name: 'fees' })} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={common.pad}>
      <Text style={common.h1}>Get a Quote</Text>
      <Text style={common.h2}>Your adventures</Text>
      <SimpleTable header={['Adventure', 'Price']}
        rows={quote.map(i => [adventures[i].name, formatRand(adventures[i].price)] as [string, string])} />

      <Text style={common.h2}>Your quote</Text>
      <SimpleTable header={['Item', 'Amount']} rows={[
        ['Subtotal', formatRand(fees.subtotal)],
        [`Discount (${fees.discountPercent}%)`, `-${formatRand(fees.discount)}`],
        ['VAT (15%)', formatRand(fees.vat)],
        ['Total', formatRand(fees.total)],
      ]} />

      <Text style={common.h2}>Discount rules</Text>
      <SimpleTable header={['Bookings', 'Discount']} rows={discountTable} />

      <Text style={common.h2}>Remove an adventure</Text>
      {quote.map(i => (
        <Button key={i} title={`Remove ${adventures[i].name}`} alt onPress={() => removeFromQuote(i)} />
      ))}

      <Button title="Add more adventures" alt onPress={() => go({ name: 'fees' })} style={{ marginTop: 12 }} />
      <Button title="Continue to payment" onPress={() => go({ name: 'payment' })} />
      <Text style={common.muted}>This is a quoted fee only, not a formal invoice.</Text>
    </ScrollView>
  );
}
