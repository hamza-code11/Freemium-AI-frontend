'use client';

import React, { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAdmin } from '@/context/AdminContext';
import styles from './AdminLoginForm.module.css';

export default function AdminLoginForm() {
  const router = useRouter();
  const { login } = useAdmin(); // 🔥 Hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!email.trim()) return toast.error('Enter your admin email.');
    if (!password) return toast.error('Enter your password.');

    setLoading(true);
    const success = await login(email.trim(), password);
    setLoading(false);

    if (success) {
      router.push('/admin');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </header>

      <div className={styles.formWrap}>
        <div className={styles.heading}>
          <h1>Admin Login</h1>
          <p>Sign in to access the administrator dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={16} className={styles.inputIcon} />
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.input} ${styles.inputWithIcon}`}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                type={visible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${styles.inputWithIcon} ${styles.passwordInput}`}
                required
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setVisible(!visible)}
              >
                {visible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading && <span className={styles.spinner} />}
            {loading ? 'Signing in...' : 'Sign In as Admin'}
          </button>
        </form>

        <p className={styles.bottomText}>
          Not an admin? <Link href="/login">Go to User Login</Link>
        </p>
      </div>
    </div>
  );
}