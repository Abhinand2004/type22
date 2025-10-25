import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  style: ["normal","italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Type22 — Automotive T‑Shirt Brand in Kerala",
    template: "%s | Type22",
  },
  description: "Type22 is an automotive T‑shirt brand in Kerala. Premium car T‑shirts and custom tees. Shop Type22 for automotive apparel and car culture designs.",
  keywords: [
    "type22",
    "automotive tshirtbrand",
    "automotive tshirtbrand in kerala",
    "car tshirts",
    "custom tshirt kerala",
    "automotive t-shirt",
    "car t-shirt",
    "kerala t-shirt brand",
  ],
  authors: [{ name: "Type22" }],
  applicationName: "Type22",
  category: "apparel",
  openGraph: {
    title: "Type22 — Automotive T‑Shirt Brand in Kerala",
    description: "Automotive T‑shirts and hoodies from Type22. Premium car tees and custom prints in Kerala.",
    url: "/",
    siteName: "Type22",
    images: [{ url: "/hero.svg", width: 1200, height: 630, alt: "Type22" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Type22 — Automotive T‑Shirt Brand in Kerala",
    description: "Premium car T‑shirts and custom tees from Type22.",
    images: ["/hero.svg"],
  },
  alternates: {
    canonical: "/",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
