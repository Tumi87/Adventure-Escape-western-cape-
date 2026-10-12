import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from 'expo-router/js-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { QuoteProvider } from './QuoteContext';
import { AppHeader } from './components/components';
import { C } from './theme';
import { RootStackParamList, TabParamList } from './types';

import AboutScreen from './screens/AboutScreen';
import AccountScreen from './screens/AccountScreen';
import AdventuresScreen from './screens/AdventuresScreen';
import ContactScreen from './screens/ContactScreen';
import FeesScreen from './screens/FeesScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';
import OverviewScreen from './screens/OverviewScreen';
import PaymentScreen from './screens/PaymentScreen';
import QuoteScreen from './screens/QuoteScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const header = (code: string) => ({ navigation }: any) => (
  <AppHeader code={code} navigation={navigation} />
);

const ICONS: Record<keyof TabParamList, string> = {
  Home: 'home-outline',
  Adventures: 'compass-outline',
  Quote: 'document-text-outline',
  Account: 'person-outline',
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: C.orange,
        tabBarInactiveTintColor: C.muted,
        tabBarStyle: { backgroundColor: C.card, borderTopColor: C.border },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name] as any} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ header: header('02 / HOME') }} />
      <Tab.Screen name="Adventures" component={AdventuresScreen} options={{ header: header('12 / ADVENTURES') }} />
      <Tab.Screen name="Quote" component={QuoteScreen} options={{ header: header('11 / QUOTE') }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ header: header('08 / ACCOUNT') }} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <SafeAreaProvider>
      <QuoteProvider>
        <NavigationIndependentTree>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ animation: 'fade' }}>
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ header: header('01 / LOGIN') }} />
              <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
              <Stack.Screen name="Overview" component={OverviewScreen} options={{ header: header('03 / OVERVIEW') }} />
              <Stack.Screen name="About" component={AboutScreen} options={{ header: header('04 / ABOUT') }} />
              <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ header: header('05 / REVIEWS') }} />
              <Stack.Screen name="Payment" component={PaymentScreen} options={{ header: header('06 / PAYMENT') }} />
              <Stack.Screen name="Map" component={MapScreen} options={{ header: header('09 / MAP') }} />
              <Stack.Screen name="Fees" component={FeesScreen} options={{ header: header('10 / FEES') }} />
              <Stack.Screen name="Contact" component={ContactScreen} options={{ header: header('07 / CONTACT') }} />
            </Stack.Navigator>
          </NavigationContainer>
        </NavigationIndependentTree>
      </QuoteProvider>
    </SafeAreaProvider>
  );
}