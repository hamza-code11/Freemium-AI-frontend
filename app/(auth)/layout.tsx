import type { Metadata } from 'next';
import BrandPanel from '@/components/auth/shared/BrandPanel';
import styles from './AuthLayout.module.css';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: {
    default: 'Account',
    template: '%s | Freemium AI',
  },
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={styles.shell}>
      {/* Left Side: Form Content */}
      <section className={styles.formSide}>
        {children}
      </section>

      {/* Right Side: Brand Panel */}
      <BrandPanel
        headline="Welcome to Smarter Business Growth"
        description="Your AI-powered workspace to create engaging content, plan smarter campaigns, and grow your business with confidence."
      />
    </main>
  );
}
