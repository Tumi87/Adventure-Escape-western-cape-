import { ImageSourcePropType } from 'react-native';

export type Adventure = {
  id: string;
  title: string;
  short: string;
  description: string;
  price: number | null;
  priceLabel: string;
  category: 'Packages' | 'Sessions';
  image: ImageSourcePropType;
  includes: { icon: string; label: string }[];
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Main: undefined;
  Overview: { id: string };
  About: undefined;
  Reviews: undefined;
  Payment: undefined;
  Map: undefined;
  Fees: undefined;
  Contact: undefined;
};

export type TabParamList = {
  Home: undefined;
  Adventures: undefined;
  Quote: undefined;
  Account: undefined;
};