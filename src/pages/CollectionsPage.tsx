import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { watches } from '@/data/watches';
import { PageHeader } from '@/components/PageHeader';
import { useRoute } from '@/hooks/useRoute';
import { formatPrice } from '@/constants';

export function CollectionsPage() {
  const [, navigate] = useRoute();

  const collections = useMemo(() => {
    const map = new Map<string, { name: string; watches: typeof watches }>();
    watches.forEach((w) => {
      const existing = map.get(w.collection);
      if (existing) existing.watches.push(w);
      else map.set(w.collection, { name: w.collection, watches: [w] });
    });
    return [...map.values()];
  }, []);

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="The Collections"
        title={<>Distinct <span className="italic text-gradient-gold">families.</span></>}
        description="Each NOCTIL collection is born from a different philosophy of time — from the gravity-defying tourbillons to the deep-sea divers."
        breadcrumbs={[{ label: 'Collections' }]}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-20">
          {collections.map((col, ci) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: ci * 0.1 }}
            >
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <span className="text-[10px] tracking-luxe-sm uppercase text-gold">
                    Collection {String(ci + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 font-display text-4xl font-light text-ink md:text-5xl">
                    {col.name}
                  </h2>
                </div>
                <button
                  onClick={() => navigate('shop')}
                  className="group inline-flex items-center gap-2 text-[10px] tracking-luxe-sm uppercase text-ink-muted hover:text-gold transition-colors"
                >
                  View all
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {col.watches.map((watch) => (
                  <motion.button
                    key={watch.id}
                    onClick={() => navigate('product', watch.id)}
                    data-cursor="view"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl glass luxury-shadow text-left"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-champagne">
                      <img
                        src={watch.image}
                        alt={watch.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pearl/60 to-transparent" />
                    </div>
                    <div className="flex flex-col gap-1 p-5">
                      <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                        {watch.color}
                      </span>
                      <h3 className="font-display text-xl font-medium text-ink">
                        {watch.name}
                      </h3>
                      <span className="mt-1 text-sm font-medium text-gold">
                        {formatPrice(watch.price, watch.currency)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
