import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Navigate } from '../types';
import { colors } from '../theme';

const logo = require('../../assets/logo.jpg');
const banner = require('../../assets/cape_town.jpg');

export default function SplashScreen({ go }: { go: Navigate }) {
  return (
    <ScrollView style={styles.wrap} contentContainerStyle={styles.content} bounces={false}>
      <View style={styles.top}>
        <Image source={logo} style={styles.logo} resizeMode="contain" accessibilityLabel="Adventure Escape SA logo" />
        <Text style={styles.title}>ADVENTURE{'\n'}ESCAPE SA</Text>
        <Text style={styles.place}>CAPE TOWN, WESTERN CAPE</Text>
      </View>

      <Image source={banner} style={styles.banner} resizeMode="cover"
        accessibilityLabel="Aerial view of Cape Town with the stadium and the coast" />

      <View style={styles.bottom}>
        <Text style={styles.heading}>Find your next great escape.</Text>
        <Text style={styles.sub}>Guided outdoor adventures. Shared memories. A little closer to nature.</Text>

        <TouchableOpacity style={styles.cta} onPress={() => go({ name: 'home' })}
          accessibilityRole="button" accessibilityLabel="Explore adventures">
          <Text style={styles.ctaText}>Explore adventures</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginRow} onPress={() => go({ name: 'login' })}
          accessibilityRole="button" accessibilityLabel="Already have an account? Log in">
          <Text style={styles.login}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.green },
  content: { flexGrow: 1 },
  top: { alignItems: 'center', paddingTop: 28, paddingBottom: 20, paddingHorizontal: 24 },
  logo: { width: 88, height: 88, marginBottom: 12 },
  title: { color: colors.white, fontSize: 24, fontWeight: '800', textAlign: 'center', letterSpacing: 0.5, lineHeight: 30 },
  place: { color: colors.sand, fontSize: 12, letterSpacing: 0.5, marginTop: 8 },
  banner: { width: '100%', height: 190 },
  bottom: { padding: 20, paddingTop: 22 },
  heading: { color: colors.white, fontSize: 27, fontWeight: '800', lineHeight: 33 },
  sub: { color: colors.sand, fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 20 },
  cta: { backgroundColor: colors.burnt, borderRadius: 12, minHeight: 54, alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: colors.white, fontSize: 17, fontWeight: '800' },
  loginRow: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  login: { color: colors.sand, fontSize: 15 },
});
