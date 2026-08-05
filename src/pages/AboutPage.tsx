import { motion } from 'framer-motion';
import { Gem, Cog, Shield, Award, Globe, Users } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { BRAND } from '@/constants';

export function AboutPage() {
  const values = [
    { icon: Gem, title: 'Rare Materials', desc: 'We source from a single Swiss refinery — 950 platinum, 18kt gold, forged carbon.' },
    { icon: Cog, title: 'In-House Movements', desc: 'Every caliber is designed, manufactured, and assembled within our Geneva atelier.' },
    { icon: Shield, title: 'Lifetime Warranty', desc: 'A lifetime guarantee on the movement, backed by our global service network.' },
    { icon: Award, title: 'Award-Winning', desc: 'Three GPHG awards and counting. Recognition from the highest authority in horology.' },
    { icon: Globe, title: 'Worldwide Service', desc: 'Authorized service centers in twelve cities across four continents.' },
    { icon: Users, title: 'Master Artisans', desc: 'Thirty-two watchmakers, each assembling a single movement per week.' },
  ];

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="The Maison"
        title={<>A quarter century <span className="italic text-gradient-gold">of obsession.</span></>}
        description={`Founded in Geneva in 1998, ${BRAND.name} has grown from a single watchmaker's radical idea into one of the most respected names in haute horlogerie.`}
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Story block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-12 py-16 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-3xl font-light text-ink md:text-4xl">
              The beginning
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft md:text-base">
              In 1998, a single watchmaker set up a bench in a converted Geneva loft with
              a radical idea: that a timepiece could be as luminous as the morning light on
              the Rhône, and as precise as the stars that cross it. The first NOCTIL — a
              hand-wound dress watch in platinum — was assembled over eleven months.
            </p>
            <p className="text-sm leading-relaxed text-ink-soft md:text-base">
              Today, thirty-two artisans occupy a converted atelier on the river. Each
              assembles a single movement per week. Every NOCTIL bears the hand of the
              maker who built it, and nothing leaves the atelier until it has run for
              forty days, unattended, in our chronometer vault.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass luxury-shadow">
            <img
              src="https://images.pexels.com/photos/8327524/pexels-photo-8327524.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="NOCTIL atelier"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 border-y border-ink/8 py-12 md:grid-cols-4">
          {[
            { v: '1998', l: 'Founded' },
            { v: '32', l: 'Artisans' },
            { v: '50', l: 'Pieces / Year' },
            { v: '3', l: 'GPHG Awards' },
          ].map((s) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="block font-display text-4xl font-light text-gradient-gold md:text-5xl">
                {s.v}
              </span>
              <span className="mt-1 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                {s.l}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="py-16">
          <h2 className="mb-10 text-center font-display text-3xl font-light text-ink md:text-4xl">
            What we stand for
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex flex-col gap-3 rounded-2xl glass p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/20 text-gold">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-light text-ink">{v.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
