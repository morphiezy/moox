export default function AuthLayout({ children }: { children: JSX.Element }) {
  return (
    <main className="w-full min-h-[100dvh] grid grid-cols-1 px-4 py-6 place-items-center">
      {children}
    </main>
  );
}
