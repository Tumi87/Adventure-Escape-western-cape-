import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

const photos: { src: ImageSourcePropType; alt: string }[] = [
  { src: require('../../assets/hero.jpg'), alt: "View of Lion's Head and the sea from Table Mountain" },
  { src: require('../../assets/team.jpg'), alt: 'Group on a wooden obstacle course in the forest' },
  { src: require('../../assets/hiking.jpg'), alt: 'Hikers climbing a Table Mountain trail' },
  { src: require('../../assets/climbing1.jpg'), alt: 'Climbers on a steep rocky mountain face' },
  { src: require('../../assets/climbing2.jpg'), alt: 'Climber on a rock face above a forest' },
  { src: require('../../assets/raft.jpg'), alt: 'Team paddling a raft on a lake' },
];

export default function PhotoStrip({ height = 56 }: { height?: number }) {
  return (
    <View style={styles.row}>
      {photos.map(p => (
        <Image key={p.alt} source={p.src} style={{ flex: 1, height }} accessibilityLabel={p.alt} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 2, backgroundColor: '#fff' },
});
