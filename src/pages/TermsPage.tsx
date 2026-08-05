import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { BRAND } from '@/constants';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using the NOCTIL website, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site or place orders.',
  },
  {
    title: '2. Products & Pricing',
    body: 'All timepieces are handmade in limited quantities. We reserve the right to modify or discontinue any model without notice. Prices are listed in USD and are subject to change. In the event of a pricing error, we will contact you before processing your order.',
  },
  {
    title: '3. Orders',
    body: 'All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order at our discretion. Customized or bespoke pieces require a non-refundable deposit of 50% at the time of commission.',
  },
  {
    title: '4. Shipping & Delivery',
    body: 'In-stock pieces ship within three business days via insured worldwide courier. Delivery times vary by destination. Private commissions require twelve to eighteen months. Risk of loss passes to the buyer upon delivery.',
  },
  {
    title: '5. Returns & Exchanges',
    body: 'Unworn watches may be returned within thirty days of delivery for a full refund. Returns must include all original packaging, certificates, and accessories. Customized pieces are non-returnable.',
  },
  {
    title: '6. Warranty',
    body: 'Every NOCTIL carries a lifetime warranty on the movement and a five-year warranty on the case and crystal. The warranty does not cover damage from misuse, unauthorized service, or normal wear.',
  },
  {
    title: '7. Intellectual Property',
    body: 'All content on this site — including images, text, designs, and the NOCTIL name — is the property of NOCTIL SA and is protected by Swiss and international intellectual property laws.',
  },
  {
    title: '8. Limitation of Liability',
    body: 'NOCTIL shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or site. Our maximum liability is limited to the purchase price of the timepiece.',
  },
  {
    title: '9. Governing Law',
    body: 'These Terms are governed by the laws of Switzerland. Any dispute shall be submitted to the exclusive jurisdiction of the courts of Geneva.',
  },
  {
    title: '10. Contact',
    body: 'For questions regarding these Terms, contact us at ' + BRAND.email + ' or ' + BRAND.address + '.',
  },
];

export function TermsPage() {
  return (
    <div className="min-h-screen bg-pearl pb-20">
      <PageHeader
        eyebrow="Legal"
        title={<>Terms & <span className="italic text-gradient-gold">conditions.</span></>}
        description={`Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
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
