'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Briefcase, Mail, Save, 
  FileText, Target, Layers, Camera, X, ChevronDown, Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './BusinessInfoForm.module.css';
import { useProfile } from '@/context/ProfileContext';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import BusinessInfoFormSkeleton from '@/components/dashboard/skeletons/ProfileHeaderSkeleton/BusinessInfoFormSkeleton';

const BUSINESS_TYPES = [
  'E-commerce', 'Retail', 'Technology', 'Software / SaaS', 'Digital Agency',
  'Education', 'Healthcare', 'Food & Restaurant', 'Consulting', 'Freelancing', 'Other',
];

const TARGET_AUDIENCE_OPTIONS = [
  { value: 'kids_men', label: 'Kids (Men)' },
  { value: 'kids_women', label: 'Kids (Women)' },
  { value: 'teenagers_men', label: 'Teenagers (Men)' },
  { value: 'teenagers_women', label: 'Teenagers (Women)' },
  { value: 'young_adults_men', label: 'Young Adults (Men)' },
  { value: 'young_adults_women', label: 'Young Adults (Women)' },
  { value: 'young_men', label: 'Young Men' },
  { value: 'young_women', label: 'Young Women' },
  { value: 'middle_age_men', label: 'Middle Age (Men)' },
  { value: 'middle_age_women', label: 'Middle Age (Women)' },
  { value: 'seniors_men', label: 'Seniors (Men)' },
  { value: 'seniors_women', label: 'Seniors (Women)' },
];

// 🔥 business_goals ab string hai (backend ke mutabiq)
interface BusinessFormState {
  id: number | null;
  business_name: string;
  business_type: string;
  services: string;
  target_audience: string[];
  business_goals: string;
  business_description: string;
  isOpen: boolean;
}

const EMPTY_BUSINESS: BusinessFormState = {
  id: null,
  business_name: '',
  business_type: '',
  services: '',
  target_audience: [],
  business_goals: '',
  business_description: '',
  isOpen: false,
};

