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

export const metadata: Metadata = {
  title: "Dream City Bettiah | Premium Residential Plots & Site Plan",
  description: "Experience luxury living at Dream City Bettiah. View our interactive master plan, explore premium residential plots, and secure your property in Bettiah's most prestigious project.",
  keywords: ["Dream City Bettiah", "Residential Plots Bettiah", "Plot Booking Bettiah", "Dream Park Buildtech", "Real Estate Bihar"],
  authors: [{ name: "Dream Park Buildtech" }],
  viewport: "width=device-width, initial-scale=1",
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
