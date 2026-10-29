'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Contact.module.css';

const faqs = [
  {
    q: "How quickly will I get a response?",
    a: "We typically respond within 24 business hours. Premium users get priority support with response times under 4 hours."
  },
  {
    q: "Can I request a custom demo?",
    a: "Absolutely! Choose \"Request Demo\" in the subject line, and our sales team will schedule a personalized walkthrough."
  },
  {
    q: "Do you offer enterprise pricing?",
    a: "Yes. For custom needs, higher usage limits, and dedicated support, reach out to sales@freemiumai.com for a quote."
  },
  {
    q: "Is my data secure?",
    a: "100%. We use industry-standard encryption and never share your data."
  }
];

export default function ContactContent() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* ================= HERO WITH FORM ================= */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          
          <div className={styles.heroText}>
            <div className={styles.badge}>Get in Touch</div>
            <h1 className={styles.heroTitle}>
              Let's build something <br />
              <span className={styles.highlight}>great together.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Whether you have a question about our AI features, need a custom enterprise solution, or just want to say hello—we're here to help.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <div>
                  <span className={styles.detailLabel}>Email</span>
                  <a href="mailto:support@freemiumai.com" className={styles.detailLink}>support@freemiumai.com</a>
                </div>
              </div>
              <div className={styles.detailItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <div>
                  <span className={styles.detailLabel}>Sales</span>
                  <a href="mailto:sales@freemiumai.com" className={styles.detailLink}>sales@freemiumai.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formWrapper}>
            {formStatus === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
                <button className={styles.resetBtn} onClick={() => setFormStatus('idle')}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Send us a message</h2>
                
                <div className={styles.formGroup}>
                  <input type="text" placeholder="Full Name" required />
                </div>
                <div className={styles.formGroup}>
                  <input type="email" placeholder="Work Email" required />
                </div>
                <div className={styles.formGroup}>
                  <input type="text" placeholder="Company Name (Optional)" />
                </div>
                <div className={styles.formGroup}>
                  <textarea rows={3} placeholder="Tell us about your project..." required></textarea>
                </div>
                
                <button type="submit" className={styles.submitBtn} disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ================= INFO ROW ================= */}
      <section className={styles.infoRow}>
        <div className={styles.infoRowContainer}>
          <div className={styles.infoBlock}>
            <h3>Office Location</h3>
            <p>123 Innovation Drive<br />Tech City, TC 10001</p>
          </div>
          <div className={styles.infoBlock}>
            <h3>Business Hours</h3>
            <p>Monday - Friday<br />9:00 AM - 6:00 PM (PST)</p>
          </div>
          <div className={styles.infoBlock}>
            <h3>Follow Us</h3>
            <div className={styles.socialLinks}>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION (ACCORDION) ================= */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2>Frequently Asked Questions</h2>
          <p>Can't find the answer you're looking for? <Link href="/contact" className={styles.inlineLink}>Chat with us</Link></p>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.accordionItem} ${openFaq === index ? styles.active : ''}`}
            >
              <button 
                className={styles.accordionHeader} 
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
              >
                <span>{faq.q}</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={styles.accordionIcon}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className={styles.accordionContent}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
