import type { Metadata } from 'next';
import AboutPage from './AboutPage';

export const metadata: Metadata = {
  title: 'About Us | Frank Link Logistics',
  description:
    'Learn about Frank Link Logistics — 15+ years of freight forwarding, customs clearance, and logistics excellence from Mumbai, India.',
};

export default function Page() {
  return <AboutPage />;
}
