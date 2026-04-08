import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Digital Wealth Transfer | Las Vegas Fintech & Blockchain Directory",
    template: "%s | Digital Wealth Transfer",
  },
  description:
    "Discover top fintech, blockchain, and enterprise AI companies in Las Vegas. Find AI wealth advisors, digital asset custody providers, and estate tech firms.",
  keywords: ["Las Vegas fintech", "blockchain Las Vegas", "enterprise AI Nevada", "digital asset custody", "estate tech"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
