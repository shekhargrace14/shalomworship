import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query/query-provider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
// import PwaRegister from "./pwa-register";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Shalom Worship",
  description:
    "Shalom Worship is a faith-based music ministry dedicated to spreading worship through heartfelt songs and lyrics.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.shalomworship.com/"
  ),

  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // themeColor: "#000000",


  openGraph: {
    title: "Shalom Worship",
    description:
      "Faith-based worship lyrics, chords, translations, and devotional music.",
    url: "https://www.shalomworship.com",
    siteName: "Shalom Worship",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shalom Worship",
    description: "Christian worship lyrics and gospel music content",
    images: ["/twitter-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased h-screen grid grid-cols-12 grid-rows-12 gap-x-4 bg-background">
        {/* Google Analytics */}
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId="G-H4QZJK5XEN" />
        )}

        {/* Google Ads (Auto Ads) */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7686801812294972"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* REMOVE AMP — this was breaking SEO */}

        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <div className="col-span-12 row-span-1">
              <Header />
            </div>

            <aside className="hidden md:block md:col-span-3 row-span-11 rounded-lg overflow-y-auto custom-scrollbar">
              <Sidebar />
            </aside>

            <main className="col-span-12 md:col-span-9 row-span-11 rounded-lg overflow-auto custom-scrollbar">
              {/* <PwaRegister /> */}
              {children}
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
