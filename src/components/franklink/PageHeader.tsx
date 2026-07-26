'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden noise-bg">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,168,56,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em]">
              <li>
                <Link href="/" className="text-ink-faint hover:text-ink transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span className="text-ink-faint/40">—</span>
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-accent">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="text-ink-faint hover:text-ink transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[0.95] tracking-[-0.03em] text-ink mb-4"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="text-ink-dim text-[15px] md:text-[17px] leading-relaxed max-w-[600px]"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="h-[2px] w-20 bg-accent mt-8 origin-left"
        />
      </div>
    </section>
  );
}
