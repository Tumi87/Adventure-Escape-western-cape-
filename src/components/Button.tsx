import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  alt?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Button({ title, onPress, alt, style }: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={[styles.btn, alt && { backgroundColor: colors.green }, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.orange, borderRadius: 999, paddingVertical: 13, paddingHorizontal: 22,
    minHeight: 44, alignItems: 'center', justifyContent: 'center', marginVertical: 5,
  },
  text: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
