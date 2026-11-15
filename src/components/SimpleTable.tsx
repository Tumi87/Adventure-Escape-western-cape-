import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

interface Props {
  header?: [string, string];
  rows: [string, string][];
}

export default function SimpleTable({ header, rows }: Props) {
  return (
    <View style={styles.table}>
      {header && (
        <View style={[styles.row, { backgroundColor: colors.green }]}>
          <Text style={[styles.cell, styles.head]}>{header[0]}</Text>
          <Text style={[styles.cell, styles.head]}>{header[1]}</Text>
        </View>
      )}
      {rows.map(([a, b]) => (
        <View key={a} style={styles.row}>
          <Text style={styles.cell}>{a}</Text>
          <Text style={styles.cell}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: { borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.border },
  cell: { flex: 1, padding: 10, fontSize: 14, color: colors.ink },
  head: { color: colors.white, fontWeight: '700' },
});
