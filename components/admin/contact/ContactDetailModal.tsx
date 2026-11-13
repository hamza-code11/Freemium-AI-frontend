'use client';

import React, { useEffect } from 'react';
import { X, Mail, Calendar, User } from 'lucide-react';
import { ContactMessage } from '@/services/admin-contact.service';
import styles from './ContactDetailModal.module.css';

interface Props {
  message: ContactMessage;
  onClose: () => void;
}

export default function ContactDetailModal({ message, onClose }: Props) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

  // Gmail compose URL — opens in new tab with `to` prefilled
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    message.email,
  )}&su=${encodeURIComponent(`Re: ${message.subject}`)}`;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* HEADER — user name as title */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{message.name}</h2>
            <div className={styles.meta}>
              {/* <span><User size={12} /> {message.name}</span> */}
              <span><Mail size={12} /> {message.email}</span>
              <span><Calendar size={12} /> {fmtDate(message.created_at)}</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY — subject + message */}
        <div className={styles.body}>
          <div className={styles.subjectWrap}>
            <span className={styles.subjectLabel}>Subject</span>
            <h3 className={styles.subject}>{message.subject}</h3>
          </div>

          <div className={styles.messageWrap}>
            <span className={styles.subjectLabel}>Message</span>
            <p className={styles.message}>{message.message}</p>
          </div>
        </div>

        {/* FOOTER — only Reply via Gmail */}
        <div className={styles.footer}>
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.replyBtn}
          >
            Reply via Gmail
          </a>
        </div>
      </div>
    </div>
  );
}