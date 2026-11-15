import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Adventure } from '../types';
import { colors } from '../theme';

interface Props {
  adventure: Adventure;
  saved: boolean;
  onOpen: () => void;
  onToggleSaved: () => void;
}

export default function AdventureCard({ adventure: a, saved, onOpen, onToggleSaved }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onOpen} accessibilityRole="button" accessibilityLabel={`View ${a.name}`}>
      <View>
        <Image source={a.image} style={styles.image} accessibilityLabel={a.imageAlt} />
        <TouchableOpacity
          style={[styles.heart, saved && { backgroundColor: colors.orange }]}
          onPress={onToggleSaved}
          accessibilityRole="button"
          accessibilityLabel={`${saved ? 'Unsave' : 'Save'} ${a.name}`}
        >
          <Text style={{ fontSize: 22, color: saved ? colors.white : colors.orange }}>{saved ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 12 }}>
        <Text style={styles.title}>{a.name}</Text>
        <Text style={styles.muted}>{a.duration} · Free cancellation</Text>
        {a.includes.map(x => <Text key={x} style={styles.muted}>• {x}</Text>)}
        <Text style={styles.from}>from <Text style={styles.price}>R{a.price}</Text> per person</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, overflow: 'hidden', marginBottom: 14, backgroundColor: colors.white },
  image: { width: '100%', height: 160 },
  heart: {
    position: 'absolute', top: 8, right: 8, width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 17, fontWeight: '700', color: colors.ink },
  muted: { fontSize: 13, color: colors.muted, marginBottom: 2 },
  from: { textAlign: 'right', color: colors.muted, marginTop: 6 },
  price: { fontWeight: '800', color: colors.ink, fontSize: 17 },
});
