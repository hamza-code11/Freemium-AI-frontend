'use client';

import { useState, type ReactNode } from 'react';
import { BarChart3, Bookmark, BookmarkCheck, Check, ClipboardCheck, Copy, FileText, Globe, Lightbulb, Mail, Megaphone, PieChart, RefreshCw, Shirt, Sparkles } from 'lucide-react';
import styles from './GeneratedCampaignPlan.module.css';

const BrandIcon = ({ name, size = 16 }: { name: 'instagram' | 'facebook' | 'linkedin'; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'instagram' && (<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>)}
    {name === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
    {name === 'linkedin' && (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>)}
  </svg>
);

const PLAN = {
  created: 'Created on Apr 12, 2025 • 10:24 AM',
  title: 'Spring Collection Launch',
  objective: 'Brand Awareness',
  description: 'Showcase your new spring collection and build brand visibility among your target audience.',
  strategy:
    'Focus on visually appealing content that highlights the comfort, style, and sustainability of your spring collection. Use lifestyle imagery, influencer collaborations and storytelling to create an emotional connection with your audience.',
  channels: [
    { label: 'Instagram', icon: <BrandIcon name="instagram" size={14} /> },
    { label: 'Facebook', icon: <BrandIcon name="facebook" size={14} /> },
    { label: 'LinkedIn', icon: <BrandIcon name="linkedin" size={14} /> },
    { label: 'Email Marketing', icon: <Mail size={14} /> },
    { label: 'Website', icon: <Globe size={14} /> },
  ],
  weeks: [
    { title: 'Week 1', items: ['Finalize content', 'Design creatives', 'Set up campaigns'] },
    { title: 'Week 2', items: ['Launch on social media', 'Start influencer outreach', 'Email campaign setup'] },
    { title: 'Week 3', items: ['Monitor performance', 'Engage with audience', 'Optimize ads'] },
    { title: 'Week 4', items: ['Analyze results', 'Report KPIs', 'Plan next phase'] },
  ],
  ideas: ['Lifestyle photos & short videos (Reels/TikTok)', 'Customer testimonials', 'Behind-the-scenes content', 'Email: “Fresh Styles for Brighter Days”'],
  kpis: ['Brand reach & impressions', 'Website traffic', 'Engagement rate', 'Conversion rate', 'Revenue growth'],
  total: '$500',
  budget: [
    { label: 'Social Media Ads', pct: 40 },
    { label: 'Influencer Marketing', pct: 20 },
    { label: 'Content Creation', pct: 15 },
    { label: 'Email Marketing', pct: 10 },
    { label: 'Other', pct: 15 },
  ],
};

const planToText = () =>
  [
    PLAN.title + ' (' + PLAN.objective + ')',
    PLAN.description,
    '\nAI Campaign Strategy\n' + PLAN.strategy,
    '\nChannels: ' + PLAN.channels.map((c) => c.label).join(', '),
    '\nAction Plan\n' + PLAN.weeks.map((w) => w.title + ': ' + w.items.join('; ')).join('\n'),
    '\nContent Ideas\n- ' + PLAN.ideas.join('\n- '),
    '\nKPIs\n- ' + PLAN.kpis.join('\n- '),
    '\nBudget (' + PLAN.total + ')\n' + PLAN.budget.map((b) => b.label + ': ' + b.pct + '%').join('\n'),
  ].join('\n');

function Block({ icon, title, side = false, children }: { icon: ReactNode; title: string; side?: boolean; children: ReactNode }) {
  if (side) {
    return (
      <section className={`${styles.block} ${styles.blockSide}`}>
        <span className={styles.tile} aria-hidden="true">{icon}</span>
        <div className={styles.blockBody}>
          <h3 className={styles.blockTitle}>{title}</h3>
          {children}
        </div>
      </section>
    );
  }
  return (
    <section className={styles.block}>
      <h3 className={`${styles.blockTitle} ${styles.inlineTitle}`}>
        <span className={styles.inlineIcon} aria-hidden="true">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

const Bullets = ({ items }: { items: string[] }) => (
  <ul className={styles.list}>{items.map((i) => <li key={i}>{i}</li>)}</ul>
);

export default function GeneratedCampaignPlan() {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(planToText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  let acc = 0;
  const stops = PLAN.budget.map((b, i) => { const from = acc; acc += b.pct; return `var(--seg-${i + 1}) ${from}% ${acc}%`; }).join(', ');
  const SaveIcon = saved ? BookmarkCheck : Bookmark;

  return (
    <section className={styles.card} aria-labelledby="cp-plan-title">
      <div className={styles.head}>
        <h2 id="cp-plan-title" className={styles.title}><Sparkles size={18} className={styles.titleIcon} /> Generated Campaign Plan</h2>
        <span className={styles.created}>{PLAN.created}</span>
      </div>

      <div className={styles.overview}>
        <div className={styles.thumb} aria-hidden="true"><Shirt size={30} /></div>
        <div className={styles.overviewText}>
          <div className={styles.overviewTitleRow}>
            <h3 className={styles.overviewTitle}>{PLAN.title}</h3>
            <span className={styles.badge}>{PLAN.objective}</span>
          </div>
          <p className={styles.muted}>{PLAN.description}</p>
        </div>
      </div>

      <Block side icon={<Lightbulb size={17} />} title="AI Campaign Strategy">
        <p className={styles.muted}>{PLAN.strategy}</p>
      </Block>

      <Block side icon={<Megaphone size={17} />} title="Recommended Marketing Channels">
        <div className={styles.chips}>
          {PLAN.channels.map((c) => <span key={c.label} className={styles.chip}>{c.icon}{c.label}</span>)}
        </div>
      </Block>

      <Block side icon={<ClipboardCheck size={17} />} title="Step-by-Step Action Plan">
        <div className={styles.weeks}>
          {PLAN.weeks.map((w) => (
            <div key={w.title} className={styles.week}>
              <div className={styles.weekHead}>{w.title}</div>
              <Bullets items={w.items} />
            </div>
          ))}
        </div>
      </Block>

      <div className={styles.triple}>
        <Block icon={<FileText size={16} />} title="Content Ideas & Promotional Messages"><Bullets items={PLAN.ideas} /></Block>
        <Block icon={<BarChart3 size={16} />} title="Key Performance Indicators (KPIs)"><Bullets items={PLAN.kpis} /></Block>
        <Block icon={<PieChart size={16} />} title="Budget Allocation">
          <div className={styles.budget}>
            <div className={styles.donut} style={{ background: `conic-gradient(${stops})` }} role="img" aria-label={`Total budget ${PLAN.total}`}>
              <div className={styles.donutInner}><strong>{PLAN.total}</strong><small>Total Budget</small></div>
            </div>
            <ul className={styles.legend}>
              {PLAN.budget.map((b, i) => (
                <li key={b.label}>
                  <span className={styles.dot} style={{ background: `var(--seg-${i + 1})` }} />
                  <span className={styles.legendLabel}>{b.label}</span>
                  <span className={styles.legendPct}>{b.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Block>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.primaryBtn} onClick={() => setSaved((s) => !s)}>
          <SaveIcon size={15} /> {saved ? 'Saved' : 'Save Campaign'}
        </button>
        <button type="button" className={styles.outlineBtn} onClick={copyPlan}>
          {copied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy Plan</>}
        </button>
        <button type="button" className={styles.outlineBtn}>
          <RefreshCw size={15} /> Regenerate
        </button>
      </div>
    </section>
  );
}
