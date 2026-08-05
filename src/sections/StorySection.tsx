import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/SectionHeading';
import { useParallax } from '@/hooks/useGsap';
import { STORY_IMAGES } from '@/constants';

export function StorySection() {
  const parallaxRef = useParallax<HTMLDivElement>(-0.15);

  return (
    <section id="story" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Images */}
          <div className="relative grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img
                src={STORY_IMAGES.craft}
                alt="Watchmaker at work"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pearl/40 to-transparent" />
            </motion.div>

            <div ref={parallaxRef} className="relative mt-12 aspect-[3/4] overflow-hidden rounded-2xl">
              <motion.img
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                src={STORY_IMAGES.detail}
                alt="Watch detail"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pearl/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-gold rounded-full px-6 py-3 text-center"
            >
              <span className="block font-display text-2xl font-light text-gradient-gold">1998</span>
              <span className="text-[8px] tracking-luxe-sm uppercase text-ink-muted">Genève</span>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="The Maison"
              title={
                <>
                  A quarter century
                  <br />
                  of <span className="italic text-gradient-gold">obsession.</span>
                </>
              }
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-lg text-sm leading-relaxed text-ink-soft md:text-base"
            >
              Founded in Geneva in 1998 by a single watchmaker with a radical idea —
              that a timepiece could be as luminous as the morning light on the Rhône
              and as precise as the stars that cross it. Today, thirty-two artisans
              occupy a converted atelier on the river, each assembling a single
              movement per week.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-lg text-sm leading-relaxed text-ink-soft md:text-base"
            >
              Every NOCTIL bears the hand of the maker who built it. Nothing leaves
              the atelier until it has run for forty days, unattended, in our
              chronometer vault.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-12 pt-4"
            >
              {[
                { v: '32', l: 'Artisans' },
                { v: '40', l: 'Days Tested' },
                { v: '50', l: 'Pieces / Year' },
              ].map((s) => (
                <div key={s.l}>
                  <span className="block font-display text-3xl font-light text-ink">
                    {s.v}
                  </span>
                  <span className="text-[9px] tracking-luxe-sm uppercase text-ink-muted">
                    {s.l}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
