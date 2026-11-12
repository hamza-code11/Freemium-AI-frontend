// app/admin/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DashboardSkeleton from './loading';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    setAuthorized(true);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <AdminLayout>
        <DashboardSkeleton />
      </AdminLayout>
    );
  }


  return (
    <>
      {authorized && <AdminLayout>{children}</AdminLayout>}
    </>
  );
}