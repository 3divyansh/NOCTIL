import type { WatchCategory } from './watches';

export interface Category {
  id: WatchCategory;
  name: string;
  tagline: string;
  description: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: 'tourbillon',
    name: 'Tourbillon',
    tagline: 'The Pinnacle of Haute Horlogerie',
    description:
      'Gravity-defying cages hand-assembled by a single master watchmaker. The apex of mechanical artistry.',
    image:
      'https://images.pexels.com/photos/33750524/pexels-photo-33750524.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 3,
  },
  {
    id: 'chronograph',
    name: 'Chronograph',
    tagline: 'Precision in Motion',
    description:
      'Column-wheel mechanisms that measure time to the eighth of a second. Engineered for those who race.',
    image:
      'https://images.pexels.com/photos/33423913/pexels-photo-33423913.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 4,
  },
  {
    id: 'diver',
    name: 'Diver',
    tagline: 'Built for the Abyss',
    description:
      'Pressure-tested beyond the depths a human can reach. Luminous, monolithic, and unbreakable.',
    image:
      'https://images.pexels.com/photos/2373730/pexels-photo-2373730.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 3,
  },
  {
    id: 'dress',
    name: 'Dress',
    tagline: 'Quiet Authority',
    description:
      'Two hands, a perfect dial, and the rarest metals on earth. Restraint as a design philosophy.',
    image:
      'https://images.pexels.com/photos/16093252/pexels-photo-16093252.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 4,
  },
  {
    id: 'sport',
    name: 'Sport',
    tagline: 'Featherweight Strength',
    description:
      'Carbon, titanium, and ceramic — engineered for motion without sacrificing elegance.',
    image:
      'https://images.pexels.com/photos/20527951/pexels-photo-20527951.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 3,
  },
];
