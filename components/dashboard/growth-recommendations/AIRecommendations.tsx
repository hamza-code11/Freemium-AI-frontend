// components/dashboard/growth-recommendations/AIRecommendations.tsx
'use client';

import { Sparkles, Loader2 } from 'lucide-react';
import WaveLoader from '@/components/ui/WaveLoader';
import { TOOLS } from './Data';
import { RecommendationItem } from '@/services/growth.service';
import styles from './AIRecommendations.module.css';

interface Props {
  selectedBusinessId: number | null;
  recommendations: RecommendationItem[];
  isGenerating: boolean;
}

export default function AIRecommendations({ selectedBusinessId, recommendations, isGenerating }: Props) {
  
  // 🔥 Loading State
  if (isGenerating) {
    return (
      <div className={styles.bigBox} style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <WaveLoader />
        <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          AI is analyzing your business context...
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
          Crafting personalized growth strategies for you
        </p>
      </div>
    );
  }

  // 🔥 Empty State
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className={styles.bigBox} style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <Sparkles size={32} style={{ color: 'var(--color-text-tertiary)', opacity: 0.5 }} />
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>
          Click <strong>"Generate Recommendations"</strong> in the header to get AI-powered insights.
        </p>
      </div>
    );
  }

  // 🔥 Data View
  return (
    <div className={styles.bigBox}>
      {recommendations.map((rec, index) => (
        <article key={index} className={styles.rec}>
          <h3 className={styles.recTitle}>
            {index + 1}. {rec.title}
          </h3>

          <p className={styles.para}>{rec.desc}</p>

          {rec.bullets && rec.bullets.length > 0 && (
            <ul className={styles.bullets}>
              {rec.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}

          {rec.benefit && (
            <p className={styles.para}>
              <strong>Expected benefit:</strong> {rec.benefit}
            </p>
          )}

          {rec.why && (
            <p className={styles.para}>
              <strong>Why it matters:</strong> {rec.why}
            </p>
          )}

          {rec.checklist && rec.checklist.length > 0 && (
            <>
              <p className={styles.para}>
                <strong>Checklist:</strong>
              </p>
              <ul className={styles.bullets}>
                {rec.checklist.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </>
          )}

          {rec.tools && rec.tools.length > 0 && (
            <p className={styles.para}>
              <strong>Tools / Channels:</strong>{' '}
              {rec.tools
                .map((id) => TOOLS[id as keyof typeof TOOLS]?.label || id)
                .join(' • ')}
            </p>
          )}

          {rec.metrics && rec.metrics.length > 0 && (
            <p className={styles.para}>
              <strong>Success metrics:</strong> {rec.metrics.join(' • ')}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}