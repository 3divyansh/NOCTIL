import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, ShoppingBag, Zap, Plus, Minus, Star, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { getWatchById, watches } from '@/data/watches';
import { formatPrice } from '@/constants';
import { useCart } from '@/hooks/useCart';
import { useRoute } from '@/hooks/useRoute';
import { useWishlist } from '@/hooks/useWishlist';
import { ProductCard } from '@/components/ProductCard';
import { PageHeader } from '@/components/PageHeader';
import { LightboxWrapper } from '@/components/Lightbox';
import { cn } from '@/utils/cn';

interface ProductDetailsProps {
  productId: string;
  onQuickView: (watch: NonNullable<ReturnType<typeof getWatchById>>) => void;
}

export function ProductDetails({ productId, onQuickView }: ProductDetailsProps) {
  const watch = getWatchById(productId);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [lightbox, setLightbox] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const [, navigate] = useRoute();
  const { has, toggle } = useWishlist();

  if (!watch) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pearl pt-28">
        <div className="text-center">
          <h1 className="font-display text-4xl text-ink">Watch not found</h1>
          <button
            onClick={() => navigate('shop')}
            className="mt-6 rounded-full bg-ink px-8 py-3 text-xs tracking-luxe-sm uppercase text-ivory hover:bg-gold transition-colors"
          >
            Browse all watches
          </button>
        </div>
      </div>
    );
  }

  const isWishlisted = has(watch.id);
  const related = watches.filter((w) => w.category === watch.category && w.id !== watch.id).slice(0, 3);

  function handleAddToCart() {
    addItem(watch!.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem(watch!.id, qty);
    navigate('checkout');
  }

  const specEntries = Object.entries(watch.spec) as [string, string][];

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        title={watch.name}
        breadcrumbs={[
          { label: 'Shop', route: 'shop' },
          { label: watch.name },
        ]}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <div
              onClick={() => setLightbox(true)}
              data-cursor="zoom"
              className="relative aspect-square cursor-pointer overflow-hidden rounded-3xl glass luxury-shadow"
            >
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={watch.gallery[activeImage]}
                alt={watch.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 right-4 glass rounded-full px-4 py-2 text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                Click to zoom
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {watch.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all',
                    i === activeImage ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="text-[10px] tracking-luxe-sm uppercase text-gold">
                {watch.collection}
              </span>
              <h1 className="mt-2 font-display text-4xl font-light text-ink md:text-5xl">
                {watch.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn('h-4 w-4', i < Math.round(watch.rating) ? 'fill-gold text-gold' : 'text-ink/20')}
                  />
                ))}
              </div>
              <span className="text-sm text-ink-muted">
                {watch.rating.toFixed(1)} · {watch.reviews} reviews
              </span>
            </div>

            <span className="font-display text-4xl font-medium text-gradient-gold">
              {formatPrice(watch.price, watch.currency)}
            </span>

            <p className="text-sm leading-relaxed text-ink-soft md:text-base">
              {watch.description}
            </p>

            {/* Quantity + actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-ink/10 px-3 py-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:bg-ink/5 hover:text-ink"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-medium text-ink">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:bg-ink/5 hover:text-ink"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 py-4 text-xs tracking-luxe-sm uppercase text-ink transition-colors hover:border-gold hover:text-gold"
              >
                {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to Bag</>}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs tracking-luxe-sm uppercase text-ivory transition-colors hover:bg-gold"
              >
                <Zap className="h-4 w-4" /> Buy Now
              </button>

              <button
                onClick={() => toggle(watch.id)}
                aria-label="Wishlist"
                className="grid h-[52px] w-[52px] place-items-center rounded-full border border-ink/15 text-ink-soft hover:border-gold hover:text-gold transition-colors"
              >
                <Heart className={cn('h-5 w-5', isWishlisted && 'fill-gold text-gold')} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 border-y border-ink/8 py-5">
              {[
                { icon: Truck, label: 'Insured Shipping' },
                { icon: Shield, label: 'Lifetime Warranty' },
                { icon: RotateCcw, label: '30-Day Returns' },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2 text-center">
                  <b.icon className="h-5 w-5 text-gold" />
                  <span className="text-[9px] tracking-luxe-sm uppercase text-ink-muted">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div>
              <h3 className="mb-4 text-[10px] tracking-luxe-sm uppercase text-gold">
                Specifications
              </h3>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                {specEntries.map(([key, val]) => (
                  <div key={key} className="border-b border-ink/5 pb-3">
                    <dt className="text-[9px] tracking-luxe-sm uppercase text-ink-muted">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </dt>
                    <dd className="mt-1 text-sm text-ink-soft">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-10 font-display text-3xl font-light text-ink md:text-4xl">
              You may also like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((w) => (
                <ProductCard
                  key={w.id}
                  watch={w}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {lightbox && (
        <LightboxWrapper
          images={watch.gallery}
          index={activeImage}
          onClose={() => setLightbox(false)}
        />
      )}
    </div>
  );
}
