import type { Metadata } from 'next';
import TermsContent from '@/components/overview/terms/TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service | Freemium AI',
  description: 'Read the Terms of Service for using Freemium AI. Understand your rights, responsibilities, and our AI content policies.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | Freemium AI',
    description: 'Read the Terms of Service for using Freemium AI.',
    url: '/terms',
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  return <TermsContent />;
}
