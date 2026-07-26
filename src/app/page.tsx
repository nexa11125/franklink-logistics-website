'use client';

import Navbar from '@/components/franklink/Navbar';
import Hero from '@/components/franklink/Hero';
import Services from '@/components/franklink/Services';
import About from '@/components/franklink/About';
import Clients from '@/components/franklink/Clients';
import Contact from '@/components/franklink/Contact';
import Footer from '@/components/franklink/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Services section with "View All" CTA */}
        <div className="relative">
          <Services />
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 -mt-14 md:-mt-20 relative z-10 pb-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-[12px] uppercase tracking-[0.12em] text-accent border border-accent/30 hover:bg-accent hover:text-background transition-all duration-200"
            >
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* About section with "Learn More" CTA */}
        <div className="relative">
          <About />
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 -mt-14 md:-mt-20 relative z-10 pb-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 text-[12px] uppercase tracking-[0.12em] text-accent border border-accent/30 hover:bg-accent hover:text-background transition-all duration-200"
            >
              Learn More About Us <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <Clients />

        {/* Gallery CTA Banner */}
        <section className="py-16 md:py-20 border-t border-[rgba(245,240,232,0.06)] noise-bg">
          <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-2">See our work</p>
              <h3 className="text-ink text-[24px] md:text-[30px] font-bold">Explore Our Gallery</h3>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 text-[12px] uppercase tracking-[0.12em] bg-ink text-background font-medium hover:bg-ink-dim transition-colors duration-200"
            >
              View Gallery <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Blog CTA Banner */}
        <section className="py-16 md:py-20 border-t border-[rgba(245,240,232,0.06)]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-2">Latest insights</p>
              <h3 className="text-ink text-[24px] md:text-[30px] font-bold">Read Our Blog</h3>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 text-[12px] uppercase tracking-[0.12em] text-ink border border-[rgba(245,240,232,0.2)] hover:border-ink transition-colors duration-200"
            >
              View All Articles <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}