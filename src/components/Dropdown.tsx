import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DropdownOption } from '../types';
import { colors } from '../theme';

interface Props {
  label: string;
  value: string | null;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function Dropdown({ label, value, options, onChange, placeholder = 'Choose...', error }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const selected = options.find(o => o.value === value);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.box, !!error && { borderColor: colors.error }]}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selected ? selected.label : placeholder}`}
      >
        <Text style={{ flex: 1, fontSize: 16, color: selected ? colors.ink : colors.muted }}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={{ color: colors.green, fontSize: 16 }}>▼</Text>
      </TouchableOpacity>
      {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <ScrollView>
              {options.map(o => {
                const on = o.value === value;
                return (
                  <TouchableOpacity
                    key={o.value}
                    style={[styles.option, on && { backgroundColor: colors.sand }]}
                    onPress={() => { onChange(o.value); setOpen(false); }}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                  >
                    <Text style={{ fontSize: 16, color: colors.ink, fontWeight: on ? '700' : '400' }}>{o.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '600', color: colors.ink, marginBottom: 4 },
  box: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: colors.border,
    borderRadius: 12, padding: 12, minHeight: 48,
  },
  error: { color: colors.error, fontSize: 13, marginTop: 3 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 24 },
  sheet: { backgroundColor: colors.white, borderRadius: 16, padding: 12, maxHeight: '65%' },
  sheetTitle: { fontSize: 17, fontWeight: '800', color: colors.green, padding: 8 },
  option: { paddingVertical: 14, paddingHorizontal: 12, borderRadius: 10, minHeight: 48, justifyContent: 'center' },
});
