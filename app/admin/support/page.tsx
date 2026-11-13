

'use client';

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Eye, Loader2 } from 'lucide-react';
import { useAdminSupportTickets } from '@/hooks/useAdminSupportTickets';
import SupportTicketModal from '@/components/admin/support/SupportTicketModal';
import styles from './Support.module.css';

const PAGE_SIZE = 10;

export default function AdminSupportPage() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const {
    tickets, loading, total, totalPages, currentPage, setCurrentPage, updateStatus
  } = useAdminSupportTickets(search, statusFilter, PAGE_SIZE);

  const handleSearch = (val: string) => {
    setSearchInput(val);
    clearTimeout((window as any).__suppTimer);
    (window as any).__suppTimer = setTimeout(() => setSearch(val.trim()), 400);
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <div>
          <div className={styles.breadcrumb}>Admin / Support</div>
          <h1 className={styles.title}>Support Tickets</h1>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search size={14} />
          <input
            type="text"
            placeholder="Search by ticket #, name, or email..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.select}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          {loading ? (
             <div className={styles.center}><Loader2 className="animate-spin" /></div>
          ) : tickets.length === 0 ? (
            <div className={styles.center}>No tickets found</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>User</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td className={styles.bold}>{t.ticket_number}</td>
                    <td>
                      <div className={styles.name}>{t.name}</div>
                      <div className={styles.email}>{t.email}</div>
                    </td>
                    <td className={styles.subject}>{t.subject}</td>
                    <td className={styles.muted}>{fmtDate(t.created_at)}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[t.status.replace(' ', '')]}`}>
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <button className={styles.iconBtn} onClick={() => setSelectedTicket(t)}>
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {total > 0 && (
          <div className={styles.pagination}>
            <span className={styles.pageInfo}>
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, total)} of {total}
            </span>
            <div className={styles.pageControls}>
              <button className={styles.pageArrow} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                <ChevronLeft size={14} />
              </button>
              <span className={styles.pageNum}>{currentPage} / {totalPages}</span>
              <button className={styles.pageArrow} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedTicket && (
        <SupportTicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onStatusChange={updateStatus}
        />
      )}
    </div>
  );
}
