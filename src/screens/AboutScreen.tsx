import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { heroImage, teamImage } from '../data';
import { common } from '../styles';
import { colors } from '../theme';

const goals: [string, string][] = [
  ['Simple booking', 'One place to compare, quote and book adventures.'],
  ['Safe adventures', 'Every activity professionally guided with proper equipment.'],
  ['Eco-tourism', 'Encourage a love of nature across the Western Cape.'],
];

const values: string[] = [
  'Excitement and adventure',
  'Teamwork and fitness',
  'Respect for the outdoors',
  'Fair discounts for repeat and group bookings',
];

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={common.pad}>
      <Text style={common.h1}>About Us</Text>
      <Image source={heroImage} style={{ width: '100%', height: 150, borderRadius: 16 }} accessibilityLabel="View of Lion's Head and the sea from Table Mountain" />

      <Text style={common.h2}>History</Text>
      <Text style={common.p}>Adventure Escape SA was established in 2024 by Liam Daniels, who has always had a passion for outdoor adventure and eco-tourism. He noticed that many families, tourists, schools and corporate groups struggled to find one place where they could compare and book exciting outdoor activities.</Text>
      <Text style={[common.h3, { marginTop: 8 }]}>Where we operate</Text>
      <Text style={common.p}>We operate throughout the Western Cape, offering professionally guided experiences for visitors of all ages and experience levels.</Text>
      <Image source={teamImage} style={{ width: '100%', height: 180, borderRadius: 12, marginTop: 10 }} accessibilityLabel="Group on a wooden obstacle course in the forest" />

      <Text style={common.h2}>Vision</Text>
      <Text style={common.p}>To be the Western Cape's leading provider of safe, exciting and memorable outdoor experiences.</Text>
      <Text style={common.h2}>Mission</Text>
      <Text style={common.p}>To deliver guided outdoor experiences that encourage teamwork, fitness and a love of nature.</Text>

      <Text style={common.h2}>Goals</Text>
      {goals.map(([t, d]) => (
        <View key={t} style={{ backgroundColor: colors.sand, borderRadius: 16, padding: 16, marginBottom: 10 }}>
          <Text style={[common.h3, { color: colors.green }]}>{t}</Text>
          <Text style={common.p}>{d}</Text>
        </View>
      ))}

      <Text style={common.h3}>What we value</Text>
      {values.map(v => <Text key={v} style={common.p}>• {v}</Text>)}
    </ScrollView>
  );
}
