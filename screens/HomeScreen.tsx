import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';
import { Btn, Card, Screen } from '../components/components';
import { ADVENTURES } from '../data';
import { IMAGES } from '../images';
import { C } from '../theme';

export default function HomeScreen() {
  const nav = useNavigation<any>();
  const featured = ADVENTURES.filter((a) => a.id === 'ultimate' || a.id === 'team');
  return (
    <Screen title="Home" subtitle="Your field guide to adventure in the Western Cape.">
      <Image source={IMAGES.ultimate} style={{ width: '100%', height: 160, borderRadius: 10 }} />
      <Text style={{ fontSize: 22, fontWeight: '800', color: C.green }}>Outside is for everyone.</Text>
      <Text style={{ color: C.text }}>From family days to team challenges, explore with safety-certified guides.</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Btn label="Adventures" style={{ flex: 1 }} onPress={() => nav.navigate('Adventures')} />
        <Btn label="Get a quote" variant="outline" style={{ flex: 1 }} onPress={() => nav.navigate('Quote')} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Ionicons name="shield-checkmark-outline" size={16} color={C.green} />
        <Text style={{ color: C.muted, fontSize: 12 }}>Fully guided. All fitness levels welcome.</Text>
      </View>
      <Text style={{ fontSize: 17, fontWeight: '800', color: C.green, marginTop: 6 }}>Choose your kind of adventure</Text>
      {featured.map((a) => (
        <Pressable key={a.id} onPress={() => nav.navigate('Overview', { id: a.id })}>
          <Card style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Image source={a.image} style={{ width: 70, height: 56, borderRadius: 6 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '800', color: C.text }}>{a.title}</Text>
              <Text style={{ color: C.muted, fontSize: 12 }}>{a.short}</Text>
              <Text style={{ color: C.orange, fontWeight: '700', fontSize: 12, marginTop: 2 }}>{a.priceLabel}  View package</Text>
            </View>
          </Card>
        </Pressable>
      ))}
      <View style={{ flexDirection: 'row', gap: 18, marginTop: 4 }}>
        {[['About', 'About us'], ['Reviews', 'Reviews'], ['Contact', 'Contact us']].map(([r, l]) => (
          <Pressable key={r} onPress={() => nav.navigate(r)}>
            <Text style={{ color: C.green, fontSize: 12, fontWeight: '600' }}>{l}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}