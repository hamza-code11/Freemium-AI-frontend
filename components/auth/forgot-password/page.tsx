'use client';

import Link from 'next/link';
import { useState, type FormEvent, useRef } from 'react';
import { ArrowLeft, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './ForgotPassword.module.css';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 1: Email Submit
  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    setError(null);
    setLoading(true);
    // Mock API Call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
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

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setError(null);
    setLoading(true);
    // Mock API Call
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  // Step 3: Reset Password Submit
  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setLoading(true);
    // Mock API Call
    setTimeout(() => {
      setLoading(false);
      router.push('/login'); // Redirect to login
    }, 1000);
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
                  />
                </div>
              </div>
              {error && <p className={styles.error}>{error}</p>}
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
                  />
                ))}
              </div>
              {error && <p className={styles.error}>{error}</p>}
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
                  />
                </div>
              </div>

              {error && <p className={styles.error}>{error}</p>}

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
