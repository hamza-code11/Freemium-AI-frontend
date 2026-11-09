// components/dashboard/content-generator/ContentGeneratorForm.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight, ChevronDown, Globe, PlayCircle, Megaphone,
  Package, Smile, Sparkles, Film, Video
} from 'lucide-react';
import styles from './ContentGeneratorForm.module.css';

// Platform Icons
const BrandSvg = ({ size = 16, children }: { size?: number; children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const InstagramIcon = () => <BrandSvg><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></BrandSvg>;
const FacebookIcon = () => <BrandSvg><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></BrandSvg>;
const YoutubeIcon = () => <BrandSvg><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></BrandSvg>;
const TiktokIcon = () => <BrandSvg><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></BrandSvg>;
const LinkedinIcon = () => <BrandSvg><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></BrandSvg>;
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const WebsiteIcon = () => <BrandSvg><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></BrandSvg>;

export const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', short: 'Instagram', brand: '#e1306c', icon: <InstagramIcon /> },
  { id: 'facebook', name: 'Facebook', short: 'Facebook', brand: '#1877f2', icon: <FacebookIcon /> },
  { id: 'youtube', name: 'YouTube', short: 'YouTube', brand: '#ff0000', icon: <YoutubeIcon /> },
  { id: 'tiktok', name: 'TikTok', short: 'TikTok', brand: '#000000', icon: <TiktokIcon /> },
  { id: 'linkedin', name: 'LinkedIn', short: 'LinkedIn', brand: '#0a66c2', icon: <LinkedinIcon /> },
  { id: 'twitter', name: 'Twitter', short: 'X', brand: 'var(--color-text-primary)', icon: <TwitterIcon /> },
  { id: 'website', name: 'Website', short: 'Website', brand: '#3b82f6', icon: <WebsiteIcon /> },
];

// 🔥 Sirf 3 Content Types
export const CONTENT_TYPES = [
  { id: 'video', title: 'Video Content', short: 'Video', desc: 'Scripts for videos', icon: Film },
  { id: 'adcopy', title: 'Ad Copy', short: 'Ad Copy', desc: 'High-converting ad copy', icon: Megaphone },
  { id: 'product', title: 'Product Description', short: 'Description', desc: 'Detailed product info', icon: Package },
];

// 🔥 Target Audience Options (Business Profile jaisa)
const TARGET_AUDIENCE_OPTIONS = [
  { value: 'kids_men', label: 'Kids (Men)' },
  { value: 'kids_women', label: 'Kids (Women)' },
  { value: 'teenagers_men', label: 'Teenagers (Men)' },
  { value: 'teenagers_women', label: 'Teenagers (Women)' },
  { value: 'young_adults_men', label: 'Young Adults (Men)' },
  { value: 'young_adults_women', label: 'Young Adults (Women)' },
  { value: 'young_men', label: 'Young Men' },
  { value: 'young_women', label: 'Young Women' },
  { value: 'middle_age_men', label: 'Middle Age (Men)' },
  { value: 'middle_age_women', label: 'Middle Age (Women)' },
  { value: 'seniors_men', label: 'Seniors (Men)' },
  { value: 'seniors_women', label: 'Seniors (Women)' },
];

const TONES = ['Friendly & Casual', 'Professional', 'Playful', 'Luxury', 'Persuasive'];
const LANGUAGES = ['English', 'Urdu', 'Roman Urdu', 'Hindi', 'Arabic'];

export interface FormValues {
  platform: string;
  type: string;
  topic: string;
  targetAudience: string[]; // 🔥 Array
  tone: string;
  language: string;
  notes: string;
}

export const INITIAL_VALUES: FormValues = {
  platform: 'instagram',
  type: 'video',
  topic: '',
  targetAudience: [],
  tone: TONES[0],
  language: LANGUAGES[0],
  notes: '',
};

interface Props {
  values: FormValues;
  onChange: (patch: Partial<FormValues>) => void;
  onSubmit: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

function Select({ id, value, options, onChange, icon }: {
  id: string; value: string; options: string[]; onChange: (v: string) => void; icon?: React.ReactNode;
}) {
  return (
    <div className={styles.selectWrap}>
      {icon && <span className={styles.selectIcon}>{icon}</span>}
      <select id={id} className={`${styles.select} ${icon ? styles.withIcon : ''}`} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
    </div>
  );
}

export default function ContentGeneratorForm({ values, onChange, onSubmit, isGenerating, disabled }: Props) {
  const [optionalOpen, setOptionalOpen] = useState(false);
  const [isAudienceOpen, setIsAudienceOpen] = useState(false);
  const audienceRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (audienceRef.current && !audienceRef.current.contains(event.target as Node)) {
        setIsAudienceOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleAudience = (value: string) => {
    const current = values.targetAudience;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ targetAudience: updated });
  };

  const selectedPlatform = PLATFORMS.find(p => p.id === values.platform);

  return (
    <form
      className={styles.panel}
      onSubmit={(e) => { e.preventDefault(); if (!isGenerating && !disabled) onSubmit(); }}
    >
      {/* 1. Platform Dropdown */}
      <div className={styles.section}>
        <label htmlFor="cg-platform" className={styles.label}>1. Platform</label>
        <div className={styles.selectWrap}>
          <span className={styles.selectIcon}>{selectedPlatform?.icon}</span>
          <select
            id="cg-platform"
            className={`${styles.select} ${styles.withIcon}`}
            value={values.platform}
            onChange={(e) => onChange({ platform: e.target.value })}
          >
            {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>
      </div>

      {/* 2. Content Type */}
      <div className={styles.section}>
        <h3 className={styles.label}>2. Choose Content Type</h3>
        <div className={styles.typeGrid}>
          {CONTENT_TYPES.map(({ id, title, desc, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={values.type === id}
              className={`${styles.typeCard} ${values.type === id ? styles.typeActive : ''}`}
              onClick={() => onChange({ type: id })}
            >
              <Icon size={22} className={styles.typeIcon} />
              <span className={styles.typeTitle}>{title}</span>
              <span className={styles.typeDesc}>{desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Topic */}
      <div className={styles.section}>
        <label htmlFor="cg-topic" className={styles.label}>3. Topic / Product</label>
        <input
          id="cg-topic"
          type="text"
          maxLength={200}
          className={styles.input}
          value={values.topic}
          onChange={(e) => onChange({ topic: e.target.value })}
          placeholder="e.g. Summer collection for women's clothing"
        />
        <div className={styles.counter}>{values.topic.length}/200</div>
      </div>

      {/* 4. Target Audience (Multi-Select) */}
      <div className={styles.section}>
        <label className={styles.label}>4. Target Audience</label>
        <div className={styles.dropdownWrapper} ref={audienceRef}>
          <div
            className={`${styles.input} ${styles.dropdownTrigger}`}
            onClick={() => setIsAudienceOpen(!isAudienceOpen)}
            tabIndex={0}
          >
            {values.targetAudience.length === 0 ? (
              <span className={styles.dropdownPlaceholder}>Select target audience</span>
            ) : (
              <div className={styles.selectedTags}>
                {values.targetAudience.map(val => {
                  const opt = TARGET_AUDIENCE_OPTIONS.find(o => o.value === val);
                  return <span key={val} className={styles.tag}>{opt?.label}</span>
                })}
              </div>
            )}
            <ChevronDown size={16} className={`${styles.dropdownIcon} ${isAudienceOpen ? styles.rotate : ''}`} />
          </div>

          {isAudienceOpen && (
            <div className={styles.dropdownMenu}>
              {TARGET_AUDIENCE_OPTIONS.map(opt => (
                <label key={opt.value} className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    checked={values.targetAudience.includes(opt.value)}
                    onChange={() => toggleAudience(opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5 & 6. Tone & Language */}
      <div className={`${styles.section} ${styles.twoCol}`}>
        <div>
          <label htmlFor="cg-tone" className={styles.label}>5. Tone</label>
          <Select id="cg-tone" value={values.tone} options={TONES} onChange={(tone) => onChange({ tone })} icon={<Smile size={16} />} />
        </div>
        <div>
          <label htmlFor="cg-language" className={styles.label}>6. Language</label>
          <Select id="cg-language" value={values.language} options={LANGUAGES} onChange={(language) => onChange({ language })} icon={<Globe size={16} />} />
        </div>
      </div>

      {/* Optional Settings */}
      <div className={styles.optional}>
        <button type="button" className={styles.optionalBtn} aria-expanded={optionalOpen} onClick={() => setOptionalOpen((o) => !o)}>
          <span className={styles.optionalLeft}>Extra Settings</span>
          <ChevronDown size={16} className={optionalOpen ? styles.rotated : ''} />
        </button>
        {optionalOpen && (
          <div className={styles.optionalBody}>
            <label htmlFor="cg-notes" className={styles.hint}>Extra instructions (keywords, offers, things to avoid)</label>
            <textarea
              id="cg-notes"
              rows={3}
              className={styles.textarea}
              value={values.notes}
              onChange={(e) => onChange({ notes: e.target.value })}
              placeholder="e.g. Mention 20% off and free shipping"
            />
          </div>
        )}
      </div>

      <button type="submit" className={styles.generateBtn} disabled={isGenerating || disabled || values.targetAudience.length === 0 || !values.topic.trim()}>
        <Sparkles size={16} />
        {isGenerating ? 'Generating...' : 'Generate Content'}
        {!isGenerating && <ArrowRight size={16} />}
      </button>
    </form>
  );
}