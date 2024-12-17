import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import localFont from "next/font/local";
import { QueryProvider } from "./context/query-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Shalom Worship",
  description:
    "Shalom Worship is a faith-based music ministry dedicated to spreading the message of peace, hope, and salvation through heartfelt worship. Known for its soul-stirring melodies and spirit-filled lyrics, Shalom Worship brings together a community of believers to praise and glorify God.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="grid grid-cols-1 h-dvh grid-rows-[3.5rem_1fr] md:grid-cols-6 gap-x-5 gap-y-2 p-2">
            <Header />
            <div className="hidden md:block md:col-span-1 w-full rounded-lg">
              <Sidebar />
            </div>
            <main className="w-full overflow-hidden h-full md:col-span-5 bg-gradient-to-b from-[#1f1f1f] to-[#000000] rounded-lg">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
