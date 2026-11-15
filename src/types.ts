import { ImageSourcePropType } from 'react-native';

export type ItemType = 'Package' | 'Activity';

export interface Adventure {
  id: number;
  name: string;
  price: number;
  type: ItemType;
  image: ImageSourcePropType;
  imageAlt: string;
  duration: string;
  summary: string;
  includes: string[];
  venue: string;
}

export interface Review {
  id: number;
  adventureId: number;
  author: string;
  rating: number;
  text: string;
}

export interface User {
  name: string;
  email: string;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export type Screen =
  | { name: 'splash' }
  | { name: 'login' }
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'overview'; query?: string }
  | { name: 'detail'; id: number }
  | { name: 'fees' }
  | { name: 'contact'; packageId?: number }
  | { name: 'payment' }
  | { name: 'quote' }
  | { name: 'reviews' }
  | { name: 'map'; venueId?: number }
  | { name: 'account' };

export type Navigate = (screen: Screen) => void;

export interface FeeResult {
  subtotal: number;
  discountPercent: number;
  discount: number;
  vat: number;
  total: number;
}

export type FormErrors<K extends string> = Partial<Record<K, string>>;
