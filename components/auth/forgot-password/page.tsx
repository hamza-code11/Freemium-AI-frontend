'use client';

import Link from 'next/link';
import { useState, type FormEvent, useRef } from 'react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'; // 🔥 Hook Import
import toast from 'react-hot-toast'; // 🔥 Extra validation ke liye
import styles from './ForgotPassword.module.css';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { loading, handleForgotPassword, handleVerifyOtp, handleResetPassword } = useAuth();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState<string | null>(null); // Step 3 ke liye token
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 1: Email Submit
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    
    // Hook call (Ye khud toast success/error handle karega)
    const success = await handleForgotPassword(email);
    if (success) {
      setStep(2); // Agle step par jayein
    }
  };

  // Step 2: OTP Handling
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }

    // Hook call -> Ye backend se verify karke reset_token return karega
    const token = await handleVerifyOtp(email, otpString);
    if (token) {
      setResetToken(token); // Token save karein
      setStep(3);           // Agle step par jayein
    }
  };

  // Step 3: Reset Password Submit
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (!resetToken) {
      toast.error('Session expired. Please start over.');
      setStep(1);
      return;
    }

    // Hook call -> Password reset karega
    const success = await handleResetPassword(resetToken, newPassword, confirmPassword);
    if (success) {
      router.push('/login'); // Login page par redirect
    }
  };

  return (
    <div className={styles.container}>
      
      {/* Top Back Button */}
      <header className={styles.topBar}>
        <Link href="/login" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back to Login
        </Link>
      </header>

      <div className={styles.formWrap}>
        
        {/* STEP 1: Email */}
        {step === 1 && (
          <>
            <div className={styles.heading}>
              <h1>Forgot Password?</h1>
              <p>Enter your registered email address and we'll send you an OTP to reset your password.</p>
            </div>
            <form onSubmit={handleEmailSubmit} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.input} ${styles.inputWithIcon}`}
                    disabled={loading}
                  />
                </div>
              </div>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          </>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 2 && (
          <>
            <div className={styles.heading}>
              <h1>Verify OTP</h1>
              <p>We've sent a 6-digit code to <strong>{email}</strong>. Enter it below to verify.</p>
            </div>
            <form onSubmit={handleOtpSubmit} className={styles.form}>
              <div className={styles.otpWrapper}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={styles.otpInput}
                    disabled={loading}
                  />
                ))}
              </div>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          </>
        )}

        {/* STEP 3: New Password */}
        {step === 3 && (
          <>
            <div className={styles.heading}>
              <h1>Create New Password</h1>
              <p>Your identity has been verified. Create a strong new password.</p>
            </div>
            <form onSubmit={handlePasswordSubmit} className={styles.form}>
              
              <div className={styles.field}>
                <label className={styles.label}>New Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input
                    type="password"
                    placeholder="Create new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`${styles.input} ${styles.inputWithIcon}`}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Confirm Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`${styles.input} ${styles.inputWithIcon}`}
                    disabled={loading}
                  />
                </div>
              </div>

              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? 'Updating...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
