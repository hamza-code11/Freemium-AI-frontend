'use client';

import React, { useEffect } from 'react';
import { X, Calendar, User, Mail, Paperclip } from 'lucide-react';
import { SupportTicket, TicketStatus } from '@/services/admin-support.service';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import styles from './SupportTicketModal.module.css';

interface Props {
  ticket: SupportTicket;
  onClose: () => void;
  onStatusChange: (id: number, status: TicketStatus) => void;
}

export default function SupportTicketModal({ ticket, onClose, onStatusChange }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

  const attachUrl = ticket.attachment ? `${getUploadsBaseUrl()}/support/${ticket.attachment}` : null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.tktNum}>{ticket.ticket_number}</span>
            <h2 className={styles.title}>{ticket.subject}</h2>
            <div className={styles.meta}>
              <span><User size={12} /> {ticket.name}</span>
              <span><Mail size={12} /> {ticket.email}</span>
              <span><Calendar size={12} /> {fmtDate(ticket.created_at)}</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.field}>
            <label>Description</label>
            <div className={styles.descBox}>{ticket.description}</div>
          </div>

          {attachUrl && (
            <div className={styles.field}>
              <label>Attachment</label>
              <a href={attachUrl} target="_blank" rel="noopener noreferrer" className={styles.attachBtn}>
                <Paperclip size={16} /> View Attachment
              </a>
            </div>
          )}
        </div>

        {/* Footer (Status) */}
        <div className={styles.footer}>
          <div className={styles.statusWrap}>
            <label>Change Status:</label>
            <select
              value={ticket.status}
              onChange={(e) => onStatusChange(ticket.id, e.target.value as TicketStatus)}
              className={styles.select}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <button onClick={onClose} className={styles.closeFooterBtn}>Close</button>
        </div>

      </div>
    </div>
  );
}
