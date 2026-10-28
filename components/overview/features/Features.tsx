import React from 'react';
import styles from './Features.module.css';

const Icons = {
  Content: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>),
  Campaign: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>),
  Growth: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>),
  Analytics: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>),
  Profile: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>),
  History: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>),
  Arrow: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>)
};

const features = [
  {
    icon: <Icons.Content />,
    title: 'AI Content Generator',
    desc: 'Instantly generate social media posts, product descriptions, ad copy, and promotional content tailored to your business.',
    span: 'large' // Bento grid styling ke liye
  },
  {
    icon: <Icons.Campaign />,
    title: 'Campaign Planner',
    desc: 'Get AI-driven suggestions for marketing campaigns, advertisement ideas, and audience engagement strategies.',
    span: 'small'
  },
  {
    icon: <Icons.Growth />,
    title: 'Growth Recommendations',
    desc: 'Receive personalized strategies to improve your digital presence, expand your reach, and grow sustainably.',
    span: 'small'
  },
  {
    icon: <Icons.Profile />,
    title: 'Business Profile',
    desc: 'Set up your business details, target audience, and goals to get hyper-personalized AI recommendations.',
    span: 'small'
  },
  {
    icon: <Icons.History />,
    title: 'History & Saved Content',
    desc: 'Access all your previously generated content and recommendations in one place. Save and reuse anytime.',
    span: 'small'
  },
  {
    icon: <Icons.Analytics />,
    title: 'Dashboard & Analytics',
    desc: 'Track your usage, monitor generated content, and get a clear overview of your business growth activities.',
    span: 'large'
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>Core Modules</div>
        <h2 className={styles.sectionTitle}>Everything You Need to Scale</h2>
        <p className={styles.sectionSubtitle}>Powerful AI tools designed specifically for small businesses and entrepreneurs.</p>
      </div>
      
      <div className={styles.bentoGrid}>
        {features.map((feature, index) => (
          <div key={index} className={`${styles.featureCard} ${styles[feature.span]}`}>
            <div className={styles.cardTop}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <div className={styles.cardArrow}><Icons.Arrow /></div>
            </div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
