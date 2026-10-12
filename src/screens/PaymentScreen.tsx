import React, { useState } from 'react';
import { Linking, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Screen, Btn, Card } from '../components';
import { FormField } from '../components/FormField';
import { C } from '../theme';

export default function MapScreen() {
  const nav = useNavigation<any>();
  const [start, setStart] = useState('');
  const [dest, setDest] = useState('Cape Town, Western Cape');

  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      start,
    )}&destination=${encodeURIComponent(dest)}`;
    Linking.openURL(url);
  };

  return (
    <Screen title="Map & Directions" subtitle="Find us in Cape Town, Western Cape.">
      <View
        style={{
          height: 150,
          borderRadius: 8,
          backgroundColor: C.mint,
          borderWidth: 1,
          borderColor: C.border,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 8,
        }}
      >
        <Ionicons name="location" size={36} color={C.orange} />
        <Text style={{ fontWeight: '700', color: C.green }}>Cape Town region</Text>
        <Text style={{ fontSize: 10, color: C.muted }}>Illustrative map · exact venue pending</Text>
      </View>

      <FormField label="Starting point" placeholder="Enter your address or area" value={start} onChangeText={setStart} />
      <FormField label="Destination" value={dest} onChangeText={setDest} />
      <Btn label="Get directions" onPress={openMaps} />

      <Card style={{ backgroundColor: C.mint }}>
        <Text style={{ fontWeight: '700', color: C.green }}>Venue address to be confirmed</Text>
        <Text style={{ fontSize: 11, marginTop: 4 }}>
          Ask our team for the meeting point before travelling. Routes and distances are not yet available.
        </Text>
      </Card>
      <Btn label="Enquire about directions" variant="outline" onPress={() => nav.navigate('Contact')} />
      <Text style={{ fontSize: 10, color: C.muted }}>
        Your final meeting point will be shared when your adventure details are confirmed.
      </Text>
    </Screen>
  );
}