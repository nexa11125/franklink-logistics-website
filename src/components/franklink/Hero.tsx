'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Globe3D = dynamic(() => import('@/components/franklink/Globe3D'), { ssr: false });

const HERO_IMAGE = 'https://sfile.chatglm.cn/images-ppt/a2cb7a8637c2.jpg';

export default function Hero() {
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollLineRef.current;
    if (!el) return;
    let frame: number;
    let start: number | null = null;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = ((ts - start) % 2000) / 2000;
      el.style.transform = `translateY(${progress * 24}px)`;
      el.style.opacity = `${1 - progress * 0.8}`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-end overflow-hidden grain">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      />

      {/* Warm dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(14,13,11,0.55) 0%, rgba(14,13,11,0.75) 50%, #0e0d0b 100%)',
        }}
      />

      {/* Subtle 3D globe — bottom right accent */}
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] md:w-[420px] md:h-[420px] z-[2] opacity-[0.35] pointer-events-none">
        <Globe3D />
      </div>

      {/* Content */}
      <div className="relative z-[3] w-full max-w-[1400px] mx-auto px-5 md:px-8 pb-24 md:pb-32 pt-40 md:pt-48">
        <div className="max-w-[900px]">
          {/* Tagline */}
          <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-ink-dim mb-5">
            International freight forwarding &middot; Mumbai, India
          </p>

          {/* Main headline */}
          <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-bold leading-[0.95] tracking-[-0.03em] text-ink mb-6">
            Moving cargo
            <br />
            <span className="text-ink-dim">across borders.</span>
          </h1>

          {/* Description */}
          <p className="text-ink-dim text-[15px] md:text-[17px] leading-relaxed max-w-[520px] mb-10">
            End-to-end logistics, customs clearance, and freight forwarding
            from India to the world. Over 15 years handling what matters.
          </p>

          {/* Stats row */}
          <div className="flex gap-10 md:gap-16 mb-10">
            {[
              { value: '15+', label: 'Years' },
              { value: '500+', label: 'Shipments / year' },
              { value: '40+', label: 'Countries' },
            ].map((s) => (
              <div key={s.label}>
                <span className="font-mono text-accent text-[22px] md:text-[28px] font-bold leading-none">
                  {s.value}
                </span>
                <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-ink-faint mt-1.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-block px-7 py-3.5 text-[12px] uppercase tracking-[0.12em] bg-ink text-background font-medium hover:bg-ink-dim transition-colors duration-200"
          >
            Request a Quote
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-1.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">Scroll</span>
        <div className="w-[1px] h-6 overflow-hidden">
          <div
            ref={scrollLineRef}
            className="w-full h-full bg-ink-faint"
          />
        </div>
      </div>

      {/* Subtle cargo ship crossing bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[2] h-px pointer-events-none overflow-hidden"
        style={{ background: 'rgba(245,240,232,0.04)' }}
      >
        <motion.div
          className="absolute top-[-1px] left-0 h-[2px] bg-accent/20"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ width: '30%' }}
        />
      </motion.div>
    </section>
  );
}