'use client';

import { useState } from 'react';
import GrowthHeader from './Growthheader';
import BusinessContextBar from './Businesscontextbar';
import AIRecommendations from './AIRecommendations';
import RecentGenerated from './RecentGenerated';
import { useGrowthRecommendations } from '@/hooks/useGrowthRecommendations';
import styles from './Growthrecommendationscontent.module.css';

export default function GrowthRecommendationsContent() {
  const [selectedBusinessId, setSelectedBusinessId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [aiInstruction, setAiInstruction] = useState<string>('');

  const [contextData, setContextData] = useState<{
    businessGoals: string;
    challenges: string;
    audience: string[];
    instruction: string;
  } | null>(null);

  const { recommendations, isGenerating, generateRecommendations } = useGrowthRecommendations();

  const generate = async () => {
    const payload = {
      business_id: selectedBusinessId,
      business_goals: contextData?.businessGoals || null,
      challenges: contextData?.challenges || null,
      target_audience: contextData?.audience || [],
      ai_instruction: contextData?.instruction || null,
    };
    await generateRecommendations(payload);
  };

  return (
    <div className={styles.container}>
      <GrowthHeader
        onGenerate={generate}
        isGenerating={isGenerating}
        selectedBusinessId={selectedBusinessId}
        onBusinessChange={setSelectedBusinessId}
      />

      <BusinessContextBar
        selectedBusinessId={selectedBusinessId}
        aiInstruction={aiInstruction}
        onOpenModal={() => setModalOpen(true)}
        modalOpen={modalOpen}
        onCloseModal={() => setModalOpen(false)}
        contextData={contextData} // 
        onSaveContext={(data) => {
          setContextData(data);
          setAiInstruction(data.instruction);
        }}
      />

      <AIRecommendations
        selectedBusinessId={selectedBusinessId}
        recommendations={recommendations}
        isGenerating={isGenerating}
      />

      <RecentGenerated />
    </div>
  );
}