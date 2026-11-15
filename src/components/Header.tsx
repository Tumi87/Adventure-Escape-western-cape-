import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { business } from '../data';
import { colors } from '../theme';
import { Navigate } from '../types';

export default function Header({ go }: { go: Navigate }) {
  return (
    <View style={styles.top}>
      <View style={styles.logo}><Text style={{ color: colors.sand, fontSize: 14 }}>▲</Text></View>
      <Text style={styles.brand}>Adventure Escape SA</Text>
      <View style={styles.quick}>
        <TouchableOpacity style={styles.circle} accessibilityRole="button" accessibilityLabel="Call us" onPress={() => Linking.openURL(business.phoneLink)}>
          <Text>call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circle} accessibilityRole="button" accessibilityLabel="WhatsApp us" onPress={() => Linking.openURL(business.whatsapp)}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circle} accessibilityRole="button" accessibilityLabel="My account" onPress={() => go({ name: 'account' })}>
          <Text>account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: colors.white },
  logo: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  brand: { color: colors.green, fontWeight: '800', fontSize: 16, flex: 1 },
  quick: { flexDirection: 'row', gap: 6 },
  circle: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: colors.green, alignItems: 'center', justifyContent: 'center' },
});
