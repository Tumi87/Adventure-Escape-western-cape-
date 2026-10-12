import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { Btn, Card, Row, Screen } from '../components/components';
import { IMAGES } from '../images';
import { C } from '../theme';

export default function AboutScreen() {
  const nav = useNavigation<any>();
  return (
    <Screen title="About Us" subtitle="Rooted in the Cape. Built for shared adventures.">
      <Image source={IMAGES.hero} style={{ width: '100%', height: 150, borderRadius: 10 }} />
      <Text style={{ fontSize: 20, fontWeight: '800', color: C.green }}>A love for the outdoors.</Text>
      <Text style={{ color: C.text }}>
        Founded in 2024 by Liam Daniels, Adventure Escape SA is an outdoor adventure and eco-tourism
        business in Cape Town, Western Cape.
      </Text>
      <Text style={{ color: C.text }}>
        We bring individuals, families, schools, tourists, sports clubs and corporate teams closer to nature.
      </Text>
      <Card style={{ backgroundColor: C.mint }}>
        <Text style={{ color: C.orange, fontWeight: '800', fontSize: 12 }}>Our mission</Text>
        <Text style={{ color: C.text }}>
          To connect people with nature through safe, thrilling, and accessible outdoor activities that
          foster teamwork, confidence, and lasting memories.
        </Text>
      </Card>
      <View>
        <Row left="Guidance" right="Safety-certified" />
        <Row left="Who can join?" right="All ages & fitness levels" />
      </View>
      <Btn label="Find your adventure" onPress={() => nav.navigate('Adventures')} />
    </Screen>
  );
}