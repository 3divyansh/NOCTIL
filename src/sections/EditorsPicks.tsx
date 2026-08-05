import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { getEditorsPicks, type Watch } from '@/data/watches';
import { formatPrice } from '@/constants';

interface EditorsPicksProps {
  onQuickView: (watch: Watch) => void;
}

export function EditorsPicks({ onQuickView }: EditorsPicksProps) {
  const picks = getEditorsPicks();

  return (
    <section className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Curated by the Editor"
          title={
            <>
              The pieces we
              <br />
              <span className="italic text-gradient-gold">wear ourselves.</span>
            </>
          }
          description="A personal selection from our editor-in-chief — the timepieces that define this season."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {picks.map((watch, i) => (
            <motion.div
              key={watch.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onQuickView(watch)}
              data-cursor="view"
              className={`group relative overflow-hidden rounded-3xl glass luxury-shadow card-hover cursor-pointer ${
                i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                <motion.img
                  src={watch.image}
                  alt={watch.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pearl/90 via-pearl/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] tracking-luxe-sm uppercase text-gold">
                      {watch.collection}
                    </span>
                    <h3 className={`mt-2 font-display font-light text-ink ${i === 0 ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
                      {watch.name}
                    </h3>
                  </div>
                  <Quote className="h-6 w-6 shrink-0 text-gold/40" />
                </div>

                <p className={`mt-3 text-sm leading-relaxed text-ink-soft ${i === 0 ? 'max-w-md' : 'line-clamp-2'}`}>
                  {watch.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-xl font-medium text-gradient-gold">
                    {formatPrice(watch.price, watch.currency)}
                  </span>
                  <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted transition-colors group-hover:text-gold">
                    View →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
