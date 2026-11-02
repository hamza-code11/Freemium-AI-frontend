'use client';

import { useEffect, useRef, useState } from 'react';
import GrowthHeader from './Growthheader';
import BusinessContextBar from './Businesscontextbar';
import AIRecommendations from './AIRecommendations';
import RecentGenerated from './RecentGenerated';
import styles from './Growthrecommendationscontent.module.css';

export default function GrowthRecommendationsContent() {
  const [sort, setSort] = useState<'priority' | 'effort'>('priority');
  const [isGenerating, setIsGenerating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const generate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    timer.current = setTimeout(() => setIsGenerating(false), 1800);
  };

  return (
    <div className={styles.container}>
      <GrowthHeader onGenerate={generate} isGenerating={isGenerating} />
      <BusinessContextBar />
      <AIRecommendations />
      <RecentGenerated />
    </div>
  );
}
