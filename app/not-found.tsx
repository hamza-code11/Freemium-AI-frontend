import Link from 'next/link';
import styles from './NotFound.module.css';

export const metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      
      {/* Background Grid/Glow */}
      <div className={styles.bgGlow}></div>

      <div className={styles.content}>

        {/* Big 404 Text */}
        <h1 className={styles.errorCode}>404</h1>
        
        {/* Message */}
        <h2 className={styles.title}>Oops! Page not found</h2>
        <p className={styles.description}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* CTA Buttons */}
        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrimary}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Go Back Home
          </Link>
          <Link href="/#features" className={styles.btnSecondary}>
            Explore Features
          </Link>
        </div>

      </div>
    </div>
  );
}
