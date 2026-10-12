import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Btn, Card, Field, Screen } from '../components/components';
import { IMAGES } from '../images';
import { C } from '../theme';

export default function LoginScreen() {
  const nav = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    if (!email.includes('@') || password.length < 4) {
      setError('Enter a valid email and a password of at least 4 characters.');
      return;
    }
    setError('');
    nav.replace('Main');
  };

  return (
    <Screen title="Login" subtitle="A simpler way to plan your next escape.">
      <View style={{ alignItems: 'center', gap: 8, marginVertical: 8 }}>
        <Image source={IMAGES.logo} style={{ width: 64, height: 64, borderRadius: 32 }} />
        <Text style={{ fontSize: 20, fontWeight: '800', color: C.green }}>Welcome back, explorer.</Text>
        <Text style={{ color: C.muted, textAlign: 'center', fontSize: 12 }}>
          Sign in to keep your quotes and adventure details in one place.
        </Text>
      </View>
      <Field label="Email" placeholder="Enter your email address" value={email}
        onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Field label="Password" placeholder="Enter your password" value={password}
        onChangeText={setPassword} secureTextEntry />
      <Text style={{ color: C.orange, textAlign: 'right', fontSize: 12 }}>Forgot password?</Text>
      {!!error && <Text style={{ color: '#A62B1F', fontSize: 12 }}>{error}</Text>}
      <Btn label="Log in" onPress={login} />
      <Text style={{ color: C.muted, textAlign: 'center', fontSize: 12 }}>New to Adventure Escape SA?</Text>
      <Btn label="Create an account" variant="outline" onPress={() => nav.replace('Main')} />
      <Card style={{ backgroundColor: C.mint }}>
        <Text style={{ fontWeight: '700', color: C.green }}>Just browsing? No account needed.</Text>
        <Pressable onPress={() => nav.replace('Main')}>
          <Text style={{ color: C.green, fontSize: 12 }}>Continue as guest</Text>
        </Pressable>
      </Card>
    </Screen>
  );
}