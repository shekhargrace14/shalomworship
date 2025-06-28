import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import { QueryProvider } from "@/lib/query/query-provider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { GoogleAnalytics } from '@next/third-parties/google';
// import BottomPlayer from "@/components/layout/BottomPlayer";



export const metadata: Metadata = {
  title: "Shalom Worship",
  description: "Shalom Worship is a faith-based music ministry dedicated to spreading the message of peace, hope, and salvation through heartfelt worship. Known for its soul-stirring melodies and spirit-filled lyrics, Shalom Worship brings together a community of believers to praise and glorify God.",
  keywords:"Worship song lyrics, gospil song lyrics, christian song lyrics",
  alternates: {
    canonical: "Shalom Worship is a faith-based music ministry dedicated to spreading the message of peace, hope, and salvation through heartfelt worship. Known for its soul-stirring melodies and spirit-filled lyrics, Shalom Worship brings together a community of believers to praise and glorify God."
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.shalomworship.com/"),

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <GoogleAnalytics gaId="G-H4QZJK5XEN" />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7686801812294972"
     crossOrigin="anonymous"></script>
     <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
      </head>
      <body className="antialiased bg-black ">
        <QueryProvider>
            <Header />
            <div className="flex flex-1 gap-4 bg-black">
              <aside className="w-full hidden md:block md:w-4/12 lg:w-3/12 rounded-lg">
                <Sidebar />
              </aside>
              <main className="w-full md:w-8/12 lg:w-9/12 bg-gradient-to-b from-[#1f1f1f] to-[#000000] rounded-lg">
                {children}
              </main>
          </div>
          {/* <BottomPlayer /> */}
        </QueryProvider>
      </body>
    </html>
  );
}