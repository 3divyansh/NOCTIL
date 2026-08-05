import { useEffect, useState, useCallback } from 'react';

export type RouteName =
  | 'home'
  | 'shop'
  | 'product'
  | 'categories'
  | 'collections'
  | 'new-arrivals'
  | 'best-sellers'
  | 'about'
  | 'story'
  | 'contact'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'profile'
  | 'orders'
  | 'faq'
  | 'privacy'
  | 'terms';

export interface ParsedRoute {
  name: RouteName;
  param?: string;
}

function parseHash(): ParsedRoute {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { name: 'home' };

  const [path, ...rest] = raw.split('/');
  const param = rest.join('/') || undefined;

  const map: Record<string, RouteName> = {
    '': 'home',
    shop: 'shop',
    product: 'product',
    categories: 'categories',
    collections: 'collections',
    'new-arrivals': 'new-arrivals',
    'best-sellers': 'best-sellers',
    about: 'about',
    story: 'story',
    contact: 'contact',
    wishlist: 'wishlist',
    cart: 'cart',
    checkout: 'checkout',
    confirmation: 'confirmation',
    profile: 'profile',
    orders: 'orders',
    faq: 'faq',
    privacy: 'privacy',
    terms: 'terms',
  };

  return { name: map[path] ?? 'home', param };
}

export function useRoute(): [ParsedRoute, (name: RouteName, param?: string) => void] {
  const [route, setRoute] = useState<ParsedRoute>(parseHash);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((name: RouteName, param?: string) => {
    let hash = name === 'home' ? '' : `/${name}`;
    if (param) hash += `/${param}`;
    window.location.hash = hash;
  }, []);

  return [route, navigate];
}
