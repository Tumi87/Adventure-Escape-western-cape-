import { Adventure } from './types';

export const adventures: Adventure[] = [
  {
    id: 0, name: 'Ultimate Adventure Day', price: 1500, type: 'Package',
    image: require('../assets/climbing2.jpg'), imageAlt: 'Climber on a rock face above a forest',
    duration: 'Full day', summary: 'Hike, zip and paddle in one full day with qualified guides.',
    includes: ['Guided hiking trail', 'Ziplining', 'Kayaking'],
    venue: 'Table Mountain Cable Station car park, Cape Town',
  },
  {
    id: 1, name: 'Family Explorer Package', price: 1500, type: 'Package',
    image: require('../assets/team.jpg'), imageAlt: 'Group on a wooden obstacle course in the forest',
    duration: 'About 4 hours', summary: 'A relaxed outdoor morning that suits children and adults.',
    includes: ['Nature walk', 'Obstacle course', 'Picnic area'],
    venue: 'Kirstenbosch Gardens main gate, Cape Town',
  },
  {
    id: 2, name: 'Mountain Adventure Package', price: 1500, type: 'Package',
    image: require('../assets/hiking.jpg'), imageAlt: 'Hikers climbing a Table Mountain trail',
    duration: 'About 5 hours', summary: 'Climb above Cape Town with a guide and stop at the best viewpoints.',
    includes: ['Mountain hiking', 'Scenic viewpoints', 'Rock scrambling'],
    venue: 'Platteklip Gorge trailhead, Tafelberg Rd, Cape Town',
  },
  {
    id: 3, name: 'Corporate Team Challenge', price: 1500, type: 'Package',
    image: require('../assets/raft.jpg'), imageAlt: 'Team paddling a raft on a lake',
    duration: 'Full day', summary: 'Team-building challenges that reward communication and trust.',
    includes: ['Team obstacle course', 'Orienteering challenge', 'Raft-building activity'],
    venue: 'Silvermine Nature Reserve, Cape Town',
  },
  {
    id: 4, name: 'Ziplining Adventure', price: 750, type: 'Activity',
    image: require('../assets/climbing2.jpg'), imageAlt: 'Climber on a rock face above a forest',
    duration: 'About 2 hours', summary: 'Fly through the forest canopy after a full safety briefing.',
    includes: ['Safety briefing', 'Equipment hire', 'Professional instructors'],
    venue: 'Tokai Forest, Cape Town',
  },
  {
    id: 5, name: 'Kayaking Experience', price: 750, type: 'Activity',
    image: require('../assets/raft.jpg'), imageAlt: 'Team paddling a raft on a lake',
    duration: 'About 2 hours', summary: 'Paddle a guided route on calm water.',
    includes: ['Kayak and paddle', 'Safety equipment', 'Guided route'],
    venue: 'Hout Bay Harbour, Cape Town',
  },
  {
    id: 6, name: 'Rock Climbing Session', price: 750, type: 'Activity',
    image: require('../assets/climbing1.jpg'), imageAlt: 'Climbers on a steep rocky mountain face',
    duration: 'About 3 hours', summary: 'Learn to climb natural rock with a professional guide.',
    includes: ['Climbing equipment', 'Safety instruction', 'Professional guide'],
    venue: "Lion's Head trailhead, Cape Town",
  },
];

export const heroImage = require('../assets/hero.jpg');
export const teamImage = require('../assets/team.jpg');

export const business = {
  email: 'info@adventureescapesa.co.za',
  phone: '083 290 0700',
  phoneLink: 'tel:+27832900700',
  whatsapp: 'https://wa.me/27832900700',
  location: 'Cape Town, Western Cape',
  hours: 'Mon–Sat 07:00–17:00',
};

export const discountTable: [string, string][] = [
  ['One booking', 'No discount'],
  ['Two bookings', '5%'],
  ['Three bookings', '10%'],
  ['More than three', '15%'],
];
