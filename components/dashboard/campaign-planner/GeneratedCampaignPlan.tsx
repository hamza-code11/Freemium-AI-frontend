// components/dashboard/campaign-planner/GeneratedCampaignPlan.tsx
'use client';

import { useState } from 'react';
import { BarChart3, Check, ClipboardCheck, Copy, FileText, Globe, Lightbulb, Mail, Megaphone, PieChart, RefreshCw, Shirt, Sparkles} from 'lucide-react';
import { useCampaign } from '@/context/CampaignContext';
import WaveLoader from '@/components/ui/WaveLoader';
import styles from './GeneratedCampaignPlan.module.css';

const BrandIcon = ({ name, size = 16 }: { name: 'instagram' | 'facebook' | 'linkedin' | 'youtube' | 'twitter' | 'email' | 'website'; size?: number }) => {
  const iconProps = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, 'aria-hidden': true };
  
  switch (name) {
    case 'instagram':
      return <svg {...iconProps}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
    case 'facebook':
      return <svg {...iconProps}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
    case 'linkedin':
      return <svg {...iconProps}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
    case 'youtube':
      return <svg {...iconProps}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>;
    case 'twitter':
      return <svg {...iconProps} fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
    case 'email':
      return <Mail size={size} />;
    case 'website':
      return <Globe size={size} />;
    default:
      return null;
  }
};

function Block({ icon, title, side = false, children }: { icon: React.ReactNode; title: string; side?: boolean; children: React.ReactNode }) {
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
  <ul className={styles.list}>{items.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
);

export default function GeneratedCampaignPlan() {
  const { campaign, isGenerating, regenerateCampaign } = useCampaign();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!campaign) return;
    
    const text = `
${campaign.title} (${campaign.objective})
${campaign.description}

AI Campaign Strategy
${campaign.strategy}

Channels: ${campaign.channels.map((c: any) => c.label).join(', ')}

Action Plan
${campaign.weeks.map((w: any) => w.title + ': ' + w.items.join('; ')).join('\n')}

Content Ideas
- ${campaign.ideas.join('\n- ')}

KPIs
- ${campaign.kpis.join('\n- ')}

Budget (${campaign.total})
${campaign.budget.map((b: any) => b.label + ': ' + b.pct + '%').join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const handleRegenerate = async () => {
    await regenerateCampaign();
  };

  // 🔥 WaveLoader ke saath Loading State
  if (isGenerating) {
    return (
      <section 
        className={styles.card} 
        style={{ 
          minHeight: '500px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <WaveLoader />
          <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            AI is crafting your campaign strategy...
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
            This may take a few seconds
          </p>
        </div>
      </section>
    );
  }

  if (!campaign) {
    return (
      <section className={styles.card} style={{ minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          <Sparkles size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p>Fill the form on the left and click <strong>Generate Campaign Plan</strong>.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.7 }}>Your AI-powered strategy will appear here.</p>
        </div>
      </section>
    );
  }

  let acc = 0;
  const stops = campaign.budget.map((b: any, i: number) => { 
    const from = acc; 
    acc += b.pct; 
    return `var(--seg-${i + 1}) ${from}% ${acc}%`; 
  }).join(', ');

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

  return (
    <section className={styles.card} aria-labelledby="cp-plan-title">
      <div className={styles.head}>
        <h2 id="cp-plan-title" className={styles.title}><Sparkles size={18} className={styles.titleIcon} /> Generated Campaign Plan</h2>
        <span className={styles.created}>Created {currentDate}</span>
      </div>

      <div className={styles.overview}>
        <div className={styles.thumb} aria-hidden="true"><Shirt size={30} /></div>
        <div className={styles.overviewText}>
          <div className={styles.overviewTitleRow}>
            <h3 className={styles.overviewTitle}>{campaign.title}</h3>
            <span className={styles.badge}>{campaign.objective}</span>
          </div>
          <p className={styles.muted}>{campaign.description}</p>
        </div>
      </div>

      <Block side icon={<Lightbulb size={17} />} title="AI Campaign Strategy">
        <p className={styles.muted}>{campaign.strategy}</p>
      </Block>

      <Block side icon={<Megaphone size={17} />} title="Recommended Marketing Channels">
        <div className={styles.chips}>
          {campaign.channels.map((c: any) => (
            <span key={c.label} className={styles.chip}>
              <BrandIcon name={c.id} size={14} />
              {c.label}
            </span>
          ))}
        </div>
      </Block>

      <Block side icon={<ClipboardCheck size={17} />} title="Step-by-Step Action Plan">
        <div className={styles.weeks}>
          {campaign.weeks.map((w: any, idx: number) => (
            <div key={idx} className={styles.week}>
              <div className={styles.weekHead}>{w.title}</div>
              <Bullets items={w.items} />
            </div>
          ))}
        </div>
      </Block>

      <div className={styles.triple}>
        <Block icon={<FileText size={16} />} title="Content Ideas & Promotional Messages">
          <Bullets items={campaign.ideas} />
        </Block>
        <Block icon={<BarChart3 size={16} />} title="Key Performance Indicators (KPIs)">
          <Bullets items={campaign.kpis} />
        </Block>
        <Block icon={<PieChart size={16} />} title="Budget Allocation">
          <div className={styles.budget}>
            <div className={styles.donut} style={{ background: `conic-gradient(${stops})` }} role="img" aria-label={`Total budget ${campaign.total}`}>
              <div className={styles.donutInner}>
                <strong>{campaign.total}</strong>
                <small>Total</small>
              </div>
            </div>
            <ul className={styles.legend}>
              {campaign.budget.map((b: any, i: number) => (
                <li key={i}>
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
        <button type="button" className={styles.outlineBtn} onClick={handleCopy}>
          {copied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy Plan</>}
        </button>
        <button type="button" className={styles.outlineBtn} onClick={handleRegenerate} disabled={isGenerating}>
          <RefreshCw size={15} /> Regenerate
        </button>
      </div>
    </section>
  );
}