import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Dream Park Bettiah | Premium Residential Plots & Site Plan",
  description: "Experience luxury living at Dream Park Bettiah. View our interactive master plan, explore premium residential plots, and secure your property in Bettiah's most prestigious project.",
  keywords: ["Dream Park Bettiah", "Residential Plots Bettiah", "Plot Booking Bettiah", "Dream Park Buildtech", "Real Estate Bihar"],
  authors: [{ name: "Dream Park Buildtech" }],
  openGraph: {
    title: "Dream Park Bettiah | Premium Residential Plots",
    description: "Experience luxury living at Dream Park Bettiah. View our interactive master plan and explore premium residential plots.",
    url: "https://dreamparkbettiah.com",
    siteName: "Dream Park Bettiah",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Dream Park Bettiah Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Park Bettiah | Premium Residential Plots",
    description: "Experience luxury living at Dream Park Bettiah. Explore our premium residential plots.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
