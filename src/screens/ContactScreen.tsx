import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Btn, Card } from '../components';
import FormField from '../components/FormField';
import { Chip } from '../components';
import { C } from '../theme';

const TOPICS = ['Booking', 'Pricing', 'Directions', 'Other'];

function Info({
  icon,
  title,
  sub,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  sub: string;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
      <Ionicons name={icon} size={18} color={C.green} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: '700' }}>{title}</Text>
        <Text style={{ fontSize: 10, color: C.muted }}>{sub}</Text>
      </View>
    </View>
  );
}

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const send = () => {
    if (!name || !email.includes('@') || !topic || !message) {
      Alert.alert('Missing details', 'Please complete every field.');
      return;
    }
    Alert.alert('Enquiry sent', 'Thanks! Our team will get back to you soon.');
    setName('');
    setEmail('');
    setTopic('');
    setMessage('');
  };

  return (
    <Screen title="Contact Us" subtitle="Let's plan an adventure that suits your group.">
      <Card>
        <Info icon="call-outline" title="Call us" sub="Phone number to be added" />
        <Info icon="mail-outline" title="Email us" sub="Email to be confirmed" />
        <Info icon="location-outline" title="Cape Town, Western Cape" sub="Venue address to be confirmed" />
        <Info icon="share-social-outline" title="Follow our adventures" sub="Social handles to be added" />
      </Card>

      <Text style={{ fontSize: 17, fontWeight: '700', color: C.green, marginTop: 14, marginBottom: 6 }}>
        Send an enquiry
      </Text>
      <FormField label="Name" placeholder="Your name" value={name} onChangeText={setName} />
      <FormField
        label="Email"
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={{ fontSize: 11, fontWeight: '600', marginBottom: 4 }}>Enquiry type</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {TOPICS.map((t) => (
          <Chip key={t} label={t} active={topic === t} onPress={() => setTopic(t)} />
        ))}
      </View>
      <FormField
        label="Message"
        placeholder="Tell us what you have in mind..."
        value={message}
        onChangeText={setMessage}
        multiline
        style={{ minHeight: 90, textAlignVertical: 'top' }}
      />
      <Text style={{ fontSize: 10, color: C.muted }}>
        For families, schools, sports clubs, tourists and corporate teams.
      </Text>
      <Btn label="Send enquiry" onPress={send} />
    </Screen>
  );
}