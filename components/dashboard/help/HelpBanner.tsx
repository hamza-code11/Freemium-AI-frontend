// components/dashboard/help/HelpBanner.tsx
'use client';

import React from 'react';
import { Headset, MessageSquare } from 'lucide-react';
import styles from './HelpBanner.module.css';

export default function HelpBanner() {
  return (
    <div className={styles.banner}>
      
      {/* Left: Icon + Text */}
      <div className={styles.bannerLeft}>
        <div className={styles.iconBadge}>
          <Headset size={26} />
        </div>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Help & Support</h1>
          <p className={styles.subtitle}>
            We&apos;re here to help you resolve issues and make the most of Freemium AI.
          </p>
        </div>
      </div>

      {/* Right: Illustration */}
      <div className={styles.bannerRight}>
        {/* Floating chat bubble */}
        <div className={styles.chatBubble}>
          <MessageSquare size={14} />
        </div>
        
        {/* Sparkle accents */}
        <span className={styles.sparkle1}>✦</span>
        <span className={styles.sparkle2}>✦</span>
        
        {/* Headphones Illustration */}
        <svg 
          className={styles.headphonesSvg}
          viewBox="0 0 120 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Headband */}
          <path 
            d="M20 50 C20 25, 45 10, 60 10 C75 10, 100 25, 100 50" 
            stroke="#475569" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
          {/* Left Ear Cup */}
          <rect x="12" y="48" width="18" height="32" rx="8" fill="#1e293b" />
          <rect x="16" y="52" width="10" height="24" rx="4" fill="#3b82f6" opacity="0.8" />
          
          {/* Right Ear Cup */}
          <rect x="90" y="48" width="18" height="32" rx="8" fill="#1e293b" />
          <rect x="94" y="52" width="10" height="24" rx="4" fill="#3b82f6" opacity="0.8" />
        </svg>
        
        {/* Laptop Base */}
        <div className={styles.laptop}>
          <div className={styles.laptopKeyboard} />
          <div className={styles.laptopBase} />
        </div>
      </div>

    </div>
  );
}