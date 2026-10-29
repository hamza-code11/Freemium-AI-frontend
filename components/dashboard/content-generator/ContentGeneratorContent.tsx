'use client';

import { useEffect, useRef, useState } from 'react';
import ContentGeneratorHeader from './ContentGeneratorHeader';
import ContentGeneratorForm, { CONTENT_TYPES, INITIAL_VALUES, PLATFORMS, type FormValues } from './ContentGeneratorForm';
import ContentGeneratorOutput from './ContentGeneratorOutput';
import styles from './ContentGeneratorContent.module.css';

const LIMIT = 12;

// TODO: yahan apni real API call lagao (Laravel / AI endpoint). Abhi sirf demo text hai.
const buildMock = (v: FormValues) =>
  `${v.topic} is here! ☀️\n\nStay cool, stay stylish with our latest collection. From lightweight picks to everyday comfort, we've got everything you need for the perfect look.\n\n✨ Fresh styles. Brighter days. ✨\n\nShop now and upgrade your wardrobe!\n\n#SummerCollection #WomensFashion #StayStylish #FashionForHer`;

export default function ContentGeneratorContent() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [content, setContent] = useState<string | null>(buildMock(INITIAL_VALUES));
  const [isGenerating, setIsGenerating] = useState(false);
  const [used, setUsed] = useState(1);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const generate = () => {
    if (isGenerating || used >= LIMIT) return;
    setIsGenerating(true);
    setSaved(false);
    timer.current = setTimeout(() => {
      setContent(buildMock(values));
      setUsed((u) => u + 1);
      setIsGenerating(false);
    }, 1800);
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
          disabled={used >= LIMIT}
        />
        <ContentGeneratorOutput
          content={content}
          isGenerating={isGenerating}
          title={`${platform.short} ${type.short}`}
          platformIcon={platform.icon}
          platformBrand={platform.brand}
          used={used}
          limit={LIMIT}
          saved={saved}
          onSave={() => setSaved((s) => !s)}
          onRegenerate={generate}
        />
      </div>
    </div>
  );
}
