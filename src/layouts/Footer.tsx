import { motion } from 'framer-motion';
import { ArrowUpRight, Send, Check } from 'lucide-react';
import { useState } from 'react';
import { BRAND, SHOP_LINKS, MAISON_LINKS, ACCOUNT_LINKS, LEGAL_LINKS, SOCIAL_LINKS } from '@/constants';
import { useRoute, type RouteName } from '@/hooks/useRoute';

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [, navigate] = useRoute();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  }

  const linkGroups = [
    { title: 'Shop', links: SHOP_LINKS },
    { title: 'Maison', links: MAISON_LINKS },
    { title: 'Account', links: ACCOUNT_LINKS },
    { title: 'Legal', links: LEGAL_LINKS },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-ink/8 bg-champagne">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-16"
        >
          {/* CTA row */}
          <div className="grid gap-10 border-b border-ink/8 pb-16 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-4xl font-light leading-tight text-ink md:text-5xl">
                Become a part of
                <br />
                <span className="text-gradient-gold">the Maison.</span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
                Private previews, atelier visits, and limited editions reserved for our circle.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-end gap-4">
              <div className="flex items-center gap-3 border-b border-ink/15 pb-4 transition-colors focus-within:border-gold">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ivory transition-transform hover:scale-105"
                >
                  {submitted ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              {submitted && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gold"
                >
                  Welcome to the circle. Check your inbox.
                </motion.span>
              )}
            </form>
          </div>

          {/* Links row */}
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-1">
              <button onClick={() => navigate('home')} className="font-display text-3xl tracking-luxe text-ink">
                {BRAND.name}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                {BRAND.address}
              </p>
              <p className="mt-2 text-xs text-ink-muted">{BRAND.phone}</p>
              <button onClick={() => navigate('contact')} className="mt-2 block text-xs text-gold hover:underline">
                {BRAND.email}
              </button>

              {/* Social */}
              <div className="mt-4 flex gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-gold hover:text-gold"
                  >
                    <span className="text-[9px] font-bold">{s.label[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {linkGroups.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => navigate(link.route as RouteName)}
                        className="group inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-gold"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/8 pt-8 text-[10px] tracking-luxe-sm uppercase text-ink-muted md:flex-row">
            <span>
              © {new Date().getFullYear()} {BRAND.name} · Established {BRAND.established}
            </span>
            <div className="flex gap-6">
              <button onClick={() => navigate('privacy')} className="hover:text-gold">Privacy</button>
              <button onClick={() => navigate('terms')} className="hover:text-gold">Terms</button>
              <button onClick={() => navigate('faq')} className="hover:text-gold">FAQ</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Giant background wordmark */}
      <div className="pointer-events-none absolute bottom-[-2rem] left-1/2 w-full -translate-x-1/2 select-none overflow-hidden">
        <span className="block text-center font-display text-[18vw] font-light leading-none text-ink/[0.03]">
          NOCTIL
        </span>
      </div>
    </footer>
  );
}
