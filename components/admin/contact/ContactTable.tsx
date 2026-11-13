'use client';

import React, { useState } from 'react';
import {
  Eye, Mail, MailOpen, Trash2, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { ContactMessage } from '@/services/admin-contact.service';
import ContactDetailModal from './ContactDetailModal';
import styles from './ContactTable.module.css';

interface Props {
  messages: ContactMessage[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  onMarkRead: (id: number, read: boolean) => void;
  onDelete: (id: number) => void;
}

export default function ContactTable({
  messages,
  loading,
  currentPage,
  totalPages,
  total,
  pageSize,
  onPageChange,
  onMarkRead,
  onDelete,
}: Props) {
  const [detail, setDetail] = useState<ContactMessage | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

  const openDetail = (msg: ContactMessage) => {
    setDetail(msg);
    if (!msg.is_read) onMarkRead(msg.id, true);
  };

  const confirmDeleteNow = (id: number) => {
    onDelete(id);
    setConfirmDelete(null);
  };

  return (
    <div className={styles.card}>
      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.loadingBox}>Loading…</div>
        ) : messages.length === 0 ? (
          <div className={styles.empty}>No messages found</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 24 }}></th>
                <th>From</th>
                <th>Subject</th>
                <th>Received</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr
                  key={m.id}
                  className={!m.is_read ? styles.unreadRow : ''}
                  onClick={() => openDetail(m)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{!m.is_read && <span className={styles.unreadDot} />}</td>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.avatarMini}>
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className={styles.name}>{m.name}</div>
                        <div className={styles.email}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.subjectCell}>
                    <div className={styles.subject}>{m.subject}</div>
                    <div className={styles.preview}>{m.message.slice(0, 80)}…</div>
                  </td>
                  <td className={styles.muted}>{fmtDate(m.created_at)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className={styles.actions}>
                      <button
                        className={styles.iconBtn}
                        onClick={() => openDetail(m)}
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        className={styles.iconBtn}
                        onClick={() => onMarkRead(m.id, !m.is_read)}
                        title={m.is_read ? 'Mark unread' : 'Mark read'}
                      >
                        {m.is_read ? <Mail size={14} /> : <MailOpen size={14} />}
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.danger}`}
                        onClick={() => setConfirmDelete(m.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
            Showing {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, total)} of {total}
          </span>
          <div className={styles.pageControls}>
            <button
              className={styles.pageArrow}
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft size={14} />
            </button>
            <span className={`${styles.pageNum} ${styles.active}`}>
              {currentPage}
            </span>
            <span className={styles.pageSep}>/ {totalPages}</span>
            <button
              className={styles.pageArrow}
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {detail && (
        <ContactDetailModal
          message={detail}
          onClose={() => setDetail(null)}
        />
      )}

      {confirmDelete !== null && (
        <div
          className={styles.confirmBackdrop}
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className={styles.confirmBox}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Delete this message?</h4>
            <p>This action cannot be undone.</p>
            <div className={styles.confirmActions}>
              <button
                onClick={() => setConfirmDelete(null)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDeleteNow(confirmDelete)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}