import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query/query-provider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from "@/components/theme-provider";
// import BottomPlayer from "@/components/layout/BottomPlayer";

export const inter = Inter({
  subsets: ["latin"],      // choose your subset
  weight: ["400", "500", "600", "700"], // load only needed weights
  variable: "--font-inter" // enables CSS variable for Tailwind usage
});
export const metadata: Metadata = {
  title: "Shalom Worship",
  description: "Shalom Worship is a faith-based music ministry dedicated to spreading the message of peace, hope, and salvation through heartfelt worship. Known for its soul-stirring melodies and spirit-filled lyrics, Shalom Worship brings together a community of believers to praise and glorify God.",
  keywords: "Worship song lyrics, gospel song chords, christian song lyrics",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.shalomworship.com/"),
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId="G-H4QZJK5XEN" />
        )}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7686801812294972"
          crossOrigin="anonymous"
        />
        <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js" />
        {/* ✅ No need to repeat the favicon <link> here if defined in metadata.icons */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
      </head>
      <body className="antialiased h-screen grid grid-cols-12 grid-rows-12 gap-x-4 bg-background">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <div className="col-span-12 row-span-1 md:row-span-1 bg=red-400">
                <Header />
              </div>
              <aside className="hidden md:block col-span-0 md:col-span-3 row-span-10 md:row-span-11 rounded-lg overflow-y-auto custom-scrollbar">
                <Sidebar />
              </aside>
              <main className="col-span-12  md:col-span-9 row-span-11 md:row-span-11 rounded-lg overflow-auto custom-scrollbar">
                {children}
              </main>
          </ThemeProvider>  
          {/* <BottomPlayer /> */}
        </QueryProvider>
      </body>
    </html>
  );
}