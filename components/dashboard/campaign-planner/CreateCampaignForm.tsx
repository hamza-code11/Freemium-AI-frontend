'use client';

import { useState } from 'react';
import { ArrowRight, Calendar, Check, ChevronDown, Eye, Globe, Heart, Mail, Palette, PenSquare, Rocket, Sparkles, TrendingUp, Users } from 'lucide-react';
import styles from './CreateCampaignForm.module.css';

const BrandIcon = ({ name, size = 16 }: { name: 'instagram' | 'facebook' | 'linkedin'; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'instagram' && (<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>)}
    {name === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
    {name === 'linkedin' && (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>)}
  </svg>
);

const OBJECTIVES = [
  { id: 'awareness', label: 'Brand Awareness', icon: Eye },
  { id: 'leads', label: 'Generate Leads', icon: Users },
  { id: 'sales', label: 'Increase Sales', icon: TrendingUp },
  { id: 'launch', label: 'Product Launch', icon: Rocket },
  { id: 'engagement', label: 'Customer Engagement', icon: Heart },
];

const CHANNELS = [
  { id: 'instagram', label: 'Instagram', icon: <BrandIcon name="instagram" size={15} /> },
  { id: 'facebook', label: 'Facebook', icon: <BrandIcon name="facebook" size={15} /> },
  { id: 'linkedin', label: 'LinkedIn', icon: <BrandIcon name="linkedin" size={15} /> },
  { id: 'email', label: 'Email Marketing', icon: <Mail size={15} /> },
  { id: 'website', label: 'Website', icon: <Globe size={15} /> },
];

const AUDIENCES = [
  'Women aged 18–35, fashion conscious',
  'Men aged 20–40, style focused',
  'Students & young professionals (18–25)',
  'Working moms aged 25–45',
  'Small business owners',
  'Fitness & wellness enthusiasts',
  'Tech-savvy early adopters',
  'Luxury shoppers, high income',
];

const CURRENCIES: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', PKR: 'Rs' };
const TONES = ['Creative', 'Professional', 'Friendly', 'Urgent', 'Luxury'];
const NOTES_MAX = 500;

interface Values {
  name: string; objective: string; product: string; audience: string; channels: string[];
  budget: string; currency: string; start: string; end: string; tone: string; notes: string;
}

const INITIAL: Values = {
  name: 'Spring Collection Launch',
  objective: 'awareness',
  product: "Women's Summer Collection",
  audience: 'Women aged 18–35, fashion conscious',
  channels: ['instagram', 'facebook'],
  budget: '500',
  currency: 'USD',
  start: '2025-04-15',
  end: '2025-05-15',
  tone: 'Creative',
  notes: 'Highlight the new spring collection with a focus on comfort, style and sustainability. Use soft, elegant visuals and a friendly, inspiring tone.',
};

export default function CreateCampaignForm() {
  const [v, setV] = useState<Values>(INITIAL);
  const update = (patch: Partial<Values>) => setV((p) => ({ ...p, ...patch }));
  const toggleChannel = (id: string) =>
    update({ channels: v.channels.includes(id) ? v.channels.filter((c) => c !== id) : [...v.channels, id] });

  return (
    <section className={styles.card} aria-labelledby="cp-form-title">
      <div className={styles.head}>
        <PenSquare size={20} className={styles.headIcon} />
        <h2 id="cp-form-title" className={styles.title}>Create New Campaign</h2>
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: yahan API call lagao (campaign plan generate karne ke liye)
        }}
      >
        <div className={styles.group}>
          <label htmlFor="cp-name" className={styles.label}>Campaign Name <span className={styles.req}>*</span></label>
          <input id="cp-name" className={styles.input} value={v.name} onChange={(e) => update({ name: e.target.value })} placeholder="e.g. Spring Collection Launch" />
        </div>

        <div className={styles.group}>
          <span className={styles.label} id="cp-objective">Campaign Objective <span className={styles.req}>*</span></span>
          <div className={styles.objectives} role="group" aria-labelledby="cp-objective">
            {OBJECTIVES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={v.objective === id}
                className={`${styles.objective} ${v.objective === id ? styles.objectiveActive : ''}`}
                onClick={() => update({ objective: id })}
              >
                <Icon size={18} className={styles.objectiveIcon} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label htmlFor="cp-product" className={styles.label}>Product / Service <span className={styles.req}>*</span></label>
            <input id="cp-product" className={styles.input} value={v.product} onChange={(e) => update({ product: e.target.value })} />
          </div>
          <div className={styles.group}>
  <label htmlFor="cp-audience" className={styles.label}>Target Audience <span className={styles.req}>*</span></label>
  <div className={styles.selectWrap}>
    <span className={styles.selectIcon}><Users size={15} /></span>
    <select
      id="cp-audience"
      className={`${styles.input} ${styles.select} ${styles.withIcon}`}
      value={v.audience}
      onChange={(e) => update({ audience: e.target.value })}
    >
      {AUDIENCES.map((a) => (
        <option key={a} value={a}>{a}</option>
      ))}
    </select>
    <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
  </div>
</div>
        </div>

        <div className={styles.group}>
          <span className={styles.label} id="cp-channels">Marketing Channels <span className={styles.req}>*</span></span>
          <div className={styles.channels} role="group" aria-labelledby="cp-channels">
            {CHANNELS.map(({ id, label, icon }) => {
              const checked = v.channels.includes(id);
              return (
                <label key={id} className={`${styles.channel} ${checked ? styles.channelChecked : ''}`}>
                  <input type="checkbox" className={styles.srOnly} checked={checked} onChange={() => toggleChannel(id)} />
                  <span className={styles.box}>{checked && <Check size={12} strokeWidth={3} />}</span>
                  <span className={styles.channelIcon}>{icon}</span>
                  {label}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label htmlFor="cp-budget" className={styles.label}>Campaign Budget <span className={styles.optional}>(Optional)</span></label>
            <div className={styles.budgetRow}>
              <input id="cp-budget" type="number" min={0} className={`${styles.input} ${styles.budgetInput}`} value={v.budget} onChange={(e) => update({ budget: e.target.value })} />
              <div className={styles.selectWrap}>
                <span className={styles.selectIcon}>{CURRENCIES[v.currency]}</span>
                <select aria-label="Currency" className={`${styles.input} ${styles.select} ${styles.withIcon}`} value={v.currency} onChange={(e) => update({ currency: e.target.value })}>
                  {Object.keys(CURRENCIES).map((c) => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.label} id="cp-duration">Campaign Duration <span className={styles.req}>*</span></span>
            <div className={styles.dateRange} role="group" aria-labelledby="cp-duration">
              <div className={styles.dateField}>
                <Calendar size={14} className={styles.dateIcon} />
                <input type="date" aria-label="Start date" className={styles.date} value={v.start} max={v.end || undefined} onChange={(e) => update({ start: e.target.value })} />
              </div>
              <ArrowRight size={14} className={styles.dateArrow} aria-hidden="true" />
              <div className={styles.dateField}>
                <Calendar size={14} className={styles.dateIcon} />
                <input type="date" aria-label="End date" className={styles.date} value={v.end} min={v.start || undefined} onChange={(e) => update({ end: e.target.value })} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label htmlFor="cp-tone" className={styles.label}>Campaign Tone <span className={styles.req}>*</span></label>
            <div className={styles.selectWrap}>
              <span className={styles.selectIcon}><Palette size={15} /></span>
              <select id="cp-tone" className={`${styles.input} ${styles.select} ${styles.withIcon}`} value={v.tone} onChange={(e) => update({ tone: e.target.value })}>
                {TONES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="cp-notes" className={styles.label}>Additional Instructions</label>
          <div className={styles.textareaWrap}>
            <textarea id="cp-notes" rows={4} maxLength={NOTES_MAX} className={`${styles.input} ${styles.textarea}`} value={v.notes} onChange={(e) => update({ notes: e.target.value })} />
            <span className={styles.counter}>{v.notes.length}/{NOTES_MAX}</span>
          </div>
        </div>

        <button type="submit" className={styles.generateBtn}>
          <Sparkles size={16} /> Generate Campaign Plan
        </button>
      </form>
    </section>
  );
}
