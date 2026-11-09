// components/dashboard/history/HistoryPageContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import HistoryHeader from './HistoryHeader';
import HistoryFilters from './HistoryFilters';
import HistoryTable from './HistoryTable';
import styles from './History.module.css';

export default function HistoryPageContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';

  const [filters, setFilters] = useState<{
    type_filter: string;
    date_range: string;
    custom_from: string;
    custom_to: string;
    sort: string;
    search: string;
    page: number;
  }>({
    type_filter: initialType,
    date_range: 'all',
    custom_from: '',
    custom_to: '',
    sort: 'latest',
    search: '',
    page: 1,
  });

  // URL change par filters update karein
  useEffect(() => {
    const paramType = searchParams.get('type');
    if (paramType && paramType !== filters.type_filter) {
      setFilters((prev) => ({ ...prev, type_filter: paramType, page: 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateFilters = (patch: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }));
  };

  return (
    <div className={styles.pageWrapper}>
      <HistoryHeader />
      
      <HistoryFilters 
        filters={filters}
        onChange={updateFilters}
      />
      
      <HistoryTable 
        filters={filters}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
}