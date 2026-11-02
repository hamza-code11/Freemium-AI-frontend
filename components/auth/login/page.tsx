'use client';

import Link from 'next/link';
import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './Loginform.module.css';

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {children}
      {error && <p id={`${id}-error`} className={styles.error} role="alert">{error}</p>}
    </div>
  );
}

type PasswordInputProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  invalid?: boolean;
  describedBy?: string;
};

function PasswordInput({ id, name, value, onChange, placeholder, autoComplete, invalid, describedBy }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.passwordWrap}>
      <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={`${styles.input} ${styles.passwordInput}`}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {visible ? (
            <>
              <path d="M17.94 17.94A10.9 10.9 0 0112 20c-7 0-10-8-10-8a18.5 18.5 0 015.06-5.94M9.9 4.24A10.9 10.9 0 0112 4c7 0 10 8 10 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" />
              <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
            </>
          ) : (
            <>
              <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}

export type LoginValues = { email: string; password: string; remember: boolean };
type LoginErrors = Partial<Record<'email' | 'password', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  if (!v.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Enter a valid email address, like you@example.com.';
  if (!v.password) errors.password = 'Enter your password.';
  return errors;
}

export default function LoginForm({ onSubmit }: { onSubmit?: (values: LoginValues) => Promise<void> }) {
  const [values, setValues] = useState<LoginValues>({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const update = <K extends keyof LoginValues>(key: K, value: LoginValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key !== 'remember' && errors[key as 'email' | 'password']) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setFormMessage(null);

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!onSubmit) {
      setFormMessage('Sign in is not connected to a backend yet.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ ...values, email: values.email.trim() });
    } catch {
      setFormMessage("We couldn't sign you in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={18} /> Back
        </Link>
      </header>

      <div className={styles.formWrap}>
        <div className={styles.heading}>
          <h1>Welcome Back</h1>
          <p>Sign in to continue growing your business with AI.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <Field id="login-email" label="Email Address" error={errors.email}>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={!!errors.email || undefined}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
              className={styles.input}
            />
          </Field>

          <Field id="login-password" label="Password" error={errors.password}>
            <PasswordInput
              id="login-password"
              name="password"
              value={values.password}
              onChange={(v) => update('password', v)}
              placeholder="Enter your password"
              autoComplete="current-password"
              invalid={!!errors.password}
              describedBy={errors.password ? 'login-password-error' : undefined}
            />
          </Field>

          <div className={styles.optionsRow}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={values.remember} onChange={(e) => update('remember', e.target.checked)} />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className={styles.textLink}>Forgot Password?</Link>
          </div>

          {formMessage && <p className={styles.formMessage} role="status">{formMessage}</p>}

          <button type="submit" className={styles.submit} disabled={loading} aria-busy={loading}>
            {loading && <span className={styles.spinner} aria-hidden="true" />}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className={styles.bottomText}>
          Don&apos;t have an account? <Link href="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
