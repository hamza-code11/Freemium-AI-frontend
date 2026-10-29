import type { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout/DashboardLayout';

export const metadata: Metadata = {
  title: 'Dashboard | Freemium AI',
  description: 'Manage your AI-powered business growth from one central dashboard.',
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}