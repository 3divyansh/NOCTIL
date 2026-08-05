import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { useState } from 'react';
import { MagneticButton } from '@/components/MagneticButton';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setEmail('');
    }, 3500);
  }

  return (
    <section id="newsletter" className="relative overflow-hidden py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,141,79,0.08),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-luxe uppercase text-gold"
        >
          The Private Circle
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-4xl font-light leading-tight text-ink md:text-6xl"
        >
          Join the list. <span className="italic text-gradient-gold">Be first.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink-muted md:text-base"
        >
          Private previews, atelier invitations, and the first allocation of every
          limited edition. No more than one letter per month.
        </motion.p>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-md items-center gap-3 border-b border-ink/15 pb-4 focus-within:border-gold"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted/40 focus:outline-none"
          />
          <MagneticButton type="submit" size="sm" data-cursor="send">
            {done ? (
              <>
                <Check className="h-4 w-4" /> Subscribed
              </>
            ) : (
              <>
                Subscribe <Send className="h-3.5 w-3.5" />
              </>
            )}
          </MagneticButton>
        </motion.form>

        <p className="mt-4 text-[10px] tracking-luxe-sm uppercase text-ink-muted">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
