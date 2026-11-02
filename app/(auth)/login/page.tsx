import type { Metadata } from "next";
import LoginForm from "@/components/auth/login/page"; 

export const metadata: Metadata = {
  title: "Sign In | Freemium AI",
  description: "Sign in to continue growing your business with AI.",
};

export default function LoginPage() {
  return <LoginForm />;
}