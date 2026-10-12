import { IMAGES } from './images';
import { Adventure } from './types';

export const ADVENTURES: Adventure[] = [
  {
    id: 'ultimate',
    title: 'Ultimate Adventure Day',
    short: 'Guided hike, ziplining, kayaking & lunch',
    description: 'A day of outdoor discovery, with guided activities and lunch included.',
    price: 1500,
    priceLabel: 'R1,500',
    category: 'Packages',
    image: IMAGES.ultimate,
    includes: [
      { icon: 'walk-outline', label: 'Guided hike' },
      { icon: 'flash-outline', label: 'Ziplining' },
      { icon: 'boat-outline', label: 'Kayaking' },
      { icon: 'restaurant-outline', label: 'Lunch included' },
    ],
  },
  {
    id: 'family',
    title: 'Family Explorer Package',
    short: 'Nature walks, obstacles, games & picnic area',
    description: 'Relaxed, safe fun for families with nature walks, obstacle courses, games and a picnic area.',
    price: 1500,
    priceLabel: 'R1,500',
    category: 'Packages',
    image: IMAGES.family,
    includes: [
      { icon: 'leaf-outline', label: 'Nature walks' },
      { icon: 'flag-outline', label: 'Obstacle courses' },
      { icon: 'game-controller-outline', label: 'Games' },
      { icon: 'cafe-outline', label: 'Picnic area' },
    ],
  },
  {
    id: 'team',
    title: 'Corporate Team Challenge',
    short: 'Obstacle courses, raft-building & leadership',
    description: 'Build confidence and trust together with team challenges, raft-building and leadership activities.',
    price: 1500,
    priceLabel: 'R1,500',
    category: 'Packages',
    image: IMAGES.team,
    includes: [
      { icon: 'flag-outline', label: 'Obstacle courses' },
      { icon: 'boat-outline', label: 'Raft-building' },
      { icon: 'people-outline', label: 'Leadership activities' },
    ],
  },
  {
    id: 'sessions',
    title: 'Individual Sessions',
    short: 'Ziplining, kayaking or rock climbing. Gear included.',
    description: 'Pick a single activity: ziplining, kayaking or rock climbing. All gear is included.',
    price: 750,
    priceLabel: 'R750 each',
    category: 'Sessions',
    image: IMAGES.sessions,
    includes: [
      { icon: 'flash-outline', label: 'Ziplining' },
      { icon: 'boat-outline', label: 'Kayaking' },
      { icon: 'trending-up-outline', label: 'Rock climbing' },
    ],
  },
  {
    id: 'mountain',
    title: 'Mountain Adventure Package',
    short: 'Ask our team for package details',
    description: 'A custom mountain experience. Contact our team to plan the route, length and group size.',
    price: null,
    priceLabel: 'Request pricing',
    category: 'Packages',
    image: IMAGES.mountain,
    includes: [
      { icon: 'trail-sign-outline', label: 'Custom route' },
      { icon: 'people-outline', label: 'Guided group' },
    ],
  },
];

export const DISCOUNTS = [
  { label: '1 booking', pct: 0 },
  { label: '2 bookings', pct: 5 },
  { label: '3 bookings', pct: 10 },
  { label: 'More than 3 bookings', pct: 15 },
];

export const discountFor = (count: number) =>
  count >= 4 ? 15 : count === 3 ? 10 : count === 2 ? 5 : 0;