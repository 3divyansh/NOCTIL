export const BRAND = {
  name: 'NOCTIL',
  tagline: 'Haute Horlogerie',
  established: 'MCMXCVIII',
  email: 'private@noctil.watches',
  phone: '+41 22 000 0000',
  address: 'Rue du Rhône 1, 1204 Genève, Switzerland',
} as const;

export interface NavLink {
  label: string;
  route: string;
  param?: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Collections', route: 'collections' },
  { label: 'New Arrivals', route: 'new-arrivals' },
  { label: 'Best Sellers', route: 'best-sellers' },
  { label: 'Categories', route: 'categories' },
  { label: 'Maison', route: 'about' },
  { label: 'Contact', route: 'contact' },
];

export const SHOP_LINKS: NavLink[] = [
  { label: 'All Watches', route: 'shop' },
  { label: 'New Arrivals', route: 'new-arrivals' },
  { label: 'Best Sellers', route: 'best-sellers' },
  { label: 'Collections', route: 'collections' },
  { label: 'Categories', route: 'categories' },
];

export const MAISON_LINKS: NavLink[] = [
  { label: 'About Us', route: 'about' },
  { label: 'Our Story', route: 'story' },
  { label: 'Contact Us', route: 'contact' },
  { label: 'FAQ', route: 'faq' },
];

export const ACCOUNT_LINKS: NavLink[] = [
  { label: 'My Profile', route: 'profile' },
  { label: 'My Orders', route: 'orders' },
  { label: 'Wishlist', route: 'wishlist' },
  { label: 'Cart', route: 'cart' },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', route: 'privacy' },
  { label: 'Terms & Conditions', route: 'terms' },
  { label: 'FAQ', route: 'faq' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Pinterest', href: '#' },
  { label: 'LinkedIn', href: '#' },
] as const;

export const INSTAGRAM_IMAGES = [
  'https://images.pexels.com/photos/33750524/pexels-photo-33750524.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/28135838/pexels-photo-28135838.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2373730/pexels-photo-2373730.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/16093252/pexels-photo-16093252.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/20527951/pexels-photo-20527951.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/9203638/pexels-photo-9203638.jpeg?auto=compress&cs=tinysrgb&w=600',
] as const;

export const STORY_IMAGES = {
  hero: 'https://images.pexels.com/photos/8327524/pexels-photo-8327524.jpeg?auto=compress&cs=tinysrgb&w=1600',
  craft: 'https://images.pexels.com/photos/8327977/pexels-photo-8327977.jpeg?auto=compress&cs=tinysrgb&w=1200',
  detail: 'https://images.pexels.com/photos/8327872/pexels-photo-8327872.jpeg?auto=compress&cs=tinysrgb&w=1200',
} as const;

export const formatPrice = (price: number, currency = 'USD'): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);

export const FAQ_ITEMS = [
  {
    q: 'How long is the warranty on a NOCTIL timepiece?',
    a: 'Every NOCTIL watch carries a lifetime warranty on the movement and a five-year warranty on the case and crystal. Our global service network covers all repairs.',
  },
  {
    q: 'How often should I service my watch?',
    a: 'We recommend a full service every five to seven years, depending on the caliber. Our Geneva atelier performs all servicing in-house.',
  },
  {
    q: 'Are NOCTIL watches water resistant?',
    a: 'Water resistance varies by model, from 30m on dress pieces to 1,000m on the Monolith Deep Diver. Each watch is pressure-tested to 120% of its rated depth.',
  },
  {
    q: 'Can I customize my timepiece?',
    a: 'Our Private Commission program allows bespoke dial colors, case materials, and engravings. Contact our concierge to begin the process.',
  },
  {
    q: 'What is the delivery time?',
    a: 'In-stock pieces ship within three business days via insured worldwide courier. Private commissions require twelve to eighteen months.',
  },
  {
    q: 'What is your return policy?',
    a: 'Unworn watches may be returned within thirty days for a full refund. Customized pieces are non-returnable.',
  },
  {
    q: 'Do you offer financing?',
    a: 'We partner with select private banks to offer installment plans on pieces above $25,000. Inquire at checkout for details.',
  },
  {
    q: 'How can I authenticate my watch?',
    a: 'Every NOCTIL includes a unique serial number, a blockchain-verified digital certificate, and a hand-signed certificate of origin from the master watchmaker.',
  },
] as const;
