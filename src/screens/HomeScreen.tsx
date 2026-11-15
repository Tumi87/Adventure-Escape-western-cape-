import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AdventureCard from '../components/AdventureCard';
import Button from '../components/Button';
import SimpleTable from '../components/SimpleTable';
import { useQuote } from '../context/QuoteContext';
import { adventures, discountTable, heroImage } from '../data';
import { common } from '../styles';
import { colors } from '../theme';
import { Navigate } from '../types';

export default function HomeScreen({ go }: { go: Navigate }) {
  const { saved, toggleSaved } = useQuote();
  const packages = adventures.filter(a => a.type === 'Package');
  const activities = adventures.filter(a => a.type === 'Activity');

  const renderCard = (id: number) => {
    const a = adventures[id];
    return (
      <AdventureCard key={a.id} adventure={a} saved={saved.includes(a.id)}
        onOpen={() => go({ name: 'detail', id: a.id })} onToggleSaved={() => toggleSaved(a.id)} />
    );
  };

  return (
    <ScrollView>
      <View>
        <Image source={heroImage} style={styles.hero} accessibilityLabel="View of Lion's Head and the sea from Table Mountain" />
        <View style={styles.overlay}>
          <Text style={styles.heroTitle}>Explore. Discover. Thrive.</Text>
          <Text style={styles.heroSub}>Professionally guided outdoor adventures across the Western Cape.</Text>
        </View>
      </View>
      <View style={common.pad}>
        <Button title="Browse adventures" onPress={() => go({ name: 'overview' })} />
        <Button title="Read reviews" alt onPress={() => go({ name: 'reviews' })} />

        <Text style={common.h2}>What we do</Text>
        <Text style={common.p}>Established in 2024, Adventure Escape SA brings a variety of guided outdoor experiences together in one place so you can compare, quote and book. Every activity includes a safety briefing, quality equipment and qualified guides.</Text>

        <Text style={common.h2}>Adventure Packages</Text>
        {packages.map(a => renderCard(a.id))}

        <Text style={common.h2}>Individual Activities</Text>
        {activities.map(a => renderCard(a.id))}

        <Text style={common.h2}>The more you book, the more you save</Text>
        <SimpleTable header={['Bookings', 'Discount']} rows={discountTable} />

        <Text style={common.h2}>Why choose us?</Text>
        {[
          ['Safety first', 'Briefings, equipment and professional guides on every activity.'],
          ['For everyone', 'Families, schools, tourists and corporate groups are all welcome.'],
          ['Eco-tourism', 'We protect the Western Cape landscapes we love to explore.'],
        ].map(([t, d]) => (
          <View key={t} style={styles.tile}>
            <Text style={[common.h3, { color: colors.green }]}>{t}</Text>
            <Text style={common.p}>{d}</Text>
          </View>
        ))}

        <View style={styles.cta}>
          <Text style={[common.h2, { color: colors.white, marginTop: 0 }]}>Ready for your next escape?</Text>
          <Button title="Contact Us" onPress={() => go({ name: 'contact' })} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 260 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 20 },
  heroTitle: { color: colors.white, fontSize: 30, fontWeight: '800' },
  heroSub: { color: colors.white, fontSize: 15, marginTop: 6 },
  tile: { backgroundColor: colors.sand, borderRadius: 16, padding: 16, marginBottom: 10 },
  cta: { backgroundColor: colors.green, borderRadius: 20, padding: 20, marginTop: 20, alignItems: 'center' },
});
