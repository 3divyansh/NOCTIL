import { motion, useMotionValue, useSpring, type MotionStyle } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Cursor() {
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor]');
      setHovering(!!interactive);
      setLabel(interactive?.getAttribute('data-cursor') ?? null);
    };
    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) {
    return null;
  }

  const dotStyle: MotionStyle = { x: sx, y: sy };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <motion.div
        style={dotStyle}
        className="absolute left-0 top-0"
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            width: hovering ? 64 : 10,
            height: hovering ? 64 : 10,
            backgroundColor: hovering ? 'rgba(176,141,79,0.1)' : 'rgba(176,141,79,1)',
            borderColor: hovering ? 'rgba(176,141,79,0.5)' : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex items-center justify-center rounded-full border backdrop-blur-sm"
        >
          {label && (
            <span className="text-[8px] tracking-luxe-sm uppercase text-gold font-sans">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
