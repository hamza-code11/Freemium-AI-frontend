import React from 'react';
import styles from './Showcase.module.css';

export default function Showcase() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>The Product</div>
          <h2 className={styles.title}>Your Entire Marketing Team, In One Dashboard</h2>
          <p className={styles.subtitle}>
            Everything you need to generate content, plan campaigns, and track growth—all in a single, intuitive interface.
          </p>
        </div>

        {/* The Browser Window Mockup */}
        <div className={styles.browserWindow}>
          
          {/* Browser Top Bar */}
          <div className={styles.browserHeader}>
            <div className={styles.browserDots}>
              <span></span><span></span><span></span>
            </div>
            <div className={styles.browserUrl}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              freemiumai.com/dashboard
            </div>
          </div>

          {/* Dashboard Body */}
          <div className={styles.dashboardBody}>
            
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarLogo}>
                <div className={styles.logoDot}></div>
                Freemium AI
              </div>
              <nav className={styles.sidebarNav}>
                <div className={`${styles.navItem} ${styles.active}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  Dashboard
                </div>
                <div className={styles.navItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  Content Studio
                </div>
                <div className={styles.navItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
                  Campaigns
                </div>
                <div className={styles.navItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                  Analytics
                </div>
                <div className={styles.navItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  Settings
                </div>
              </nav>
              
              <div className={styles.sidebarFooter}>
                <div className={styles.upgradeCard}>
                  <span>Go Premium</span>
                  <button>Upgrade</button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className={styles.mainContent}>
              
              {/* Top Bar */}
              <header className={styles.topBar}>
                <div className={styles.welcomeText}>
                  <h3>Welcome back, Ali</h3>
                  <p>Here is your business overview.</p>
                </div>
                <div className={styles.topBarActions}>
                  <button className={styles.newBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    New Content
                  </button>
                </div>
              </header>

              {/* Stats Cards Row */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <span>Content Generated</span>
                    <span className={styles.statBadge}>+12%</span>
                  </div>
                  <div className={styles.statValue}>248</div>
                  <div className={styles.statProgress}><div style={{ width: '70%' }}></div></div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <span>Campaigns Active</span>
                    <span className={styles.statBadge}>+3</span>
                  </div>
                  <div className={styles.statValue}>12</div>
                  <div className={styles.statProgress}><div style={{ width: '40%' }}></div></div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <span>Growth Score</span>
                    <span className={styles.statBadge}>Top 10%</span>
                  </div>
                  <div className={styles.statValue}>86<span>/100</span></div>
                  <div className={styles.statProgress}><div style={{ width: '86%', backgroundColor: '#10b981' }}></div></div>
                </div>
              </div>

              {/* Bottom Grid: Chart & Recent Activity */}
              <div className={styles.bottomGrid}>
                {/* Chart Area */}
                <div className={styles.chartCard}>
                  <div className={styles.cardHeader}>
                    <h4>Weekly Performance</h4>
                    <span className={styles.chartLegend}><span className={styles.legendDot}></span> Engagement</span>
                  </div>
                  <div className={styles.chartArea}>
                    <div className={styles.chartBar} style={{ height: '40%' }}></div>
                    <div className={styles.chartBar} style={{ height: '60%' }}></div>
                    <div className={styles.chartBar} style={{ height: '45%' }}></div>
                    <div className={styles.chartBar} style={{ height: '80%' }}></div>
                    <div className={styles.chartBar} style={{ height: '65%' }}></div>
                    <div className={`${styles.chartBar} ${styles.chartBarHighlight}`} style={{ height: '95%' }}></div>
                    <div className={styles.chartBar} style={{ height: '75%' }}></div>
                  </div>
                  <div className={styles.chartLabels}>
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                {/* Recent Activity (Colors Updated to Theme) */}
                <div className={styles.activityCard}>
                  <div className={styles.cardHeader}>
                    <h4>Recent Activity</h4>
                  </div>
                  <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                      {/* Blue Accent Icon */}
                      <div className={`${styles.activityIcon} ${styles.iconBlue}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                      </div>
                      <div className={styles.activityInfo}>
                        <p>Generated 5 Instagram posts</p>
                        <span>2 mins ago</span>
                      </div>
                    </div>
                    <div className={styles.activityItem}>
                      {/* Green Accent Icon */}
                      <div className={`${styles.activityIcon} ${styles.iconGreen}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                      </div>
                      <div className={styles.activityInfo}>
                        <p>Growth score increased to 86</p>
                        <span>1 hour ago</span>
                      </div>
                    </div>
                    <div className={styles.activityItem}>
                      {/* Purple Accent Icon */}
                      <div className={`${styles.activityIcon} ${styles.iconPurple}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
                      </div>
                      <div className={styles.activityInfo}>
                        <p>New campaign created: Summer Sale</p>
                        <span>3 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </main>
          </div>
        </div>
        
        {/* Bottom floating tags */}
        <div className={styles.floatingTags}>
          <span className={styles.tag}>AI Powered</span>
          <span className={styles.tag}>Real-time Analytics</span>
          <span className={styles.tag}>No Coding Required</span>
          <span className={styles.tag}>Freemium Model</span>
        </div>

      </div>
    </section>
  );
}
