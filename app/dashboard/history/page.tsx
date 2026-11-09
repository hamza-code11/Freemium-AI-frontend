// app/dashboard/history/page.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';
import HistoryPageContent from '@/components/dashboard/history/HistoryPageContent';

export const metadata: Metadata = {
  title: 'Generation History | Freemium AI',
  description: 'Access, organize, and reuse your previously generated AI content and campaign plans.',
};

export default function HistoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HistoryPageContent />
    </Suspense>
  );
}