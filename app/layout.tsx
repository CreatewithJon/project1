import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/brand/favicon.svg",
    shortcut: "/brand/favicon.svg",
  },
  title: {
    default: "Digital Wealth Transfer — AI & Tech Solutions for Growing Businesses",
    template: "%s | Digital Wealth Transfer",
  },
  description:
    "We connect businesses with vetted AI, blockchain, and emerging tech partners — and help tech providers get more qualified clients. Las Vegas & nationwide.",
  keywords: ["AI strategy", "AI for business", "blockchain Las Vegas", "AI automation", "tech partner", "lead generation AI", "digital transformation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0B0F1A] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
