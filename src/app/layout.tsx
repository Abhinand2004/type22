import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Type 22 Automotive Apparel",
    template: "%s | Type 22",
  },
  description: "Premium automotive-themed T-shirts and hoodies",
  keywords: ["Type 22", "automotive apparel", "t-shirt", "hoodie", "car clothing"],
  openGraph: {
    title: "Type 22 Automotive Apparel",
    description: "Premium automotive-themed T-shirts and hoodies",
    url: "https://type22.example",
    siteName: "Type 22",
    images: [{ url: "/hero.svg", width: 1200, height: 900 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Type 22 Automotive Apparel",
    description: "Premium automotive-themed T-shirts and hoodies",
    images: ["/hero.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