export default function BusinessInfoForm() {
  const { user, loading, saving, updateProfile, updateBusiness, createBusiness } = useProfile();
  const [activeTab, setActiveTab] = useState<'profile' | 'business'>('profile');

  // --- Profile States ---
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // 🔥 Multiple Businesses Array
  const [businesses, setBusinesses] = useState<BusinessFormState[]>([]);
  
  const audienceRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Load Data
  useEffect(() => {
    if (user && businesses.length === 0) {
      setName(user.name);
      setImagePreview(user.image ? `${getUploadsBaseUrl()}/users/${user.image}` : '');

      if (user.business_profiles && user.business_profiles.length > 0) {
        const forms = user.business_profiles.map(biz => ({
          id: biz.id,
          business_name: biz.business_name,
          business_type: biz.business_type,
          services: biz.services,
          target_audience: biz.target_audience || [],
          business_goals: biz.business_goals || '', // 🔥 Direct string
          business_description: biz.business_description || '',
          isOpen: false,
        }));
        setBusinesses(forms);
      } else {
        setBusinesses([{ ...EMPTY_BUSINESS }]);
      }
    }
  }, [user, businesses.length]);

  // Dropdown outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      let hasChanges = false;
      const newBusinesses = businesses.map((biz, idx) => {
        const ref = audienceRefs.current[idx];
        if (biz.isOpen && ref && !ref.contains(event.target as Node)) {
          hasChanges = true;
          return { ...biz, isOpen: false };
        }
        return biz;
      });
      if (hasChanges) setBusinesses(newBusinesses);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [businesses]);

  const updateBusinessState = (index: number, field: keyof BusinessFormState, value: any) => {
    setBusinesses(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addNewBusiness = () => {
    setBusinesses(prev => [...prev, { ...EMPTY_BUSINESS }]);
  };

  const removeNewBusiness = (index: number) => {
    if (businesses[index].id !== null) {
      toast.error("You can't remove a saved business profile.");
      return;
    }
    setBusinesses(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name, image: imageFile || undefined });
  };

  const handleSaveBusiness = async (e: React.FormEvent, index: number) => {
    e.preventDefault();
    const biz = businesses[index];

    // Local Validation
    if (!biz.business_name.trim() || !biz.business_type || !biz.services.trim() || biz.target_audience.length === 0) {
      return toast.error('Please fill all required fields.');
    }

    const payload = {
      business_name: biz.business_name.trim(),
      business_type: biz.business_type,
      services: biz.services.trim(),
      target_audience: biz.target_audience,
      // 🔥 Direct string bhejein
      business_goals: biz.business_goals.trim() || null,
      business_description: biz.business_description.trim() || null,
    };

    if (biz.id) {
      await updateBusiness(biz.id, payload);
    } else {
      await createBusiness(payload);
    }
  };

  if (loading || !user) {
    return <BusinessInfoFormSkeleton />;
  }

  return (
    <div className={styles.formContainer}>
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
        
        {/* ============ PROFILE INFO TAB ============ */}
        {activeTab === 'profile' && (
          <form className={styles.form} onSubmit={handleSaveProfile}>
            <div className={styles.avatarUploadArea}>
              <div className={styles.avatarPreview}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <User size={32} className={styles.avatarPlaceholderIcon} />
                )}
              </div>
              <div className={styles.avatarInfo}>
                <h4>Profile Picture</h4>
                <p>Upload a new avatar. JPG, PNG or WEBP (max 2MB).</p>
                <label htmlFor="avatar-upload" className={styles.uploadBtn}>
                  <Camera size={16} /> Choose Image
                </label>
                <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
              </div>
            </div>

            <div className={styles.divider} />
            <h2 className={styles.formTitle}>Account Details</h2>
            
            <div className={styles.row}>
              <div className={styles.group}>
                <label>Full Name</label>
                <div className={styles.inputWrapper}>
                  <User size={16} className={styles.inputIcon} />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className={styles.group}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input type="email" value={user.email} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.saveBtn} disabled={saving} style={{ marginLeft: 'auto' }}>
                <Save size={16} /> {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        )}

        {/* ============ BUSINESS INFO TAB ============ */}
        {activeTab === 'business' && (
          <div className={styles.multiBusinessContainer}>
            
            {businesses.map((biz, index) => (
              <div key={index} className={styles.businessFormCard}>
                <div className={styles.businessFormHeader}>
                  <h3>
                    {biz.id ? `Business #${index + 1}` : `New Business #${index + 1}`}
                  </h3>
                  {biz.id === null && businesses.length > 1 && (
                    <button 
                      type="button" 
                      className={styles.removeBusinessBtn}
                      onClick={() => removeNewBusiness(index)}
                    >
                      <X size={16} /> Remove
                    </button>
                  )}
                </div>

                <form className={styles.form} onSubmit={(e) => handleSaveBusiness(e, index)}>
                  <div className={styles.row}>
                    <div className={styles.group}>
                      <label>Business Name <span>*</span></label>
                      <div className={styles.inputWrapper}>
                        <Briefcase size={16} className={styles.inputIcon} />
                        <input 
                          type="text" 
                          value={biz.business_name} 
                          onChange={(e) => updateBusinessState(index, 'business_name', e.target.value)} 
                          required 
                        />
                      </div>
                    </div>
                    <div className={styles.group}>
                      <label>Business Type <span>*</span></label>
                      <div className={styles.inputWrapper}>
                        <Layers size={16} className={styles.inputIcon} />
                        <select 
                          value={biz.business_type} 
                          onChange={(e) => updateBusinessState(index, 'business_type', e.target.value)} 
                          required
                        >
                          <option value="" disabled>Select business type</option>
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
                        value={biz.services} 
                        onChange={(e) => updateBusinessState(index, 'services', e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  {/* Target Audience Dropdown */}
                  <div className={styles.group}>
                    <label>Target Audience <span>*</span></label>
                    <div 
                      className={styles.dropdownWrapper} 
                      ref={el => { audienceRefs.current[index] = el; }}
                    >
                      <div 
                        className={`${styles.input} ${styles.dropdownTrigger}`}
                        onClick={() => updateBusinessState(index, 'isOpen', !biz.isOpen)}
                      >
                        {biz.target_audience.length === 0 ? (
                          <span className={styles.dropdownPlaceholder}>Select target audience</span>
                        ) : (
                          <div className={styles.selectedTags}>
                            {biz.target_audience.map(val => {
                              const opt = TARGET_AUDIENCE_OPTIONS.find(o => o.value === val);
                              return <span key={val} className={styles.tag}>{opt?.label}</span>
                            })}
                          </div>
                        )}
                        <ChevronDown size={16} className={`${styles.dropdownIcon} ${biz.isOpen ? styles.rotate : ''}`} />
                      </div>

                      {biz.isOpen && (
                        <div className={styles.dropdownMenu}>
                          {TARGET_AUDIENCE_OPTIONS.map(opt => (
                            <label key={opt.value} className={styles.dropdownItem}>
                              <input
                                type="checkbox"
                                checked={biz.target_audience.includes(opt.value)}
                                onChange={() => {
                                  const updated = biz.target_audience.includes(opt.value)
                                    ? biz.target_audience.filter(v => v !== opt.value)
                                    : [...biz.target_audience, opt.value];
                                  updateBusinessState(index, 'target_audience', updated);
                                }}
                              />
                              <span>{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 🔥 Business Goals (Simple Textarea) */}
                  <div className={styles.group}>
                    <label>Business Goals</label>
                    <textarea 
                      rows={2} 
                      placeholder="e.g. Increase sales, Get more customers..."
                      value={biz.business_goals} 
                      onChange={(e) => updateBusinessState(index, 'business_goals', e.target.value)}
                      className={styles.textarea}
                    />
                  </div>

                  <div className={styles.group}>
                    <label>Business Description</label>
                    <textarea 
                      rows={3} 
                      value={biz.business_description} 
                      onChange={(e) => updateBusinessState(index, 'business_description', e.target.value)}
                      className={styles.textarea}
                    />
                  </div>

                  <div className={styles.actions}>
                    <button type="submit" className={styles.saveBtn} disabled={saving}>
                      <Save size={16} /> {saving ? 'Saving...' : (biz.id ? 'Update Business' : 'Save Business')}
                    </button>
                  </div>
                </form>
              </div>
            ))}

            <button type="button" className={styles.addNewBizBtn} onClick={addNewBusiness}>
              <Plus size={16} /> Add Another Business
            </button>
          </div>
        )}

      </div>
    </div>
  );
}