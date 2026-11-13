'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '@/lib/axios';
import { User } from '@/types/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // Force Refresh & Heartbeat Check
  const refreshProfile = useCallback(async (isBackgroundCheck = false) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (!isBackgroundCheck) setLoading(true);

    try {
      const res = await axiosInstance.get<User>('/auth/me');
      setUser(res.data);
      localStorage.setItem('user_data', JSON.stringify(res.data));
    } catch (error: any) {
      console.log("Profile fetch error", error);
      
      // AGAR SUSPENDED HAI YA TOKEN INVALID HAI TO LOGOUT KARO
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setUser(null);
        
        // Agar background check tha, toh sirf tab redirect karo jab user pehle se logged in tha
        if (isBackgroundCheck) {
          toast.error("Your account has been suspended or session expired.");
          router.push('/login'); // Login page par bhej dein
        }
      }
    } finally {
      if (!isBackgroundCheck) setLoading(false);
    }
  }, [router]);

  // Initial Load + Heartbeat Polling
  useEffect(() => {
    refreshProfile();

    // Har 30 seconds (30000 ms) baad backend check karega
    const interval = setInterval(() => {
      refreshProfile(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshProfile]);

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

  const updateBusiness = async (businessId: number, data: any) => {
    setSaving(true);
    try {
      await axiosInstance.patch(`/business-profiles/${businessId}`, data);
      await refreshProfile(); // Background refresh
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

  const createBusiness = async (data: any) => {
    setSaving(true);
    try {
      await axiosInstance.post('/business-profiles/', data);
      await refreshProfile(); // Background refresh
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