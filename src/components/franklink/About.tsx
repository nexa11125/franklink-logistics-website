'use client';

import { motion } from 'framer-motion';

const BG_IMAGE = 'https://sfile.chatglm.cn/images-ppt/5b830431fd2d.jpg';

const FEATURES = [
  'Customs brokerage at all major Indian ports',
  'Door-to-door international freight',
  'Marine insurance and documentation',
  'Warehousing, dock stuffing, and fumigation',
  'Export-import consultancy and compliance',
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 overflow-hidden">
      <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Large "15" number */}
        <div className="mb-16 md:mb-20">
          <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none tracking-[-0.05em] text-ink/[0.04] block select-none" aria-hidden>
            15
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint -mt-6 md:-mt-10">
            years in logistics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left column — quote + details */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* Large italic quote */}
            <blockquote className="mb-14">
              <p className="font-serif italic text-[28px] sm:text-[34px] md:text-[40px] leading-[1.2] text-ink">
                &ldquo;We don&apos;t move boxes — we move
                <span className="text-accent"> commitments</span>.&rdquo;
              </p>
            </blockquote>

            {/* Feature points — just dashes */}
            <ul className="space-y-3 mb-14">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-baseline gap-3 text-[14px] md:text-[15px] text-ink-dim leading-relaxed">
                  <span className="text-ink-faint shrink-0">—</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Company details */}
            <div className="space-y-2.5 text-[13px]">
              <p className="text-ink-dim">
                <span className="text-ink-faint font-mono text-[10px] uppercase tracking-[0.15em] block mb-1">Address</span>
                C-1012A, Station Plaza, Station Road,<br />
                Bhandup West, Mumbai — 400 078
              </p>
              <p className="text-ink-dim">
                <span className="text-ink-faint font-mono text-[10px] uppercase tracking-[0.15em] block mb-1">Phone / Tel</span>
                +91 9967553458 &middot; 022 25669551
              </p>
              <p className="text-ink-dim">
                <span className="text-ink-faint font-mono text-[10px] uppercase tracking-[0.15em] block mb-1">Email</span>
                info@franklinklogistics.com
              </p>
              <p className="text-ink-dim">
                <span className="text-ink-faint font-mono text-[10px] uppercase tracking-[0.15em] block mb-1">GSTIN</span>
                <span className="font-mono text-[12px]">27AADFF7532P1ZY</span>
              </p>
            </div>
          </div>

          {/* Right column — image with offset */}
          <div className="lg:col-span-6 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative"
            >
              {/* Image */}
              <div
                className="w-full aspect-[4/3] md:aspect-[16/10] bg-cover bg-center"
                style={{ backgroundImage: `url('${BG_IMAGE}')` }}
              />
              {/* Accent line below image */}
              <div className="h-[2px] w-16 bg-accent mt-4" />
              {/* Small caption */}
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint mt-3">
                Warehouse &amp; dock operations, Mumbai
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}