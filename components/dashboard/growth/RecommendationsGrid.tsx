import { Sparkles, Check, Bookmark, Clock, ArrowRight } from 'lucide-react';
import styles from './RecommendationsGrid.module.css';

// Sample Data
const RECOMMENDATIONS = [
  { id: 1, category: 'Marketing', priority: 'High', title: 'Improve Social Media Engagement', desc: 'Your audience needs more engaging and consistent content to build a stronger community and brand loyalty.', bullets: ['Post 3-5 times per week (mix of reels, images, stories)', 'Test different content formats (behind the scenes, user generated content, product showcases)', 'Use relevant hashtags and engage with followers'], benefit: 'Higher brand visibility & engagement', effort: 'Low Effort', time: '15 mins/week' },
  { id: 2, category: 'Sales', priority: 'Medium', title: 'Optimize Product Pages', desc: 'Product pages can be more effective with better descriptions, high-quality images and clear CTAs.', bullets: ['Rewrite product descriptions (highlight key benefits)', 'Use high-resolution lifestyle images', 'Add clear and compelling call-to-action buttons'], benefit: 'Higher conversion rates', effort: 'Medium Effort', time: '2 hours' },
  { id: 3, category: 'Customer Acquisition', priority: 'Low', title: 'Build a Customer Referral Program', desc: 'Your existing customers can help you reach new audiences and grow faster through referrals.', bullets: ['Offer rewards for both referrer and new customer', 'Make it easy to share (unique referral links)', 'Promote the program in emails and social media'], benefit: 'More new customers & higher loyalty', effort: 'Low Effort', time: '1 hour' },
  { id: 4, category: 'Brand Awareness', priority: 'Medium', title: 'Create Targeted Promotional Campaigns', desc: 'Tailored offers to specific audience segments can increase relevance and drive better results.', bullets: ['Segment your audience (e.g. age, style preference)', 'Run limited-time offers or seasonal discounts', 'Promote via email and social media ads'], benefit: 'More traffic & brand recognition', effort: 'Medium Effort', time: '3 hours' },
  { id: 5, category: 'Customer Retention', priority: 'Low', title: 'Strengthen Customer Retention', desc: 'Keeping existing customers engaged is more cost-effective and brings long-term value.', bullets: ['Send follow-up emails after purchase', 'Launch a loyalty or rewards program', 'Ask for feedback and reviews'], benefit: 'Higher repeat purchases & lifetime value', effort: 'Low Effort', time: '1 hour' },
];

export default function RecommendationsGrid() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}><Sparkles size={18} className={styles.icon} /> AI Growth Recommendations</h2>
        <select className={styles.sortSelect}>
          <option>Sort by: Priority</option>
          <option>Sort by: Effort</option>
        </select>
      </div>

      <div className={styles.grid}>
        {RECOMMENDATIONS.map((rec) => (
          <div key={rec.id} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.category}>{rec.category}</span>
              <span className={`${styles.priority} ${styles[rec.priority.toLowerCase()]}`}>★ {rec.priority}</span>
            </div>
            
            <h3 className={styles.cardTitle}>{rec.title}</h3>
            <p className={styles.cardDesc}>{rec.desc}</p>
            
            <ul className={styles.bulletList}>
              {rec.bullets.map((b, i) => <li key={i}><Check size={12} className={styles.checkIcon} /> {b}</li>)}
            </ul>

            <div className={styles.cardMeta}>
              <div className={styles.metaRow}>
                <TargetIcon /> <span>Expected Benefit</span>
                <span className={styles.metaValue}>{rec.benefit}</span>
              </div>
              <div className={styles.metaRow}>
                <Clock size={14} /> <span>Time to implement</span>
                <span className={styles.metaValue}>{rec.time}</span>
              </div>
            </div>

            <div className={styles.cardActions}>
              <button className={styles.saveBtn}><Bookmark size={16} /> Save</button>
              <button className={styles.detailBtn}>View Details <ArrowRight size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Small helper icon to match design
const TargetIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
