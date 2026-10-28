'use client';

import React from 'react';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  product: [
    { label: 'AI Content Generator', href: '#features' },
    { label: 'Campaign Planner', href: '#features' },
    { label: 'Analytics & Reports', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* TOP SECTION: Links */}
        <div className={styles.footerTop}>
          
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoText}>Freemium AI</span>
            </a>
            <p className={styles.tagline}>
              Make AI-powered marketing and business growth accessible, simple and affordable for everyone.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Twitter" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" aria-label="GitHub" className={styles.socialIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Product</h4>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.product.map((link, i) => (
                <li key={i}><a href={link.href} className={styles.link}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.company.map((link, i) => (
                <li key={i}><a href={link.href} className={styles.link}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Legal</h4>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.legal.map((link, i) => (
                <li key={i}><a href={link.href} className={styles.link}>{link.label}</a></li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Freemium AI. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>All systems operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
