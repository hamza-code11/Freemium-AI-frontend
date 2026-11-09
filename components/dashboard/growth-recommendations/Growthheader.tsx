// components/dashboard/growth-recommendations/Growthheader.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react'; // 🔥 Shirt hata diya
import { useProfile } from '@/context/ProfileContext';
import styles from './Growthheader.module.css';

interface Props {
  onGenerate: () => void;
  isGenerating: boolean;
  selectedBusinessId: number | null;
  onBusinessChange: (id: number) => void;
}

export default function GrowthHeader({
  onGenerate,
  isGenerating,
  selectedBusinessId,
  onBusinessChange,
}: Props) {
  const { user } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.business_profiles && user.business_profiles.length > 0 && selectedBusinessId === null) {
      onBusinessChange(user.business_profiles[0].id);
    }
  }, [user, selectedBusinessId, onBusinessChange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const businesses = user?.business_profiles || [];
  const activeBiz = businesses.find(b => b.id === selectedBusinessId) || businesses[0];

  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1 className={styles.title}>Growth Recommendations</h1>
        <p className={styles.subtitle}>
          Discover actionable ways to attract customers, increase sales, and grow your business with AI-powered insights.
        </p>
      </div>
      
      <div className={styles.actions}>
        {/* 🔥 Business Dropdown (Icon Removed) */}
        <div ref={dropdownRef} className={styles.businessWrapper}>
          <button
            type="button"
            className={styles.business}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={styles.bizText}>
              <strong>{activeBiz?.business_name || 'Select Business'}</strong>
              <small>{activeBiz?.business_type || 'No business found'}</small>
            </span>
            <ChevronDown size={14} className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`} />
          </button>

          {isOpen && businesses.length > 0 && (
            <div className={styles.dropdown}>
              {businesses.map(biz => (
                <button
                  key={biz.id}
                  type="button"
                  className={`${styles.dropdownItem} ${biz.id === selectedBusinessId ? styles.dropdownItemActive : ''}`}
                  onClick={() => { onBusinessChange(biz.id); setIsOpen(false); }}
                >
                  <span className={styles.dropdownBizName}>{biz.business_name}</span>
                  <span className={styles.dropdownBizType}>{biz.business_type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button type="button" className={styles.generate} onClick={onGenerate} disabled={isGenerating}>
          <Sparkles size={14} />
          {isGenerating ? 'Generating...' : 'Generate Recommendations'}
        </button>
      </div>
    </header>
  );
}
