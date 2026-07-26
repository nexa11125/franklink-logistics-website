import type { Metadata } from 'next';
import ContactPage from './ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us | Frank Link Logistics',
  description:
    'Get in touch with Frank Link Logistics for freight forwarding, customs clearance, and logistics solutions. Located in Mumbai, India.',
};

export default function Page() {
  return <ContactPage />;
}
