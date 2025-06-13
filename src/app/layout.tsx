import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import { QueryProvider } from "@/lib/query/query-provider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: {
    default: "Your App Name",
    template: "%s | Your App Name"
  },
  description: "Your app description",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased bg-black">
        <QueryProvider>
            <Header />
            <div className="flex flex-1 gap-4 ">
              <aside className="w-full hidden md:block md:w-4/12 lg:w-3/12 rounded-lg">
                <Sidebar />
              </aside>
              <main className="w-full md:w-8/12 lg:w-9/12 bg-gradient-to-b from-[#1f1f1f] to-[#000000] rounded-lg">
                {children}
              </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}