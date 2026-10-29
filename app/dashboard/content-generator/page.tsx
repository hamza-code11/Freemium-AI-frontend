import type { Metadata } from 'next';
import ContentGeneratorContent from '@/components/dashboard/content-generator/ContentGeneratorContent';

export const metadata: Metadata = {
  title: 'AI Content Generator | Freemium AI',
  description: 'Create engaging marketing content for your business in seconds with our AI-powered content generator.',
  alternates: { canonical: '/dashboard/content-generator' },
  openGraph: {
    title: 'AI Content Generator | Freemium AI',
    description: 'Create engaging marketing content for your business in seconds.',
    url: '/dashboard/content-generator',
    type: 'website',
  },
};

export default function ContentGeneratorPage() {
  return <ContentGeneratorContent />;
}
