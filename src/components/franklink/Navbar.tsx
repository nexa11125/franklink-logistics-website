'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Thin top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors duration-300"
        style={{ backgroundColor: scrolled ? '#0e0d0b' : 'transparent' }}
      >
        <a href="tel:+919967553458">+91 9967553458</a>
        <a href="mailto:info@franklinklogistics.com">info@franklinklogistics.com</a>
      </div>

      {/* Main nav */}
      <nav
        className="fixed top-[30px] left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? '#0e0d0b' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(245, 240, 232, 0.08)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-5 md:px-8 py-4">
          {/* Logo */}
          <Link href="/" className="text-ink font-bold text-[15px] md:text-[17px] tracking-[0.15em] uppercase select-none">
            Frank Link Logistics
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-wide transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-accent'
                    : 'text-ink-dim hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-5 py-2 text-[12px] uppercase tracking-[0.12em] text-ink border border-[rgba(245,240,232,0.2)] hover:border-ink hover:bg-ink hover:text-background transition-all duration-200"
          >
            Get a Quote
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-ink p-1"
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-5">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-ink p-1"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Large nav links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-[40px] font-bold tracking-tight leading-tight py-2 border-b border-[rgba(245,240,232,0.06)] ${
                      pathname === link.href ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, delay: NAV_LINKS.length * 0.06, ease: 'easeOut' }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-block mt-6 px-6 py-3 text-[13px] uppercase tracking-[0.12em] text-ink border border-[rgba(245,240,232,0.2)] w-fit"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </div>

            {/* Bottom contact info */}
            <div className="px-8 pb-8 font-mono text-[11px] text-ink-faint uppercase tracking-[0.15em] space-y-1">
              <p>+91 9967553458</p>
              <p>info@franklinklogistics.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}