import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getWatchById, type Watch } from '@/data/watches';

export interface CartItem {
  watch: Watch;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  addItem: (watchId: string, quantity?: number) => void;
  removeItem: (watchId: string) => void;
  updateQuantity: (watchId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'noctil-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids: { id: string; quantity: number }[] = JSON.parse(raw);
        const restored: CartItem[] = ids
          .map(({ id, quantity }) => {
            const watch = getWatchById(id);
            return watch ? { watch, quantity } : null;
          })
          .filter((x): x is CartItem => x !== null);
        setItems(restored);
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    const minimal = items.map((i) => ({ id: i.watch.id, quantity: i.quantity }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
  }, [items]);

  const addItem = (watchId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.watch.id === watchId);
      if (existing) {
        return prev.map((i) =>
          i.watch.id === watchId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      const watch = getWatchById(watchId);
      return watch ? [...prev, { watch, quantity }] : prev;
    });
    setIsOpen(true);
  };

  const removeItem = (watchId: string) => {
    setItems((prev) => prev.filter((i) => i.watch.id !== watchId));
  };

  const updateQuantity = (watchId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(watchId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.watch.id === watchId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const total = useMemo(
    () => items.reduce((s, i) => s + i.watch.price * i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    count,
    total,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
