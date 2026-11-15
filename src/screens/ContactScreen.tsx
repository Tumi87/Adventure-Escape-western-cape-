import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Field from '../components/Field';
import SimpleTable from '../components/SimpleTable';
import { adventures, business } from '../data';
import { common } from '../styles';
import { DropdownOption, FormErrors, Navigate } from '../types';
import { isEmail, isName, isPhone } from '../utils';

type ContactErrors = FormErrors<'name' | 'email' | 'phone' | 'package' | 'message'>;

const packageOptions: DropdownOption[] = adventures.map(a => ({ value: String(a.id), label: `${a.name} (R${a.price})` }));

export default function ContactScreen({ go, packageId }: { go: Navigate; packageId?: number }) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [pkg, setPkg] = useState<number | null>(packageId ?? null);
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState<boolean>(false);

  const send = (): void => {
    const e: ContactErrors = {};
    if (!isName(name)) e.name = 'Enter a valid name.';
    if (!isEmail(email)) e.email = 'Enter a valid email.';
    if (!isPhone(phone)) e.phone = 'Enter a valid SA phone number.';
    if (pkg === null) e.package = 'Please select a package.';
    if (message.trim().length < 5) e.message = 'Please enter a message.';
    setErrors(e);
    setSent(Object.keys(e).length === 0);
  };

  return (
    <ScrollView contentContainerStyle={common.pad} keyboardShouldPersistTaps="handled">
      <Text style={common.h1}>Contact Us</Text>
      <Field label="Name" value={name} onChangeText={setName} error={errors.name} autoComplete="name" />
      <Field label="Email Address" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
      <Field label="Phone Number" value={phone} onChangeText={setPhone} error={errors.phone} keyboardType="phone-pad" />
      <Dropdown label="Select a Package" value={pkg === null ? null : String(pkg)} options={packageOptions}
        onChange={v => setPkg(Number(v))} placeholder="Choose a package..." error={errors.package} />
      <Field label="Message" value={message} onChangeText={setMessage} error={errors.message} multiline style={{ minHeight: 90, textAlignVertical: 'top' }} />
      <Button title="Send" onPress={send} />
      {sent && <Text style={common.ok}>Message sent! We will be in touch soon.</Text>}

      <Text style={common.h2}>Find us</Text>
      <Button title="Map and directions" alt onPress={() => go({ name: 'map', venueId: pkg ?? undefined })} />

      <Text style={common.h2}>Business Info</Text>
      <SimpleTable header={['Item', 'Details']} rows={[
        ['Location', business.location], ['Email', business.email], ['Phone', business.phone], ['Hours', business.hours],
      ]} />

      <Text style={common.h2}>Meeting points</Text>
      <SimpleTable header={['Activity', 'Meeting point']} rows={adventures.map(a => [a.name, a.venue] as [string, string])} />
    </ScrollView>
  );
}
