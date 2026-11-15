import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from './src/components/BottomNav';
import Header from './src/components/Header';
import PhotoStrip from './src/components/PhotoStrip';
import { QuoteProvider } from './src/context/QuoteContext';
import AboutScreen from './src/screens/AboutScreen';
import AccountScreen from './src/screens/AccountScreen';
import ContactScreen from './src/screens/ContactScreen';
import DetailScreen from './src/screens/DetailScreen';
import FeesScreen from './src/screens/FeesScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import MapScreen from './src/screens/MapScreen';
import OverviewScreen from './src/screens/OverviewScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import QuoteScreen from './src/screens/QuoteScreen';
import ReviewsScreen from './src/screens/ReviewsScreen';
import SplashScreen from './src/screens/SplashScreen';
import { Navigate, Screen } from './src/types';

const TABS: Screen['name'][] = ['home', 'about', 'overview', 'fees', 'contact'];

function renderScreen(screen: Screen, go: Navigate): React.ReactElement {
  switch (screen.name) {
    case 'splash': return <SplashScreen go={go} />;
    case 'login': return <LoginScreen go={go} />;
    case 'home': return <HomeScreen go={go} />;
    case 'about': return <AboutScreen />;
    case 'overview': return <OverviewScreen go={go} initialQuery={screen.query} />;
    case 'detail': return <DetailScreen id={screen.id} go={go} />;
    case 'fees': return <FeesScreen go={go} />;
    case 'contact': return <ContactScreen go={go} packageId={screen.packageId} />;
    case 'payment': return <PaymentScreen go={go} />;
    case 'quote': return <QuoteScreen go={go} />;
    case 'reviews': return <ReviewsScreen />;
    case 'map': return <MapScreen venueId={screen.venueId} />;
    case 'account': return <AccountScreen go={go} />;
  }
}

export default function App() {
  const [history, setHistory] = useState<Screen[]>([{ name: 'splash' }]);
  const screen = history[history.length - 1];

  // Tab screens reset the history; every other screen is pushed so Back works.
  const go: Navigate = useCallback((next: Screen) => {
    const isBooking = next.name === 'contact' && next.packageId !== undefined;
    const reset = TABS.includes(next.name) && !isBooking;
    setHistory(h => (reset ? [next] : [...h, next]));
  }, []);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (history.length > 1) {
        setHistory(h => h.slice(0, -1));
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [history]);

  const splash = screen.name === 'splash';
  const login = screen.name === 'login';

  return (
    <SafeAreaProvider>
      <QuoteProvider>
        <SafeAreaView style={[styles.root, splash && { backgroundColor: '#2D5A3D' }]}>
          <StatusBar style={splash ? 'light' : 'dark'} />
          {!splash && !login && <Header go={go} />}
          {!splash && <PhotoStrip />}
          <View key={history.length} style={{ flex: 1 }}>{renderScreen(screen, go)}</View>
          {!splash && !login && <BottomNav current={screen.name} go={go} />}
        </SafeAreaView>
      </QuoteProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
});
