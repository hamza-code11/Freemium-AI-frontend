'use client';

import { AlertTriangle, Flag, Globe, Heart, Megaphone, Target, UserPlus, Users } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './Icons';
import styles from './Businesscontextbar.module.css';

const GOALS = [
  { label: 'Increase Sales', icon: Target, active: true },
  { label: 'Build Brand Awareness', icon: Flag },
  { label: 'Acquire New Customers', icon: UserPlus },
  { label: 'Improve Customer Retention', icon: Heart },
];
const CHALLENGES = ['Low Engagement', 'Limited Budget', 'Low Website Traffic', 'Low Conversions'];

const INITIAL_CHANNELS = [
  { label: 'Instagram', color: '#e1306c' },
  { label: 'Facebook', color: '#1877f2' },
  { label: 'Website', color: '#5b4fe6' },
];

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  Instagram: <InstagramIcon size={14} />,
  Facebook: <FacebookIcon size={14} />,
};

export default function BusinessContextBar() {
  return (
    <section className={styles.bar} aria-label="Business context">
      <div className={styles.col}>
        <h2 className={styles.head}><Target size={15} /> Business Goals</h2>
        <div className={`${styles.chips} ${styles.twoCol}`}>
          {GOALS.map(({ label, icon: Icon, active }) => (
            <span key={label} className={`${styles.chip} ${active ? styles.goalOn : ''}`}>
              <Icon size={12} />{label}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.col}>
        <h2 className={styles.head}><AlertTriangle size={15} /> Current Challenges</h2>
        <div className={`${styles.chips} ${styles.twoCol}`}>
          {CHALLENGES.map((label) => (
            <span key={label} className={styles.chip}>{label}</span>
          ))}
        </div>
      </div>

      <div className={styles.col}>
        <h2 className={styles.head}><Users size={15} /> Target Audience</h2>
        <p className={styles.audience}>Women aged 18-35, fashion conscious, urban</p>
      </div>

      <div className={styles.col}>
        <h2 className={styles.head}><Megaphone size={15} /> Marketing Channels</h2>
        <div className={styles.chips}>
          {INITIAL_CHANNELS.map((c) => (
            <span key={c.label} className={styles.chip}>
              <span className={styles.channelIcon} style={{ color: c.color }}>
                {CHANNEL_ICONS[c.label] ?? <Globe size={13} />}
              </span>
              {c.label}
            </span>
          ))}
          <span className={styles.chip}>+2 more</span>
        </div>
      </div>
    </section>
  );
}
