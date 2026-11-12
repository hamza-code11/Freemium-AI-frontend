// services/admin-user.service.ts
import axiosInstance from '@/lib/axios';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  image: string | null;
  is_suspended: boolean;
  created_at: string;
  last_active_at: string | null;
  is_active: boolean;
}

export interface AdminUserDetail extends AdminUser {
  total_generations: number;
  content_generated: number;
  campaigns_generated: number;
  recommendations_generated: number;
}

export interface AdminUserListResponse {
  items: AdminUser[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export const adminUserService = {
  getUsers: async (queryString: string): Promise<AdminUserListResponse> => {
    const res = await axiosInstance.get<AdminUserListResponse>(
      `/admin/users?${queryString}`
    );
    return res.data;
  },

  getUserDetails: async (userId: number): Promise<AdminUserDetail> => {
    const res = await axiosInstance.get<AdminUserDetail>(
      `/admin/users/${userId}`
    );
    return res.data;
  },

  toggleSuspension: async (
    userId: number
  ): Promise<{ message: string; is_suspended: boolean }> => {
    const res = await axiosInstance.patch(
      `/admin/users/${userId}/toggle-suspension`
    );
    return res.data;
  },
};