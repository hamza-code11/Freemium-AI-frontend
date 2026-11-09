// components/ui/WaveLoader.tsx
'use client';

import styles from './WaveLoader.module.css';

interface WaveLoaderProps {
  className?: string;
  variant?: 'primary' | 'dark'; // 🔥 Naya prop
}

export default function WaveLoader({ className = '', variant = 'primary' }: WaveLoaderProps) {
  return (
    <div 
      className={`${styles.waveContainer} ${className}`} 
      aria-label="Loading" 
      role="status"
    >
      <span className={`${styles.wave} ${variant === 'dark' ? styles.dark : styles.primary}`}></span>
      <span className={`${styles.wave} ${variant === 'dark' ? styles.dark : styles.primary}`}></span>
      <span className={`${styles.wave} ${variant === 'dark' ? styles.dark : styles.primary}`}></span>
      <span className={`${styles.wave} ${variant === 'dark' ? styles.dark : styles.primary}`}></span>
      <span className={`${styles.wave} ${variant === 'dark' ? styles.dark : styles.primary}`}></span>
    </div>
  );
}