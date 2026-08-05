import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2200;
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 400);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ivory"
    >
      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-display text-5xl font-light tracking-luxe text-ink md:text-7xl">
            NOCTIL
          </span>
          <span className="text-[10px] tracking-luxe uppercase text-gold">
            Haute Horlogerie · Genève
          </span>
        </motion.div>

        <div className="h-px w-48 overflow-hidden bg-ink/10 md:w-64">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-mono text-xs text-ink-muted">{progress}%</span>
      </div>
    </motion.div>
  );
}
