'use client';

import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(245,240,232,0.06)]">
      {/* Main footer row */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-ink font-bold text-[13px] tracking-[0.15em] uppercase select-none block mb-4">
              Frank Link Logistics
            </Link>
            <p className="text-ink-dim text-[13px] leading-relaxed max-w-[280px]">
              End-to-end logistics, customs clearance, and freight forwarding from India to the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-4">Quick Links</p>
            <div className="grid grid-cols-2 gap-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ink-faint text-[13px] hover:text-ink-dim transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-4">Contact</p>
            <div className="space-y-2 text-[13px] text-ink-dim">
              <p>C-1012A, Station Plaza, Station Road,<br />Bhandup West, Mumbai — 400 078</p>
              <a href="tel:+919967553458" className="block hover:text-ink transition-colors">+91 9967553458</a>
              <a href="mailto:info@franklinklogistics.com" className="block hover:text-ink transition-colors">info@franklinklogistics.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(245,240,232,0.04)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-ink-faint text-[11px]">
            &copy; {new Date().getFullYear()} Frank Link Logistics. All rights reserved.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint/60">
            GSTIN 27AADFF7532P1ZY
          </span>
        </div>
      </div>
    </footer>
  );
}