
export const metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin — One + One',
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}