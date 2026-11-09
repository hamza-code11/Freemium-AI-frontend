// frontend/services/auth.service.ts
import axiosInstance from '@/lib/axios';
import { LoginResponse, User } from '@/types/auth';

export const authService = {
  // Register
  register: async (data: any) => {
    const res = await axiosInstance.post<User>('/auth/register', data);
    return res.data;
  },

  // Login
  login: async (data: any): Promise<LoginResponse> => {
    const res = await axiosInstance.post<LoginResponse>('/auth/login', data);
    if (res.data.access_token) {
      localStorage.setItem('auth_token', res.data.access_token);
    }
    // User data save karein
    if (res.data.user) {
      localStorage.setItem('user_data', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  // Naya method: Refresh par user data lana
  getMe: async (): Promise<User> => {
    const res = await axiosInstance.get<User>('/auth/me');
    localStorage.setItem('user_data', JSON.stringify(res.data));
    return res.data;
  },


  // Logout
  logout: async () => {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  // Logout from all devices
  logoutAll: async () => {
    await axiosInstance.post('/auth/logout-all');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  // Profile update (FormData for Image)
  updateProfile: async (data: { name?: string; image?: File }) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.image) formData.append('image', data.image);

    const res = await axiosInstance.patch<User>('/auth/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (res.data) {
      localStorage.setItem('user_data', JSON.stringify(res.data));
    }

    return res.data;
  },

  // Change Password
  changePassword: async (data: any) => {
    const res = await axiosInstance.post('/auth/change-password', data);
    return res.data;
  },

  // Forgot Password (OTP)
  forgotPassword: async (email: string) => {
    const res = await axiosInstance.post('/auth/forgot-password', { email });
    return res.data;
  },

  // OTP verify hone par backend reset_token return karta hai
  verifyResetOtp: async (email: string, otp: string) => {
    const res = await axiosInstance.post('/auth/verify-reset-otp', { email, otp });
    return res.data; // { reset_token: "..." } expected
  },

  // Reset Password
  resetPassword: async (data: any) => {
    const res = await axiosInstance.post('/auth/reset-password', data);
    return res.data;
  },
};

