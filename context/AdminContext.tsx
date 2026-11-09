'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';

interface Admin {
  id: number;
  name: string;
  email: string;
  image: string | null;
}

interface AdminContextType {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateAdmin: (data: { name?: string; image?: File }) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false);

  const fetchAdmin = useCallback(async () => {
    if (isFetched.current) return;
    isFetched.current = true;

    const token = localStorage.getItem('admin_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get<Admin>('/admin/me');
      setAdmin(res.data);
    } catch (error) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post('/admin/login', { email, password });
      localStorage.setItem('admin_token', res.data.access_token);
      
      // Agar backend admin data bhej raha hai to set karein
      if (res.data.admin) {
        setAdmin(res.data.admin);
        localStorage.setItem('admin_data', JSON.stringify(res.data.admin));
      } else {
        // Warna fetch karein
        const meRes = await axiosInstance.get('/admin/me');
        setAdmin(meRes.data);
        localStorage.setItem('admin_data', JSON.stringify(meRes.data));
      }
      
      toast.success('Welcome back, Admin!');
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Login failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      // Admin logout endpoint (agar backend me hai to)
      // await axiosInstance.post('/admin/logout');
    } catch (e) {}
    
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    setAdmin(null);
    toast.success('Logged out');
    window.location.href = '/admin/login';
  };

  const updateAdmin = async (data: { name?: string; image?: File }) => {
    try {
      const formData = new FormData();
      if (data.name) formData.append('name', data.name);
      if (data.image) formData.append('image', data.image);

      const res = await axiosInstance.patch('/admin/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setAdmin(res.data);
      localStorage.setItem('admin_data', JSON.stringify(res.data));
      toast.success('Admin profile updated');
      return true;
    } catch (error: any) {
      toast.error('Failed to update admin');
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout, updateAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
