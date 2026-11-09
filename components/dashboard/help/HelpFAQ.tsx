// components/dashboard/help/HelpFAQ.tsx
'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import styles from './HelpFAQ.module.css';

const FAQS = [
  {
    q: 'How does AI content generation work?',
    a: 'Freemium AI uses advanced language models to generate high-quality content based on your business profile, target audience, tone, and instructions. Fill out the form, provide context, and click "Generate" to receive customized content within seconds.',
  },
  {
    q: 'Why is my AI content generation failing?',
    a: 'AI generation can fail due to network issues, rate limits, or invalid inputs. Ensure your topic, target audience, and language are filled correctly. If the issue persists, submit a support ticket with the error message.',
  },
  {
    q: 'How do I reset my password?',
    a: 'Click "Forgot Password" on the login page. We will send a 6-digit OTP to your registered email. Use that OTP to set a new password. If you don\'t receive the email within 5 minutes, check your spam folder or try again.',
  },
  {
    q: 'Can I manage multiple businesses in one account?',
    a: 'Yes! Freemium AI supports multiple business profiles under a single account. You can add, edit, or switch between businesses from the Profile page. Each business gets its own content, campaigns, and recommendations.',
  },
  {
    q: 'How can I manage my account?',
    a: 'Navigate to Profile Settings from the header dropdown. From there, you can update your name, email, profile picture, password, and manage connected business profiles.',
  },
  {
    q: 'How do I report a technical issue?',
    a: 'Use the "Submit a Request" form on this page. Describe the problem in detail and attach screenshots if possible. Our team will respond within 3 Days.',
  },
];

export default function HelpFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <BookOpen size={18} />
        </div>
        <div>
          <h2 className={styles.cardTitle}>Frequently Asked Questions</h2>
          <p className={styles.cardSubtitle}>
            Quick answers to common questions about Freemium AI.
          </p>
        </div>
      </div>

      <div className={styles.faqList}>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className={`${styles.faqItem} ${openIndex === i ? styles.faqOpen : ''}`}
          >
            <button
              type="button"
              className={styles.faqQuestion}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span>{faq.q}</span>
              <ChevronDown
                size={18}
                className={`${styles.faqChevron} ${openIndex === i ? styles.faqChevronOpen : ''}`}
              />
            </button>
            {openIndex === i && (
              <div className={styles.faqAnswer}>
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
