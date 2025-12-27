import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import IonicScripts from "@/utils/IonicScripts";
import AnalyticsWrapper from "@/utils/AnalyticsWrapper";
import { Header } from "@/components/Header";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import {
  skinHairClinicStructuredData,
  skinHairServicesStructuredData,
  skinHairSpecialtiesStructuredData,
} from "@/constants";

const roboto = localFont({
  src: [
    {
      path: "../../public/fonts/roboto/Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto/Roboto-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto/Roboto-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto/Roboto-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/roboto/Roboto-800.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-roboto",
});

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-800.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title:
    "Dr. Karuna Skin Hair & Laser Center - Advanced Aesthetic Care in Dharan, Nepal",
  description:
    "Dr. Karuna Skin Hair & Laser Center offers comprehensive skin, hair and laser treatments in Dharan, Nepal. Expert dermatologists providing treatments such as laser hair removal, acne treatment, anti-aging therapy, skin rejuvenation, hair loss treatment, pigmentation removal, and advanced aesthetic procedures in a modern, comfortable clinic.",
  keywords: [
    "Dr. Karuna Skin Hair Laser Center",
    "skin clinic Dharan",
    "dermatologist Dharan",
    "laser hair removal Dharan",
    "acne treatment Dharan",
    "skin treatment Dharan",
    "hair loss treatment Dharan",
    "anti-aging therapy Dharan",
    "laser treatment Dharan",
    "best dermatologist Dharan",
    "skin care Nepal",
    "pigmentation removal Dharan",
    "aesthetic clinic Dharan",
    "hair transplant Dharan",
    "skin rejuvenation Dharan",
    "melasma treatment Dharan",
    "laser therapy Dharan",
    "cosmetic dermatology Dharan",
    "skin whitening Dharan",
    "scar removal Dharan",
    "Dr. Karuna dermatologist Nepal",
  ],
  authors: [{ name: "Dr. Karuna Skin Hair & Laser Center" }],
  creator: "Dr. Karuna Skin Hair & Laser Center",
  publisher: "Dr. Karuna Skin Hair & Laser Center",
  metadataBase: new URL("https:///www.karunaskinclinic.live/"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon.ico",
        sizes: "32x32",
      },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title:
      "Dr. Karuna Skin Hair & Laser Center - Advanced Aesthetic Care in Dharan, Nepal",
    description:
      "Dr. Karuna Skin Hair & Laser Center offers comprehensive skin, hair and laser treatments in Dharan, Nepal. Expert dermatologists providing treatments such as laser hair removal, acne treatment, anti-aging therapy, skin rejuvenation, hair loss treatment, pigmentation removal, and advanced aesthetic procedures in a modern, comfortable clinic.",
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "Dr. Karuna Skin Hair & Laser Center",
    images: [
      {
        url: "/images/preview.webp",
        width: 1200,
        height: 630,
        alt: "Dr. Karuna Skin Hair & Laser Center Preview",
      },
    ],
  },
  category: "health",
  classification: "Dermatology & Aesthetic Clinic",
  referrer: "origin-when-cross-origin",
  applicationName: "Dr. Karuna Skin Hair & Laser Center",
  generator: "Next.js",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // "dangerouslySetInnerHTML" is a way to inject raw HTML content into a React component.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(skinHairClinicStructuredData), // "__html" property accepts raw HTML/text
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(skinHairServicesStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(skinHairSpecialtiesStructuredData),
          }}
        />
        {/* Verification tags if needed */}
        {/* <meta name="facebook-domain-verification" content="your-verification-code" /> */}
      </head>

      <body
        className={`${roboto.variable} ${poppins.variable}`}
        suppressHydrationWarning={true}
        id="top"
      >
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <IonicScripts />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
