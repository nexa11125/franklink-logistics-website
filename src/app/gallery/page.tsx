import type { Metadata } from 'next';
import GalleryPage from './GalleryPage';

export const metadata: Metadata = {
  title: 'Gallery | Frank Link Logistics',
  description:
    'Explore our logistics operations — warehousing, shipping, port operations, and cargo handling in action.',
};

export default function Page() {
  return <GalleryPage />;
}
