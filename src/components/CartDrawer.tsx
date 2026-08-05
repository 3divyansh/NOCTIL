import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { useRoute } from '@/hooks/useRoute';
import { formatPrice } from '@/constants';

export function CartDrawer() {
  const { items, total, count, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart();
  const [, navigate] = useRoute();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function handleCheckout() {
    closeCart();
    navigate('checkout');
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[180] bg-ink/20 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[190] flex h-full w-full max-w-md flex-col bg-pearl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/8 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <span className="font-display text-xl text-ink">Your Selection</span>
                <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-gold">
                  {count}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-ink/5">
                  <ShoppingBag className="h-8 w-8 text-ink-muted/40" />
                </div>
                <p className="font-display text-2xl text-ink-soft">Your cart is empty</p>
                <p className="text-sm text-ink-muted">
                  Discover timepieces worthy of your collection.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-ink px-8 py-3 text-[11px] tracking-luxe-sm uppercase text-ivory transition-colors hover:bg-gold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.watch.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 rounded-2xl bg-white/60 p-3 backdrop-blur-sm"
                      >
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={item.watch.image}
                            alt={item.watch.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <span className="text-[9px] tracking-luxe-sm uppercase text-ink-muted">
                              {item.watch.collection}
                            </span>
                            <h4 className="font-display text-lg leading-tight text-ink">
                              {item.watch.name}
                            </h4>
                            <span className="text-sm font-medium text-gold">
                              {formatPrice(item.watch.price, item.watch.currency)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-ink/10 px-2 py-1">
                              <button
                                onClick={() => updateQuantity(item.watch.id, item.quantity - 1)}
                                className="grid h-6 w-6 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium text-ink">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.watch.id, item.quantity + 1)}
                                className="grid h-6 w-6 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.watch.id)}
                              className="grid h-8 w-8 place-items-center rounded-full text-ink-muted/50 transition-colors hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <button
                  onClick={clearCart}
                  className="mt-4 text-[10px] tracking-luxe-sm uppercase text-ink-muted/50 transition-colors hover:text-red-500"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-ink/8 bg-white/40 px-6 py-5 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-ink">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="mb-4 text-[10px] text-ink-muted/60">
                  Shipping and taxes calculated at checkout.
                </p>
                <button
                  onClick={handleCheckout}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs tracking-luxe-sm uppercase text-ivory transition-all hover:bg-gold"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
