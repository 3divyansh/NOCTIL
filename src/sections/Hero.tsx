import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useEffect } from 'react';
import { MagneticButton } from '@/components/MagneticButton';
import { getFeaturedWatches } from '@/data/watches';
import { formatPrice } from '@/constants';

export function Hero() {
  const watch = getFeaturedWatches()[0];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 30 });
  const sy = useSpring(my, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const imgX = useTransform(sx, [-0.5, 0.5], [-20, 20]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mx.set(x);
      my.set(y);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-pearl via-ivory to-champagne"
    >
      {/* Soft lighting background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,141,79,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.8)_0%,transparent_50%)]" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(43,40,32,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(43,40,32,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold/15"
          style={{
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        {/* Left: copy */}
        <div className="flex flex-col gap-8 pt-24 lg:pt-0">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-[10px] tracking-luxe uppercase text-gold"
          >
            {watch.collection} · Limited to 50 pieces
          </motion.span>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl font-light leading-[0.95] text-ink md:text-7xl lg:text-8xl"
            >
              Time,
              <br />
              <span className="italic text-gradient-gold">perfected.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="max-w-md text-sm leading-relaxed text-ink-muted md:text-base"
          >
            {watch.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton size="lg" data-cursor="explore">
              Discover the Collection
            </MagneticButton>
            <MagneticButton variant="outline" size="lg" data-cursor="play">
              Watch the Film
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex gap-10 pt-6"
          >
            {[
              { v: '1998', l: 'Founded' },
              { v: '142h', l: 'Power Reserve' },
              { v: '50', l: 'Pieces Worldwide' },
            ].map((s) => (
              <div key={s.l}>
                <span className="block font-display text-2xl font-light text-ink">
                  {s.v}
                </span>
                <span className="text-[9px] tracking-luxe-sm uppercase text-ink-muted">
                  {s.l}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D-tilt watch image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative aspect-[3/4] w-full max-w-md"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 -z-10 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(176,141,79,0.12),transparent_60%)] blur-2xl" />

            <motion.img
              src={watch.image}
              alt={watch.name}
              style={{ x: imgX, y: imgY }}
              className="h-full w-full rounded-3xl object-cover luxury-shadow-lg"
            />

            {/* Floating price tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              style={{ transform: 'translateZ(60px)' }}
              className="absolute -bottom-6 -left-6 glass-gold rounded-2xl px-6 py-4"
            >
              <span className="block text-[9px] tracking-luxe-sm uppercase text-gold">
                From
              </span>
              <span className="font-display text-2xl font-medium text-gradient-gold">
                {formatPrice(watch.price)}
              </span>
            </motion.div>

            {/* Floating spec chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              style={{ transform: 'translateZ(40px)' }}
              className="absolute -top-4 -right-4 glass rounded-2xl px-5 py-3"
            >
              <span className="block text-[8px] tracking-luxe-sm uppercase text-ink-muted">
                Caliber
              </span>
              <span className="font-mono text-sm text-ink">NT-01</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-luxe-sm uppercase text-ink-muted">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
