'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '@/lib/axios';
import { User } from '@/types/auth';
import toast from 'react-hot-toast';

interface ProfileContextType {
  user: User | null;
  loading: boolean;
  saving: boolean;
  updateProfile: (data: { name?: string; image?: File }) => Promise<boolean>;
  updateBusiness: (businessId: number, data: any) => Promise<boolean>;
  createBusiness: (data: any) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const isFetched = useRef(false);

  // Force Refresh
  const refreshProfile = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      isFetched.current = true;
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.get<User>('/auth/me');
      setUser(res.data);
      localStorage.setItem('user_data', JSON.stringify(res.data));
    } catch (error: any) {
      console.log("Profile fetch error", error);
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setUser(null);
      }
    } finally {
      setLoading(false);
      isFetched.current = true;
    }
  }, []);

  // Initial Load
  useEffect(() => {
    if (isFetched.current) return;
    refreshProfile();
  }, [refreshProfile]);

  // Update Profile
  const updateProfile = async (data: { name?: string; image?: File }) => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (data.name) formData.append('name', data.name);
      if (data.image) formData.append('image', data.image);

      const res = await axiosInstance.patch<User>('/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setUser(res.data);
      localStorage.setItem('user_data', JSON.stringify(res.data));
      toast.success('Profile updated successfully');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to update profile');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // 🔥 Update Business (Fixed)
  const updateBusiness = async (businessId: number, data: any) => {
    setSaving(true);
    try {
      await axiosInstance.patch(`/business-profiles/${businessId}`, data);
      
      // Backend se fresh data fetch karein
      await refreshProfile();
      
      toast.success('Business information updated');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to update business');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // 🔥 Create Business (Fixed)
  const createBusiness = async (data: any) => {
    setSaving(true);
    try {
      await axiosInstance.post('/business-profiles/', data);
      
      // Backend se fresh data fetch karein
      await refreshProfile();
      
      toast.success('New business added successfully');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to add business');
      return false;
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProfileContext.Provider value={{ 
      user, loading, saving, updateProfile, updateBusiness, createBusiness, refreshProfile, setUser 
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

