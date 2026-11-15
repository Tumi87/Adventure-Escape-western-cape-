import React, { useState } from 'react';
import { Linking, ScrollView, Text } from 'react-native';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import SimpleTable from '../components/SimpleTable';
import { adventures } from '../data';
import { common } from '../styles';
import { DropdownOption } from '../types';

const venueOptions: DropdownOption[] = adventures.map(a => ({ value: String(a.id), label: a.name }));

export default function MapScreen({ venueId }: { venueId?: number }) {
  const [venue, setVenue] = useState<number>(venueId ?? 0);
  const place = adventures[venue].venue;

  const openMap = (): void => {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place));
  };
  const directions = (): void => {
    Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(place));
  };

  return (
    <ScrollView contentContainerStyle={common.pad}>
      <Text style={common.h1}>Map and Directions</Text>
      <Dropdown label="Choose an activity" value={String(venue)} options={venueOptions} onChange={v => setVenue(Number(v))} />
      <Text style={common.h3}>{adventures[venue].name}</Text>
      <Text style={common.p}>Meeting point: {place}</Text>
      <Button title="Get directions" onPress={directions} />
      <Button title="Open in Maps" alt onPress={openMap} />

      <Text style={common.h2}>All meeting points</Text>
      <SimpleTable header={['Activity', 'Meeting point']} rows={adventures.map(a => [a.name, a.venue] as [string, string])} />
    </ScrollView>
  );
}
