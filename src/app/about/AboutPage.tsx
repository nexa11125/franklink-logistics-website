'use client';

import Navbar from '@/components/franklink/Navbar';
import Footer from '@/components/franklink/Footer';
import PageHeader from '@/components/franklink/PageHeader';
import Link from 'next/link';
import { motion } from 'framer-motion';

const VALUES = [
  {
    number: '01',
    title: 'Reliability',
    description: 'We deliver on every commitment, ensuring your cargo reaches its destination safely and on time, every single time.',
  },
  {
    number: '02',
    title: 'Transparency',
    description: 'Complete visibility into your shipment status, pricing, and documentation — no hidden costs, no surprises.',
  },
  {
    number: '03',
    title: 'Expertise',
    description: 'Licensed CHA with deep knowledge of Indian customs regulations, international trade compliance, and port operations.',
  },
  {
    number: '04',
    title: 'Customer First',
    description: 'Personalized service tailored to your unique logistics needs, with 24/7 support and dedicated account management.',
  },
];

const MILESTONES = [
  { year: '2009', event: 'Founded in Mumbai with a vision to simplify international logistics' },
  { year: '2012', event: 'Obtained Custom House Agent (CHA) license from Mumbai Customs' },
  { year: '2015', event: 'Expanded operations to all major Indian ports including JNPT, Mundra, and Chennai' },
  { year: '2018', event: 'Established partnerships across 30+ countries worldwide' },
  { year: '2021', event: 'Launched integrated warehousing and dock stuffing operations' },
  { year: '2024', event: 'Crossed 500+ annual shipments serving 40+ countries globally' },
];

const FEATURES = [
  'Customs brokerage at all major Indian ports',
  'Door-to-door international freight',
  'Marine insurance and documentation',
  'Warehousing, dock stuffing, and fumigation',
  'Export-import consultancy and compliance',
  'Air and sea freight forwarding',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="About Us"
          subtitle="Over 15 years of moving what matters — from Mumbai to the world."
          breadcrumbs={[{ label: 'About', href: '/about' }]}
        />

        {/* Mission Section */}
        <section className="py-20 md:py-28 noise-bg">
          <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-6">Our Mission</p>
                <blockquote className="mb-10">
                  <p className="font-serif italic text-[28px] sm:text-[34px] md:text-[40px] leading-[1.2] text-ink">
                    &ldquo;We don&apos;t move boxes — we move
                    <span className="text-accent"> commitments</span>.&rdquo;
                  </p>
                </blockquote>
                <p className="text-ink-dim text-[15px] md:text-[16px] leading-relaxed mb-8">
                  Frank Link Logistics was founded with a simple belief: international trade should be seamless. 
                  Based in Mumbai, we specialize in end-to-end freight forwarding, customs clearance, and logistics 
                  solutions that connect Indian businesses to global markets.
                </p>
                <p className="text-ink-dim text-[15px] md:text-[16px] leading-relaxed">
                  As a licensed Custom House Agent (CHA), we bring deep regulatory expertise, strong port 
                  relationships, and an unwavering commitment to getting your cargo where it needs to be — safely, 
                  efficiently, and on schedule.
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-6">What We Offer</p>
                <ul className="space-y-4 mb-12">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-baseline gap-3 text-[14px] md:text-[15px] text-ink-dim leading-relaxed">
                      <span className="text-accent shrink-0">—</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[rgba(245,240,232,0.08)]">
                  {[
                    { value: '15+', label: 'Years' },
                    { value: '500+', label: 'Shipments / yr' },
                    { value: '40+', label: 'Countries' },
                  ].map((s) => (
                    <div key={s.label}>
                      <span className="font-mono text-accent text-[24px] md:text-[28px] font-bold leading-none">
                        {s.value}
                      </span>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint mt-1.5">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 border-t border-[rgba(245,240,232,0.06)]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-12">Our Values</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-6 border border-[rgba(245,240,232,0.06)] hover:border-accent/30 transition-all duration-300"
                >
                  <span className="font-mono text-[11px] text-accent/60 block mb-4">{v.number}</span>
                  <h3 className="text-ink text-[18px] font-bold mb-3">{v.title}</h3>
                  <p className="text-ink-dim text-[13px] leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 md:py-28 border-t border-[rgba(245,240,232,0.06)] noise-bg">
          <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-12">Our Journey</p>
            <div className="space-y-0">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex items-baseline gap-6 md:gap-10 py-5 border-b border-[rgba(245,240,232,0.06)] hover:pl-3 transition-all duration-200"
                >
                  <span className="font-mono text-accent text-[15px] md:text-[17px] font-bold shrink-0 w-[60px]">
                    {m.year}
                  </span>
                  <span className="text-ink-dim text-[14px] md:text-[15px] leading-relaxed group-hover:text-ink transition-colors">
                    {m.event}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Details */}
        <section className="py-20 md:py-28 border-t border-[rgba(245,240,232,0.06)]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <span className="text-ink-faint font-mono text-[10px] uppercase tracking-[0.15em] block mb-2">Address</span>
                <p className="text-ink-dim text-[14px] leading-relaxed">
                  C-1012A, Station Plaza, Station Road,<br />
                  Bhandup West, Mumbai — 400 078
                </p>
              </div>
              <div>
                <span className="text-ink-faint font-mono text-[10px] uppercase tracking-[0.15em] block mb-2">Phone / Tel</span>
                <p className="text-ink-dim text-[14px]">+91 9967553458<br />022 25669551</p>
              </div>
              <div>
                <span className="text-ink-faint font-mono text-[10px] uppercase tracking-[0.15em] block mb-2">Email</span>
                <p className="text-ink-dim text-[14px]">info@franklinklogistics.com</p>
              </div>
              <div>
                <span className="text-ink-faint font-mono text-[10px] uppercase tracking-[0.15em] block mb-2">GSTIN</span>
                <p className="text-ink-dim font-mono text-[13px]">27AADFF7532P1ZY</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 pt-10 border-t border-[rgba(245,240,232,0.06)] text-center">
              <p className="text-ink text-[22px] md:text-[28px] font-bold mb-4">Ready to ship?</p>
              <p className="text-ink-dim text-[15px] mb-8">Let&apos;s discuss your logistics needs today.</p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3.5 bg-accent text-background text-[12px] uppercase tracking-[0.12em] font-medium hover:bg-accent-dim transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
