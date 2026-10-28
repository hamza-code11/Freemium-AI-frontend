import type { Metadata } from "next";
import Script from 'next/script';
import { ThemeProvider } from './providers/ThemeProvider';
import "./globals.css";

export const metadata: Metadata = {
  title: "Freemium Ai",
  description: "Freemium AI-Powered Business Growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* 🚀 Yeh script F5 par theme flash rokegi */}
        <script
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}