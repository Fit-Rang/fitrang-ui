interface AuthLayoutProps {
  children: React.ReactNode;
}
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <title>FitRang | Authentication</title>
      {children}
    </>
  );
}
