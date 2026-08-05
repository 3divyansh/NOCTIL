import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { BRAND } from '@/constants';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly to us — such as your name, email, shipping address, and phone number when you create an account or place an order. We also collect browsing data, including pages visited, time spent, and device information, through cookies and similar technologies.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'Your information is used to process orders, provide customer service, deliver timepieces, send order confirmations, and — with your consent — notify you of new collections and private events. We never sell your personal data to third parties.',
  },
  {
    title: '3. Data Security',
    body: 'All personal data is encrypted in transit and at rest. Access is restricted to authorized personnel who require it to perform their duties. We undergo annual security audits by independent third parties.',
  },
  {
    title: '4. Cookies',
    body: 'We use essential cookies to operate the site and optional cookies to enhance your experience and analyze traffic. You may disable optional cookies in your browser settings without affecting core functionality.',
  },
  {
    title: '5. Your Rights',
    body: 'You have the right to access, correct, or delete your personal data at any time. You may also request a copy of all data we hold about you. To exercise these rights, contact our privacy officer at ' + BRAND.email + '.',
  },
  {
    title: '6. Data Retention',
    body: 'We retain personal data only as long as necessary for the purposes outlined above, or as required by Swiss law. Order records are retained for a minimum of ten years for warranty and service purposes.',
  },
  {
    title: '7. Third-Party Services',
    body: 'We engage trusted third parties for shipping, payment processing, and analytics. Each is bound by strict data protection agreements and may only process data on our behalf.',
  },
  {
    title: '8. Contact',
    body: 'For any privacy-related inquiry, contact our privacy officer at ' + BRAND.email + ' or write to ' + BRAND.address + '.',
  },
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="Legal"
        title={<>Privacy <span className="italic text-gradient-gold">policy.</span></>}
        description={`Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="flex flex-col gap-8">
          {sections.map((s, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <h2 className="mb-3 font-display text-xl font-medium text-ink">{s.title}</h2>
              <p className="text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
