// components/dashboard/growth-recommendations/BusinessContextModal.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle, ChevronDown, Plus, Sparkles, Target, Users, X,
} from 'lucide-react';
import toast from 'react-hot-toast'; // 🔥 Toast import
import styles from './BusinessContextModal.module.css';
import { useProfile } from '@/context/ProfileContext';


interface ContextData {
  businessGoals: string;
  challenges: string;
  audience: string[];
  instruction: string;
}


interface Props {
  open: boolean;
  onClose: () => void;
  selectedBusinessId?: number | null;
  onSaveContext?: (data: ContextData) => void;
}

// Backend Enum ke mutabiq
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

type FormState = {
  goals: string;
  challenges: string;
  audience: string[];
  instruction: string;
};

const EMPTY_FORM: FormState = {
  goals: '',
  challenges: '',
  audience: [],
  instruction: '',
};

export default function BusinessContextModal({ open, onClose, selectedBusinessId, onSaveContext }: Props) {
  const { user } = useProfile();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const audienceRef = useRef<HTMLDivElement>(null);

  // Find selected business
  const business = user?.business_profiles?.find(b => b.id === selectedBusinessId);

  // Load dynamic business data when modal opens
  useEffect(() => {
    if (open && business) {
      setForm({
        goals: business.business_goals || '',
        challenges: '',
        audience: business.target_audience || [],
        instruction: '',
      });
      setErrors({});
    }
  }, [open, business]);

  // Reset form on close
  useEffect(() => {
    if (!open) {
      setForm(EMPTY_FORM);
      setAudienceOpen(false);
      setErrors({});
    }
  }, [open]);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (audienceRef.current && !audienceRef.current.contains(e.target as Node)) setAudienceOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    //  Typing par error clear karein
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };


  const toggleAudience = (value: string) => {
    setForm((p) => ({
      ...p,
      audience: p.audience.includes(value)
        ? p.audience.filter((a) => a !== value)
        : [...p.audience, value],
    }));
    //  Audience select karne par error clear karein
    if (errors.audience) setErrors(prev => ({ ...prev, audience: false }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, boolean> = {};
    if (form.audience.length === 0) newErrors.audience = true;
    if (!form.goals.trim()) newErrors.goals = true;
    if (!form.challenges.trim()) newErrors.challenges = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields.");
      return;
    }

    // Poora data parent ko bhejein
    if (onSaveContext) {
      onSaveContext({
        businessGoals: form.goals,
        challenges: form.challenges,
        audience: form.audience,
        instruction: form.instruction,
      });
    }

    toast.success("Context saved successfully!");
    onClose();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h3 className={styles.modalTitle}>Add Business Context</h3>
            <p className={styles.modalSub}>
              {business ? `Context for: ${business.business_name}` : 'Help AI generate more relevant recommendations.'}
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          
          {/* 🔥 Target Audience (Required) */}
          <div className={styles.field} ref={audienceRef}>
            <span className={styles.label}>
              <Users size={13} /> Target Audience <span className={styles.req}>*</span>
            </span>
            <div
              className={`${styles.multiSelect} ${errors.audience ? styles.errorField : ''}`}
              onClick={() => setAudienceOpen((o) => !o)}
              role="button"
              tabIndex={0}
              aria-expanded={audienceOpen}
            >
              {form.audience.length === 0 ? (
                <span className={styles.placeholder}>Select target audience…</span>
              ) : (
                <div className={styles.tags}>
                  {form.audience.map((val) => {
                    const opt = TARGET_AUDIENCE_OPTIONS.find((o) => o.value === val);
                    return (
                      <span key={val} className={styles.tag}>
                        {opt?.label || val}
                        <button
                          type="button"
                          className={styles.tagRemove}
                          onClick={(e) => { e.stopPropagation(); toggleAudience(val); }}
                        >
                          <X size={10} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
              <ChevronDown size={14} className={`${styles.chev} ${audienceOpen ? styles.chevUp : ''}`} />
            </div>

            {audienceOpen && (
              <div className={styles.dropdown} role="listbox">
                {TARGET_AUDIENCE_OPTIONS.map((opt) => {
                  const selected = form.audience.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                      onClick={() => toggleAudience(opt.value)}
                    >
                      <span className={styles.checkbox}>{selected ? '✓' : ''}</span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 🔥 Business Goals (Required) */}
          <label className={styles.field}>
            <span className={styles.label}>
              <Target size={13} /> Business Goals <span className={styles.req}>*</span>
            </span>
            <input
              name="goals"
              className={`${styles.input} ${errors.goals ? styles.errorField : ''}`}
              value={form.goals}
              onChange={handleChange}
              placeholder="e.g. Increase Sales"
            />
          </label>

          {/* 🔥 Challenges (Required) */}
          <label className={styles.field}>
            <span className={styles.label}>
              <AlertTriangle size={13} /> Challenges <span className={styles.req}>*</span>
            </span>
            <input
              name="challenges"
              className={`${styles.input} ${errors.challenges ? styles.errorField : ''}`}
              value={form.challenges}
              onChange={handleChange}
              placeholder="e.g. Low Engagement"
            />
          </label>

          {/* 🔥 AI Instruction (Optional) */}
          <label className={styles.field}>
            <span className={styles.label}>
              <Sparkles size={13} /> AI Instruction <span className={styles.optional}>(Optional)</span>
            </span>
            <textarea
              name="instruction"
              className={styles.textarea}
              value={form.instruction}
              onChange={handleChange}
              placeholder="e.g. Focus on low-cost strategies for Instagram…"
              rows={3}
            />
          </label>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>
              <Plus size={13} /> Save Context
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}