interface SearchLayoutProps {
  children: React.ReactNode;
}
export function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      <title>FitRang | Search User</title>
      <article className="h-screen flex items-center justify-center">
        {children}
      </article>
    </>
  );
}
