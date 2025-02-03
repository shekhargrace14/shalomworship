import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import { QueryProvider } from "./reactQuery/query-provider";
import { GoogleAnalytics } from '@next/third-parties/google'

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
  keywords:"Worship song lyrics, gospil song lyrics, christian song lyrics",
  canonical:"Shalom Worship is a faith-based music ministry dedicated to spreading the message of peace, hope, and salvation through heartfelt worship. Known for its soul-stirring melodies and spirit-filled lyrics, Shalom Worship brings together a community of believers to praise and glorify God."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-H4QZJK5XEN" />
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7686801812294972"
     crossorigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
  
          <QueryProvider>
          <Header />
          <div className="flex gap-4 ">
            <div className="w-full hidden md:block  md:w-4/12 lg:w-3/12 rounded-lg  ">
              <Sidebar />
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12 bg-gradient-to-b from-[#1f1f1f] to-[#000000] rounded-lg">
              <main>
                {children}
              </main>
              {/* <Footer /> */}
            </div>
          </div>

        </QueryProvider>
      </body>
    </html>
  );
}