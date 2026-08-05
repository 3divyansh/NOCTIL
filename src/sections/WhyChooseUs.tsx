import { motion } from 'framer-motion';
import { Gem, Droplets, Cog, Shield } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { useCountUp } from '@/hooks/useCountUp';
import { useRef, useState } from 'react';

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2000, started);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setStarted(true)}
      className="flex flex-col items-center gap-2"
    >
      <span className="font-display text-5xl font-light text-gradient-gold md:text-6xl">
        {Math.round(count)}
        <span className="text-2xl">{suffix}</span>
      </span>
      <span className="text-[10px] tracking-luxe-sm uppercase text-ink-muted">
        {label}
      </span>
    </div>
  );
}

export function WhyChooseUs() {
  const features = [
    {
      icon: Gem,
      title: 'Rare Materials',
      desc: 'Forged carbon, 950 platinum, and 18kt gold — sourced from a single Swiss refinery.',
    },
    {
      icon: Cog,
      title: 'In-House Movements',
      desc: 'Every caliber is designed, manufactured, and assembled within our Geneva atelier.',
    },
    {
      icon: Droplets,
      title: 'Deep Water Tested',
      desc: 'Each diver is pressure-tested to 120% of its rated depth before it ships.',
    },
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      desc: 'A lifetime guarantee on the movement, backed by our global service network.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory to-champagne py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Why NOCTIL"
          title={
            <>
              Standards without
              <br />
              <span className="italic text-gradient-gold">compromise.</span>
            </>
          }
        />

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-y border-ink/8 py-12 md:grid-cols-4">
          <Stat value={142} suffix="h" label="Power Reserve" />
          <Stat value={1000} suffix="m" label="Water Resistance" />
          <Stat value={50} suffix="" label="Pieces / Year" />
          <Stat value={25} suffix="yr" label="Of Craft" />
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col gap-4 rounded-2xl glass p-8 transition-all duration-500 hover:glass-gold"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-ink/10 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ivory">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="font-display text-xl font-light text-ink">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
