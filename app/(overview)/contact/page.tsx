import type { Metadata } from 'next';
import ContactContent from '@/components/overview/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us | Freemium AI',
  description: 'Get in touch with the Freemium AI team. We are here to help you grow your business.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Freemium AI',
    description: 'Get in touch with the Freemium AI team.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
