'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle, ChevronDown, Megaphone, Plus, Sparkles, Target, Users, X,
} from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './Icons';
import styles from './BusinessContextModal.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CHANNEL_OPTIONS = [
  'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube',
  'Twitter / X', 'Pinterest', 'Website', 'Email', 'Google Ads', 'WhatsApp',
];

const AUDIENCE_OPTIONS = [
  'Women aged 18-35, fashion conscious, urban',
  'Women aged 18-35, budget-conscious, urban',
  'Women aged 25-45, working professionals',
  'Men aged 18-35, fashion & lifestyle',
  'Men aged 25-45, working professionals',
  'College students (18-24)',
  'Young parents (25-40)',
  'Small business owners',
  'General audience (18-45)',
];

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  Instagram: <InstagramIcon size={14} />,
  Facebook: <FacebookIcon size={14} />,
};

type FormState = {
  goals: string;
  challenges: string;
  audience: string;
  channels: string[];
  instruction: string;
};

const EMPTY_FORM: FormState = {
  goals: '',
  challenges: '',
  audience: '',
  channels: [],
  instruction: '',
};

export default function BusinessContextModal({ open, onClose }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [channelsOpen, setChannelsOpen] = useState(false);
  const [audienceOpen, setAudienceOpen] = useState(false);

  const channelsRef = useRef<HTMLDivElement>(null);
  const audienceRef = useRef<HTMLDivElement>(null);

  // Reset form + dropdowns when modal closes
  useEffect(() => {
    if (!open) {
      setForm(EMPTY_FORM);
      setChannelsOpen(false);
      setAudienceOpen(false);
    }
  }, [open]);

  // Outside click + Escape handling
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (channelsRef.current && !channelsRef.current.contains(t)) setChannelsOpen(false);
      if (audienceRef.current && !audienceRef.current.contains(t)) setAudienceOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (channelsOpen || audienceOpen) {
          setChannelsOpen(false);
          setAudienceOpen(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, channelsOpen, audienceOpen, onClose]);

  if (!open) return null;

  const handleChange =
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleChannel = (ch: string) =>
    setForm((p) => ({
      ...p,
      channels: p.channels.includes(ch)
        ? p.channels.filter((x) => x !== ch)
        : [...p.channels, ch],
    }));

  const pickAudience = (aud: string) => {
    setForm((p) => ({ ...p, audience: aud }));
    setAudienceOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Business context submitted:', form);
    // TODO: API call
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ctx-modal-title"
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h3 id="ctx-modal-title" className={styles.modalTitle}>Add Business Context</h3>
            <p className={styles.modalSub}>
              Help AI generate more relevant recommendations for your business.
            </p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* 1. Marketing Channels (multi-select) */}
          <div className={styles.field} ref={channelsRef}>
            <span className={styles.label}><Megaphone size={13} /> Marketing Channels</span>
            <div
              className={styles.multiSelect}
              onClick={() => setChannelsOpen((o) => !o)}
              role="button"
              tabIndex={0}
              aria-expanded={channelsOpen}
              onKeyDown={(e) => e.key === 'Enter' && setChannelsOpen((o) => !o)}
            >
              {form.channels.length === 0 ? (
                <span className={styles.placeholder}>Select marketing channels…</span>
              ) : (
                <div className={styles.tags}>
                  {form.channels.map((ch) => (
                    <span key={ch} className={styles.tag}>
                      {ch}
                      <button
                        type="button"
                        className={styles.tagRemove}
                        onClick={(e) => { e.stopPropagation(); toggleChannel(ch); }}
                        aria-label={`Remove ${ch}`}
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <span className={`${styles.caret} ${channelsOpen ? styles.caretUp : ''}`}>▾</span>
            </div>

            {channelsOpen && (
              <div className={styles.dropdown}>
                {CHANNEL_OPTIONS.map((ch) => {
                  const selected = form.channels.includes(ch);
                  return (
                    <button
                      key={ch}
                      type="button"
                      className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                      onClick={() => toggleChannel(ch)}
                    >
                      <span className={styles.checkbox}>{selected ? '✓' : ''}</span>
                      <span className={styles.optionIcon}>{CHANNEL_ICONS[ch] ?? null}</span>
                      {ch}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Target Audience (single-select dropdown) */}
          <div className={styles.field} ref={audienceRef}>
            <span className={styles.label}><Users size={13} /> Target Audience</span>
            <div
              className={styles.singleSelect}
              onClick={() => setAudienceOpen((o) => !o)}
              role="button"
              tabIndex={0}
              aria-haspopup="listbox"
              aria-expanded={audienceOpen}
              onKeyDown={(e) => e.key === 'Enter' && setAudienceOpen((o) => !o)}
            >
              {form.audience ? (
                <span className={styles.selectedText}>{form.audience}</span>
              ) : (
                <span className={styles.placeholder}>Select target audience…</span>
              )}
              <ChevronDown
                size={14}
                className={`${styles.chev} ${audienceOpen ? styles.chevUp : ''}`}
              />
            </div>

            {audienceOpen && (
              <div className={styles.dropdown} role="listbox">
                {AUDIENCE_OPTIONS.map((aud) => {
                  const selected = form.audience === aud;
                  return (
                    <button
                      key={aud}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                      onClick={() => pickAudience(aud)}
                    >
                      <span className={styles.checkbox}>{selected ? '✓' : ''}</span>
                      {aud}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Goals + Challenges */}
          <div className={styles.twoCol}>
            <label className={styles.field}>
              <span className={styles.label}><Target size={13} /> Business Goals</span>
              <input
                name="goals"
                className={styles.input}
                value={form.goals}
                onChange={handleChange}
                placeholder="e.g. Increase Sales"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}><AlertTriangle size={13} /> Challenges</span>
              <input
                name="challenges"
                className={styles.input}
                value={form.challenges}
                onChange={handleChange}
                placeholder="e.g. Low Engagement"
              />
            </label>
          </div>

          {/* 4. AI Instruction */}
          <label className={styles.field}>
            <span className={styles.label}><Sparkles size={13} /> AI Instruction</span>
            <textarea
              name="instruction"
              className={styles.textarea}
              value={form.instruction}
              onChange={handleChange}
              placeholder="e.g. Focus on low-cost strategies for Instagram, prioritize retention over acquisition…"
              rows={3}
            />
          </label>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              <Plus size={13} /> Save Context
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
