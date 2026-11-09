// components/dashboard/home/BusinessCard.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, ChevronDown, Sprout, Users } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import styles from './BusinessCard.module.css';

// 🔥 Audience Labels
const AUDIENCE_LABELS: Record<string, string> = {
  kids_men: 'Kids (Men)', kids_women: 'Kids (Women)',
  teenagers_men: 'Teenagers (Men)', teenagers_women: 'Teenagers (Women)',
  young_adults_men: 'Young Adults (Men)', young_adults_women: 'Young Adults (Women)',
  young_men: 'Young Men', young_women: 'Young Women',
  middle_age_men: 'Middle Age (Men)', middle_age_women: 'Middle Age (Women)',
  seniors_men: 'Seniors (Men)', seniors_women: 'Seniors (Women)',
};

export default function BusinessCard() {
  const { user } = useProfile();
  const businesses = user?.business_profiles || [];
  
  const [selectedBizId, setSelectedBizId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load first business by default
  useEffect(() => {
    if (businesses.length > 0 && selectedBizId === null) {
      setSelectedBizId(businesses[0].id);
    }
  }, [businesses, selectedBizId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const business = businesses.find(b => b.id === selectedBizId) || businesses[0];

  const audienceText = business?.target_audience && business.target_audience.length > 0
    ? business.target_audience
        .slice(0, 2)
        .map((a) => AUDIENCE_LABELS[a] || a)
        .join(', ')
    : 'Not specified';

  const details = [
    {
      icon: Building2,
      label: 'Industry',
      value: business?.business_type || 'Not specified',
    },
    {
      icon: Users,
      label: 'Target Audience',
      value: audienceText,
    },
  ];

  if (!business) {
    return (
      <section className={styles.card} aria-labelledby="biz-title">
        <div className={styles.cardHead}>
          <h2 id="biz-title" className={styles.cardTitle}>Your Business</h2>
          <Link href="/dashboard/profile" className={styles.link}>
            Create Profile <ArrowRight size={12} />
          </Link>
        </div>
        <div className={styles.emptyState}>
          <Building2 size={32} />
          <p>No business profile yet.</p>
          <Link href="/dashboard/profile" className={styles.emptyLink}>
            Add your first business →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.card} aria-labelledby="biz-title">
      
      {/* Header */}
      <div className={styles.cardHead}>
        <h2 id="biz-title" className={styles.cardTitle}>Your Business</h2>
        <Link href="/dashboard/profile" className={styles.link}>
          Manage Profile <ArrowRight size={12} />
        </Link>
      </div>

      <div className={styles.profileRow}>
        
        {/* Left: Identity with Dropdown */}
        <div className={styles.left}>
          <div className={styles.identityWrapper} ref={dropdownRef}>
            
            {/* Clickable Identity with Chevron */}
            <button
              type="button"
              className={styles.identityBtn}
              onClick={() => setIsOpen(!isOpen)}
              disabled={businesses.length <= 1}
              aria-expanded={isOpen}
            >
              <div className={styles.avatar}>
                <Sprout size={26} />
              </div>
              <div className={styles.identityText}>
                <div className={styles.nameRow}>
                  <span className={styles.name}>
                    {business.business_name || 'Untitled Business'}
                  </span>
                  {businesses.length > 1 && (
                    <ChevronDown 
                      size={16} 
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    />
                  )}
                </div>
                <div className={styles.niche}>
                  {business.business_type || 'Business'}
                </div>
                <span className={`${styles.badge} ${styles.toneGreen} ${styles.active}`}>
                  ● Active
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && businesses.length > 1 && (
              <div className={styles.dropdown}>
                {businesses.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`${styles.dropdownItem} ${b.id === selectedBizId ? styles.dropdownItemActive : ''}`}
                    onClick={() => {
                      setSelectedBizId(b.id);
                      setIsOpen(false);
                    }}
                  >
                    <span className={styles.dropdownName}>{b.business_name}</span>
                    <span className={styles.dropdownType}>{b.business_type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className={styles.details}>
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className={styles.detail}>
              <Icon size={16} className={styles.detailIcon} />
              <div>
                <div className={styles.dLabel}>{label}</div>
                <div className={styles.dValue}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
