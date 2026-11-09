// frontend/services/business.service.ts
import axiosInstance from '@/lib/axios';

export const businessService = {
  getProfile: async () => {
    const res = await axiosInstance.get('/business-profiles'); // apna exact route check kar lein
    return res.data;
  },
  updateProfile: async (data: any) => {
    const res = await axiosInstance.patch('/business-profiles', data);
    return res.data;
  },
};
