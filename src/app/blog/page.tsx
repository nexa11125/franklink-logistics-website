import type { Metadata } from 'next';
import BlogPage from './BlogPage';

export const metadata: Metadata = {
  title: 'Blog | Frank Link Logistics',
  description:
    'Insights, tips, and updates on international freight forwarding, customs clearance, and logistics industry trends from Frank Link Logistics.',
};

export default function Page() {
  return <BlogPage />;
}
