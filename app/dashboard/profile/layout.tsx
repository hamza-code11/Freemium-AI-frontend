// app/dashboard/profile/layout.tsx
import { ProfileProvider } from '@/context/ProfileContext';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      {children}
    </ProfileProvider>
  );
}