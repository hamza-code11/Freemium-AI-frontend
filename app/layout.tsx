import type { Metadata } from "next";
import Script from 'next/script';
import { ThemeProvider } from './providers/ThemeProvider';
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://freemium-ai.vercel.app"),
  title: "Freemium AI | AI-Powered Business Growth",
  description:
    "Empowering startups, freelancers, and small businesses with affordable AI-powered tools.",
  openGraph: {
    title: "Freemium AI | AI-Powered Business Growth",
    description:
      "Empowering startups, freelancers, and small businesses with affordable AI-powered tools.",
    url: "https://freemium-ai.vercel.app",
    siteName: "Freemium AI",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Freemium AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freemium AI | AI-Powered Business Growth",
    description:
      "Empowering startups, freelancers, and small businesses with affordable AI-powered tools.",
    images: ["/opengraph-image.png"],
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
        {/* Yeh script F5 par theme flash rokegi */}
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