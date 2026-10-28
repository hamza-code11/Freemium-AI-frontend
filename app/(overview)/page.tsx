import Hero from '@/components/overview/hero/Hero';
import Features from '@/components/overview/features/Features';
import Transformation from '@/components/overview/showcase/Showcase';
import HowItWorks from '@/components/overview/how-it-works/HowItWorks';
import Pricing from '@/components/overview/pricing/Pricing';

export const metadata = {
  title: 'Freemium AI | AI-Powered Business Growth',
  description: 'Empowering startups, freelancers, and small businesses with affordable AI-driven marketing and growth solutions.',
};


export default function OverviewPage() {
  return (
    <>
      <Hero />
      <Features />
      <Transformation />
      <HowItWorks />
      <Pricing />
    </>
  );
}
