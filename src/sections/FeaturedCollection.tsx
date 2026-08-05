import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { useReveal } from '@/hooks/useGsap';
import { getFeaturedWatches } from '@/data/watches';
import type { Watch } from '@/data/watches';

interface FeaturedCollectionProps {
  onQuickView: (watch: Watch) => void;
}

export function FeaturedCollection({
  onQuickView,
}: FeaturedCollectionProps) {
  const watches = getFeaturedWatches();
  const ref = useReveal<HTMLDivElement>({ stagger: 0.15 });

  return (
    <section id="collections" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-end justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured Collection"
            title={
              <>
                The icons of
                <br />
                <span className="italic text-gradient-gold">the Maison.</span>
              </>
            }
          />
          <motion.a
            href="#"
            data-cursor="view"
            className="group inline-flex items-center gap-2 text-[11px] tracking-luxe-sm uppercase text-ink-muted transition-colors hover:text-gold"
          >
            View all timepieces
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        <div
          ref={ref}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {watches.map((watch) => (
            <div key={watch.id} data-reveal>
              <ProductCard
                watch={watch}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
