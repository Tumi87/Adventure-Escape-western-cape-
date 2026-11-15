import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AdventureCard from '../components/AdventureCard';
import Dropdown from '../components/Dropdown';
import { useQuote } from '../context/QuoteContext';
import { adventures } from '../data';
import { common } from '../styles';
import { colors } from '../theme';
import { DropdownOption, ItemType, Navigate } from '../types';

type Filter = 'All' | ItemType;
const filters: { value: Filter; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: 'Package', label: 'Packages' },
  { value: 'Activity', label: 'Individual Activities' },
];

const sortOptions: DropdownOption[] = [
  { value: 'default', label: 'Default order' },
  { value: 'low', label: 'Price: low to high' },
  { value: 'high', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
];

interface Props { go: Navigate; initialQuery?: string }

export default function OverviewScreen({ go, initialQuery = '' }: Props) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [filter, setFilter] = useState<Filter>('All');
  const [sort, setSort] = useState<string>('default');
  const { saved, toggleSaved } = useQuote();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = adventures.filter(a => (filter === 'All' || a.type === filter) && a.name.toLowerCase().includes(q));
    if (sort === 'low') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, filter, sort]);

  return (
    <ScrollView contentContainerStyle={common.pad} keyboardShouldPersistTaps="handled">
      <Text style={common.h1}>Overview</Text>
      <TextInput style={styles.search} placeholder="Search adventures" value={query} onChangeText={setQuery}
        accessibilityLabel="Search adventures" />
      <View style={styles.filters}>
        {filters.map(f => (
          <TouchableOpacity key={f.value} onPress={() => setFilter(f.value)}
            style={[common.pill, filter === f.value && { backgroundColor: colors.green, borderColor: colors.green }]}
            accessibilityRole="button" accessibilityState={{ selected: filter === f.value }}>
            <Text style={{ color: filter === f.value ? colors.white : colors.ink, fontWeight: '600' }}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Dropdown label="Sort by" value={sort} options={sortOptions} onChange={setSort} />
      <Text style={[common.muted, { marginBottom: 10 }]} accessibilityLiveRegion="polite">
        {results.length ? `${results.length} result${results.length > 1 ? 's' : ''}` : 'No adventures match your search.'}
      </Text>
      {results.map(a => (
        <AdventureCard key={a.id} adventure={a} saved={saved.includes(a.id)}
          onOpen={() => go({ name: 'detail', id: a.id })} onToggleSaved={() => toggleSaved(a.id)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  search: { borderWidth: 2, borderColor: colors.border, borderRadius: 999, paddingVertical: 12, paddingHorizontal: 18, fontSize: 16, color: colors.ink },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 10 },
});
