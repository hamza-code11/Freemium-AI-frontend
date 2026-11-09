import type { Metadata } from 'next';
import GrowthRecommendationsContent from '@/components/dashboard/growth-recommendations/GrowthRecommendationsContent';

export const metadata: Metadata = {
  title: 'Growth Recommendations | Freemium AI',
  description: 'Discover actionable ways to attract customers, increase sales, and grow your business with AI-powered insights.',
  alternates: { canonical: '/dashboard/growth-recommendations' },
  openGraph: {
    title: 'Growth Recommendations | Freemium AI',
    description: 'Actionable, AI-powered ways to grow your business.',
    url: '/dashboard/growth-recommendations',
    type: 'website',
  },
};

export default function GrowthRecommendationsPage() {
  return <GrowthRecommendationsContent />;
}
