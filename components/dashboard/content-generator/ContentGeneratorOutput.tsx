// ContentGeneratorOutput.tsx
'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import WaveLoader from '@/components/ui/WaveLoader'; // 🔥 Import karein
import styles from './ContentGeneratorOutput.module.css';

interface Props {
  content: string | null;
  isGenerating: boolean;
  title: string;
  platformIcon: ReactNode;
  platformBrand: string;
  onRegenerate: () => void;
}

export default function ContentGeneratorOutput({
  content, isGenerating, title, platformIcon, platformBrand, onRegenerate,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const hasContent = !!content && !isGenerating;

  return (
    <section className={styles.panel} aria-label="Generated content" aria-busy={isGenerating}>
      <div className={styles.head}>
        <h2 className={styles.title}><Sparkles size={18} className={styles.titleIcon} /> Generated Content</h2>
        <div className={styles.headActions}>
          <button type="button" className={styles.outlineBtn} onClick={onRegenerate} disabled={isGenerating}>
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>
      </div>

      {hasContent && (
        <div className={styles.success} role="status">
          <CheckCircle2 size={22} className={styles.successIcon} />
          <div>
            <strong>Your content has been generated & saved!</strong>
            <p>You can find this in your history.</p>
          </div>
        </div>
      )}

      <div className={styles.box}>
        <div className={styles.boxHead}>
          <span className={styles.platformDot} style={{ background: platformBrand }}>{platformIcon}</span>
          {title}
        </div>

        {isGenerating ? (
          // 🔥 Naya Loading UI
          <div className={styles.loadingWrap}>
            <WaveLoader />
            <p className={styles.loadingText}>AI is writing your content...</p>
            <div className={styles.skeleton} aria-hidden="true">
              <i style={{ width: '90%' }} /><i /><i /><i style={{ width: '60%' }} />
            </div>
          </div>
        ) : content ? (
          <>
            <div className={styles.text}>{content}</div>
            <div className={styles.actions}>
              <button type="button" className={styles.copyBtn} onClick={handleCopy}>
                {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
              </button>
              <button type="button" className={styles.outlineBtn} onClick={onRegenerate}>
                <RefreshCw size={14} /> Regenerate
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <Sparkles size={32} className={styles.emptyIcon} />
            <p className={styles.empty}>Fill in the details on the left and click <strong>Generate Content</strong>.</p>
            <p className={styles.emptySub}>Your AI content will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}