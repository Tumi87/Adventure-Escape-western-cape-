import React from 'react';
import { ScrollView, Text } from 'react-native';
import Button from '../components/Button';
import SimpleTable from '../components/SimpleTable';
import { useQuote } from '../context/QuoteContext';
import { adventures } from '../data';
import { common } from '../styles';
import { Navigate } from '../types';

export default function AccountScreen({ go }: { go: Navigate }) {
  const { user, saved, quote, logout } = useQuote();

  return (
    <ScrollView contentContainerStyle={common.pad}>
      <Text style={common.h1}>My Account</Text>

      {user ? (
        <>
          <SimpleTable header={['Detail', 'Value']} rows={[
            ['Name', user.name], ['Email', user.email],
            ['Saved adventures', String(saved.length)], ['Items in quote', String(quote.length)],
          ]} />
          <Button title="Log out" alt onPress={() => { logout(); go({ name: 'login' }); }} style={{ marginTop: 12 }} />
        </>
      ) : (
        <>
          <Text style={common.p}>You are browsing as a guest. Log in to see your account details.</Text>
          <Button title="Log in" onPress={() => go({ name: 'login' })} />
        </>
      )}

      <Text style={common.h2}>Saved adventures</Text>
      {saved.length === 0 && <Text style={common.muted}>Nothing saved yet. Tap the heart on an adventure.</Text>}
      {saved.map(id => (
        <Button key={id} title={adventures[id].name} alt onPress={() => go({ name: 'detail', id })} />
      ))}

      <Text style={common.h2}>Shortcuts</Text>
      <Button title="My quote" onPress={() => go({ name: 'quote' })} />
      <Button title="Reviews" alt onPress={() => go({ name: 'reviews' })} />
      <Button title="Map and directions" alt onPress={() => go({ name: 'map' })} />
    </ScrollView>
  );
}
