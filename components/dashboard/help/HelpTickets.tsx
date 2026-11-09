// components/dashboard/help/HelpTickets.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Ticket,
  Clock,
  AlertCircle,
  CheckCircle2,
  X,
  Calendar,
  Paperclip,
} from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import toast from 'react-hot-toast';
import { supportService, SupportTicket } from '@/services/support.service';
import styles from './HelpTickets.module.css';

const STATUS_STYLES: Record<string, { icon: React.ElementType; className: string }> = {
  Pending: { icon: Clock, className: 'statusPending' },
  'In Progress': { icon: AlertCircle, className: 'statusProgress' },
  Resolved: { icon: CheckCircle2, className: 'statusResolved' },
};

const PAGE_SIZE = 5;

// 🔥 Props me refreshKey (jab form submit ho, parent refreshKey badhayega)
interface Props {
  refreshKey?: number;
}

export default function HelpTickets({ refreshKey = 0 }: Props) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchTickets = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await supportService.getTickets(page, PAGE_SIZE);
      setTickets(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);
      setCurrentPage(res.page);
    } catch (err: any) {
      const msg = err.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔥 Fetch when page changes OR refreshKey changes
  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage, refreshKey, fetchTickets]);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.iconWrapper}>
              <Ticket size={18} />
            </div>
            <div>
              <h2 className={styles.cardTitle}>My Support Tickets</h2>
              <p className={styles.cardSubtitle}>
                Track your submitted requests and their current status.
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 Loading State */}
        {loading ? (
          <div className={styles.emptyState}>
            <p>Loading tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          // 🔥 Empty State
          <div className={styles.emptyState}>
            <Ticket size={32} />
            <p>No tickets yet. Submit a request above.</p>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Subject</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => {
                    const statusInfo = STATUS_STYLES[ticket.status] || STATUS_STYLES.Pending;
                    const StatusIcon = statusInfo.icon;

                    return (
                      <tr key={ticket.id}>
                        <td className={styles.ticketId}>{ticket.ticket_number}</td>
                        <td className={styles.ticketSubject}>{ticket.subject}</td>
                        <td className={styles.ticketDate}>
                          {new Date(ticket.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[statusInfo.className]}`}>
                            <StatusIcon size={12} />
                            {ticket.status}
                          </span>
                        </td>
                        <td className={styles.ticketActions}>
                          <button
                            type="button"
                            className={styles.viewBtn}
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 🔥 Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={total}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* 🔥 View Modal */}
      {selectedTicket && (
        <TicketViewModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </>
  );
}

// ============================================
// TICKET VIEW MODAL
// ============================================
function TicketViewModal({
  ticket,
  onClose,
}: {
  ticket: SupportTicket;
  onClose: () => void;
}) {
  const statusInfo = STATUS_STYLES[ticket.status] || STATUS_STYLES.Pending;
  const StatusIcon = statusInfo.icon;

  const date = new Date(ticket.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <div className={styles.iconWrapper}>
              <Ticket size={18} />
            </div>
            <div>
              <h2 className={styles.modalTitle}>{ticket.subject}</h2>
              <span className={styles.ticketId}>{ticket.ticket_number}</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Meta Row */}
        <div className={styles.modalMeta}>
          <div className={styles.metaItem}>
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={`${styles.statusBadge} ${styles[statusInfo.className]}`}>
              <StatusIcon size={12} />
              {ticket.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className={styles.modalBody}>
          <h3 className={styles.modalSectionTitle}>Description</h3>
          <p className={styles.modalDescription}>{ticket.description}</p>

          {/* 🔥 Attachment (if exists) */}
          {ticket.attachment && (
            <div className={styles.attachmentRow}>
              <Paperclip size={14} />
              <a
                href={`${process.env.NEXT_PUBLIC_STORAGE_URL}/support/${ticket.attachment}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.attachmentLink}
              >
                View Attachment
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button className={styles.secondaryBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
