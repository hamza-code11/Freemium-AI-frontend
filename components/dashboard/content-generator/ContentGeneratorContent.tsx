// ContentGeneratorContent.tsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import ContentGeneratorHeader from './ContentGeneratorHeader';
import ContentGeneratorForm, { CONTENT_TYPES, INITIAL_VALUES, PLATFORMS, type FormValues } from './ContentGeneratorForm';
import ContentGeneratorOutput from './ContentGeneratorOutput';
import { useAIGenerator } from '@/hooks/useAIGenerator';
import styles from './ContentGeneratorContent.module.css';

export default function ContentGeneratorContent() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [content, setContent] = useState<string | null>(null);
  const [used, setUsed] = useState(0); // Statistics ke liye (optional)
  const { isGenerating, generateContent } = useAIGenerator();

  const generate = async () => {
    if (isGenerating) return;

    if (!values.topic.trim() || values.targetAudience.length === 0) {
      toast.error("Please fill Topic and Target Audience first.");
      return;
    }

    const payload = {
      platform: values.platform,
      content_type: values.type,
      topic: values.topic,
      target_audience: values.targetAudience,
      tone: values.tone,
      language: values.language,
      notes: values.notes || null,
    };

    const result = await generateContent(payload);
    
    if (result) {
      setContent(result);
      setUsed((u) => u + 1);
      toast.success("Content generated successfully!");
    }
  };

  const platform = PLATFORMS.find((p) => p.id === values.platform) ?? PLATFORMS[0];
  const type = CONTENT_TYPES.find((t) => t.id === values.type) ?? CONTENT_TYPES[0];

  return (
    <div className={styles.container}>
      <ContentGeneratorHeader />

      <div className={styles.grid}>
        <ContentGeneratorForm
          values={values}
          onChange={(patch) => setValues((v) => ({ ...v, ...patch }))}
          onSubmit={generate}
          isGenerating={isGenerating}
          disabled={false}
        />
        {/* 🔥 Purane props (saved, onSave) hata dein */}
        <ContentGeneratorOutput
          content={content}
          isGenerating={isGenerating}
          title={`${platform.short} ${type.short}`}
          platformIcon={platform.icon}
          platformBrand={platform.brand}
          onRegenerate={generate}
        />
      </div>
    </div>
  );
}