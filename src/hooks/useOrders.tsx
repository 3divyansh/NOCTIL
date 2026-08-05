import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getWatchById, type Watch } from '@/data/watches';
import { formatPrice } from '@/constants';

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  watchId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  customerName: string;
  customerEmail: string;
}

interface OrdersContextValue {
  orders: Order[];
  addOrder: (data: Omit<Order, 'id' | 'date' | 'status'>) => string;
  cancelOrder: (id: string) => void;
  reorder: (id: string, addToCart: (id: string, qty?: number) => void) => void;
  getOrder: (id: string) => Order | undefined;
  count: number;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);
const STORAGE_KEY = 'noctil-orders';

const STATUSES: OrderStatus[] = ['processing', 'shipped', 'delivered'];

function genId(): string {
  return `NCT-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (data: Omit<Order, 'id' | 'date' | 'status'>): string => {
    const id = genId();
    const order: Order = {
      ...data,
      id,
      date: new Date().toISOString(),
      status: 'processing',
    };
    setOrders((prev) => [order, ...prev]);
    return id;
  };

  const cancelOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'cancelled' } : o))
    );
  };

  const reorder = (id: string, addToCart: (id: string, qty?: number) => void) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    order.items.forEach((item) => addToCart(item.watchId, item.quantity));
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  const value: OrdersContextValue = {
    orders,
    addOrder,
    cancelOrder,
    reorder,
    getOrder,
    count: orders.length,
  };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}

export { formatPrice };
