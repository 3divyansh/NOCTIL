import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/categories';
import { watches } from '@/data/watches';
import { PageHeader } from '@/components/PageHeader';
import { useRoute } from '@/hooks/useRoute';

export function CategoriesPage() {
  const [, navigate] = useRoute();

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="Explore by Discipline"
        title={<>Five crafts. <span className="italic text-gradient-gold">One obsession.</span></>}
        description="Each category represents a different philosophy of time. Find the one that speaks to you."
        breadcrumbs={[{ label: 'Categories' }]}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const catWatches = watches.filter((w) => w.category === cat.id);
            return (
              <motion.button
                key={cat.id}
                onClick={() => navigate('shop')}
                data-cursor="open"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl glass luxury-shadow text-left"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="text-[10px] tracking-luxe-sm uppercase text-gold-light">
                    {catWatches.length} pieces
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-light text-ivory">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-ivory/70">{cat.tagline}</p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/80">
                    {cat.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-luxe-sm uppercase text-ivory">
                    Explore
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
