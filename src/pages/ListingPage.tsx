import { motion } from 'framer-motion';
import { watches, getNewArrivals, getBestSellers, type Watch } from '@/data/watches';
import { ProductCard } from '@/components/ProductCard';
import { PageHeader } from '@/components/PageHeader';

interface ListingPageProps {
  variant: 'new' | 'bestseller';
  onQuickView: (watch: Watch) => void;
}

export function ListingPage({ variant, onQuickView }: ListingPageProps) {
  const list = variant === 'new' ? getNewArrivals() : getBestSellers();

  const config = variant === 'new'
    ? {
        eyebrow: 'Just Arrived',
        title: <>New <span className="italic text-gradient-gold">arrivals.</span></>,
        description: 'The latest additions to the NOCTIL collection — fresh from the Geneva atelier.',
        crumb: 'New Arrivals',
      }
    : {
        eyebrow: 'Most Coveted',
        title: <>Best <span className="italic text-gradient-gold">sellers.</span></>,
        description: 'The timepieces our collectors return for again and again. The most coveted pieces in the collection.',
        crumb: 'Best Sellers',
      };

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        breadcrumbs={[{ label: config.crumb }]}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((watch, i) => (
            <motion.div
              key={watch.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <ProductCard
                watch={watch}
                onQuickView={onQuickView}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center gap-6 rounded-3xl glass luxury-shadow p-12 text-center">
          <h2 className="font-display text-3xl font-light text-ink md:text-4xl">
            Explore the full collection
          </h2>
          <p className="max-w-md text-sm text-ink-muted">
            Discover all {watches.length} timepieces in the NOCTIL catalog.
          </p>
        </div>
      </div>
    </div>
  );
}
