import type { Metadata } from 'next';
import AboutContent from '@/components/overview/about/page';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Democratizing AI for every business. Learn about our mission to empower SMEs.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Freemium AI',
    description:
      'Democratizing AI for every business. Learn about our mission to empower SMEs.',
    url: '/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}