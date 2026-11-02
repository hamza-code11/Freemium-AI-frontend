import { 
  Megaphone, X, Lightbulb, CheckSquare, Square, 
  PenTool, Image as ImageIcon, TrendingUp,
  // Replace the three brand icons below with the following:
  Share2, Globe, Video 
} from 'lucide-react';
import styles from './RecommendationDetail.module.css';

export default function RecommendationDetail() {
  return (
    <div className={styles.detailCard}>
      <div className={styles.header}>
        <div className={styles.tags}>
          <span className={styles.tagOutline}>Marketing</span>
          <span className={styles.tagDanger}>★ High</span>
        </div>
        <button className={styles.closeBtn}><X size={16} /></button>
      </div>

      <h2 className={styles.title}>Improve Social Media Engagement</h2>
      <p className={styles.desc}>Your audience needs more engaging and consistent content to build a stronger community and brand loyalty.</p>

      <div className={styles.section}>
        <h3 className={styles.secTitle}><Lightbulb size={16} /> Why It Matters</h3>
        <p className={styles.text}>Social media engagement helps increase brand visibility, build trust, and drive more traffic to your website, which can lead to higher sales over time.</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.secTitle}><CheckSquare size={16} /> Implementation Checklist</h3>
        <ul className={styles.checklist}>
          <li><Square size={14} /> Plan a content calendar (3-5 posts per week)</li>
          <li><Square size={14} /> Mix content types (reels, images, stories, user content)</li>
          <li><Square size={14} /> Use relevant hashtags and trending topics</li>
          <li><Square size={14} /> Engage with your audience (reply to comments & DMs)</li>
          <li><Square size={14} /> Track what content performs best and adjust</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.secTitle}><Megaphone size={16} /> Suggested Tools / Channels</h3>
        <div className={styles.toolsGrid}>
  <div className={styles.tool}><Share2 size={16} /> Instagram</div>
  <div className={styles.tool}><Globe size={16} /> Facebook</div>
  <div className={styles.tool}><Video size={16} /> TikTok</div>
  <div className={styles.tool}><PenTool size={16} /> Later</div>
  <div className={styles.tool}><ImageIcon size={16} /> Canva</div>
</div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.secTitle}><TrendingUp size={16} /> Success Metrics to Track</h3>
        <ul className={styles.metricsList}>
          <li>Engagement rate (likes, comments, shares)</li>
          <li>Website traffic from social media</li>
          <li>Follower growth</li>
        </ul>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn}><CheckSquare size={16} /> Mark as Completed</button>
        <button className={styles.secondaryBtn}>Save Recommendation</button>
      </div>
    </div>
  );
}
