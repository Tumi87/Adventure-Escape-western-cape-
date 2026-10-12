import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text, TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IMAGES } from '../images';
import { C } from '../theme';

export function Screen({
  title, subtitle, children,
}: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.cream }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 12 }}>
      {title && <Text style={s.title}>{title}</Text>}
      {subtitle && <Text style={s.sub}>{subtitle}</Text>}
      {children}
    </ScrollView>
  );
}

export function Btn({
  label, onPress, variant = 'primary', style,
}: {
  label: string; onPress?: () => void;
  variant?: 'primary' | 'outline'; style?: StyleProp<ViewStyle>;
}) {
  const outline = variant === 'outline';
  return (
    <Pressable onPress={onPress}
      style={[s.btn, outline ? s.btnOutline : s.btnPrimary, style]}>
      <Text style={[s.btnText, outline && { color: C.green }]}>{label}</Text>
    </Pressable>
  );
}

export function Field({ label, ...props }: { label: string } & TextInputProps) {
  return (
    <View style={{ gap: 4 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput placeholderTextColor={C.muted} {...props}
        style={[s.input, props.multiline && { height: 90, textAlignVertical: 'top' }]} />
    </View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={[s.chip, active && { backgroundColor: C.green, borderColor: C.green }]}>
      <Text style={{ color: active ? C.white : C.text, fontSize: 13, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}

export function Row({ left, right, bold }: { left: string; right: string; bold?: boolean }) {
  const w = bold ? '800' : '500';
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
      <Text style={{ color: C.text, fontWeight: w }}>{left}</Text>
      <Text style={{ color: bold ? C.orange : C.text, fontWeight: w }}>{right}</Text>
    </View>
  );
}

const MENU = ['Home', 'Adventures', 'Quote', 'Account', 'About', 'Reviews', 'Fees', 'Map', 'Contact', 'Payment'];

export function AppHeader({ code, navigation }: { code: string; navigation: any }) {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  return (
    <View style={[s.header, { paddingTop: insets.top + 8 }]}>
      <Image source={IMAGES.logo} style={s.logo} />
      <View style={{ flex: 1 }}>
        <Text style={s.brand}>ADVENTURE ESCAPE SA</Text>
        <Text style={s.code}>{code}</Text>
      </View>
      <Pressable onPress={() => setOpen(true)} hitSlop={10}>
        <Ionicons name="menu" size={26} color={C.white} />
      </Pressable>
      <Modal transparent animationType="fade" visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable style={s.backdrop} onPress={() => setOpen(false)}>
          <View style={[s.menu, { marginTop: insets.top + 56 }]}>
            {MENU.map((m) => (
              <Pressable key={m} style={s.menuItem}
                onPress={() => { setOpen(false); navigation.navigate(m); }}>
                <Text style={{ color: C.text, fontSize: 16 }}>{m}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '800', color: C.green },
  sub: { color: C.muted, fontSize: 13, marginTop: -6 },
  btn: { paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnPrimary: { backgroundColor: C.orange },
  btnOutline: { borderWidth: 1.5, borderColor: C.green, backgroundColor: 'transparent' },
  btnText: { color: C.white, fontWeight: '700', fontSize: 15 },
  label: { fontSize: 12, color: C.muted, fontWeight: '600' },
  input: {
    backgroundColor: C.white, borderWidth: 1, borderColor: C.border,
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 11, color: C.text, fontSize: 15,
  },
  card: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 14, gap: 6 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: C.border, backgroundColor: C.card },
  header: { backgroundColor: C.green, paddingHorizontal: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 34, height: 34, borderRadius: 17 },
  brand: { color: C.white, fontWeight: '800', fontSize: 12, letterSpacing: 0.5 },
  code: { color: '#B9C9BC', fontSize: 10 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'flex-end', paddingRight: 12 },
  menu: { backgroundColor: C.card, borderRadius: 10, minWidth: 180, paddingVertical: 6 },
  menuItem: { paddingVertical: 12, paddingHorizontal: 18 },
});