export interface Testimonial {
  id: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  quote: string;
  watch: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Alexander Voss',
    title: 'Collector',
    location: 'Geneva, Switzerland',
    rating: 5,
    quote:
      'The Obsidian Tourbillon is unlike anything in my collection of forty-two. The way light disappears into that case — it feels like wearing a piece of the night sky.',
    watch: 'Obsidian Tourbillon',
    avatar: 'https://images.pexels.com/photos/8327756/pexels-photo-8327756.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't2',
    name: 'Isabella Moreau',
    title: 'Creative Director',
    location: 'Paris, France',
    rating: 5,
    quote:
      'I have owned watches from every major maison. The Meridian Platinum is the first that made me forget the others existed. Pure, quiet, perfect.',
    watch: 'Meridian Platinum',
    avatar: 'https://images.pexels.com/photos/8327816/pexels-photo-8327816.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't3',
    name: 'Kenji Nakamura',
    title: 'Architect',
    location: 'Tokyo, Japan',
    rating: 5,
    quote:
      'The Phantom Carbon weighs less than a fountain pen. I forget I am wearing it until someone asks. The skeletonized movement is a conversation at every meeting.',
    watch: 'Phantom Carbon Sport',
    avatar: 'https://images.pexels.com/photos/8327839/pexels-photo-8327839.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't4',
    name: 'Sophia Al-Rashid',
    title: 'Gallery Owner',
    location: 'Dubai, UAE',
    rating: 5,
    quote:
      'The Solene Gold Luxe is the only piece I wear to openings. Diamonds that catch every light, a movement that never misses. It is art that keeps time.',
    watch: 'Solene Gold Luxe',
    avatar: 'https://images.pexels.com/photos/8327838/pexels-photo-8327838.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't5',
    name: 'Marcus Lindqvist',
    title: 'Yacht Captain',
    location: 'Monaco',
    rating: 5,
    quote:
      'I have taken the Monolith Deep Diver to 400 meters. The lume held. The crown held. Everything held. This is a serious instrument in a beautiful body.',
    watch: 'Monolith Deep Diver',
    avatar: 'https://images.pexels.com/photos/8327837/pexels-photo-8327837.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't6',
    name: 'Elena Castellano',
    title: 'Vintner',
    location: 'Tuscany, Italy',
    rating: 5,
    quote:
      'The Aurum Royal Chronograph arrived in a box more beautiful than jewelry. The guilloché dial changes with every hour of Tuscan light. A lifetime piece.',
    watch: 'Aurum Royal Chronograph',
    avatar: 'https://images.pexels.com/photos/8327835/pexels-photo-8327835.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];
