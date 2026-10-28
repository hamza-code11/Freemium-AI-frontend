
export const metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard — One + One',
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}