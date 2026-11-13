'use client';

import React, { useState } from 'react';
import ContactHeader from '@/components/admin/contact/ContactHeader';
import ContactFilters from '@/components/admin/contact/ContactFilters';
import ContactTable from '@/components/admin/contact/ContactTable';
import { useAdminContactMessages } from '@/hooks/useAdminContactMessages';
import styles from './Contact.module.css';

const PAGE_SIZE = 10;

export default function AdminContactPage() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [unreadOnly, setUnreadOnly] = useState(false);

  const {
    messages,
    loading,
    total,
    totalPages,
    unread,
    currentPage,
    setCurrentPage,
    markRead,
    remove,
  } = useAdminContactMessages({ search, unreadOnly, pageSize: PAGE_SIZE });

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    clearTimeout((window as any).__contactSearchTimer);
    (window as any).__contactSearchTimer = setTimeout(() => {
      setSearch(value.trim());
    }, 400);
  };

  return (
    <div className={styles.pageWrapper}>
      <ContactHeader unread={unread} total={total} />

      <ContactFilters
        search={searchInput}
        onSearchChange={handleSearchChange}
        unreadOnly={unreadOnly}
        onUnreadOnlyChange={setUnreadOnly}
      />

      <ContactTable
        messages={messages}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
        onMarkRead={markRead}
        onDelete={remove}
      />
    </div>
  );
}