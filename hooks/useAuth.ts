// frontend/hooks/useAuth.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Helper to extract backend error message
  const getErrorMessage = (err: any) => {
    const detail = err?.response?.data?.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail)) return detail[0]?.msg || 'Validation error';
    return 'Something went wrong. Please try again.';
  };

    const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.login({ email, password });
      toast.success('Welcome back! Login successful.');
      router.push('/dashboard/profile');
    } catch (err: any) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (payload: any) => {
    setLoading(true);
    try {
      await authService.register(payload);
      // Auto login after register
      await authService.login({ email: payload.email, password: payload.password });
      toast.success('Account created successfully! Welcome.');
      router.push('/dashboard/profile');
    } catch (err: any) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Flow Steps
  const handleForgotPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      toast.success('OTP sent to your email!');
      return true;
    } catch (err: any) {
      toast.error(getErrorMessage(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (email: string, otp: string): Promise<string | null> => {
    setLoading(true);
    try {
      const res = await authService.verifyResetOtp(email, otp);
      toast.success('OTP verified successfully!');
      return res.reset_token; // Return token to next step
    } catch (err: any) {
      toast.error(getErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (reset_token: string, new_password: string, confirm_password: string): Promise<boolean> => {
    setLoading(true);
    try {
      await authService.resetPassword({ reset_token, new_password, confirm_password });
      toast.success('Password reset successful! Please login.');
      return true;
    } catch (err: any) {
      toast.error(getErrorMessage(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
    handleRegister,
    handleForgotPassword,
    handleVerifyOtp,
    handleResetPassword,
  };
};
