import React from 'react';
import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    title: 'Create Account',
    desc: 'Sign up for free and set up your business profile with your industry and goals.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    )
  },
  {
    num: '02',
    title: 'Select a Tool',
    desc: 'Choose from content generation, campaign planning, or growth recommendations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    )
  },
  {
    num: '03',
    title: 'Generate with AI',
    desc: 'Our AI analyzes your profile and generates tailored marketing assets instantly.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
    )
  },
  {
    num: '04',
    title: 'Track & Grow',
    desc: 'Save your content, track your progress, and upgrade to premium for advanced tools.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
    )
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>Workflow</div>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.sectionSubtitle}>Get from zero to growth in 4 simple steps.</p>
      </div>
      
      <div className={styles.stepsContainer}>
        {steps.map((step, i) => (
          <div key={i} className={styles.stepItem}>
            
            {/* Icon & Number */}
            <div className={styles.stepTop}>
              <div className={styles.iconBox}>
                {step.icon}
              </div>
              <div className={styles.stepNum}>{step.num}</div>
            </div>

            {/* Connecting Line (Except last) */}
            {i < steps.length - 1 && (
              <div className={styles.stepConnector}></div>
            )}

            {/* Content */}
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
