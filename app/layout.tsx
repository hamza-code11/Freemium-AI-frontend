import type { Metadata } from "next";
import { ThemeProvider } from './providers/ThemeProvider';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import { ProfileProvider } from '@/context/ProfileContext'; 
import { AdminProvider } from '@/context/AdminContext';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://freemium-ai.vercel.app'),
  title: {
    default: 'Freemium AI | AI-Powered Business Growth',
    template: '%s | Freemium AI',
  },
  description:
    'Empowering startups, freelancers, and small businesses with affordable AI-powered tools.',
  applicationName: 'Freemium AI',
  keywords: ['AI marketing', 'AI content generator', 'SME growth tools', 'Freemium AI'],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Freemium AI | AI-Powered Business Growth',
    description:
      'Empowering startups, freelancers, and small businesses with affordable AI-powered tools.',
    siteName: 'Freemium AI',
    type: 'website',
    locale: 'en_US',
    images: [
      { url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Freemium AI' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freemium AI | AI-Powered Business Growth',
    description:
      'Empowering startups, freelancers, and small businesses with affordable AI-powered tools.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* F5 par theme flash rokne ke liye */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ProfileProvider>
            <AdminProvider>

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                fontSize: '14px',
              },
              success: { duration: 3000 },
              error: { duration: 4000 },
            }}
          />
          {children}
          </AdminProvider>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}