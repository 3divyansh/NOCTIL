import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { useRoute } from '@/hooks/useRoute';
import { BRAND } from '@/constants';

export function CheckoutConfirmation() {
  const [, navigate] = useRoute();
  const orderRef = `NCT-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-pearl px-6 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex max-w-lg flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
          className="grid h-20 w-20 place-items-center rounded-full bg-gold/10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="grid h-14 w-14 place-items-center rounded-full bg-gold"
          >
            <Check className="h-7 w-7 text-ivory" />
          </motion.div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-[10px] tracking-luxe uppercase text-gold"
        >
          Order Confirmed
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4 font-display text-4xl font-light text-ink md:text-5xl"
        >
          Thank you.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted"
        >
          Your timepiece is being prepared in our Geneva atelier. A confirmation has
          been sent to your email. Each piece is inspected for forty days before it
          leaves us.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 rounded-2xl glass px-8 py-4"
        >
          <span className="block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
            Order Reference
          </span>
          <span className="font-mono text-lg text-gold">{orderRef}</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={() => navigate('home')}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-xs tracking-luxe-sm uppercase text-ivory transition-colors hover:bg-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to {BRAND.name}
        </motion.button>
      </motion.div>
    </div>
  );
}
