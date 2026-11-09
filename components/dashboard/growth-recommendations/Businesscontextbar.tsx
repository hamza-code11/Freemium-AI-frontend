// components/dashboard/growth-recommendations/Businesscontextbar.tsx
'use client';

import { AlertTriangle, Sparkles, Target, Users, Pencil } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import BusinessContextModal from './BusinessContextModal';
import styles from './Businesscontextbar.module.css';

const AUDIENCE_LABELS: Record<string, string> = {
  kids_men: 'Kids (Men)', kids_women: 'Kids (Women)',
  teenagers_men: 'Teenagers (Men)', teenagers_women: 'Teenagers (Women)',
  young_adults_men: 'Young Adults (Men)', young_adults_women: 'Young Adults (Women)',
  young_men: 'Young Men', young_women: 'Young Women',
  middle_age_men: 'Middle Age (Men)', middle_age_women: 'Middle Age (Women)',
  seniors_men: 'Seniors (Men)', seniors_women: 'Seniors (Women)',
};

interface ContextData {
  businessGoals: string;
  challenges: string;
  audience: string[];
  instruction: string;
}

interface Props {
  selectedBusinessId?: number | null;
  aiInstruction?: string;
  onOpenModal: () => void;
  modalOpen: boolean;
  onCloseModal: () => void;
  onSaveContext?: (data: ContextData) => void;
  contextData?: ContextData | null; // 🔥 Naya prop
}

export default function BusinessContextBar({ 
  selectedBusinessId, 
  aiInstruction,
  onOpenModal,
  modalOpen,
  onCloseModal,
  onSaveContext,
  contextData, // 🔥 Naya
}: Props) {
  const { user } = useProfile();
  const business = user?.business_profiles?.find(b => b.id === selectedBusinessId);

  // 🔥 Business Goals: Modal ka data pehle, fir Business Profile
  const businessGoals = contextData?.businessGoals 
    || business?.business_goals 
    || 'No goals specified.';

  // 🔥 Challenges: Sirf modal ka data
  const challenges = contextData?.challenges || '';

  // 🔥 Audience: Modal ka data pehle, fir Business Profile
  const targetAudience = contextData?.audience && contextData.audience.length > 0
    ? contextData.audience
    : business?.target_audience || [];

  return (
    <section className={styles.wrapper} aria-label="Business context">
      
      <div className={styles.bar}>
        {/* Business Goals */}
        <div className={styles.col}>
          <h2 className={styles.head}><Target size={13} /> Business Goals</h2>
          <p className={styles.textContent}>{businessGoals}</p>
        </div>

        {/* 🔥 Challenges (Dynamic) */}
        <div className={styles.col}>
          <h2 className={styles.head}><AlertTriangle size={13} /> Challenges</h2>
          {challenges ? (
            <p className={styles.textContent}>{challenges}</p>
          ) : (
            <p className={styles.textContentMuted}>Not specified</p>
          )}
        </div>

        {/* Target Audience */}
        <div className={styles.col}>
          <h2 className={styles.head}><Users size={13} /> Target Audience</h2>
          <div className={styles.chips}>
            {targetAudience.length > 0 ? (
              targetAudience.map((aud) => (
                <span key={aud} className={styles.chip}>
                  {AUDIENCE_LABELS[aud] || aud}
                </span>
              ))
            ) : (
              <span className={styles.chip}>Not specified</span>
            )}
          </div>
        </div>
      </div>

      {/* AI Instruction */}
      <div className={styles.instructionRow}>
        <div className={styles.instructionContent}>
          <h2 className={styles.head}><Sparkles size={13} /> AI Instruction</h2>
          <p className={styles.textContent}>
            {aiInstruction || 'No specific instruction added. Click "Add Prompt" to add one.'}
          </p>
        </div>
        <button 
          type="button" 
          className={styles.updateBtn} 
          onClick={onOpenModal}
        >
          <Pencil size={13} /> Add Prompt
        </button>
      </div>

      <BusinessContextModal
        open={modalOpen}
        onClose={onCloseModal}
        selectedBusinessId={selectedBusinessId}
        onSaveContext={onSaveContext}
      />
    </section>
  );
}