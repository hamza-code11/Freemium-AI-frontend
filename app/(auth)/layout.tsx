
export const metadata = {
  title: {
    default: 'Auth',
    template: '%s | Auth — One + One',
  },
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}