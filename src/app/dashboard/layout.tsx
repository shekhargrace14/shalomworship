
export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
      <main className="p-2 bg-card">
        {children}
      </main>
  )
}