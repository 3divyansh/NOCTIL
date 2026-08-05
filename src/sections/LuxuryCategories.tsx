import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { categories } from '@/data/categories';

export function LuxuryCategories() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Explore by Discipline"
          title={
            <>
              Five crafts.
              <br />
              <span className="italic text-gradient-gold">One obsession.</span>
            </>
          }
          description="Each collection is born from a different philosophy of time. Find the one that speaks to you."
        />

        <div className="mt-16 flex flex-col gap-4">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href="#"
              data-cursor="open"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:glass-gold md:grid-cols-[1fr_2fr_auto] md:gap-10 md:p-8"
            >
              {/* Number */}
              <span className="font-mono text-xs text-ink-muted">
                0{i + 1}
              </span>

              {/* Name + tagline */}
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-3xl font-light text-ink transition-colors group-hover:text-gold md:text-4xl">
                  {cat.name}
                </h3>
                <p className="text-xs tracking-luxe-sm uppercase text-ink-muted">
                  {cat.tagline}
                </p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
                  {cat.description}
                </p>
              </div>

              {/* Image preview */}
              <div className="relative hidden h-20 w-32 overflow-hidden rounded-xl md:block">
                <motion.img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pearl/60 to-transparent" />
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                  {cat.count} pieces
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 text-ink-soft transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ivory">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
