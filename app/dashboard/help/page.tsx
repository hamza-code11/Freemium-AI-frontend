// app/dashboard/help/page.tsx
import type { Metadata } from 'next';
import HelpContent from '@/components/dashboard/help/HelpContent';

export const metadata: Metadata = {
  title: 'Help & Support | Freemium AI',
  description: 'Get help, submit support tickets, and find answers to frequently asked questions.',
};

export default function HelpPage() {
  return <HelpContent />;
}
