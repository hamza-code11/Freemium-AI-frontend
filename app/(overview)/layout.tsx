import Navbar from '@/components/overview/layout/navbar/Navbar';
import Footer from '@/components/overview/layout/footer/Footer';

export const metadata = {
  title: {
    default: 'Overview',
    template: '%s | Overview',
  },
};

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
