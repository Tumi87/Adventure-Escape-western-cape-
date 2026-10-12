import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Screen, Btn, Card } from '../components';
import { FormField } from '../components/FormField';
import { C } from '../theme';

type LinkProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  sub: string;
  onPress: () => void;
};

function LinkRow({ icon, title, sub, onPress }: LinkProps) {
  return (
    <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
      <Ionicons name={icon} size={18} color={C.green} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: '700' }}>{title}</Text>
        <Text style={{ fontSize: 10, color: C.muted }}>{sub}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={C.muted} />
    </Pressable>
  );
}

export default function AccountScreen() {
  const nav = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <Screen title="Account" subtitle="Your profile, plans and preferences.">
      <Card style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="person-circle-outline" size={36} color={C.green} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ fontWeight: '700' }}>Guest explorer</Text>
          <Text style={{ fontSize: 10, color: C.muted }}>Log in or create an account to save details.</Text>
        </View>
      </Card>

      <Text style={{ fontSize: 17, fontWeight: '700', color: C.green, marginTop: 14, marginBottom: 6 }}>
        Profile details
      </Text>
      <FormField label="Name" placeholder="Your full name" value={name} onChangeText={setName} />
      <FormField
        label="Email"
        placeholder="Your email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <FormField
        label="Phone number"
        placeholder="Your phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Btn label="Save profile" onPress={() => Alert.alert('Profile saved', 'Your details were saved on this device.')} />

      <LinkRow icon="calendar-outline" title="My bookings" sub="No confirmed bookings" onPress={() => nav.navigate('Quote')} />
      <LinkRow icon="bookmark-outline" title="Saved quotes" sub="View your adventure plans" onPress={() => nav.navigate('Quote')} />
      <LinkRow icon="settings-outline" title="Settings" sub="Notifications & privacy" onPress={() => Alert.alert('Settings', 'Coming soon.')} />

      <Text
        style={{ textAlign: 'center', color: C.orange, fontSize: 12, marginTop: 10 }}
        onPress={() => nav.navigate('Login')}
      >
        Log in / Create account →
      </Text>
    </Screen>
  );
}