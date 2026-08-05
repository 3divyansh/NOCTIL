export type WatchCategory =
  | 'sport'
  | 'dress'
  | 'diver'
  | 'chronograph'
  | 'tourbillon';

export interface WatchSpec {
  movement: string;
  powerReserve: string;
  waterResistance: string;
  caseMaterial: string;
  caseDiameter: string;
  crystal: string;
  strap: string;
  weight: string;
}

export interface Watch {
  id: string;
  name: string;
  collection: string;
  category: WatchCategory;
  price: number;
  currency: string;
  image: string;
  gallery: string[];
  color: string;
  badge?: 'new' | 'bestseller' | 'limited' | 'editor';
  rating: number;
  reviews: number;
  description: string;
  spec: WatchSpec;
  featured?: boolean;
}

export const watches: Watch[] = [
  {
    id: 'noctil-obsidian-tourbillon',
    name: 'Obsidian Tourbillon',
    collection: 'Noir Maître',
    category: 'tourbillon',
    price: 184500,
    currency: 'USD',
    image:
      'https://cdn3.ethoswatches.com/the-watch-guide/wp-content/uploads/2021/03/Girard-Perregaux-Aston-Martin-Collab-collaboration-brand-partners-association-luxury-cars-watches-sportscar-racing-Formular-one-team-SPECIAL-3.jpg',
    gallery: [
      'https://cdn3.ethoswatches.com/the-watch-guide/wp-content/uploads/2021/03/Girard-Perregaux-Aston-Martin-Collab-collaboration-brand-partners-association-luxury-cars-watches-sportscar-racing-Formular-one-team-SPECIAL-3.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8T7XS6ZasZpoO8OS_2sr_lIQWUmI6eCK7DEF3U7HLKdF3c61TSj6AYt8&s=10',
      'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Bugatti_Ceramique_Edition_One_and_Bugatti_Divo_drdNBC.jpg',
    ],
    color: 'Obsidian Black',
    badge: 'limited',
    rating: 5.0,
    reviews: 12,
    description:
      'A flying tourbillon suspended in a forged carbon monocoque — 142 hours of autonomy housed in the darkest case we have ever machined.',
    spec: {
      movement: 'Manual winding tourbillon, Caliber NT-01',
      powerReserve: '142 hours',
      waterResistance: '50m',
      caseMaterial: 'Forged carbon & black DLC titanium',
      caseDiameter: '42mm',
      crystal: 'Anti-reflective sapphire',
      strap: 'F1-grade rubber & titanium clasp',
      weight: '58g',
    },
    featured: true,
  },
  {
    id: 'aurum-royal-chronograph',
    name: 'Aurum Royal Chronograph',
    collection: 'Aurum',
    category: 'chronograph',
    price: 92400,
    currency: 'USD',
    image:
      'https://images.pexels.com/photos/28135838/pexels-photo-28135838.jpeg?auto=compress&cs=tinysrgb&w=1400',
    gallery: [
      'https://images.pexels.com/photos/28135838/pexels-photo-28135838.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/35463236/pexels-photo-35463236.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/3809175/pexels-photo-3809175.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
    color: 'Royal Gold',
    badge: 'bestseller',
    rating: 4.9,
    reviews: 87,
    description:
      '18kt rose gold case with a hand-guilloché dial. A column-wheel chronograph dressed in the warm tones of sunset.',
    spec: {
      movement: 'Automatic chronograph, Caliber AR-308',
      powerReserve: '72 hours',
      waterResistance: '100m',
      caseMaterial: '18kt rose gold',
      caseDiameter: '41mm',
      crystal: 'Box sapphire, anti-reflective',
      strap: 'Alligator with gold pin buckle',
      weight: '142g',
    },
    featured: true,
  },
  {
    id: 'monolith-deep-diver',
    name: 'Monolith Deep Diver',
    collection: 'Abyss',
    category: 'diver',
    price: 38900,
    currency: 'USD',
    image:
      'https://images.pexels.com/photos/2373730/pexels-photo-2373730.jpeg?auto=compress&cs=tinysrgb&w=1400',
    gallery: [
      'https://images.pexels.com/photos/2373730/pexels-photo-2373730.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/8091862/pexels-photo-8091862.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/16739807/pexels-photo-16739807.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
    color: 'Abyss Black',
    badge: 'new',
    rating: 4.8,
    reviews: 54,
    description:
      'A 1,000m saturation diver with a monobloc titanium case and a helium escape valve. Built for the dark.',
    spec: {
      movement: 'Automatic, Caliber AB-5000',
      powerReserve: '80 hours',
      waterResistance: '1000m',
      caseMaterial: 'Grade 5 titanium',
      caseDiameter: '44mm',
      crystal: 'Domed sapphire, 4.2mm thick',
      strap: 'Integrated titanium bracelet',
      weight: '128g',
    },
    featured: true,
  },
  {
    id: 'meridian-platinum-dress',
    name: 'Meridian Platinum',
    collection: 'Meridian',
    category: 'dress',
    price: 67200,
    currency: 'USD',
    image:
      'https://images.pexels.com/photos/16093252/pexels-photo-16093252.jpeg?auto=compress&cs=tinysrgb&w=1400',
    gallery: [
      'https://images.pexels.com/photos/16093252/pexels-photo-16093252.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/5404641/pexels-photo-5404641.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/14509619/pexels-photo-14509619.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
    color: 'Platinum Silver',
    badge: 'editor',
    rating: 4.9,
    reviews: 33,
    description:
      'A two-hand dress watch in 950 platinum with an enamel dial. Restraint rendered in the rarest metal on earth.',
    spec: {
      movement: 'Manual winding, Caliber MR-02',
      powerReserve: '96 hours',
      waterResistance: '30m',
      caseMaterial: '950 platinum',
      caseDiameter: '39mm',
      crystal: 'Box sapphire',
      strap: 'Black alligator, platinum buckle',
      weight: '98g',
    },
  },
  {
    id: 'phantom-carbon-sport',
    name: 'Phantom Carbon Sport',
    collection: 'Phantom',
    category: 'sport',
    price: 45600,
    currency: 'USD',
    image:
      'https://images.pexels.com/photos/20527951/pexels-photo-20527951.jpeg?auto=compress&cs=tinysrgb&w=1400',
    gallery: [
      'https://images.pexels.com/photos/20527951/pexels-photo-20527951.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/16739804/pexels-photo-16739804.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/25682459/pexels-photo-25682459.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
    color: 'Phantom Carbon',
    badge: 'new',
    rating: 4.7,
    reviews: 41,
    description:
      'A featherweight sport watch in layered carbon fiber with a skeletonized movement visible from both sides.',
    spec: {
      movement: 'Automatic skeleton, Caliber PH-7',
      powerReserve: '65 hours',
      waterResistance: '100m',
      caseMaterial: 'Layered carbon fiber & titanium',
      caseDiameter: '43mm',
      crystal: 'Sapphire, both sides',
      strap: 'Carbon-embossed rubber',
      weight: '62g',
    },
  },
  {
    id: 'solene-gold-luxe',
    name: 'Solene Gold Luxe',
    collection: 'Solene',
    category: 'dress',
    price: 78900,
    currency: 'USD',
    image:
      'https://images.pexels.com/photos/9203638/pexels-photo-9203638.jpeg?auto=compress&cs=tinysrgb&w=1400',
    gallery: [
      'https://images.pexels.com/photos/9203638/pexels-photo-9203638.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/32040833/pexels-photo-32040833.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/33889654/pexels-photo-33889654.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
    color: 'Champagne Gold',
    badge: 'bestseller',
    rating: 5.0,
    reviews: 64,
    description:
      'A diamond-set bezel framing a champagne sunburst dial. The Solene is jewelry that keeps perfect time.',
    spec: {
      movement: 'Automatic, Caliber SL-12',
      powerReserve: '70 hours',
      waterResistance: '50m',
      caseMaterial: '18kt yellow gold, 48 diamonds',
      caseDiameter: '36mm',
      crystal: 'Anti-reflective sapphire',
      strap: 'Gold bracelet, polished & brushed',
      weight: '110g',
    },
  },
  {
    id: 'vantage-steel-chrono',
    name: 'Vantage Steel Chrono',
    collection: 'Vantage',
    category: 'chronograph',
    price: 28400,
    currency: 'USD',
    image:
      'https://images.pexels.com/photos/33423913/pexels-photo-33423913.jpeg?auto=compress&cs=tinysrgb&w=1400',
    gallery: [
      'https://images.pexels.com/photos/33423913/pexels-photo-33423913.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/33423909/pexels-photo-33423909.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/34894931/pexels-photo-34894931.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
    color: 'Steel & Crimson',
    badge: 'editor',
    rating: 4.8,
    reviews: 72,
    description:
      'A stainless steel chronograph with a crimson bezel and panda sub-dials. The everyday companion for the driven.',
    spec: {
      movement: 'Automatic chronograph, Caliber VG-22',
      powerReserve: '60 hours',
      waterResistance: '200m',
      caseMaterial: '904L stainless steel',
      caseDiameter: '40mm',
      crystal: 'Sapphire, anti-reflective',
      strap: 'Steel bracelet, brushed',
      weight: '135g',
    },
  },
  {
    id: 'eclipse-ceramic-diver',
    name: 'Eclipse Ceramic Diver',
    collection: 'Eclipse',
    category: 'diver',
    price: 31200,
    currency: 'USD',
    image:
      'https://images.pexels.com/photos/8091862/pexels-photo-8091862.jpeg?auto=compress&cs=tinysrgb&w=1400',
    gallery: [
      'https://images.pexels.com/photos/8091862/pexels-photo-8091862.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/2373730/pexels-photo-2373730.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/16739807/pexels-photo-16739807.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
    color: 'Eclipse Black',
    rating: 4.9,
    reviews: 58,
    description:
      'A scratch-proof ceramic bezel over a 300m titanium case. Lume that burns through the longest night.',
    spec: {
      movement: 'Automatic, Caliber EC-3',
      powerReserve: '75 hours',
      waterResistance: '300m',
      caseMaterial: 'Titanium & black ceramic',
      caseDiameter: '42mm',
      crystal: 'Sapphire',
      strap: 'FKM rubber, titanium buckle',
      weight: '88g',
    },
  },
];

export const getWatchById = (id: string): Watch | undefined =>
  watches.find((w) => w.id === id);

export const getFeaturedWatches = (): Watch[] =>
  watches.filter((w) => w.featured);

export const getNewArrivals = (): Watch[] =>
  watches.filter((w) => w.badge === 'new');

export const getBestSellers = (): Watch[] =>
  watches.filter((w) => w.badge === 'bestseller');

export const getEditorsPicks = (): Watch[] =>
  watches.filter((w) => w.badge === 'editor');
