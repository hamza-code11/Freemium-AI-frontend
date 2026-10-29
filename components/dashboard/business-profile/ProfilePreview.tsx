'use client';

import React, { useState } from 'react';
import { Briefcase, Users, Building2 } from 'lucide-react';
import styles from './ProfilePreview.module.css';

// Mock Data: User ka data (backend se aayega)
const mockProfileData = {
  name: 'Hamza Khan',
  email: 'hamza@example.com',
  // 🔥 Yahan user ki real image ka path hoga, filhal placeholder
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  businesses: [
    {
      id: 1,
      name: 'Trendify',
      type: 'E-commerce',
      niche: 'Fashion & Lifestyle',
      description: 'Trendy clothing and accessories for modern and confident individuals. We bring you the latest styles, seasonal collections and custom designs for men and women through our online store.',
      audience: 'Young Adults (18-35)',
      services: 'Clothing, Accessories, Seasonal Collections',
      goals: ['Increase Brand Awareness', 'Get More Customers', 'Boost Sales'],
    },
    {
      id: 2,
      name: 'TechNova',
      type: 'SaaS / Software',
      niche: 'Technology',
      description: 'A modern SaaS platform providing AI-driven productivity tools for freelancers and small teams.',
      audience: 'Professionals (25-45)',
      services: 'AI Tools, Productivity Apps, Cloud Storage',
      goals: ['Launch New Products', 'Expand to New Markets'],
    },
    {
      id: 3,
      name: 'CafeBrew',
      type: 'Restaurant / Food',
      niche: 'Food & Beverage',
      description: 'A cozy coffee shop serving specialty brews and artisan pastries in the heart of the city.',
      audience: 'Everyone',
      services: 'Coffee, Pastries, Snacks',
      goals: ['Get More Customers', 'Increase Brand Awareness'],
    }
  ]
};

export default function ProfilePreview() {
  // 🔥 State for active tab
  const [activeTabId, setActiveTabId] = useState(mockProfileData.businesses[0].id);

  // Get active business data
  const activeBusiness = mockProfileData.businesses.find(b => b.id === activeTabId);

  return (
    <div className={styles.previewContainer}>
      
      <div className={styles.previewCard}>
        
        {/* Header */}
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.previewTitle}>Profile Preview</h2>
            <p className={styles.previewSubtitle}>This is how your information will be used in AI generation.</p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* 🔥 User Identity with Image */}
        <div className={styles.userHeader}>
          <div className={styles.userAvatar}>
            <img src={mockProfileData.avatarUrl} alt={mockProfileData.name} className={styles.avatarImg} />
          </div>
          <div>
            <h3 className={styles.userName}>{mockProfileData.name}</h3>
            <p className={styles.userEmail}>{mockProfileData.email}</p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* 🔥 Horizontal Tabs for Businesses */}
        <div className={styles.tabsContainer}>
          {mockProfileData.businesses.map((biz) => (
            <button
              key={biz.id}
              className={`${styles.tab} ${activeTabId === biz.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTabId(biz.id)}
            >
              <Briefcase size={14} />
              {biz.name}
            </button>
          ))}
        </div>

        {/* 🔥 Active Business Content */}
        {activeBusiness && (
          <div className={styles.activeContent}>
            
            {/* Business Header */}
            <div className={styles.identityRow}>
              <div className={styles.logoCircle}>
                <Briefcase size={20} className={styles.logoIcon} />
              </div>
              <div>
                <h3 className={styles.bizName}>{activeBusiness.name}</h3>
                <p className={styles.bizNiche}>{activeBusiness.type} • {activeBusiness.niche}</p>
              </div>
            </div>

            {/* About */}
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>About Business</h4>
              <p className={styles.aboutText}>{activeBusiness.description}</p>
            </div>

            {/* Details */}
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <Users size={16} className={styles.detailIcon} />
                <div>
                  <span className={styles.dLabel}>Target Audience</span>
                  <span className={styles.dValue}>{activeBusiness.audience}</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <Building2 size={16} className={styles.detailIcon} />
                <div>
                  <span className={styles.dLabel}>Services</span>
                  <span className={styles.dValue}>{activeBusiness.services}</span>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Business Goals</h4>
              <div className={styles.goalsList}>
                {activeBusiness.goals.map((goal, i) => (
                  <span key={i} className={styles.goalBadge}>{goal}</span>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
