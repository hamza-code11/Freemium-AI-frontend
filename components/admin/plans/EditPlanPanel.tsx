'use client';

import React, { useState } from 'react';
import { Crown, X, Plus } from 'lucide-react';
import styles from './EditPlanPanel.module.css';

export default function EditPlanPanel() {
  const [selectedPlan, setSelectedPlan] = useState('Premium');
  
  // Features Tag Input State
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<string[]>(['AI Content Generator', 'Campaign Planner', 'Priority Support']);

  const handleAddFeature = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && featureInput.trim() !== '') {
      e.preventDefault();
      if (!features.includes(featureInput.trim())) {
        setFeatures([...features, featureInput.trim()]);
      }
      setFeatureInput('');
    }
  };

  const removeFeature = (indexToRemove: number) => {
    setFeatures(features.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={styles.panelCard}>
      
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <Crown size={16} className={styles.icon} />
          <h3 className={styles.title}>Edit Plan</h3>
        </div>
        <button className={styles.closeBtn}><X size={16} /></button>
      </div>

      <div className={styles.scrollBody}>
        
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Basic Information</h4>
          
          {/* Plan Select Dropdown */}
          <div className={styles.group}>
            <label>Select Plan <span>*</span></label>
            <select 
              className={styles.selectInput}
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="Free">Free Plan</option>
              <option value="Premium">Premium Plan</option>
            </select>
          </div>

          <div className={styles.group}>
            <label>Plan Title <span>*</span></label>
            <input type="text" defaultValue="Premium" className={styles.input} />
          </div>

          <div className={styles.group}>
            <label>Price (USD) <span>*</span></label>
            <input type="number" defaultValue="19" className={styles.input} />
          </div>

          <div className={styles.group}>
            <label>Description</label>
            <textarea defaultValue="Unlock the full power of Freemium AI." className={styles.textarea} />
          </div>
        </div>

        <div className={styles.divider} />

        {/* Features Tag Input */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Plan Features</h4>
          <div className={styles.tagInputContainer}>
            <div className={styles.tagsList}>
              {features.map((feature, index) => (
                <span key={index} className={styles.tag}>
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)} className={styles.removeTag}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input 
                type="text" 
                placeholder="Type a feature and press Enter..." 
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={handleAddFeature}
                className={styles.tagInput}
              />
            </div>
          </div>
          <p className={styles.helpText}>Press Enter to add multiple features.</p>
        </div>

      </div>

      <div className={styles.footerActions}>
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.saveBtn}>Save Changes</button>
      </div>

    </div>
  );
}
