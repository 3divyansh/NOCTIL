import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { STORY_IMAGES } from '@/constants';

const timeline = [
  { year: '1998', title: 'The First Bench', desc: 'A single watchmaker sets up a loft in Geneva and assembles the first NOCTIL over eleven months.' },
  { year: '2003', title: 'The Atelier', desc: 'Twelve watchmakers join the maison. The first tourbillon caliber — the NT-01 — is completed.' },
  { year: '2010', title: 'GPHG Award', desc: 'The Obsidian Tourbillon wins the Grand Prix de l\'Horlogerie de Genève in the Men\'s Complication category.' },
  { year: '2015', title: 'Global Expansion', desc: 'Authorized service centers open in Tokyo, Dubai, and New York. The maison grows to twenty artisans.' },
  { year: '2020', title: 'The Carbon Revolution', desc: 'The Phantom Carbon Sport introduces forged carbon to the collection — the lightest watch we have ever made.' },
  { year: '2024', title: 'Thirty-Two Hands', desc: 'Today, thirty-two master artisans assemble a single movement each per week. The standard has never changed.' },
];

export function StoryPage() {
  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="Our Story"
        title={<>Twenty-six years <span className="italic text-gradient-gold">of time.</span></>}
        description="From a single bench in a Geneva loft to one of the most respected ateliers in haute horlogerie."
        breadcrumbs={[{ label: 'Our Story' }]}
      />

      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[21/9] overflow-hidden rounded-3xl glass luxury-shadow-lg"
        >
          <img
            src={STORY_IMAGES.hero}
            alt="NOCTIL atelier"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <span className="text-[10px] tracking-luxe-sm uppercase text-ivory/80">Genève, Switzerland</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gold/20 md:left-1/2" />

          <div className="flex flex-col gap-16">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-start gap-8 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-2 border-gold bg-pearl md:left-1/2">
                  <div className="h-2 w-2 rounded-full bg-gold" />
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="font-display text-5xl font-light text-gradient-gold">
                    {item.year}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-light text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {item.desc}
                  </p>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 border-l-2 border-gold py-6 pl-8"
        >
          <p className="font-display text-2xl font-light italic leading-relaxed text-ink md:text-3xl">
            "We do not make watches to tell time. We make them to hold it —
            to carry a piece of the present into the future, one tick at a time."
          </p>
          <footer className="mt-4 text-[10px] tracking-luxe-sm uppercase text-ink-muted">
            — Founder, NOCTIL
          </footer>
        </motion.blockquote>
      </div>
    </div>
  );
}
