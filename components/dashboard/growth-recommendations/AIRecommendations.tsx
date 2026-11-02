'use client';
import { Pencil } from 'lucide-react';
import { RECS, TOOLS } from './Data';
import BusinessContextModal from './BusinessContextModal';
import { useState } from 'react';
import styles from './AIRecommendations.module.css';

export default function AIRecommendations() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>AI Growth Recommendations</h2>
          <p className={styles.subtitle}>
            Personalized recommendations to help you grow your business faster.
          </p>
        </div>
        <button type="button" className={styles.updateBtn} onClick={() => setModalOpen(true)}>
          <Pencil size={13} /> Add Business Context
        </button>
      </div>

      <div className={styles.bigBox}>
        {RECS.map((rec, index) => (
          <article key={rec.id} className={styles.rec}>
            <h3 className={styles.recTitle}>
              {index + 1}. {rec.title}
            </h3>

            <p className={styles.para}>{rec.desc}</p>

            <ul className={styles.bullets}>
              {rec.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <p className={styles.para}>
              <strong>Expected benefit:</strong> {rec.benefit}
            </p>

            <p className={styles.para}>
              <strong>Why it matters:</strong> {rec.why}
            </p>

            <p className={styles.para}>
              <strong>Checklist:</strong>
            </p>
            <ul className={styles.bullets}>
              {rec.checklist.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            <p className={styles.para}>
              <strong>Tools / Channels:</strong> {rec.tools.map((id) => TOOLS[id].label).join(' • ')}
            </p>

            <p className={styles.para}>
              <strong>Success metrics:</strong> {rec.metrics.join(' • ')}
            </p>
          </article>
        ))}
      </div>

      <BusinessContextModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
