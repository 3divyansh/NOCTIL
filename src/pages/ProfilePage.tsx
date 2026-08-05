import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  User, Package, Heart, ShoppingBag, Settings, LogOut, Plus, Trash2,
  Edit3, MapPin, Check, Bell, Lock, Mail, Phone, Calendar, ArrowRight,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { useProfile, type Address } from '@/hooks/useProfile';
import { useOrders, type Order, type OrderStatus } from '@/hooks/useOrders';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useRoute } from '@/hooks/useRoute';
import { formatPrice } from '@/constants';
import { cn } from '@/utils/cn';

type Tab = 'profile' | 'orders' | 'cart' | 'wishlist' | 'settings';

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'cart', label: 'My Cart', icon: ShoppingBag },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  processing: 'bg-amber-50 text-amber-700 border-amber-200',
  shipped: 'bg-blue-50 text-blue-700 border-blue-200',
  delivered: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export function ProfilePage() {
  const [tab, setTab] = useState<Tab>('profile');
  const { profile, updateProfile, addAddress, removeAddress, setDefaultAddress, updateNotifications } = useProfile();
  const { orders, cancelOrder, reorder } = useOrders();
  const { items: cartItems, total: cartTotal, count: cartCount, updateQuantity, removeItem, clearCart } = useCart();
  const { items: wishlistItems, remove: removeWishlist, moveToCart, count: wishlistCount } = useWishlist();
  const { addItem } = useCart();
  const [, navigate] = useRoute();

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="My Account"
        title={<>Welcome, <span className="italic text-gradient-gold">{profile.name.split(' ')[0]}.</span></>}
        description="Manage your profile, orders, wishlist, and account settings."
        breadcrumbs={[{ label: 'Profile' }]}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-1 rounded-2xl glass p-4">
              {/* Avatar */}
              <div className="mb-4 flex items-center gap-3 border-b border-ink/8 pb-4">
                <div className="h-14 w-14 overflow-hidden rounded-full">
                  <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="block truncate font-display text-lg text-ink">{profile.name}</span>
                  <span className="block truncate text-[10px] text-ink-muted">{profile.email}</span>
                </div>
              </div>

              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors',
                    tab === t.id ? 'bg-ink text-ivory' : 'text-ink-soft hover:bg-ink/5'
                  )}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                  {t.id === 'cart' && cartCount > 0 && (
                    <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold text-ivory">{cartCount}</span>
                  )}
                  {t.id === 'wishlist' && wishlistCount > 0 && (
                    <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold text-ivory">{wishlistCount}</span>
                  )}
                  {t.id === 'orders' && orders.length > 0 && (
                    <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold text-ivory">{orders.length}</span>
                  )}
                </button>
              ))}

              <button
                onClick={() => navigate('home')}
                className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tab === 'profile' && <ProfileTab profile={profile} onUpdate={updateProfile} />}
                {tab === 'orders' && <OrdersTab orders={orders} onCancel={cancelOrder} onReorder={(id) => reorder(id, addItem)} />}
                {tab === 'cart' && (
                  <CartTab
                    items={cartItems}
                    total={cartTotal}
                    count={cartCount}
                    onUpdateQty={updateQuantity}
                    onRemove={removeItem}
                    onClear={clearCart}
                    onCheckout={() => navigate('checkout')}
                    onBrowse={() => navigate('shop')}
                  />
                )}
                {tab === 'wishlist' && (
                  <WishlistTab
                    items={wishlistItems}
                    onRemove={removeWishlist}
                    onMoveToCart={(id) => moveToCart(id, addItem)}
                    onView={() => navigate('wishlist')}
                  />
                )}
                {tab === 'settings' && (
                  <SettingsTab
                    profile={profile}
                    onUpdateProfile={updateProfile}
                    onAddAddress={addAddress}
                    onRemoveAddress={removeAddress}
                    onSetDefault={setDefaultAddress}
                    onUpdateNotifications={updateNotifications}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Profile Tab ---------- */
function ProfileTab({ profile, onUpdate }: { profile: ReturnType<typeof useProfile>['profile']; onUpdate: (d: Partial<typeof profile>) => void }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  function save() {
    onUpdate({ name: form.name, email: form.email, phone: form.phone, dateOfBirth: form.dateOfBirth });
    setEditing(false);
  }

  const fields = [
    { icon: User, label: 'Full Name', key: 'name', value: form.name },
    { icon: Mail, label: 'Email', key: 'email', value: form.email },
    { icon: Phone, label: 'Phone', key: 'phone', value: form.phone },
    { icon: Calendar, label: 'Date of Birth', key: 'dateOfBirth', value: form.dateOfBirth, type: 'date' },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-light text-ink">Profile Information</h2>
        <button
          onClick={() => (editing ? save() : setEditing(true))}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-[10px] tracking-luxe-sm uppercase text-ink-soft hover:border-gold hover:text-gold transition-colors"
        >
          <Edit3 className="h-3.5 w-3.5" />
          {editing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-6 rounded-2xl glass p-6">
        <div className="h-24 w-24 overflow-hidden rounded-full">
          <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h3 className="font-display text-2xl text-ink">{profile.name}</h3>
          <p className="text-sm text-ink-muted">{profile.email}</p>
          <p className="mt-1 text-[10px] tracking-luxe-sm uppercase text-gold">Member since 2024</p>
        </div>
      </div>

      {/* Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className="rounded-2xl glass p-5">
            <span className="flex items-center gap-2 text-[10px] tracking-luxe-sm uppercase text-ink-muted">
              <f.icon className="h-3.5 w-3.5" /> {f.label}
            </span>
            {editing ? (
              <input
                type={('type' in f && f.type) || 'text'}
                value={f.value}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="mt-2 w-full border-b border-ink/10 bg-transparent pb-1 text-sm text-ink focus:border-gold focus:outline-none"
              />
            ) : (
              <p className="mt-2 text-sm text-ink-soft">{f.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Addresses */}
      <div>
        <h3 className="mb-4 font-display text-xl font-light text-ink">Saved Addresses</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.addresses.map((addr) => (
            <div key={addr.id} className="rounded-2xl glass p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] tracking-luxe-sm uppercase text-gold">{addr.label}</span>
                {addr.isDefault && <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[9px] text-gold">Default</span>}
              </div>
              <p className="text-sm text-ink-soft">{addr.street}</p>
              <p className="text-sm text-ink-soft">{addr.city}, {addr.zip}</p>
              <p className="text-sm text-ink-soft">{addr.country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Orders Tab ---------- */
function OrdersTab({ orders, onCancel, onReorder }: { orders: Order[]; onCancel: (id: string) => void; onReorder: (id: string) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-ink/5">
          <Package className="h-8 w-8 text-ink-muted/30" />
        </div>
        <h3 className="font-display text-2xl font-light text-ink-soft">No orders yet</h3>
        <p className="text-sm text-ink-muted">Your order history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-light text-ink">Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="overflow-hidden rounded-2xl glass">
          {/* Header */}
          <button
            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            className="flex w-full flex-col gap-3 p-5 text-left md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {order.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="h-12 w-12 overflow-hidden rounded-full border-2 border-pearl">
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <span className="font-mono text-sm text-gold">{order.id}</span>
                <span className="block text-[10px] text-ink-muted">
                  {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={cn('rounded-full border px-3 py-1 text-[10px] tracking-luxe-sm uppercase', STATUS_STYLES[order.status])}>
                {order.status}
              </span>
              <span className="font-display text-lg text-ink">{formatPrice(order.total)}</span>
            </div>
          </button>

          {/* Expanded */}
          <AnimatePresence>
            {expanded === order.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-t border-ink/8 p-5">
                  {/* Tracking */}
                  {order.status !== 'cancelled' && (
                    <div className="mb-5 flex items-center gap-2">
                      {['processing', 'shipped', 'delivered'].map((s, i) => {
                        const statusIdx = ['processing', 'shipped', 'delivered'].indexOf(order.status);
                        const active = i <= statusIdx;
                        return (
                          <div key={s} className="flex flex-1 items-center gap-2">
                            <div className={cn('grid h-8 w-8 place-items-center rounded-full text-[9px]', active ? 'bg-gold text-ivory' : 'bg-ink/5 text-ink-muted')}>
                              {active ? <Check className="h-4 w-4" /> : i + 1}
                            </div>
                            <span className={cn('text-[10px] tracking-luxe-sm uppercase', active ? 'text-gold' : 'text-ink-muted')}>{s}</span>
                            {i < 2 && <div className={cn('h-px flex-1', active ? 'bg-gold' : 'bg-ink/10')} />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Items */}
                  <div className="flex flex-col gap-3">
                    {order.items.map((item) => (
                      <div key={item.watchId} className="flex items-center gap-4">
                        <div className="h-16 w-14 overflow-hidden rounded-lg">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display text-sm text-ink">{item.name}</h4>
                          <span className="text-[10px] text-ink-muted">Qty {item.quantity}</span>
                        </div>
                        <span className="text-sm font-medium text-ink">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    {order.status === 'processing' && (
                      <button
                        onClick={() => onCancel(order.id)}
                        className="rounded-full border border-red-200 px-4 py-2 text-[10px] tracking-luxe-sm uppercase text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}
                    <button
                      onClick={() => onReorder(order.id)}
                      className="rounded-full bg-ink px-4 py-2 text-[10px] tracking-luxe-sm uppercase text-ivory hover:bg-gold transition-colors"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ---------- Cart Tab ---------- */
function CartTab({ items, total, count, onUpdateQty, onRemove, onClear, onCheckout, onBrowse }: {
  items: ReturnType<typeof useCart>['items'];
  total: number;
  count: number;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: () => void;
  onBrowse: () => void;
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-ink/5">
          <ShoppingBag className="h-8 w-8 text-ink-muted/30" />
        </div>
        <h3 className="font-display text-2xl font-light text-ink-soft">Your cart is empty</h3>
        <button onClick={onBrowse} className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-xs tracking-luxe-sm uppercase text-ivory hover:bg-gold transition-colors">
          Browse Collection <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-light text-ink">My Cart</h2>
        <button onClick={onClear} className="text-[10px] tracking-luxe-sm uppercase text-ink-muted/50 hover:text-red-500 transition-colors">
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.watch.id} className="flex gap-4 rounded-2xl glass p-4">
            <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl">
              <img src={item.watch.image} alt={item.watch.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <span className="text-[9px] tracking-luxe-sm uppercase text-ink-muted">{item.watch.collection}</span>
                <h4 className="font-display text-lg leading-tight text-ink">{item.watch.name}</h4>
                <span className="text-sm font-medium text-gold">{formatPrice(item.watch.price)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-ink/10 px-2 py-1">
                  <button onClick={() => onUpdateQty(item.watch.id, item.quantity - 1)} className="grid h-6 w-6 place-items-center rounded-full text-ink-muted hover:bg-ink/5 hover:text-ink">–</button>
                  <span className="w-6 text-center text-sm font-medium text-ink">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.watch.id, item.quantity + 1)} className="grid h-6 w-6 place-items-center rounded-full text-ink-muted hover:bg-ink/5 hover:text-ink">+</button>
                </div>
                <button onClick={() => onRemove(item.watch.id)} className="grid h-8 w-8 place-items-center rounded-full text-ink-muted/50 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl glass-gold p-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">Total ({count} items)</span>
          <span className="font-display text-3xl text-gradient-gold">{formatPrice(total)}</span>
        </div>
        <button onClick={onCheckout} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs tracking-luxe-sm uppercase text-ivory hover:bg-gold transition-colors">
          Proceed to Checkout <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Wishlist Tab ---------- */
function WishlistTab({ items, onRemove, onMoveToCart, onView }: {
  items: ReturnType<typeof useWishlist>['items'];
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
  onView: () => void;
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-ink/5">
          <Heart className="h-8 w-8 text-ink-muted/30" />
        </div>
        <h3 className="font-display text-2xl font-light text-ink-soft">No saved items</h3>
        <button onClick={onView} className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-xs tracking-luxe-sm uppercase text-ivory hover:bg-gold transition-colors">
          Explore Collection <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-2xl font-light text-ink">Wishlist</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((watch) => (
          <div key={watch.id} className="flex gap-4 rounded-2xl glass p-4">
            <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl">
              <img src={watch.image} alt={watch.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h4 className="font-display text-lg leading-tight text-ink">{watch.name}</h4>
                <span className="text-sm font-medium text-gold">{formatPrice(watch.price)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onMoveToCart(watch.id)} className="flex-1 rounded-full bg-ink py-2 text-[10px] tracking-luxe-sm uppercase text-ivory hover:bg-gold transition-colors">
                  Add to Bag
                </button>
                <button onClick={() => onRemove(watch.id)} className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink-muted hover:border-red-300 hover:text-red-500 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Settings Tab ---------- */
function SettingsTab({ profile, onUpdateProfile, onAddAddress, onRemoveAddress, onSetDefault, onUpdateNotifications }: {
  profile: ReturnType<typeof useProfile>['profile'];
  onUpdateProfile: (d: Partial<typeof profile>) => void;
  onAddAddress: (a: Omit<Address, 'id'>) => void;
  onRemoveAddress: (id: string) => void;
  onSetDefault: (id: string) => void;
  onUpdateNotifications: (d: Partial<typeof profile.notifications>) => void;
}) {
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [newAddr, setNewAddr] = useState<Omit<Address, 'id'>>({
    label: '', street: '', city: '', zip: '', country: '', isDefault: false,
  });

  function addAddr() {
    if (!newAddr.street || !newAddr.city) return;
    onAddAddress(newAddr);
    setNewAddr({ label: '', street: '', city: '', zip: '', country: '', isDefault: false });
    setShowAddrForm(false);
  }

  const notifItems: { key: keyof typeof profile.notifications; label: string; desc: string }[] = [
    { key: 'email', label: 'Email Notifications', desc: 'Order updates and service reminders' },
    { key: 'sms', label: 'SMS Notifications', desc: 'Delivery alerts via text message' },
    { key: 'promotions', label: 'Promotions', desc: 'Private sales and special offers' },
    { key: 'newArrivals', label: 'New Arrivals', desc: 'Be the first to know about new pieces' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-display text-2xl font-light text-ink">Account Settings</h2>

      {/* Addresses */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-xl font-light text-ink">
            <MapPin className="h-5 w-5 text-gold" /> Manage Addresses
          </h3>
          <button
            onClick={() => setShowAddrForm(!showAddrForm)}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-[10px] tracking-luxe-sm uppercase text-ink-soft hover:border-gold hover:text-gold transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {profile.addresses.map((addr) => (
            <div key={addr.id} className="flex items-start justify-between rounded-2xl glass p-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-luxe-sm uppercase text-gold">{addr.label || 'Address'}</span>
                  {addr.isDefault && <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[9px] text-gold">Default</span>}
                </div>
                <p className="mt-1 text-sm text-ink-soft">{addr.street}, {addr.city}, {addr.zip}</p>
                <p className="text-sm text-ink-soft">{addr.country}</p>
              </div>
              <div className="flex gap-2">
                {!addr.isDefault && (
                  <button onClick={() => onSetDefault(addr.id)} className="text-[10px] tracking-luxe-sm uppercase text-ink-muted hover:text-gold transition-colors">
                    Set default
                  </button>
                )}
                <button onClick={() => onRemoveAddress(addr.id)} className="grid h-8 w-8 place-items-center rounded-full text-ink-muted/50 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showAddrForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden"
            >
              <div className="grid gap-3 rounded-2xl glass-gold p-5 sm:grid-cols-2">
                <input placeholder="Label (Home, Office...)" value={newAddr.label} onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })} className="rounded-lg border border-ink/10 bg-white/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
                <input placeholder="Street" value={newAddr.street} onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })} className="rounded-lg border border-ink/10 bg-white/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
                <input placeholder="City" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} className="rounded-lg border border-ink/10 bg-white/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
                <input placeholder="ZIP" value={newAddr.zip} onChange={(e) => setNewAddr({ ...newAddr, zip: e.target.value })} className="rounded-lg border border-ink/10 bg-white/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
                <input placeholder="Country" value={newAddr.country} onChange={(e) => setNewAddr({ ...newAddr, country: e.target.value })} className="rounded-lg border border-ink/10 bg-white/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
                <button onClick={addAddr} className="rounded-full bg-ink py-2.5 text-[10px] tracking-luxe-sm uppercase text-ivory hover:bg-gold transition-colors">
                  Save Address
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Change password */}
      <section>
        <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-light text-ink">
          <Lock className="h-5 w-5 text-gold" /> Change Password
        </h3>
        <div className="grid gap-3 rounded-2xl glass p-5 sm:grid-cols-2">
          <input type="password" placeholder="Current password" className="rounded-lg border border-ink/10 bg-white/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
          <input type="password" placeholder="New password" className="rounded-lg border border-ink/10 bg-white/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
          <input type="password" placeholder="Confirm new password" className="rounded-lg border border-ink/10 bg-white/60 px-3 py-2.5 text-sm focus:border-gold focus:outline-none" />
          <button className="rounded-full bg-ink py-2.5 text-[10px] tracking-luxe-sm uppercase text-ivory hover:bg-gold transition-colors">
            Update Password
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-light text-ink">
          <Bell className="h-5 w-5 text-gold" /> Notification Preferences
        </h3>
        <div className="flex flex-col gap-3">
          {notifItems.map((n) => (
            <div key={n.key} className="flex items-center justify-between rounded-2xl glass p-5">
              <div>
                <span className="block text-sm font-medium text-ink">{n.label}</span>
                <span className="block text-xs text-ink-muted">{n.desc}</span>
              </div>
              <button
                onClick={() => onUpdateNotifications({ [n.key]: !profile.notifications[n.key] })}
                className={cn(
                  'relative h-7 w-12 rounded-full transition-colors',
                  profile.notifications[n.key] ? 'bg-gold' : 'bg-ink/15'
                )}
              >
                <span className={cn(
                  'absolute top-1 h-5 w-5 rounded-full bg-white transition-transform',
                  profile.notifications[n.key] ? 'left-6' : 'left-1'
                )} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
