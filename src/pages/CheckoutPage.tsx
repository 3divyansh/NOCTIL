import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Check, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useRoute } from '@/hooks/useRoute';
import { useOrders } from '@/hooks/useOrders';
import { formatPrice } from '@/constants';

export function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [, navigate] = useRoute();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: 'Switzerland',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      addOrder({
        items: items.map((i) => ({
          watchId: i.watch.id,
          name: i.watch.name,
          image: i.watch.image,
          price: i.watch.price,
          quantity: i.quantity,
        })),
        total: grandTotal,
        shippingAddress: `${form.address}, ${form.city}, ${form.zip}, ${form.country}`,
        customerName: form.name,
        customerEmail: form.email,
      });
      clearCart();
      setSubmitting(false);
      navigate('confirmation');
    }, 1500);
  }

  const shipping = total > 0 ? 250 : 0;
  const tax = Math.round(total * 0.075);
  const grandTotal = total + shipping + tax;

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white/70 px-4 py-3.5 text-sm text-ink placeholder:text-ink-muted/40 transition-colors focus:outline-none ${
      errors[field]
        ? 'border-red-400 focus:border-red-500'
        : 'border-ink/10 focus:border-gold'
    }`;

  return (
    <div className="min-h-screen bg-pearl pt-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Back link */}
        <button
          onClick={() => navigate('home')}
          className="mb-8 inline-flex items-center gap-2 text-[11px] tracking-luxe-sm uppercase text-ink-muted transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </button>

        <div className="grid gap-12 lg:grid-cols-[1fr_440px]">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl font-light text-ink md:text-5xl">
              Checkout
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              Complete your order — securely and privately.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8">
              {/* Contact */}
              <fieldset className="flex flex-col gap-4">
                <legend className="mb-2 flex items-center gap-2 text-[10px] tracking-luxe-sm uppercase text-gold">
                  <span className="font-mono text-ink-muted">01</span>
                  Contact Information
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                      Full Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Alexandre Voss"
                      className={inputClass('name')}
                    />
                    {errors.name && (
                      <span className="mt-1 block text-[10px] text-red-500">{errors.name}</span>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="alex@voss.ch"
                      className={inputClass('email')}
                    />
                    {errors.email && (
                      <span className="mt-1 block text-[10px] text-red-500">{errors.email}</span>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+41 22 000 0000"
                      className={inputClass('phone')}
                    />
                    {errors.phone && (
                      <span className="mt-1 block text-[10px] text-red-500">{errors.phone}</span>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* Shipping */}
              <fieldset className="flex flex-col gap-4">
                <legend className="mb-2 flex items-center gap-2 text-[10px] tracking-luxe-sm uppercase text-gold">
                  <span className="font-mono text-ink-muted">02</span>
                  Shipping Address
                </legend>
                <div>
                  <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                    Street Address
                  </label>
                  <input
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="Rue du Rhône 1"
                    className={inputClass('address')}
                  />
                  {errors.address && (
                    <span className="mt-1 block text-[10px] text-red-500">{errors.address}</span>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                      City
                    </label>
                    <input
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      placeholder="Genève"
                      className={inputClass('city')}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                      ZIP
                    </label>
                    <input
                      value={form.zip}
                      onChange={(e) => update('zip', e.target.value)}
                      placeholder="1204"
                      className={inputClass('zip')}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                      Country
                    </label>
                    <input
                      value={form.country}
                      onChange={(e) => update('country', e.target.value)}
                      className={inputClass('country')}
                    />
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="group flex items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs tracking-luxe-sm uppercase text-ivory transition-all hover:bg-gold disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Place Order · {formatPrice(grandTotal)}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-3xl glass luxury-shadow p-6">
              <div className="mb-5 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <h2 className="font-display text-xl text-ink">Order Summary</h2>
                <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-gold">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>

              {items.length === 0 ? (
                <p className="py-8 text-center text-sm text-ink-muted">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  <div className="flex flex-col gap-4 border-b border-ink/8 pb-5">
                    {items.map((item) => (
                      <div key={item.watch.id} className="flex gap-3">
                        <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={item.watch.image}
                            alt={item.watch.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                          <h4 className="font-display text-sm leading-tight text-ink">
                            {item.watch.name}
                          </h4>
                          <span className="text-[10px] text-ink-muted">
                            Qty {item.quantity} · {item.watch.color}
                          </span>
                        </div>
                        <span className="self-center text-sm font-medium text-ink">
                          {formatPrice(item.watch.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 py-5">
                    {[
                      ['Subtotal', formatPrice(total)],
                      ['Shipping', formatPrice(shipping)],
                      ['Tax (7.5%)', formatPrice(tax)],
                    ].map(([label, val]) => (
                      <div key={label} className="flex items-center justify-between text-sm">
                        <span className="text-ink-muted">{label}</span>
                        <span className="text-ink">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-ink/8 pt-5">
                    <span className="font-display text-lg text-ink">Total</span>
                    <span className="font-display text-2xl text-gradient-gold">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-gold/5 px-4 py-3">
                    <Check className="h-4 w-4 text-gold" />
                    <span className="text-[10px] text-ink-muted">
                      Insured worldwide shipping included
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
