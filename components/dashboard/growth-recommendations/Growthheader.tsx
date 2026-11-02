import { ChevronDown, Shirt, Sparkles } from 'lucide-react';
import styles from './Growthheader.module.css';

interface Props { onGenerate: () => void; isGenerating: boolean }

export default function GrowthHeader({ onGenerate, isGenerating }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1 className={styles.title}>Growth Recommendations</h1>
        <p className={styles.subtitle}>
          Discover actionable ways to attract customers, increase sales, and grow your business with AI-powered insights.
        </p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.business} aria-label="Current business: BrightStyle">
          <span className={styles.avatar}><Shirt size={18} /></span>
          <span className={styles.bizText}><strong>BrightStyle</strong><small>Fashion &amp; Lifestyle</small></span>
          <ChevronDown size={16} />
        </button>
        <button type="button" className={styles.generate} onClick={onGenerate} disabled={isGenerating}>
          <Sparkles size={16} />
          {isGenerating ? 'Generating...' : 'Generate New Recommendations'}
        </button>
      </div>
    </header>
  );
}
