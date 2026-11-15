import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const common = StyleSheet.create({
  pad: { padding: 16 },
  h1: { fontSize: 26, fontWeight: '800', color: colors.green, marginBottom: 8 },
  h2: { fontSize: 20, fontWeight: '700', color: colors.orange, marginTop: 18, marginBottom: 8 },
  h3: { fontSize: 17, fontWeight: '700', color: colors.ink },
  p: { fontSize: 15, color: colors.ink, lineHeight: 22, marginBottom: 4 },
  muted: { fontSize: 13, color: colors.muted, marginBottom: 2 },
  ok: { backgroundColor: colors.sand, padding: 12, borderRadius: 12, marginTop: 10, color: colors.ink },
  error: { color: colors.error, fontSize: 13, marginTop: 3 },
  pill: {
    borderWidth: 2, borderColor: colors.border, borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14,
    minHeight: 44, justifyContent: 'center',
  },
  from: { textAlign: 'right', color: colors.muted, marginTop: 6 },
  price: { fontWeight: '800', color: colors.ink, fontSize: 17 },
});
