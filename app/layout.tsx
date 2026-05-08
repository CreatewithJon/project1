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
    default: "Digital Wealth Transfer — AI, Automation & Emerging Technology",
    template: "%s | Digital Wealth Transfer",
  },
  description:
    "Helping businesses and entrepreneurs leverage AI, automation, and emerging technology to create more freedom, ownership, and opportunity.",
  keywords: ["AI systems", "AI automation", "AI for business", "digital wealth", "automation tools", "lead generation AI", "digital transformation", "Bitcoin", "emerging technology"],
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
