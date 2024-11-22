import localFont from "next/font/local";
import "./globals.css";
import { DataProvider } from "./context/DataContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

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
  description: "Shalom Worship is a faith-based music ministry dedicated to spreading the message of peace, hope, and salvation through heartfelt worship. Known for its soul-stirring melodies and spirit-filled lyrics, Shalom Worship brings together a community of believers to praise and glorify God.",
  canonical:"Shalom Worship is a faith-based music ministry dedicated to spreading the message of peace, hope, and salvation through heartfelt worship. Known for its soul-stirring melodies and spirit-filled lyrics, Shalom Worship brings together a community of believers to praise and glorify God."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataProvider>
          <Header />
          <div className="flex gap-4 ">
            <div className="hidden md:block  md:w-4/12 lg:w-3/12  ">
              <Sidebar />
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12 bg-[#121212] rounded-lg">
              <main>
                {children}
              </main>
              {/* <Footer /> */}
            </div>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
