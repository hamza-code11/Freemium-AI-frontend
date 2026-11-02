import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/layout/AdminLayout';

export const metadata: Metadata = {
  title: 'Admin Panel | Freemium AI',
  description: 'Manage users, subscriptions, and monitor platform activity.',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}