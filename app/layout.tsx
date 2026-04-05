import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/LenisProvider";
import CustomCursor from "@/components/global/CustomCursor";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { PageTransitionProvider } from "@/components/global/PageTransition";
import { GsapInitializer } from "@/hooks/useGsapAnimations";
import { TooltipProvider } from "@/components/ui/tooltip";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#22C55E",
};

export const metadata: Metadata = {
  title: "Milestone Academy | India's Premier Accounting & Finance Courses",
  description: "Master Tally Prime, GST, Income Tax, SAP FICO at Milestone Academy. Industry-recognized certificates, 100% placement assistance. 4,800+ students in Kerala.",
  applicationName: "Milestone Academy",
  keywords: ["Tally Prime", "GST Course", "Accounting Academy", "SAP FICO", "Income Tax", "Corporate Accounting", "Kerala Placement"],
  authors: [{ name: "CA Mohammed Jabir" }],
  creator: "Milestone Academy",
  publisher: "Milestone Academy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://milestone-trading-academy.vercel.app/",
    title: "Milestone Academy | India's Premier Accounting & Finance Courses",
    description: "Master Tally Prime, GST, Income Tax, SAP FICO at Milestone Academy. Industry-recognized certificates, 100% placement assistance. 4,800+ students in Kerala.",
    siteName: "Milestone Academy",
    images: [{
      url: "/og-image.webp", // Can refer to a default screenshot
      width: 1200,
      height: 630,
      alt: "Milestone Academy - Master the Language of Business",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milestone Academy | Premier Accounting Courses",
    description: "Master Tally Prime, GST, Income Tax, SAP FICO. 100% placement assistance. India's top finance institute.",
    creator: "@milestone_academy",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${syne.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <CustomCursor />
        <GsapInitializer />
        <PageTransitionProvider>
          <LenisProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </LenisProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
