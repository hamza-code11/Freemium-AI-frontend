// app/(auth)/admin/login/page.tsx
import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/auth/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Freemium AI",
  description: "Admin access to Freemium AI dashboard.",
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}