// frontend/services/product.service.ts
import axiosInstance from '@/lib/axios';

export const productService = {
  getAll: async () => {
    const res = await axiosInstance.get('/products');
    return res.data;
  },
  create: async (data: FormData) => {
    const res = await axiosInstance.post('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};
