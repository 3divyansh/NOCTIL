import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRoute, type RouteName } from '@/hooks/useRoute';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  breadcrumbs?: { label: string; route?: RouteName }[];
}

export function PageHeader({ eyebrow, title, description, breadcrumbs = [] }: PageHeaderProps) {
  const [, navigate] = useRoute();

  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-champagne via-pearl to-ivory pt-32 pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,141,79,0.08),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="mb-8 flex items-center gap-2 text-[10px] tracking-luxe-sm uppercase text-ink-muted">
            <button onClick={() => navigate('home')} className="hover:text-gold transition-colors">
              Home
            </button>
            {breadcrumbs.map((bc) => (
              <span key={bc.label} className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3" />
                {bc.route ? (
                  <button onClick={() => navigate(bc.route!)} className="hover:text-gold transition-colors">
                    {bc.label}
                  </button>
                ) : (
                  <span className="text-ink-soft">{bc.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-luxe uppercase text-gold"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-display text-5xl font-light leading-[1.05] text-ink md:text-7xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base"
          >
            {description}
          </motion.p>
        )}
      </div>
    </header>
  );
}
