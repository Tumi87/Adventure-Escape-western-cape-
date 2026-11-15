import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function Field({ label, error, style, ...rest }: Props) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !!error && { borderColor: colors.error }, style]}
        accessibilityLabel={label}
        {...rest}
      />
      {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '600', color: colors.ink, marginBottom: 4 },
  input: {
    borderWidth: 2, borderColor: colors.border, borderRadius: 12, padding: 12, fontSize: 16, color: colors.ink,
  },
  error: { color: colors.error, fontSize: 13, marginTop: 3 },
});
