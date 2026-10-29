'use client';

import React, { useState } from 'react';
import { 
  User, Briefcase, Mail, Lock, Plus, Save, 
  CheckSquare, Square, FileText, Target, Layers, Camera, X
} from 'lucide-react';
import styles from './BusinessInfoForm.module.css';

const BUSINESS_TYPES = [
  'E-commerce', 'Service Provider', 'Local Business', 'Agency', 'SaaS / Software', 
  'Freelancer', 'Restaurant / Food', 'Retail Store', 'Consulting', 'Education', 'Healthcare'
];

const AUDIENCE_OPTIONS = [
  'Young Adults (18-35)', 'Teenagers (13-19)', 'Professionals (25-45)', 
  'Seniors (60+)', 'Parents', 'Students', 'Business Owners', 'Everyone'
];

export default function BusinessInfoForm() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Goals Tag Input States
  const [goalInput, setGoalInput] = useState('');
  const [goals, setGoals] = useState<string[]>(['Increase Brand Awareness', 'Get More Customers']);

  const handleGoalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && goalInput.trim() !== '') {
      e.preventDefault();
      if (!goals.includes(goalInput.trim())) {
        setGoals([...goals, goalInput.trim()]);
      }
      setGoalInput('');
    }
  };

  const removeGoal = (indexToRemove: number) => {
    setGoals(goals.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={styles.formContainer}>
      
      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'profile' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={16} /> Profile Info
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'business' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('business')}
        >
          <Briefcase size={16} /> Business Info
        </button>
      </div>

      <div className={styles.formBody}>
        
        {/* ================= PROFILE INFO TAB ================= */}
        {activeTab === 'profile' && (
          <form className={styles.form}>
            
            {/* 🔥 Profile Image Upload */}
            <div className={styles.avatarUploadArea}>
              <div className={styles.avatarPreview}>
                <User size={32} className={styles.avatarPlaceholderIcon} />
              </div>
              <div className={styles.avatarInfo}>
                <h4>Profile Picture</h4>
                <p>Upload a new avatar. JPG, PNG or GIF (max 2MB).</p>
                <label htmlFor="avatar-upload" className={styles.uploadBtn}>
                  <Camera size={16} /> Choose Image
                </label>
                <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} />
              </div>
            </div>

            <div className={styles.divider} />

            <h2 className={styles.formTitle}>Account Details</h2>
            
            <div className={styles.row}>
              <div className={styles.group}>
                <label>Username</label>
                <div className={styles.inputWrapper}>
                  <User size={16} className={styles.inputIcon} />
                  <input type="text" defaultValue="hamza_dev" />
                </div>
              </div>
              <div className={styles.group}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input type="email" defaultValue="hamza@example.com" />
                </div>
              </div>
            </div>

            <div className={styles.divider} />
            
            <h3 className={styles.sectionTitle}>Change Password</h3>
            <div className={styles.row}>
              <div className={styles.group}>
                <label>Current Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className={styles.group}></div>
              <div className={styles.group}>
                <label>New Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input type="password" placeholder="Create new password" />
                </div>
              </div>
              <div className={styles.group}>
                <label>Confirm Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input type="password" placeholder="Confirm new password" />
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.saveBtn} style={{ marginLeft: 'auto' }}>
                <Save size={16} /> Save Profile
              </button>
            </div>
          </form>
        )}

        {/* ================= BUSINESS INFO TAB ================= */}
        {activeTab === 'business' && (
          <form className={styles.form}>
            <h2 className={styles.formTitle}>Business Information</h2>
            <p className={styles.formSubtitle}>Tell us about your primary business.</p>

            <div className={styles.row}>
              <div className={styles.group}>
                <label>Business Name <span>*</span></label>
                <div className={styles.inputWrapper}>
                  <Briefcase size={16} className={styles.inputIcon} />
                  <input type="text" defaultValue="Trendify" />
                </div>
              </div>
              <div className={styles.group}>
                <label>Business Type <span>*</span></label>
                <div className={styles.inputWrapper}>
                  <Layers size={16} className={styles.inputIcon} />
                  <select defaultValue="E-commerce">
                    {BUSINESS_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.group}>
              <label>Services / Products <span>*</span></label>
              <div className={styles.textareaWrapper}>
                <FileText size={16} className={styles.textareaIcon} />
                <textarea 
                  rows={2} 
                  defaultValue="Trendy clothing, accessories for men and women, seasonal collections."
                />
              </div>
            </div>

            {/* 🔥 Target Audience Dropdown */}
            <div className={styles.row}>
              <div className={styles.group}>
                <label>Target Audience <span>*</span></label>
                <div className={styles.inputWrapper}>
                  <Target size={16} className={styles.inputIcon} />
                  <select defaultValue="Young Adults (18-35)">
                    {AUDIENCE_OPTIONS.map(aud => (
                      <option key={aud} value={aud}>{aud}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 🔥 Business Goals Tag Input */}
            <div className={styles.group}>
              <label>Business Goals</label>
              <div className={styles.tagInputContainer}>
                <div className={styles.tagsList}>
                  {goals.map((goal, index) => (
                    <span key={index} className={styles.tag}>
                      {goal}
                      <button type="button" onClick={() => removeGoal(index)} className={styles.removeTag}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <input 
                    type="text" 
                    placeholder="Type a goal and press Enter..." 
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    onKeyDown={handleGoalKeyDown}
                    className={styles.tagInput}
                  />
                </div>
              </div>
              <p className={styles.helpText}>Press Enter to add multiple goals.</p>
            </div>

            <div className={styles.group}>
              <label>Business Description</label>
              <div className={styles.textareaWrapper}>
                <FileText size={16} className={styles.textareaIcon} />
                <textarea 
                  rows={3} 
                  defaultValue="Trendy clothing and accessories for modern and confident individuals. We bring you the latest styles."
                />
              </div>
            </div>

            {/* Multiple Business Box */}
            <div className={styles.multiBusinessBox}>
              <div>
                <h4>Manage Multiple Businesses</h4>
                <p>You can add more businesses to your profile.</p>
              </div>
              <button type="button" className={styles.addBtn}>
                <Plus size={16} /> Add Business
              </button>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.cancelBtn}>Cancel</button>
              <button type="button" className={styles.saveBtn}>
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
