'use client';

import { useState, type ReactNode } from 'react';
import { Bookmark, BookmarkCheck, Check, CheckCircle2, Copy, Lightbulb, RefreshCw, Sparkles } from 'lucide-react';
import styles from './ContentGeneratorOutput.module.css';

interface Props {
  content: string | null;
  isGenerating: boolean;
  title: string;
  platformIcon: ReactNode;
  platformBrand: string;
  used: number;
  limit: number;
  saved: boolean;
  onSave: () => void;
  onRegenerate: () => void;
}

export default function ContentGeneratorOutput({
  content, isGenerating, title, platformIcon, platformBrand, used, limit, saved, onSave, onRegenerate,
}: Props) {
  const [copied, setCopied] = useState(false);
  const remaining = Math.max(limit - used, 0);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const SaveIcon = saved ? BookmarkCheck : Bookmark;
  const hasContent = !!content && !isGenerating;

  return (
    <section className={styles.panel} aria-label="Generated content" aria-busy={isGenerating}>
      <div className={styles.head}>
        <h2 className={styles.title}><Sparkles size={18} className={styles.titleIcon} /> Generated Content</h2>
        <div className={styles.headActions}>
          <button type="button" className={styles.outlineBtn} onClick={onSave} disabled={!hasContent}>
            <SaveIcon size={14} /> {saved ? 'Saved' : 'Save'}
          </button>
          <button type="button" className={styles.outlineBtn} onClick={onRegenerate} disabled={isGenerating}>
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>
      </div>

      {hasContent && (
        <div className={styles.success} role="status">
          <CheckCircle2 size={22} className={styles.successIcon} />
          <div>
            <strong>Your content has been generated!</strong>
            <p>You&apos;ve used {used} generation{used === 1 ? '' : 's'}. {remaining} remaining.</p>
          </div>
        </div>
      )}

      <div className={styles.box}>
        <div className={styles.boxHead}>
          <span className={styles.platformDot} style={{ background: platformBrand }}>{platformIcon}</span>
          {title}
        </div>

        {isGenerating ? (
          <div className={styles.skeleton} aria-hidden="true">
            <i style={{ width: '70%' }} /><i /><i /><i style={{ width: '55%' }} /><i style={{ width: '80%' }} />
          </div>
        ) : content ? (
          <>
            <div className={styles.text}>{content}</div>
            <div className={styles.actions}>
              <button type="button" className={styles.copyBtn} onClick={handleCopy}>
                {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
              </button>
              <button type="button" className={styles.outlineBtn} onClick={onSave}><SaveIcon size={14} /> {saved ? 'Saved' : 'Save'}</button>
              <button type="button" className={styles.outlineBtn} onClick={onRegenerate}><RefreshCw size={14} /> Regenerate</button>
            </div>
          </>
        ) : (
          <p className={styles.empty}>Fill in the details on the left and click <strong>Generate Content</strong>. Your content will appear here.</p>
        )}
      </div>

      <div className={styles.tip}>
        <Lightbulb size={18} className={styles.tipIcon} />
        <div>
          <strong>Pro Tip</strong>
          <p>Use platform-specific features and trending hashtags to get better engagement on social media.</p>
        </div>
      </div>
    </section>
  );
}