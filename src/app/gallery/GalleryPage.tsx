'use client';

import { useState } from 'react';
import Navbar from '@/components/franklink/Navbar';
import Footer from '@/components/franklink/Footer';
import PageHeader from '@/components/franklink/PageHeader';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    src: '/gallery/warehouse.png',
    title: 'Warehouse Operations',
    category: 'Warehousing',
    description: 'Our state-of-the-art warehousing facility near Mumbai ports',
  },
  {
    src: '/gallery/shipping.png',
    title: 'Container Ship at Sea',
    category: 'Sea Freight',
    description: 'International cargo vessels carrying goods across oceans',
  },
  {
    src: '/gallery/port.png',
    title: 'Port Terminal Operations',
    category: 'Port Operations',
    description: 'Busy cargo port with cranes and container handling',
  },
  {
    src: '/gallery/airfreight.png',
    title: 'Air Cargo Loading',
    category: 'Air Freight',
    description: 'Freight loading operations at the airport terminal',
  },
  {
    src: '/gallery/containers.png',
    title: 'Container Storage Yard',
    category: 'Storage',
    description: 'Stacked shipping containers ready for dispatch',
  },
  {
    src: '/gallery/truck.png',
    title: 'Road Transportation',
    category: 'Transportation',
    description: 'Long-haul cargo truck delivering goods across India',
  },
  {
    src: '/gallery/customs.png',
    title: 'Customs Documentation',
    category: 'Customs',
    description: 'Customs clearance documentation and cargo inspection',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(GALLERY_ITEMS.map((item) => item.category)))];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };
  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="Gallery"
          subtitle="A glimpse into our logistics operations — from warehouse to world."
          breadcrumbs={[{ label: 'Gallery', href: '/gallery' }]}
        />

        <section className="py-20 md:py-28 noise-bg">
          <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-[0.12em] font-mono border transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-accent text-background border-accent'
                      : 'text-ink-dim border-[rgba(245,240,232,0.12)] hover:border-ink-faint'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent mb-1.5">
                      {item.category}
                    </span>
                    <h3 className="text-ink text-[16px] font-bold mb-1">{item.title}</h3>
                    <p className="text-ink-dim text-[12px]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] bg-background/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-ink p-2 hover:text-accent transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X size={28} strokeWidth={1.5} />
              </button>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-ink p-2 hover:text-accent transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={36} strokeWidth={1.5} />
              </button>

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-ink p-2 hover:text-accent transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight size={36} strokeWidth={1.5} />
              </button>

              {/* Image */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-[90vw] h-[70vh] max-w-[1200px]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/80 to-transparent">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent block mb-1">
                    {filtered[lightboxIndex].category}
                  </span>
                  <h3 className="text-ink text-[18px] font-bold">{filtered[lightboxIndex].title}</h3>
                  <p className="text-ink-dim text-[13px] mt-1">{filtered[lightboxIndex].description}</p>
                </div>
              </motion.div>

              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] text-ink-faint">
                {lightboxIndex + 1} / {filtered.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
