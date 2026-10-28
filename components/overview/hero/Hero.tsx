import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        
        {/* LEFT SIDE: Content */}
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            AI-Powered SaaS Platform for SMEs
          </div>
          
          <h1 className={styles.heroTitle}>
            Grow Your Business with <br />
            <span className={styles.gradientText}>Freemium AI</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            The ultimate all-in-one platform for startups, freelancers, and small businesses. 
            Automate your marketing, generate high-quality content, and get personalized growth recommendations—without hiring an expensive agency.
          </p>

          <div className={styles.heroCta}>
            <button className={styles.btnPrimary}>
              Start for Free
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button className={styles.btnSecondary}>Watch Demo</button>
          </div>

          {/* Trust Badges / Stats */}
          <div className={styles.trustStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10k+</span>
              <span className={styles.statLabel}>Active Users</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50k+</span>
              <span className={styles.statLabel}>Content Generated</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9/5</span>
              <span className={styles.statLabel}>User Rating</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Visual Graphic (Mockup) */}
        <div className={styles.heroVisual}>
          <div className={styles.visualWrapper}>
            {/* Decorative Glow */}
            <div className={styles.glow}></div>
            
            {/* Dashboard Mockup UI */}
            <div className={styles.mockupWindow}>
              <div className={styles.mockupHeader}>
                <div className={styles.mockupDots}>
                  <span></span><span></span><span></span>
                </div>
                <div className={styles.mockupTitle}>Freemium AI Dashboard</div>
              </div>
              <div className={styles.mockupBody}>
                {/* Sidebar */}
                <div className={styles.mockupSidebar}>
                  <div className={styles.sidebarItemActive}></div>
                  <div className={styles.sidebarItem}></div>
                  <div className={styles.sidebarItem}></div>
                  <div className={styles.sidebarItem}></div>
                </div>
                {/* Main Content Area */}
                <div className={styles.mockupContent}>
                  <div className={styles.mockupTopBar}>
                    <div className={styles.mockupSearch}></div>
                    <div className={styles.mockupAvatar}></div>
                  </div>
                  
                  {/* AI Generating Card */}
                  <div className={styles.mockupCard}>
                    <div className={styles.mockupCardHeader}>
                      <div className={styles.mockupIcon}></div>
                      <div className={styles.mockupLines}>
                        <div className={styles.lineWide}></div>
                        <div className={styles.lineNarrow}></div>
                      </div>
                    </div>
                    <div className={styles.mockupTextArea}>
                      <div className={styles.textLine}></div>
                      <div className={styles.textLine}></div>
                      <div className={styles.textLineShort}></div>
                    </div>
                    <div className={styles.mockupBtn}></div>
                  </div>

                  {/* Analytics Mini Card */}
                  <div className={styles.mockupAnalytics}>
                    <div className={styles.analyticsBar} style={{ height: '40%' }}></div>
                    <div className={styles.analyticsBar} style={{ height: '70%' }}></div>
                    <div className={styles.analyticsBar} style={{ height: '50%' }}></div>
                    <div className={styles.analyticsBar} style={{ height: '90%' }}></div>
                    <div className={styles.analyticsBar} style={{ height: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className={styles.floatingBadge1}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Content Generated
            </div>
            <div className={styles.floatingBadge2}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              Growth +150%
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
