import type { Metadata } from 'next';
import ServicesPage from './ServicesPage';

export const metadata: Metadata = {
  title: 'Our Services | Frank Link Logistics',
  description:
    'Comprehensive logistics services including freight forwarding, customs clearance, air & sea freight, warehousing, and door-to-door cargo solutions.',
};

export default function Page() {
  return <ServicesPage />;
}
