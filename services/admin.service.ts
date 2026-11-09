// frontend/services/admin.service.ts
import axiosInstance from '@/lib/axios';

export interface AdminLoginResponse {
  access_token: string;
  token_type: string;
  admin: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const adminService = {
  login: async (data: any): Promise<AdminLoginResponse> => {
    const res = await axiosInstance.post<AdminLoginResponse>('/admin/auth/login', data);
    
    if (res.data.access_token) {
      localStorage.setItem('admin_token', res.data.access_token);
      if (res.data.admin) {
        localStorage.setItem('admin_data', JSON.stringify(res.data.admin));
      }
    }
    return res.data;
  },

  logout: async () => {
    await axiosInstance.post('/admin/auth/logout');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
  },
};