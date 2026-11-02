'use client';

import React, { type CSSProperties, type PointerEvent } from 'react';
import styles from './BrandPanel.module.css';

const FEATURES = [
  { key: 'content', label: 'AI Content Generator', path: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z' },
  { key: 'campaign', label: 'Campaign Planner', path: 'M4 5h16v14H4zM4 10h16M9 5v14' },
  { key: 'growth', label: 'Growth Recommendations', path: 'M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z' },
  { key: 'analytics', label: 'Business Analytics', path: 'M4 20V10M10 20V4M16 20v-8M22 20H2' },
];

const SPARKLE = FEATURES[0].path;

const PILLARS = [
  { x: 26, y: 176, h: 38 },
  { x: 84, y: 176, h: 70 },
  { x: 142, y: 176, h: 108 },
  { x: 200, y: 176, h: 150, accent: true },
];

const CORE_FACES = [
  'translateZ(35px)',
  'rotateY(180deg) translateZ(35px)',
  'rotateY(90deg) translateZ(35px)',
  'rotateY(-90deg) translateZ(35px)',
  'rotateX(90deg) translateZ(35px)',
  'rotateX(-90deg) translateZ(35px)',
];

function Pillar({ x, y, h, accent }: { x: number; y: number; h: number; accent?: boolean }) {
  return (
    <div
      className={`${styles.pillar} ${accent ? styles.accent : ''}`}
      style={{ '--x': `${x}px`, '--y': `${y}px`, '--h': `${h}px` } as CSSProperties}
    >
      <i className={styles.pTop} />
      <i className={styles.pFront} />
      <i className={styles.pLeft} />
    </div>
  );
}

export default function BrandPanel({ headline, description }: { headline: string; description: string }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(px * 16).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-py * 12).toFixed(2)}deg`);
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  return (
    <aside className={styles.brand} aria-label="Freemium AI product highlights">
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className={styles.brandCopy}>
        <h2 className={styles.brandTitle}>{headline}</h2>
        <p className={styles.brandText}>{description}</p>
      </div>

      <div className={styles.stage} aria-hidden="true" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className={styles.scene}>
          <div className={styles.world}>
            {/* 3D isometric platform */}
            <div className={styles.iso}>
              <div className={styles.slab} />
              <div className={styles.platform} />
              <div className={styles.pool} />

              {PILLARS.map((p) => (
                <Pillar key={p.x} {...p} />
              ))}

              <div className={styles.ring} />
              <div className={styles.coreWrap}>
                <div className={styles.core}>
                  {CORE_FACES.map((t, i) => (
                    <div key={i} className={styles.coreFace} style={{ transform: t }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d={SPARKLE} />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating glass cards */}
            <div className={`${styles.card} ${styles.cardStatus}`}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>AI engine active</span>
            </div>

            <div className={`${styles.card} ${styles.cardGrowth}`}>
              <span className={styles.cardLabel}>Revenue growth</span>
              <strong className={styles.cardValue}>+38%</strong>
              <svg viewBox="0 0 120 36" width="120" height="36">
                <defs>
                  <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#818cf8" stopOpacity=".5" />
                    <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 30 L18 24 L36 27 L56 16 L76 19 L98 7 L120 3 L120 36 L0 36Z" fill="url(#spark)" />
                <path d="M0 30 L18 24 L36 27 L56 16 L76 19 L98 7 L120 3" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className={`${styles.card} ${styles.cardContent}`}>
              <span className={styles.cardLabel}>Generated caption</span>
              <p className={styles.cardCopy}>Fresh arrivals are here. Shop the new collection before it sells out.</p>
              <span className={styles.chip}>Instagram post</span>
            </div>

            <div className={`${styles.card} ${styles.cardPlan}`}>
              <span className={styles.cardLabel}>Campaign plan</span>
              <div className={styles.bars}>
                <span style={{ width: '86%' }} />
                <span style={{ width: '64%' }} />
                <span style={{ width: '42%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className={styles.features}>
        {FEATURES.map((f) => (
          <li key={f.key}>
            <span className={styles.featureIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={f.path} />
              </svg>
            </span>
            {f.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}