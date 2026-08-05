import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { BRAND } from '@/constants';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3500);
  }

  const inputClass = 'w-full rounded-xl border border-ink/10 bg-white/60 px-4 py-3.5 text-sm text-ink placeholder:text-ink-muted/40 transition-colors focus:border-gold focus:outline-none';

  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="Get in Touch"
        title={<>Contact <span className="italic text-gradient-gold">the Maison.</span></>}
        description="Our private concierge is available to assist with orders, servicing, private commissions, and any inquiry."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={submit} className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">Subject</label>
                <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] tracking-luxe-sm uppercase text-ink-muted">Message</label>
                <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message..." className={`${inputClass} resize-none`} />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs tracking-luxe-sm uppercase text-ivory transition-colors hover:bg-gold"
              >
                {sent ? <><Check className="h-4 w-4" /> Message Sent</> : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {[
              { icon: MapPin, label: 'Atelier', value: BRAND.address },
              { icon: Mail, label: 'Email', value: BRAND.email },
              { icon: Phone, label: 'Phone', value: BRAND.phone },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 rounded-2xl glass p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/20 text-gold">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="block text-[10px] tracking-luxe-sm uppercase text-ink-muted">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">{item.value}</span>
                </div>
              </div>
            ))}

            <div className="rounded-2xl glass-gold p-6">
              <span className="block text-[10px] tracking-luxe-sm uppercase text-gold">
                Concierge Hours
              </span>
              <div className="mt-3 flex flex-col gap-1 text-sm text-ink-soft">
                <span>Monday — Friday: 09:00 — 18:00 CET</span>
                <span>Saturday: 10:00 — 16:00 CET</span>
                <span>Sunday: Closed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
