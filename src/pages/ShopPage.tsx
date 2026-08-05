import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import { watches, type WatchCategory } from '@/data/watches';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/ProductCard';
import { PageHeader } from '@/components/PageHeader';
import type { Watch } from '@/data/watches';
import { cn } from '@/utils/cn';

interface ShopPageProps {
  onQuickView: (watch: Watch) => void;
}

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export function ShopPage({ onQuickView }: ShopPageProps) {
  const [category, setCategory] = useState<WatchCategory | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('featured');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = [...watches];
    if (category !== 'all') result = result.filter((w) => w.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.collection.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [category, sort, search]);

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="The Collection"
        title={<>All <span className="italic text-gradient-gold">timepieces.</span></>}
        description="Browse the full NOCTIL collection. Filter by category, sort by price or rating, and find the watch that speaks to you."
        breadcrumbs={[{ label: 'Shop' }]}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Controls */}
        <div className="sticky top-20 z-30 -mx-6 mb-10 flex flex-col gap-4 border-b border-ink/8 bg-pearl/80 px-6 py-4 backdrop-blur-xl lg:-mx-10 lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2.5 md:w-72">
              <Search className="h-4 w-4 text-ink-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search watches..."
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted/40 focus:outline-none"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-4 w-4 text-ink-muted" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-ink/10 bg-pearl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('all')}
              className={cn(
                'rounded-full px-4 py-2 text-[10px] tracking-luxe-sm uppercase transition-all',
                category === 'all' ? 'bg-ink text-ivory' : 'border border-ink/10 text-ink-soft hover:border-gold hover:text-gold'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-[10px] tracking-luxe-sm uppercase transition-all',
                  category === cat.id ? 'bg-ink text-ivory' : 'border border-ink/10 text-ink-soft hover:border-gold hover:text-gold'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-[10px] tracking-luxe-sm uppercase text-ink-muted">
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-display text-3xl font-light text-ink-soft">No watches found</p>
            <p className="mt-2 text-sm text-ink-muted">Try adjusting your filters or search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((watch, i) => (
              <motion.div
                key={watch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <ProductCard
                  watch={watch}
                  onQuickView={onQuickView}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
