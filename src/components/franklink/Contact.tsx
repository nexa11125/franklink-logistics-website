'use client';

import { useState, type FormEvent } from 'react';

const FORM_ACCESS_KEY = '3374c956-35c5-47cc-9c6e-91567c3c02d0';
const FORM_URL = 'https://api.web3forms.com/submit';

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function Contact() {
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

  return (
    <section id="contact" className="relative py-28 md:py-40 border-t border-[rgba(245,240,232,0.06)] noise-bg">
      <div className="relative z-[3] max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Left — contact info */}
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-8">
              Get in touch
            </p>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-ink mb-10">
              Let&apos;s move
              <br />
              your cargo.
            </h2>

            <div className="space-y-5 text-[14px]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint block mb-1">Address</span>
                <p className="text-ink-dim leading-relaxed">
                  C-1012A, Station Plaza, Station Road,<br />
                  Bhandup West, Mumbai — 400 078
                </p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint block mb-1">Phone</span>
                <a href="tel:+919967553458" className="text-ink-dim hover:text-ink transition-colors">
                  +91 9967553458
                </a>
                <br />
                <a href="tel:02225669551" className="text-ink-dim hover:text-ink transition-colors">
                  022 25669551
                </a>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint block mb-1">Email</span>
                <a href="mailto:info@franklinklogistics.com" className="text-ink-dim hover:text-ink transition-colors">
                  info@franklinklogistics.com
                </a>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint block mb-1">Hours</span>
                <p className="text-ink-dim">Mon — Sat, 9:00 AM — 6:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-8">
            {status === 'sent' ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center mx-auto mb-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-ink text-[18px] font-medium mb-2">Message received.</p>
                  <p className="text-ink-dim text-[14px]">We&apos;ll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <UnderlineInput
                    label="Name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    required
                  />
                  <UnderlineInput
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <UnderlineInput
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                  />
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
                    {/* Dropdown arrow */}
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
                    rows={4}
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
  );
}

function UnderlineInput({
  label,
  type,
  value,
  onChange,
  required = false,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent text-ink text-[14px] pt-5 pb-3 border-b border-[rgba(245,240,232,0.12)] focus:border-accent focus:outline-none transition-colors placeholder:text-ink-faint/50"
        placeholder=" "
      />
      <span className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint pointer-events-none">
        {label}
      </span>
    </div>
  );
}