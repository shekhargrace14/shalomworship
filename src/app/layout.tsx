import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from '@/components/theme-provider';
import Script from 'next/script';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SetlistsProvider } from '@/lib/setlist/SetlistsContext';
// import PwaRegister from "./pwa-register";
import { JetBrains_Mono } from 'next/font/google';
import { Roboto, Roboto_Mono } from 'next/font/google';
import Footer from '@/components/layout/footer';
import { Toaster } from 'sonner';
import PwaRegister from './pwa-register';
import SongSync from '@/components/song-sync';
import NetworkStatus from '@/components/NetworkStatus';
import AuthHydrator from '@/components/hydrator/hydrator-auth';
import HydratorChannel from '@/components/hydrator/hydrator-channel';
import HydratorSetlist from '@/components/hydrator/hydrator-setlist';
import DevTools from '@/components/monitor';
import NavBottom from '@/components/navigation/nav-bottom';
import NavSidebar from '@/components/navigation/nav-sidebar';
// import Footer from "@/components/layout/footer_111";

// FONTS

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shalom Worship',
  description: 'Shalom Worship is a faith-based music Platform dedicated to spreading worship through heartfelt songs and lyrics.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shalomworship.com/'),

  manifest: '/manifest.json',

  icons: {
    icon: 'app/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: 'Shalom Worship',
    description: 'Faith-based worship lyrics, chords, translations, and devotional music.',
    url: 'https://www.shalomworship.com',
    siteName: 'Shalom Worship',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Shalom Worship',
    description: 'Christian worship lyrics and gospel music content',
    images: ['/twitter-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#05B1AC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${roboto.variable} ${robotoMono.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="h-dvh overflow-hidden bg-background">
        {/* Google Analytics */}
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-H4QZJK5XEN" />}

        {/* Google Ads (Auto Ads) */}
        <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7686801812294972" crossOrigin="anonymous" strategy="afterInteractive" />

        {/* ahref analytics */}
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="hnhwlfthgV6eO+yCDb8wKg" async></Script>

        {/* Google Identity Services script */}
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />

        {/* REMOVE AMP — this was breaking SEO */}
        <ThemeProvider attribute="class" defaultTheme="system">
          <TooltipProvider delayDuration={200}>
            <SetlistsProvider>
              <div className="flex h-full flex-col ">
                <NetworkStatus />
                {/* Header */}
                <header className="h-20 shrink-0 flex">
                  <Header />
                </header>
                <div className="flex-1 min-h-0 flex">
                  {/* <aside className="hidden lg:block w-1/4 shrink-0 overflow-y-auto rounded-xl ">
                    <NavSidebar />
                  </aside> */}

                  <main className="flex-1 min-h-0 overflow-y-auto flex flex-col rounded-xl pb-16 md:pb-0">
                    <div className="flex-1 bg-background rounded-xl ">
                      {/* <Menu /> */}
                      <PwaRegister />
                      <SongSync />
                      <HydratorChannel>
                        <HydratorSetlist>
                          <AuthHydrator>{children}</AuthHydrator>
                          <NavBottom />
                        </HydratorSetlist>
                      </HydratorChannel>
                      {/* <DevTools /> */}
                      <Toaster />
                    </div>
                    <Footer />
                  </main>
                </div>
              </div>
            </SetlistsProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
