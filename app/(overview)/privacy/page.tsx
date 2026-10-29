import type { Metadata } from 'next';
import PrivacyContent from '@/components/overview/privacy/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | Freemium AI',
  description: 'Learn how Freemium AI collects, uses, and protects your business data. We are committed to transparency and data security.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Freemium AI',
    description: 'Learn how Freemium AI collects, uses, and protects your business data.',
    url: '/privacy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
