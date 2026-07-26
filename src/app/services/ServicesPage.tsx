'use client';

import Navbar from '@/components/franklink/Navbar';
import Footer from '@/components/franklink/Footer';
import PageHeader from '@/components/franklink/PageHeader';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Ship, Plane, Truck, Warehouse, Shield, FileText,
  Package, Globe, ClipboardCheck, Anchor, MapPin, ArrowRight,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Truck,
    title: 'Transportation (Road)',
    description: 'Reliable road freight across India with GPS-tracked vehicles, ensuring safe and timely delivery of your cargo to ports and inland destinations.',
  },
  {
    icon: ClipboardCheck,
    title: 'Clearing & Forwarding Agent',
    description: 'Licensed CHA services for seamless customs clearance at all major Indian ports, handling documentation and regulatory compliance with expertise.',
  },
  {
    icon: Globe,
    title: 'Logistics Solutions',
    description: 'Comprehensive end-to-end logistics management — from supply chain planning to final delivery, optimized for cost and efficiency.',
  },
  {
    icon: FileText,
    title: 'Custom Clearing Agent',
    description: 'Expert navigation of Indian customs regulations, duty assessments, and compliance requirements for smooth import-export operations.',
  },
  {
    icon: Shield,
    title: 'Marine Insurance',
    description: 'Protect your valuable cargo with comprehensive marine insurance coverage, providing peace of mind for every shipment across the globe.',
  },
  {
    icon: Warehouse,
    title: 'Warehousing / Dock Stuffing',
    description: 'State-of-the-art warehousing facilities with dock stuffing services near all major ports, ensuring efficient container loading and storage.',
  },
  {
    icon: Anchor,
    title: 'International Freight Forwarders',
    description: 'Global freight forwarding network connecting your business to 40+ countries, with dedicated agents and partners worldwide.',
  },
  {
    icon: Ship,
    title: 'Sea Freight Forwarding',
    description: 'FCL and LCL ocean freight solutions with competitive rates, reliable transit times, and full container tracking from origin to destination.',
  },
  {
    icon: Plane,
    title: 'Air Freight Forwarding',
    description: 'Time-critical air cargo services with express, standard, and charter options, connecting to major airports worldwide.',
  },
  {
    icon: MapPin,
    title: 'Door to Door Services',
    description: 'Complete door-to-door cargo delivery handling pickup, packaging, customs clearance, freight, and last-mile delivery — all under one roof.',
  },
  {
    icon: Package,
    title: 'Cargo Handling Services',
    description: 'Professional cargo handling for all types of goods including hazardous, perishable, and oversized shipments with specialized equipment.',
  },
];

const ADDITIONAL_SERVICES = [
  {
    title: 'Fumigation & Phytosanitary Certificate',
    description: 'ISPM-15 compliant fumigation services and phytosanitary certification for agricultural and wood packaging exports.',
  },
  {
    title: 'Palletisation / Fumigation',
    description: 'Professional palletisation and fumigation services ensuring your cargo meets international packaging and quarantine standards.',
  },
  {
    title: 'Export Import Consultancy',
    description: 'Strategic guidance on trade regulations, tariff optimization, documentation, and compliance for new and experienced exporters.',
  },
  {
    title: 'Certificate of Origin & Legalisation',
    description: 'Procurement of Certificates of Origin and legalisation of export documents through various consulates and chambers of commerce.',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="Our Services"
          subtitle="End-to-end logistics solutions tailored to move your cargo across borders, efficiently and reliably."
          breadcrumbs={[{ label: 'Services', href: '/services' }]}
        />

        {/* Core Services Grid */}
        <section className="py-20 md:py-28 noise-bg">
          <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-10">Core Operations</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group relative p-6 md:p-8 border border-[rgba(245,240,232,0.06)] hover:border-accent/30 transition-all duration-300 bg-surface/40"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center border border-accent/20 text-accent shrink-0 group-hover:bg-accent/10 transition-colors duration-300">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-ink text-[17px] font-bold leading-tight pt-1.5">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-ink-dim text-[13px] leading-relaxed">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 mt-5 text-accent text-[11px] uppercase tracking-[0.12em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Get a Quote <ArrowRight size={12} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 md:py-28 border-t border-[rgba(245,240,232,0.06)]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-10">Also Available</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ADDITIONAL_SERVICES.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 border-l-2 border-accent/20 hover:border-accent transition-colors duration-300"
                >
                  <h3 className="text-ink text-[16px] font-bold mb-2">{service.title}</h3>
                  <p className="text-ink-dim text-[13px] leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 border-t border-[rgba(245,240,232,0.06)] noise-bg">
          <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-4">Ready to get started?</p>
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold leading-[1.1] tracking-[-0.02em] text-ink mb-6">
              Let us handle your<br />
              <span className="text-accent">logistics</span>.
            </h2>
            <p className="text-ink-dim text-[15px] max-w-[500px] mx-auto mb-10">
              Tell us about your shipment and get a free quote within 24 hours. No commitment, no hassle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-accent text-background text-[12px] uppercase tracking-[0.12em] font-medium hover:bg-accent-dim transition-colors duration-200"
              >
                Request a Quote
              </Link>
              <a
                href="tel:+919967553458"
                className="px-8 py-3.5 text-ink text-[12px] uppercase tracking-[0.12em] border border-[rgba(245,240,232,0.2)] hover:border-ink transition-colors duration-200"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
