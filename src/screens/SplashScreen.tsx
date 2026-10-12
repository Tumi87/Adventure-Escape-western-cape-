import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Btn } from '../components/components';
import { IMAGES } from '../images';
import { C } from '../theme';

export default function SplashScreen() {
  const nav = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: C.green }}>
      <SafeAreaView style={{ alignItems: 'center', paddingVertical: 24, gap: 6 }}>
        <Image source={IMAGES.logo} style={{ width: 84, height: 84, borderRadius: 42 }} />
        <Text style={{ color: C.white, fontSize: 20, fontWeight: '800', textAlign: 'center' }}>
          ADVENTURE{'\n'}ESCAPE SA
        </Text>
        <Text style={{ color: '#B9C9BC', fontSize: 11 }}>CAPE TOWN, WESTERN CAPE</Text>
      </SafeAreaView>

      <Image source={IMAGES.hero} style={{ width: '100%', flex: 1 }} resizeMode="cover" />

      <SafeAreaView edges={['bottom']} style={{ padding: 20, gap: 12 }}>
        <Text style={{ color: C.white, fontSize: 26, fontWeight: '800' }}>
          Find your next great escape.
        </Text>
        <Text style={{ color: '#D5DFD6' }}>
          Guided outdoor adventures. Shared memories. A little closer to nature.
        </Text>
        <Btn label="Explore adventures" onPress={() => nav.replace('Main')} />
        <Pressable onPress={() => nav.navigate('Login')}>
          <Text style={{ color: '#D5DFD6', textAlign: 'center', fontSize: 13 }}>
            Already have an account? Log in
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}