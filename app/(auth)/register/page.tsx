import type { Metadata } from "next";
import RegisterForm from "@/components/auth/Registerform/page";

export const metadata: Metadata = {
  title: "Create Account | Freemium AI",
  description: "Start your journey with Freemium AI and unlock powerful tools for business growth.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}