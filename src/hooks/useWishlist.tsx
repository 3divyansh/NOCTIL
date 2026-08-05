import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getWatchById, type Watch } from '@/data/watches';

interface WishlistContextValue {
  items: Watch[];
  ids: Set<string>;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  moveToCart: (id: string, addToCart: (id: string, qty?: number) => void) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = 'noctil-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(new Set(JSON.parse(raw)));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  }, [ids]);

  const toggle = (id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const add = (id: string) => {
    setIds((prev) => new Set(prev).add(id));
  };

  const remove = (id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const moveToCart = (id: string, addToCart: (id: string, qty?: number) => void) => {
    addToCart(id, 1);
    remove(id);
  };

  const items = useMemo(
    () => [...ids].map((id) => getWatchById(id)).filter((w): w is Watch => !!w),
    [ids]
  );

  const value: WishlistContextValue = {
    items,
    ids,
    has: (id) => ids.has(id),
    toggle,
    add,
    remove,
    moveToCart,
    count: ids.size,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
