import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Navigate, Screen } from '../types';
import { colors } from '../theme';

type Tab = { name: 'home' | 'about' | 'overview' | 'fees' | 'contact'; label: string };

const tabs: Tab[] = [
  { name: 'home', label: 'Home' },
  { name: 'about', label: 'About' },
  { name: 'overview', label: 'Overview' },
  { name: 'fees', label: 'Fees' },
  { name: 'contact', label: 'Contact' },
];

export default function BottomNav({ current, go }: { current: Screen['name']; go: Navigate }) {
  return (
    <View style={styles.nav}>
      {tabs.map(t => {
        const active = current === t.name || (t.name === 'overview' && current === 'detail');
        return (
          <TouchableOpacity
            key={t.name}
            style={styles.tab}
            onPress={() => go({ name: t.name })}
            accessibilityRole="tab"
            accessibilityLabel={t.label}
            accessibilityState={{ selected: active }}
          >
            <Text style={{ color: active ? colors.orange : colors.ink, fontWeight: active ? '800' : '500' }}>{t.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: { flexDirection: 'row', borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 52 },
});
