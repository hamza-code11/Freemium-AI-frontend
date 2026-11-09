// components/dashboard/help/HelpContent.tsx
'use client';

import React, { useState } from 'react';
import HelpBanner from './HelpBanner';
import HelpFAQ from './HelpFAQ';
import HelpForm from './HelpForm';
import HelpTickets from './HelpTickets';
import styles from './Help.module.css';

export default function HelpContent() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      
      {/* 1. Banner */}
      <HelpBanner />

      {/* 2. Two Column Grid: FAQ (Left) + Form (Right) */}
      <div className={styles.twoColumnGrid}>
        <HelpFAQ />
        <HelpForm onSuccess={handleFormSuccess} />
      </div>

      {/* 3. Tickets (Full Width) */}
      <HelpTickets refreshKey={refreshKey} />
    </div>
  );
}
