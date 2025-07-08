export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen bg-black">
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}