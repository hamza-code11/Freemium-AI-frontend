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

export interface AdminBusinessProfile {
  id: number;
  business_name: string;
  business_type?: string | null;
  business_description?: string | null;
  services?: string | null;
  business_goals?: string | null;
  target_audience?: string[] | null;
  website?: string | null;
  phone?: string | null;
  address?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface UserBusinessProfileResponse {
  user_id: number;
  user_name: string;
  user_email: string;
  has_profile: boolean;
  total_profiles: number;
  profiles: AdminBusinessProfile[]; 
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

  async getBusinessProfile(userId: number): Promise<UserBusinessProfileResponse> {
    const { data } = await axiosInstance.get<UserBusinessProfileResponse>(
      `/admin/users/${userId}/business-profile`
    );
    return data;
  },

};