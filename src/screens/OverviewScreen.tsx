import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Image, Text, View } from 'react-native';
import { Btn, Card, Screen } from '../components/components';
import { ADVENTURES } from '../data';
import { useQuote } from '../QuoteContext';
import { C } from '../theme';

export default function OverviewScreen() {
  const nav = useNavigation<any>();
  const { id } = useRoute<any>().params;
  const a = ADVENTURES.find((x) => x.id === id) ?? ADVENTURES[0];
  const q = useQuote();

  const onPress = () => {
    if (a.price === null) return nav.navigate('Contact');
    if (q.has(a.id)) return nav.navigate('Quote');
    q.add(a.id);
    Alert.alert('Added to quote', `${a.title} is now in your quote.`);
  };

  return (
    <Screen title="Overview" subtitle={`Your guide to the ${a.title}.`}>
      <Image source={a.image} style={{ width: '100%', height: 170, borderRadius: 10 }} />
      <Text style={{ color: C.orange, fontWeight: '800', fontSize: 11 }}>Fully guided adventure</Text>
      <Text style={{ fontSize: 22, fontWeight: '800', color: C.green }}>{a.title}</Text>
      <Text style={{ fontSize: 20, fontWeight: '800', color: C.orange }}>{a.priceLabel}</Text>
      <Text style={{ color: C.text }}>{a.description}</Text>
      <Card>
        <Text style={{ fontWeight: '800', color: C.green, marginBottom: 4 }}>What's included</Text>
        {a.includes.map((i) => (
          <View key={i.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 3 }}>
            <Ionicons name={i.icon as any} size={18} color={C.green} />
            <Text style={{ color: C.text }}>{i.label}</Text>
          </View>
        ))}
      </Card>
      <Text style={{ color: C.muted, fontSize: 12 }}>
        All ages and fitness levels welcome. Ask us which activities suit your group.
      </Text>
      <Btn
        label={a.price === null ? 'Request pricing' : q.has(a.id) ? 'View my quote' : 'Add to quote'}
        onPress={onPress}
      />
    </Screen>
  );
}