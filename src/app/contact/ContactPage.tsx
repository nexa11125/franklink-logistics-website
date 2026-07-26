'use client';

import { useState, type FormEvent } from 'react';
import Navbar from '@/components/franklink/Navbar';
import Footer from '@/components/franklink/Footer';
import PageHeader from '@/components/franklink/PageHeader';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const FORM_ACCESS_KEY = '3374c956-35c5-47cc-9c6e-91567c3c02d0';
const FORM_URL = 'https://api.web3forms.com/submit';

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: FORM_ACCESS_KEY, ...form }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const CONTACT_INFO = [
    {
      icon: MapPin,
      label: 'Address',
      value: 'C-1012A, Station Plaza, Station Road, Bhandup West, Mumbai — 400 078',
      href: null,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9967553458',
      href: 'tel:+919967553458',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@franklinklogistics.com',
      href: 'mailto:info@franklinklogistics.com',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon — Sat, 9:00 AM — 6:00 PM IST',
      href: null,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="Contact Us"
          subtitle="Have a shipment? Need a quote? We're here to help."
          breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
        />

        <section className="py-20 md:py-28 noise-bg">
          <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
              {/* Left — Contact Info Cards */}
              <div className="lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-8">
                  Reach Us
                </p>
                <div className="space-y-6">
                  {CONTACT_INFO.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.label} className="flex items-start gap-4 p-5 border border-[rgba(245,240,232,0.06)] hover:border-accent/20 transition-colors duration-300">
                        <div className="w-10 h-10 flex items-center justify-center border border-accent/20 text-accent shrink-0">
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint block mb-1">
                            {info.label}
                          </span>
                          {info.href ? (
                            <a href={info.href} className="text-ink-dim text-[14px] hover:text-ink transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-ink-dim text-[14px]">{info.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick CTA */}
                <div className="mt-8 flex gap-3">
                  <a
                    href="tel:+919967553458"
                    className="flex-1 py-3 text-center bg-accent text-background text-[11px] uppercase tracking-[0.12em] font-medium hover:bg-accent-dim transition-colors"
                  >
                    Call Now
                  </a>
                  <a
                    href="mailto:info@franklinklogistics.com"
                    className="flex-1 py-3 text-center text-ink text-[11px] uppercase tracking-[0.12em] border border-[rgba(245,240,232,0.2)] hover:border-ink transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </div>

              {/* Right — Contact Form */}
              <div className="lg:col-span-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-8">
                  Send us a message
                </p>

                {status === 'sent' ? (
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center mx-auto mb-4">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="text-ink text-[20px] font-medium mb-2">Message received.</p>
                      <p className="text-ink-dim text-[14px] mb-6">We&apos;ll get back to you within 24 hours.</p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="px-6 py-2.5 text-[12px] uppercase tracking-[0.12em] text-ink border border-[rgba(245,240,232,0.2)] hover:border-ink transition-colors"
                      >
                        Send Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="relative">
                        <input
                          type="text"
                          value={form.name}
                          onChange={handleChange('name')}
                          required
                          className="w-full bg-transparent text-ink text-[14px] pt-5 pb-3 border-b border-[rgba(245,240,232,0.12)] focus:border-accent focus:outline-none transition-colors placeholder:text-ink-faint/50"
                          placeholder=" "
                        />
                        <span className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint pointer-events-none">
                          Name *
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          value={form.email}
                          onChange={handleChange('email')}
                          required
                          className="w-full bg-transparent text-ink text-[14px] pt-5 pb-3 border-b border-[rgba(245,240,232,0.12)] focus:border-accent focus:outline-none transition-colors placeholder:text-ink-faint/50"
                          placeholder=" "
                        />
                        <span className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint pointer-events-none">
                          Email *
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="relative">
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={handleChange('phone')}
                          className="w-full bg-transparent text-ink text-[14px] pt-5 pb-3 border-b border-[rgba(245,240,232,0.12)] focus:border-accent focus:outline-none transition-colors placeholder:text-ink-faint/50"
                          placeholder=" "
                        />
                        <span className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint pointer-events-none">
                          Phone
                        </span>
                      </div>
                      <div className="relative">
                        <select
                          value={form.service}
                          onChange={handleChange('service')}
                          className="w-full bg-transparent text-ink text-[14px] pt-5 pb-3 border-b border-[rgba(245,240,232,0.12)] focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-surface text-ink">Select a service</option>
                          <option value="transportation" className="bg-surface text-ink">Transportation (Road)</option>
                          <option value="clearing-forwarding" className="bg-surface text-ink">Clearing & Forwarding</option>
                          <option value="customs" className="bg-surface text-ink">Custom Clearing Agent</option>
                          <option value="sea-freight" className="bg-surface text-ink">Sea Freight Forwarding</option>
                          <option value="air-freight" className="bg-surface text-ink">Air Freight Forwarding</option>
                          <option value="warehousing" className="bg-surface text-ink">Warehousing / Dock Stuffing</option>
                          <option value="insurance" className="bg-surface text-ink">Marine Insurance</option>
                          <option value="door-to-door" className="bg-surface text-ink">Door to Door Services</option>
                          <option value="other" className="bg-surface text-ink">Other</option>
                        </select>
                        <span className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint">
                          Service
                        </span>
                        <svg className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <textarea
                        value={form.message}
                        onChange={handleChange('message')}
                        placeholder="Tell us about your shipment..."
                        rows={5}
                        className="w-full bg-transparent text-ink text-[14px] pt-5 pb-3 border-b border-[rgba(245,240,232,0.12)] focus:border-accent focus:outline-none transition-colors resize-none placeholder:text-ink-faint/50"
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint">
                        Message
                      </span>
                    </div>

                    {status === 'error' && (
                      <p className="text-red text-[13px]">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full sm:w-auto px-10 py-3.5 bg-accent text-background text-[12px] uppercase tracking-[0.12em] font-medium hover:bg-accent-dim transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="border-t border-[rgba(245,240,232,0.06)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9!2d72.937!3d19.148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA4JzUyLjgiTiA3MsKwNTYnMTMuMiJF!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="400"
            style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(0.8)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Frank Link Logistics Location"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
