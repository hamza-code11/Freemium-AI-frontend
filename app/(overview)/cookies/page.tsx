import type { Metadata } from 'next';
import CookiesContent from '@/components/overview/cookies/CookiesContent';

export const metadata: Metadata = {
  title: 'Cookie Policy | Freemium AI',
  description: 'Learn how Freemium AI uses cookies to improve your experience, analyze traffic, and personalize AI content.',
  alternates: { canonical: '/cookies' },
  openGraph: {
    title: 'Cookie Policy | Freemium AI',
    description: 'Learn how Freemium AI uses cookies to improve your experience.',
    url: '/cookies',
    type: 'website',
  },
};

export default function CookiePolicyPage() {
  return <CookiesContent />;
}
