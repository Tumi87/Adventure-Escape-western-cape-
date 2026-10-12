import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Card, Chip, Screen } from '../components/components';
import { ADVENTURES } from '../data';
import { C } from '../theme';

const FILTERS = ['All adventures', 'Packages', 'Sessions'] as const;

export default function AdventuresScreen() {
  const nav = useNavigation<any>();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All adventures');
  const list = ADVENTURES.filter((a) => filter === 'All adventures' || a.category === filter);

  return (
    <Screen title="Adventures" subtitle="Real outdoor experiences, fully guided.">
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {FILTERS.map((f) => (
          <Chip key={f} label={f} active={f === filter} onPress={() => setFilter(f)} />
        ))}
      </View>
      {list.map((a) => (
        <Pressable key={a.id} onPress={() => nav.navigate('Overview', { id: a.id })}>
          <Card style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Image source={a.image} style={{ width: 64, height: 64, borderRadius: 6 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '800', color: C.text }}>{a.title}</Text>
              <Text style={{ color: C.muted, fontSize: 12 }}>{a.short}</Text>
              <Text style={{ color: C.orange, fontWeight: '700', fontSize: 12, marginTop: 2 }}>{a.priceLabel}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={C.orange} />
          </Card>
        </Pressable>
      ))}
      <Text style={{ color: C.muted, fontSize: 12, textAlign: 'center' }}>
        Pick more than one adventure to unlock discounts.
      </Text>
    </Screen>
  );
}