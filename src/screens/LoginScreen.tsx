import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import Field from '../components/Field';
import { useQuote } from '../context/QuoteContext';
import { common } from '../styles';
import { colors } from '../theme';
import { FormErrors, Navigate } from '../types';
import { isEmail } from '../utils';

type LoginErrors = FormErrors<'email' | 'password'>;

export default function LoginScreen({ go }: { go: Navigate }) {
  const { login } = useQuote();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const submit = (): void => {
    const e: LoginErrors = {};
    if (!isEmail(email)) e.email = 'Enter a valid email address.';
    if (password.length < 6) e.password = 'Password must be at least 6 characters.';
    setErrors(e);
    if (Object.keys(e).length === 0) {
      login({ name: email.trim().split('@')[0], email: email.trim() });
      go({ name: 'home' });
    }
  };

  return (
    <ScrollView contentContainerStyle={[common.pad, { paddingTop: 40 }]} keyboardShouldPersistTaps="handled">
      <View style={styles.logo}><Text style={{ fontSize: 34, color: colors.sand }}>▲</Text></View>
      <Text style={[common.h1, { textAlign: 'center' }]}>Welcome back</Text>
      <Field label="Email Address" value={email} onChangeText={setEmail} error={errors.email}
        keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
      <Field label="Password" value={password} onChangeText={setPassword} error={errors.password}
        secureTextEntry autoComplete="password" />
      <TouchableOpacity style={styles.remember} onPress={() => setRemember(r => !r)}
        accessibilityRole="checkbox" accessibilityState={{ checked: remember }}>
        <Text style={{ fontSize: 20, color: colors.green }}>{remember ? '☑' : '☐'}</Text>
        <Text style={[common.p, { marginLeft: 8, marginBottom: 0 }]}>Remember me</Text>
      </TouchableOpacity>
      <Button title="Log In" onPress={submit} />
      <Button title="Continue as guest" alt onPress={() => go({ name: 'home' })} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.green, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  remember: { flexDirection: 'row', alignItems: 'center', minHeight: 44 },
});
