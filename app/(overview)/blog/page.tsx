import type { Metadata } from 'next';
import BlogContent from '@/components/overview/blog/page';

export const metadata: Metadata = {
  title: 'Blog | Freemium AI',
  description: 'Read the latest insights, guides, and news about AI-powered business growth, marketing strategies, and startup tips.',
  keywords: ['AI marketing', 'business growth', 'startup tips', 'AI content generation', 'Freemium AI blog'],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Freemium AI',
    description: 'Read the latest insights, guides, and news about AI-powered business growth.',
    url: '/blog',
    siteName: 'Freemium AI',
    type: 'website',
    images: [
      {
        url: '/og/blog-cover.jpg', 
        width: 1200,
        height: 630,
        alt: 'Freemium AI Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Freemium AI',
    description: 'Read the latest insights, guides, and news about AI-powered business growth.',
    images: ['/og/blog-cover.jpg'],
  },
};

export default function BlogPage() {
  return <BlogContent />;
}