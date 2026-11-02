import type { Metadata } from 'next';
import HistoryHeader from '@/components/dashboard/history/HistoryHeader';
import HistoryFilters from '@/components/dashboard/history/HistoryFilters';
import HistoryTable from '@/components/dashboard/history/HistoryTable';
import styles from './History.module.css';

export const metadata: Metadata = {
  title: 'Generation History | Freemium AI',
  description: 'Access, organize, and reuse your previously generated AI content and campaign plans.',
};

export default function HistoryPage() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* 1. Top Stats & Header */}
      <HistoryHeader />

      {/* 2. Filters & Search Area */}
      <HistoryFilters />

      {/* 3. Data Table */}
      <HistoryTable />

    </div>
  );
}
