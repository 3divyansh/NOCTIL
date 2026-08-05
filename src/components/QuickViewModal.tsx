import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Zap, Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Watch } from '@/data/watches';
import { formatPrice } from '@/constants';
import { useCart } from '@/hooks/useCart';
import { useRoute } from '@/hooks/useRoute';
import { cn } from '@/utils/cn';

interface QuickViewModalProps {
  watch: Watch | null;
  onClose: () => void;
}

export function QuickViewModal({ watch, onClose }: QuickViewModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const [, navigate] = useRoute();

  useEffect(() => {
    setActiveImage(0);
    setQty(1);
  }, [watch]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (watch) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [watch, onClose]);

  function handleAddToCart() {
    if (!watch) return;
    addItem(watch.id, qty);
    onClose();
  }

  function handleBuyNow() {
    if (!watch) return;
    addItem(watch.id, qty);
    onClose();
    navigate('checkout');
  }

  return (
    <AnimatePresence>
      {watch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/30 backdrop-blur-xl p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl glass luxury-shadow-lg md:grid-cols-2"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink-soft hover:text-gold transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image side */}
            <div className="relative aspect-square bg-gradient-to-b from-champagne to-pearl md:aspect-auto">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={watch.gallery[activeImage]}
                alt={watch.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {watch.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === activeImage ? 'w-8 bg-gold' : 'w-1.5 bg-ink/20'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Info side */}
            <div className="flex flex-col gap-5 bg-pearl/50 p-6 md:p-10">
              <div>
                <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                  {watch.collection}
                </span>
                <h2 className="mt-2 font-display text-3xl font-medium text-ink md:text-4xl">
                  {watch.name}
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-ink-soft">
                {watch.description}
              </p>

              <div className="flex items-center gap-3">
                <span className="text-gold">{'★'.repeat(Math.round(watch.rating))}</span>
                <span className="text-xs text-ink-muted">
                  {watch.rating.toFixed(1)} · {watch.reviews} reviews
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 border-y border-ink/8 py-5">
                {(Object.entries(watch.spec) as [string, string][]).slice(0, 4).map(([k, v]) => (
                  <div key={k}>
                    <span className="block text-[9px] tracking-luxe-sm uppercase text-ink-muted">
                      {k.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-xs text-ink-soft">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-medium text-gradient-gold">
                  {formatPrice(watch.price, watch.currency)}
                </span>

                {/* Quantity */}
                <div className="flex items-center gap-2 rounded-full border border-ink/10 px-2 py-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-7 w-7 place-items-center rounded-full text-ink-muted hover:bg-ink/5 hover:text-ink"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-ink">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="grid h-7 w-7 place-items-center rounded-full text-ink-muted hover:bg-ink/5 hover:text-ink"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 py-4 text-xs tracking-luxe-sm uppercase text-ink transition-colors hover:border-gold hover:text-gold"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Bag
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs tracking-luxe-sm uppercase text-ivory transition-colors hover:bg-gold"
                >
                  <Zap className="h-4 w-4" />
                  Buy Now
                </button>
                <button className="grid h-[52px] w-[52px] place-items-center rounded-full border border-ink/15 text-ink-soft hover:border-gold hover:text-gold transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
