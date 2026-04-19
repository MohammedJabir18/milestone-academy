import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Syne, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/global/CustomCursor";
import { PageTransitionProvider } from "@/components/global/PageTransition";
import { GsapInitializer } from "@/hooks/useGsapAnimations";
import { Toaster } from "react-hot-toast";


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

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

const SITE_URL = "https://milestonefinacademy.info";
const SITE_NAME = "Milestone Academy";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Milestone Academy | Accounting & Finance Courses Kerala",
    template: "%s | Milestone Academy",
  },

  description:
    "Master Accounting, GST, UAE Taxation & Financial Analytics at Milestone Academy, Kerala. 4 professional diploma programs: DABS, DUTC, PGDAFA, EMDAT. 4,800+ students. 96% placement rate.",

  keywords: [
    "accounting courses Kerala",
    "tally prime course Kerala",
    "GST filing course",
    "UAE VAT taxation course",
    "accounting diploma Kerala",
    "finance courses Calicut",
    "Milestone Academy",
    "DABS diploma",
    "DUTC diploma",
    "PGDAFA diploma",
    "EMDAT diploma",
    "Power BI course Kerala",
    "accounting training Kozhikode",
    "trading courses Kerala",
    "financial analytics course",
  ],

  authors: [{ name: "Milestone Academy", url: SITE_URL }],
  creator: "Milestone Academy",
  publisher: "Milestone Academy",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Milestone Academy | India's Premier Accounting & Finance Academy",
    description:
      "4 professional diploma programs in Accounting, UAE Taxation & Financial Analytics. 4,800+ students trained. 96% placement rate. Kerala, India.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Milestone Academy — India's Premier Accounting & Finance Academy",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@MilestoneAcad",
    creator: "@MilestoneAcad",
    title: "Milestone Academy | Accounting & Finance Courses Kerala",
    description:
      "4 diploma programs. 4,800+ students. 96% placement. Kerala's most trusted accounting academy.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": 300,
    },
  },

  verification: {
    google: "ADD_GOOGLE_SEARCH_CONSOLE_TOKEN_HERE",
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
    },
  },

  category: "education",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Milestone Academy",
  alternateName: ["Milestone Finac Academy", "Milestone Trading Academy"],
  url: "https://milestonefinacademy.info",
  logo: "https://milestonefinacademy.info/logos/milestone-logo-light.png",
  description:
    "India's Premier Accounting & Finance Academy in Kerala. Professional diploma programs in Accounting, UAE Taxation, Financial Analytics, and Trading.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calicut",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98765-43210",
    contactType: "admissions",
    areaServed: ["IN", "AE"],
    availableLanguage: ["English", "Malayalam"],
  },
  sameAs: [
    "https://www.instagram.com/milestone_academy",
    "https://www.youtube.com/@milestoneacademy",
    "https://www.linkedin.com/company/milestone-academy",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Diploma Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Diploma in Accounting & Business Systems (DABS)",
          description:
            "3-month diploma covering Manual Accounting, Tally Prime, MS Office, and Trading Basics",
          provider: {
            "@type": "Organization",
            name: "Milestone Academy",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "blended",
            duration: "P3M",
          },
          offers: {
            "@type": "Offer",
            price: "30000",
            priceCurrency: "INR",
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Diploma in UAE Taxation & Compliance (DUTC)",
          description:
            "2-month diploma in UAE VAT, Corporate Tax, and Zoho Books for Gulf market professionals",
          provider: {
            "@type": "Organization",
            name: "Milestone Academy",
          },
          offers: {
            "@type": "Offer",
            price: "37000",
            priceCurrency: "INR",
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Postgraduate Diploma in Accounting & Financial Analytics (PGDAFA)",
          description:
            "5-month comprehensive program: GST filing, Power BI, Advanced Excel, Zoho Books",
          provider: {
            "@type": "Organization",
            name: "Milestone Academy",
          },
          offers: {
            "@type": "Offer",
            price: "45000",
            priceCurrency: "INR",
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Executive Master Diploma in Accounting & Taxation (EMDAT)",
          description:
            "7-month master program: India + UAE taxation, QuickBooks, Power BI, complete trading",
          provider: {
            "@type": "Organization",
            name: "Milestone Academy",
          },
        },
      },
    ],
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
      className={`${instrumentSerif.variable} ${syne.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <CustomCursor />
        <Toaster position="top-center" reverseOrder={false} />
        <GsapInitializer />

        <PageTransitionProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
