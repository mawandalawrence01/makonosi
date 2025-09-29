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
  title: "Makonosi Junior Car Hire - Travel in Style, Trust in Service",
  description: "Professional car hire services in Kenya. 5+ years of excellence with 15+ years chauffeur experience. Airport transfers, VIP rides, corporate events, and safaris. TSV & PSV licensed fleet.",
  keywords: "car hire Kenya, chauffeur service, airport transfer, VIP transport, safari vehicles, Nairobi car rental",
  icons: {
    icon: '/MAKONOSIBLUEORANGE.png',
    shortcut: '/MAKONOSIBLUEORANGE.png',
    apple: '/MAKONOSIBLUEORANGE.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload video for faster loading */}
        <link rel="preload" href="/Makonosi Junior Car Hire.mp4" as="video" type="video/mp4" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
