import type { Metadata } from "next";
import LoginForm from "@/components/auth/forgot-password/page"; 

export const metadata: Metadata = {
  title: "Forgot Password | Freemium AI",
  description: "Forgot Password to continue growing your business with AI.",
};

export default function LoginPage() {
  return <LoginForm />;
}