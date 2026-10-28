import type { Metadata } from 'next';
import JsonLd from '@/components/seo/json-ld';
import Hero from '@/components/overview/hero/Hero';
import Features from '@/components/overview/features/Features';
import Transformation from '@/components/overview/showcase/Showcase';
import HowItWorks from '@/components/overview/how-it-works/HowItWorks';
import Pricing from '@/components/overview/pricing/Pricing';

export const metadata: Metadata = {
  title: { absolute: 'Freemium AI | AI-Powered Business Growth' },
  description:
    'Empowering startups, freelancers, and small businesses with affordable AI-driven marketing and growth solutions.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Freemium AI | AI-Powered Business Growth',
    description:
      'Empowering startups, freelancers, and small businesses with affordable AI-driven marketing and growth solutions.',
    url: '/',
    images: [
      { url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Freemium AI' },
    ],
  },
};

export default function OverviewPage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Features />
      <Transformation />
      <HowItWorks />
      <Pricing />
    </>
  );
}