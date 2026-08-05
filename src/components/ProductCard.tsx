import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Plus, Zap } from 'lucide-react';
import type { Watch } from '@/data/watches';
import { formatPrice } from '@/constants';
import { useCart } from '@/hooks/useCart';
import { useRoute } from '@/hooks/useRoute';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  watch: Watch;
  onQuickView?: (watch: Watch) => void;
  className?: string;
}

const badgeStyles: Record<NonNullable<Watch['badge']>, string> = {
  new: 'bg-gold/10 text-gold border-gold/25',
  bestseller: 'bg-ink/8 text-ink border-ink/15',
  limited: 'bg-red-50 text-red-600 border-red-200',
  editor: 'bg-blue-50 text-blue-600 border-blue-200',
};

const badgeLabels: Record<NonNullable<Watch['badge']>, string> = {
  new: 'New',
  bestseller: 'Bestseller',
  limited: 'Limited',
  editor: "Editor's Pick",
};

export function ProductCard({
  watch,
  onQuickView,
  className,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const [, navigate] = useRoute();
  const { has, toggle } = useWishlist();
  const isWishlisted = has(watch.id);

  function handleBuyNow() {
    addItem(watch.id, 1);
    navigate('checkout');
  }

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl glass luxury-shadow card-hover',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-champagne to-pearl">
        {watch.badge && (
          <span
            className={cn(
              'absolute left-4 top-4 z-20 rounded-full border px-3 py-1 text-[9px] font-medium tracking-luxe-sm uppercase backdrop-blur-md',
              badgeStyles[watch.badge]
            )}
          >
            {badgeLabels[watch.badge]}
          </span>
        )}

        <button
          onClick={() => toggle(watch.id)}
          aria-label="Toggle wishlist"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/70 backdrop-blur-md transition-all duration-300 hover:bg-gold/10"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              isWishlisted ? 'fill-gold text-gold' : 'text-ink-soft/60'
            )}
          />
        </button>

        <motion.img
          src={watch.image}
          alt={watch.name}
          loading="lazy"
          onClick={() => navigate('product', watch.id)}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pearl/80 via-transparent to-transparent" />

        {/* Quick view */}
        <motion.button
          onClick={() => onQuickView?.(watch)}
          initial={{ opacity: 0, y: 12 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full glass-gold px-5 py-2.5 text-[10px] tracking-luxe-sm uppercase text-gold transition-colors duration-300 hover:bg-gold hover:text-ivory"
        >
          <Eye className="h-3.5 w-3.5" />
          Quick View
        </motion.button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">
            {watch.collection}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-gold">★</span>
            <span className="text-[11px] text-ink-soft">{watch.rating.toFixed(1)}</span>
          </div>
        </div>

        <h3
          onClick={() => navigate('product', watch.id)}
          className="cursor-pointer font-display text-xl font-medium leading-tight text-ink transition-colors hover:text-gold"
        >
          {watch.name}
        </h3>

        <p className="text-xs leading-relaxed text-ink-muted line-clamp-2">
          {watch.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <span className="block text-[9px] tracking-luxe-sm uppercase text-ink-muted">
              From
            </span>
            <span className="font-display text-2xl font-medium text-gradient-gold">
              {formatPrice(watch.price, watch.currency)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => addItem(watch.id, 1)}
              aria-label="Add to cart"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink-soft transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ivory"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={handleBuyNow}
              aria-label="Buy now"
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-ivory transition-all duration-300 hover:bg-gold"
            >
              <Zap className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
