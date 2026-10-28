import React from 'react';
import { redirect } from 'next/navigation';
import AboutContent from '@/components/overview/about/page';

export const metadata = {
  title: 'About | Freemium AI',
  description: 'Democratizing AI for every business. Learn about our mission to empower SMEs.',
};

export default async function AboutPage() {
  try {
    return <AboutContent />;
  } catch (error) {
    redirect('/404');
  }
}