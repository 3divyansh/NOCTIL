import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { FAQ_ITEMS } from '@/constants';

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="Frequently Asked"
        title={<>Questions <span className="italic text-gradient-gold">answered.</span></>}
        description="Everything you need to know about NOCTIL timepieces, servicing, and ordering."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl glass"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
              >
                <span className="font-display text-lg font-medium text-ink">
                  {item.q}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/10 text-ink-soft">
                  {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
