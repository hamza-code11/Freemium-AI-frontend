// frontend/lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token (Admin vs User)
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const isAdminRoute = config.url?.includes('/admin');
    
    const token = isAdminRoute 
      ? localStorage.getItem('admin_token') 
      : localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response Interceptor: Handle 401 with Loop Protection
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAdminRoute = originalRequest?.url?.includes('/admin');

    // Agar 401 aaya aur pehle retry nahi kiya hai
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 🔥 ADMIN route 401 -> Direct logout (No refresh)
      if (isAdminRoute) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_data');
        
        // Loop Protection: Agar pehle se admin login page par hain, to redirect na karein
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }

      // 🔥 USER route 401 -> Try Refresh Token
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.access_token;
        localStorage.setItem('auth_token', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token bhi expire -> Logout
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        
        // Loop Protection: Agar pehle se login page par hain, to redirect na karein
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;