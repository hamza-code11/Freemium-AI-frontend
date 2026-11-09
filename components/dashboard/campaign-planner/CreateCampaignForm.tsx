// components/dashboard/campaign-planner/CreateCampaignForm.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Check, ChevronDown, Eye, Globe, Heart, Mail, Palette, PenSquare, Rocket, Sparkles, TrendingUp, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useProfile } from '@/context/ProfileContext';
import { useCampaign } from '@/context/CampaignContext'; // 🔥 Context Import
import styles from './CreateCampaignForm.module.css';

const BrandIcon = ({ name, size = 16 }: { name: 'instagram' | 'facebook' | 'linkedin' | 'youtube' | 'twitter'; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'instagram' && (<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>)}
    {name === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
    {name === 'linkedin' && (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>)}
    {name === 'youtube' && (<><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></>)}
    {name === 'twitter' && (<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />)}
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
  { id: 'youtube', label: 'YouTube', icon: <BrandIcon name="youtube" size={15} /> },
  { id: 'twitter', label: 'Twitter', icon: <BrandIcon name="twitter" size={15} /> },
  { id: 'email', label: 'Email', icon: <Mail size={15} /> },
  { id: 'website', label: 'Website', icon: <Globe size={15} /> },
];

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

const CURRENCIES = ['USD', 'EUR', 'GBP', 'PKR', 'INR', 'AED', 'SAR', 'CAD', 'AUD', 'JPY'];
const TONES = ['Creative', 'Professional', 'Friendly', 'Urgent', 'Luxury'];
const NOTES_MAX = 500;

interface Values {
  name: string; 
  objective: string; 
  product: string; 
  audience: string[]; 
  channels: string[];
  budget: string; 
  currency: string; 
  start: string; 
  end: string; 
  tone: string; 
  notes: string;
}

export default function CreateCampaignForm() {
  const { user } = useProfile();
  const { generateCampaign, isGenerating } = useCampaign(); // 🔥 Context
  
  const [v, setV] = useState<Values>({
    name: '', 
    objective: 'awareness', 
    product: '', 
    audience: [], 
    channels: [],
    budget: '500', 
    currency: 'USD', 
    start: '', 
    end: '', 
    tone: 'Creative', 
    notes: '',
  });

  const [selectedBusinessId, setSelectedBusinessId] = useState<number | null>(null);
  const [isAudienceOpen, setIsAudienceOpen] = useState(false);
  const audienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (audienceRef.current && !audienceRef.current.contains(event.target as Node)) {
        setIsAudienceOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (user?.business_profiles && user.business_profiles.length > 0) {
      const biz = user.business_profiles.find(b => b.id === selectedBusinessId) || user.business_profiles[0];
      setSelectedBusinessId(biz.id);
      
      setV(prev => ({
        ...prev,
        product: biz.services || '',
        audience: biz.target_audience || [],
      }));
    }
  }, [user, selectedBusinessId]);

  const update = (patch: Partial<Values>) => setV((p) => ({ ...p, ...patch }));
  
  const toggleChannel = (id: string) =>
    update({ channels: v.channels.includes(id) ? v.channels.filter((c) => c !== id) : [...v.channels, id] });

  const toggleAudience = (value: string) => {
    const current = v.audience;
    const updated = current.includes(value)
      ? current.filter((a) => a !== value)
      : [...current, value];
    update({ audience: updated });
  };

  const handleBusinessChange = (id: number) => {
    setSelectedBusinessId(id);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!v.name || !v.product || v.audience.length === 0) {
      toast.error("Please fill all required fields.");
      return;
    }

    const payload = {
      campaign_name: v.name,
      objective: v.objective,
      product_service: v.product,
      target_audience: v.audience,
      channels: v.channels,
      budget: parseFloat(v.budget) || 0,
      currency: v.currency,
      start_date: v.start,
      end_date: v.end,
      tone: v.tone,
      notes: v.notes,
      business_id: selectedBusinessId,
    };

    await generateCampaign(payload);
  };

  return (
    <section className={styles.card} aria-labelledby="cp-form-title">
      <div className={styles.head}>
        <PenSquare size={20} className={styles.headIcon} />
        <h2 id="cp-form-title" className={styles.title}>Create New Campaign</h2>
        
        {user?.business_profiles && user.business_profiles.length > 0 && (
          <div className={styles.businessSelect}>
            <select 
              value={selectedBusinessId || ''} 
              onChange={(e) => handleBusinessChange(Number(e.target.value))}
              className={styles.businessDropdown}
            >
              {user.business_profiles.map(biz => (
                <option key={biz.id} value={biz.id}>{biz.business_name}</option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.businessChevron} />
          </div>
        )}
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        
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
            <input id="cp-product" className={styles.input} value={v.product} onChange={(e) => update({ product: e.target.value })} placeholder="e.g. Women's Summer Collection" />
          </div>
          
          <div className={styles.group}>
            <label className={styles.label}>Target Audience <span className={styles.req}>*</span></label>
            <div className={styles.dropdownWrapper} ref={audienceRef}>
              <div 
                className={`${styles.input} ${styles.dropdownTrigger}`}
                onClick={() => setIsAudienceOpen(!isAudienceOpen)}
                tabIndex={0}
              >
                {v.audience.length === 0 ? (
                  <span className={styles.dropdownPlaceholder}>Select target audience</span>
                ) : (
                  <div className={styles.selectedTags}>
                    {v.audience.map(val => {
                      const opt = TARGET_AUDIENCE_OPTIONS.find(o => o.value === val);
                      return <span key={val} className={styles.tag}>{opt?.label || val}</span>
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
                        checked={v.audience.includes(opt.value)}
                        onChange={() => toggleAudience(opt.value)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
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
                <select aria-label="Currency" className={`${styles.input} ${styles.select}`} value={v.currency} onChange={(e) => update({ currency: e.target.value })}>
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
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

        <button type="submit" className={styles.generateBtn} disabled={isGenerating}>
          <Sparkles size={16} /> {isGenerating ? 'Generating...' : 'Generate Campaign Plan'}
        </button>
      </form>
    </section>
  );
}