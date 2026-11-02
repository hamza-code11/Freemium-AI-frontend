import React from 'react';
import { AreaChart as ChartIcon } from 'lucide-react';
import styles from './UsageChart.module.css';

export default function UsageChart() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <ChartIcon size={18} className={styles.icon} />
          <h3 className={styles.title}>AI Usage Over Time</h3>
        </div>
        <div className={styles.legend}>
          <span className={styles.dot}></span> Generations
        </div>
      </div>

      {/* CSS-based Chart Mockup */}
      <div className={styles.chartContainer}>
        <div className={styles.yAxis}>
          <span>25</span><span>20</span><span>15</span><span>10</span><span>5</span><span>0</span>
        </div>
        
        <div className={styles.chartArea}>
          {/* Tooltip Mockup */}
          <div className={styles.tooltip}>
            <span className={styles.tooltipDate}>Apr 24, 2025</span>
            <strong>18 generations</strong>
          </div>

          {/* SVG Line & Area */}
          <svg className={styles.mainSvg} viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,160 Q50,140 100,150 T200,120 T300,130 T400,100 T500,80 T600,90 T700,60 L800,40 L800,200 L0,200 Z" fill="url(#areaGrad)" />
            <path d="M0,160 Q50,140 100,150 T200,120 T300,130 T400,100 T500,80 T600,90 T700,60 L800,40" fill="none" stroke="var(--color-accent-primary)" strokeWidth="2" />
            {/* Data Point */}
            <circle cx="550" cy="80" r="5" fill="var(--color-bg-primary)" stroke="var(--color-accent-primary)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      
      <div className={styles.xAxis}>
        <span>Apr 17</span><span>Apr 18</span><span>Apr 19</span><span>Apr 20</span><span>Apr 21</span><span>Apr 22</span><span>Apr 23</span><span>Apr 24</span><span>Apr 25</span><span>Apr 26</span><span>Apr 27</span><span>Apr 28</span><span>Apr 29</span><span>Apr 30</span><span>May 1</span>
      </div>
    </div>
  );
}
