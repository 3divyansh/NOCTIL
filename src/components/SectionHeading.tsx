import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-luxe uppercase text-gold"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl font-light leading-[1.1] text-ink md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`max-w-xl text-sm leading-relaxed text-ink-muted md:text-base ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
