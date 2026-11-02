'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './Registerform.module.css';

/* ---------- Local components (register only) ---------- */
function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="Freemium AI home">
      <Image src="/logo/logo.png" alt="Freemium AI" width={140} height={40} className={styles.logoImg} priority />
    </Link>
  );
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({ id, label, required, error, className, children }: FieldProps) {
  return (
    <div className={`${styles.field} ${className ?? ''}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>
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
  invalid?: boolean;
  describedBy?: string;
};

function PasswordInput({ id, name, value, onChange, placeholder, invalid, describedBy }: PasswordInputProps) {
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
        autoComplete="new-password"
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

/* ---------- Data & validation ---------- */
const BUSINESS_TYPES = [
  'E-commerce', 'Retail', 'Technology', 'Software / SaaS', 'Digital Agency',
  'Education', 'Healthcare', 'Food & Restaurant', 'Consulting', 'Freelancing', 'Other',
];

export type RegisterValues = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  businessType: string;
  services: string;
  targetAudience: string;
  businessGoals: string;
  businessDescription: string;
};

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const INITIAL: RegisterValues = {
  userName: '', email: '', password: '', confirmPassword: '',
  businessName: '', businessType: '', services: '', targetAudience: '',
  businessGoals: '', businessDescription: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: RegisterValues): RegisterErrors {
  const e: RegisterErrors = {};
  if (!v.userName.trim()) e.userName = 'Enter your full name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address, like you@example.com.';
  if (!v.password) e.password = 'Create a password.';
  else if (v.password.length < 8) e.password = 'Use at least 8 characters.';
  else if (!/[A-Za-z]/.test(v.password) || !/\d/.test(v.password)) e.password = 'Include at least one letter and one number.';
  if (!v.confirmPassword) e.confirmPassword = 'Confirm your password.';
  else if (v.confirmPassword !== v.password) e.confirmPassword = "Passwords don't match.";
  if (!v.businessName.trim()) e.businessName = 'Enter your business name.';
  if (!v.businessType) e.businessType = 'Select a business type.';
  if (!v.services.trim()) e.services = 'List at least one service or product.';
  if (!v.targetAudience.trim()) e.targetAudience = 'Describe who you serve.';
  return e;
}

function passwordStrength(pw: string): { score: number; label: string } {
  if (!pw) return { score: 0, label: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++;
  return { score, label: ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][score] };
}

/* ---------- Form ---------- */
export default function RegisterForm({ onSubmit }: { onSubmit?: (values: RegisterValues) => Promise<void> }) {
  const [values, setValues] = useState<RegisterValues>(INITIAL);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const strength = passwordStrength(values.password);

  const update = (key: keyof RegisterValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const errProps = (key: keyof RegisterValues, id: string) => ({
    'aria-invalid': !!errors[key] || undefined,
    'aria-describedby': errors[key] ? `${id}-error` : undefined,
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setFormMessage(null);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`reg-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    if (!onSubmit) {
      setFormMessage('Registration is not connected to a backend yet.');
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ ...values, email: values.email.trim() });
    } catch {
      setFormMessage("We couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <div className={styles.topLeft}>
          <Link href="/login" className={styles.backBtn}>
            <ArrowLeft size={18} /> Back
          </Link>
          {/* <Logo /> */}
        </div>
        <p className={styles.topSwitch}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </header>

      <div className={styles.formWrap}>
        <div className={styles.heading}>
          <h1>Create Your Account</h1>
          <p>Start your journey with Freemium AI and unlock powerful tools for business growth.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <fieldset className={styles.group}>
            <legend className={styles.legend}>Account Details</legend>
            <div className={styles.grid}>
              <Field id="reg-userName" label="User Name" required error={errors.userName}>
                <input id="reg-userName" type="text" autoComplete="name" placeholder="Enter your full name" value={values.userName} onChange={(e) => update('userName', e.target.value)} className={styles.input} {...errProps('userName', 'reg-userName')} />
              </Field>
              <Field id="reg-email" label="Email Address" required error={errors.email}>
                <input id="reg-email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(e) => update('email', e.target.value)} className={styles.input} {...errProps('email', 'reg-email')} />
              </Field>
              <Field id="reg-password" label="Password" required error={errors.password}>
                <PasswordInput id="reg-password" name="password" value={values.password} onChange={(v) => update('password', v)} placeholder="At least 8 characters" invalid={!!errors.password} describedBy={errors.password ? 'reg-password-error' : 'reg-password-strength'} />
                {values.password && (
                  <div id="reg-password-strength" className={styles.strength} aria-live="polite">
                    <div className={styles.meter} data-score={strength.score} aria-hidden="true"><span /><span /><span /><span /></div>
                    <span className={styles.strengthLabel}>Password strength: {strength.label}</span>
                  </div>
                )}
              </Field>
              <Field id="reg-confirmPassword" label="Confirm Password" required error={errors.confirmPassword}>
                <PasswordInput id="reg-confirmPassword" name="confirmPassword" value={values.confirmPassword} onChange={(v) => update('confirmPassword', v)} placeholder="Re-enter your password" invalid={!!errors.confirmPassword} describedBy={errors.confirmPassword ? 'reg-confirmPassword-error' : undefined} />
              </Field>
            </div>
          </fieldset>

          <fieldset className={styles.group}>
            <legend className={styles.legend}>Business Profile</legend>
            <div className={styles.grid}>
              <Field id="reg-businessName" label="Business Name" required error={errors.businessName}>
                <input id="reg-businessName" type="text" placeholder="Enter your business name" value={values.businessName} onChange={(e) => update('businessName', e.target.value)} className={styles.input} {...errProps('businessName', 'reg-businessName')} />
              </Field>
              <Field id="reg-businessType" label="Business Type" required error={errors.businessType}>
                <select id="reg-businessType" data-empty={values.businessType === '' ? '' : undefined} value={values.businessType} onChange={(e) => update('businessType', e.target.value)} className={`${styles.input} ${styles.select}`} {...errProps('businessType', 'reg-businessType')}>
                  <option value="" disabled>Select business type</option>
                  {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field id="reg-services" label="Services / Products" required error={errors.services}>
                <input id="reg-services" type="text" placeholder="e.g. Web Development..." value={values.services} onChange={(e) => update('services', e.target.value)} className={styles.input} {...errProps('services', 'reg-services')} />
              </Field>
              <Field id="reg-targetAudience" label="Target Audience" required error={errors.targetAudience}>
                <input id="reg-targetAudience" type="text" placeholder="e.g. Small Businesses..." value={values.targetAudience} onChange={(e) => update('targetAudience', e.target.value)} className={styles.input} {...errProps('targetAudience', 'reg-targetAudience')} />
              </Field>
              <Field id="reg-businessGoals" label="Business Goals" className={styles.full}>
                <textarea id="reg-businessGoals" rows={3} placeholder="e.g. Increase sales..." value={values.businessGoals} onChange={(e) => update('businessGoals', e.target.value)} className={`${styles.input} ${styles.textarea}`} />
              </Field>
              <Field id="reg-businessDescription" label="Business Description" className={styles.full}>
                <textarea id="reg-businessDescription" rows={4} placeholder="Tell us about your business..." value={values.businessDescription} onChange={(e) => update('businessDescription', e.target.value)} className={`${styles.input} ${styles.textarea}`} />
              </Field>
            </div>
          </fieldset>

          {formMessage && <p className={styles.formMessage} role="status">{formMessage}</p>}

          <div className={styles.submitBar}>
            <button type="submit" className={styles.submit} disabled={loading} aria-busy={loading}>
              {loading && <span className={styles.spinner} aria-hidden="true" />}
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </div>
        </form>

        <p className={styles.terms}>
          By creating an account, you agree to our <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
