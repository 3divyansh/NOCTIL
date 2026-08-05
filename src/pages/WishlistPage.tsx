import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useRoute } from '@/hooks/useRoute';
import { formatPrice } from '@/constants';

export function WishlistPage() {
  const { items, remove, moveToCart, count } = useWishlist();
  const { addItem } = useCart();
  const [, navigate] = useRoute();

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="Saved for Later"
        title={<>Your <span className="italic text-gradient-gold">wishlist.</span></>}
        description="The timepieces you've set your heart on. Move them to your bag when you're ready."
        breadcrumbs={[{ label: 'Wishlist' }]}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-ink/5">
              <Heart className="h-10 w-10 text-ink-muted/30" />
            </div>
            <h2 className="font-display text-3xl font-light text-ink-soft">Your wishlist is empty</h2>
            <p className="max-w-sm text-sm text-ink-muted">
              Tap the heart on any timepiece to save it here for later.
            </p>
            <button
              onClick={() => navigate('shop')}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-xs tracking-luxe-sm uppercase text-ivory hover:bg-gold transition-colors"
            >
              Explore the Collection <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-[10px] tracking-luxe-sm uppercase text-ink-muted">
              {count} {count === 1 ? 'piece' : 'pieces'} saved
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {items.map((watch) => (
                  <motion.div
                    key={watch.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col overflow-hidden rounded-2xl glass luxury-shadow"
                  >
                    <button
                      onClick={() => navigate('product', watch.id)}
                      className="relative aspect-[3/4] overflow-hidden bg-champagne"
                    >
                      <img
                        src={watch.image}
                        alt={watch.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pearl/60 to-transparent" />
                    </button>

                    <div className="flex flex-col gap-3 p-5">
                      <div>
                        <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                          {watch.collection}
                        </span>
                        <h3 className="font-display text-lg font-medium leading-tight text-ink">
                          {watch.name}
                        </h3>
                        <span className="mt-1 block text-sm font-medium text-gold">
                          {formatPrice(watch.price, watch.currency)}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => moveToCart(watch.id, addItem)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3 text-[10px] tracking-luxe-sm uppercase text-ivory transition-colors hover:bg-gold"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" /> Add to Bag
                        </button>
                        <button
                          onClick={() => remove(watch.id)}
                          aria-label="Remove from wishlist"
                          className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-ink-muted hover:border-red-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
