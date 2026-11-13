'use client';

import React from 'react';
import { Mail, Inbox } from 'lucide-react';
import styles from './ContactHeader.module.css';

interface Props {
  unread: number;
  total: number;
}

export default function ContactHeader({ unread, total }: Props) {
  return (
    <div className={styles.header}>
      <div>
        <div className={styles.breadcrumb}>Admin / Contact Messages</div>
        <h1 className={styles.title}>Contact Messages</h1>
        <p className={styles.subtitle}>
          View and manage messages submitted through the public contact form.
        </p>
      </div>

      <div className={styles.headerStats}>
        <div className={styles.statPill}>
          <Inbox size={14} />
          <span>{total.toLocaleString()} total</span>
        </div>
        {unread > 0 && (
          <div className={`${styles.statPill} ${styles.statUnread}`}>
            <Mail size={14} />
            <span>{unread} unread</span>
          </div>
        )}
      </div>
    </div>
  );
}