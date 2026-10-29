'use client';

import React, { useState } from 'react';
import {
  ArrowRight, ChevronDown, Globe, Megaphone,
  MessageSquareText, Package, PenSquare, Settings, Smile, Sparkles,
} from 'lucide-react';
import styles from './ContentGeneratorForm.module.css';

const BrandSvg = ({ size = 16, children }: { size?: number; children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <BrandSvg size={size}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></BrandSvg>
);
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <BrandSvg size={size}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></BrandSvg>
);
const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <BrandSvg size={size}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></BrandSvg>
);

const XLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const CONTENT_TYPES = [
  { id: 'social', title: 'Social Post', short: 'Post', desc: 'Perfect for social media platforms', icon: MessageSquareText },
  { id: 'caption', title: 'Caption', short: 'Caption', desc: 'Short & catchy captions', icon: PenSquare },
  { id: 'adcopy', title: 'Ad Copy', short: 'Ad Copy', desc: 'High-converting ad copy', icon: Megaphone },
  { id: 'product', title: 'Product Description', short: 'Description', desc: 'Detailed product info', icon: Package },
];

export const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', short: 'Instagram', brand: '#e1306c', icon: <InstagramIcon size={16} /> },
  { id: 'facebook', name: 'Facebook', short: 'Facebook', brand: '#1877f2', icon: <FacebookIcon size={16} /> },
  { id: 'twitter', name: 'X (Twitter)', short: 'X', brand: 'var(--color-text-primary)', icon: <XLogo /> },
  { id: 'linkedin', name: 'LinkedIn', short: 'LinkedIn', brand: '#0a66c2', icon: <LinkedinIcon size={16} /> },
];

const AUDIENCES = ['Young Women (18–35)', 'Young Men (18–35)', 'Young Adults (18–35)', 'Parents (30–45)', 'Professionals (25–45)'];
const TONES = ['Friendly & Casual', 'Professional', 'Playful', 'Luxury', 'Persuasive'];
const LANGUAGES = ['English', 'Urdu', 'Roman Urdu', 'Hindi', 'Arabic'];

export interface FormValues {
  type: string; topic: string; audience: string; tone: string; language: string; platform: string; notes: string;
}

export const INITIAL_VALUES: FormValues = {
  type: 'social',
  topic: "Summer Collection for Women's Clothing",
  audience: AUDIENCES[0],
  tone: TONES[0],
  language: LANGUAGES[0],
  platform: 'instagram',
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

  return (
    <form
      className={styles.panel}
      onSubmit={(e) => { e.preventDefault(); if (!isGenerating && !disabled) onSubmit(); }}
    >
      <div className={styles.section}>
        <h3 className={styles.label}>1. Choose Content Type</h3>
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

      <div className={styles.section}>
        <label htmlFor="cg-topic" className={styles.label}>2. Topic / Product</label>
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

      <div className={styles.section}>
        <label htmlFor="cg-audience" className={styles.label}>3. Target Audience</label>
        <Select id="cg-audience" value={values.audience} options={AUDIENCES} onChange={(audience) => onChange({ audience })} />
      </div>

      <div className={`${styles.section} ${styles.twoCol}`}>
        <div>
          <label htmlFor="cg-tone" className={styles.label}>4. Tone</label>
          <Select id="cg-tone" value={values.tone} options={TONES} onChange={(tone) => onChange({ tone })} icon={<Smile size={16} />} />
        </div>
        <div>
          <label htmlFor="cg-language" className={styles.label}>5. Language</label>
          <Select id="cg-language" value={values.language} options={LANGUAGES} onChange={(language) => onChange({ language })} icon={<Globe size={16} />} />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.label}>6. Platform</h3>
        <div className={styles.platformGrid}>
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={values.platform === p.id}
              style={{ '--brand': p.brand } as React.CSSProperties}
              className={`${styles.platformBtn} ${values.platform === p.id ? styles.platformActive : ''}`}
              onClick={() => onChange({ platform: p.id })}
            >
              <span className={styles.platformIcon}>{p.icon}</span>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.optional}>
        <button type="button" className={styles.optionalBtn} aria-expanded={optionalOpen} onClick={() => setOptionalOpen((o) => !o)}>
          <span className={styles.optionalLeft}><Settings size={16} /> Optional Settings</span>
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

      <button type="submit" className={styles.generateBtn} disabled={isGenerating || disabled}>
        <Sparkles size={16} />
        {isGenerating ? 'Generating...' : 'Generate Content'}
        {!isGenerating && <ArrowRight size={16} />}
      </button>
    </form>
  );
}
