import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { getFeaturedWatches } from '@/data/watches';

const specGroups = [
  {
    label: 'Movement',
    icon: '⚙',
    items: ['Flying Tourbillon', 'Caliber NT-01', 'Manual Winding', '142h Power Reserve'],
  },
  {
    label: 'Materials',
    icon: '◈',
    items: ['Forged Carbon', 'Black DLC Titanium', 'Anti-Reflective Sapphire', 'F1-Grade Rubber'],
  },
  {
    label: 'Performance',
    icon: '◉',
    items: ['50m Water Resistance', '58g Total Weight', '42mm Case', 'Shock-Tested to 5000g'],
  },
];

export function Specifications() {
  const watch = getFeaturedWatches()[0];

  return (
    <section id="specifications" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <img
                src={watch.gallery[1]}
                alt={watch.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pearl/60 via-transparent to-transparent" />
            </div>
            {/* Floating spec card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -right-4 top-8 glass rounded-2xl px-5 py-4"
            >
              <span className="block font-mono text-[9px] tracking-luxe-sm uppercase text-ink-muted">
                Reference
              </span>
              <span className="font-mono text-sm text-gold">NT-01.OB</span>
            </motion.div>
          </motion.div>

          {/* Specs */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Technical Excellence"
              title={
                <>
                  Obsidian
                  <br />
                  <span className="italic text-gradient-gold">Tourbillon.</span>
                </>
              }
              description={watch.description}
            />

            <div className="mt-10 flex flex-col gap-6">
              {specGroups.map((group, gi) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: gi * 0.15 }}
                  className="border-l-2 border-gold/30 pl-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gold">{group.icon}</span>
                    <h4 className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                      {group.label}
                    </h4>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-gold/60" />
                        <span className="text-sm text-ink-soft">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
