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
  title: "Makonosi Junior Car Hire - Premium Car Rental & Chauffeur Services in Kenya",
  description: "Professional car hire services in Kenya with 15+ years experience. Airport transfers, VIP chauffeur service, safari tours, corporate events. TSV & PSV licensed fleet. Book now for luxury transportation.",
  keywords: "car hire Kenya, chauffeur service Nairobi, airport transfer Kenya, VIP transport, safari vehicles, luxury car rental, corporate transport, wedding cars, tour guide Kenya, bodyguard service",
  authors: [{ name: "Makonosi Junior Car Hire" }],
  creator: "Makonosi Junior Car Hire",
  publisher: "Makonosi Junior Car Hire",
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
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://makonosi.vercel.app',
    siteName: 'Makonosi Junior Car Hire',
    title: 'Makonosi Junior Car Hire - Premium Car Rental & Chauffeur Services in Kenya',
    description: 'Professional car hire services in Kenya with 15+ years experience. Airport transfers, VIP chauffeur service, safari tours, corporate events. TSV & PSV licensed fleet.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Makonosi Junior Car Hire - Luxury Transportation Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makonosi Junior Car Hire - Premium Car Rental & Chauffeur Services in Kenya',
    description: 'Professional car hire services in Kenya with 15+ years experience. Airport transfers, VIP chauffeur service, safari tours, corporate events.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://makonosi.vercel.app',
  },
  category: 'Transportation Services',
  classification: 'Car Rental and Chauffeur Services',
  icons: {
    icon: '/MAKONOSIBLUEORANGE.png',
    shortcut: '/MAKONOSIBLUEORANGE.png',
    apple: '/MAKONOSIBLUEORANGE.png',
  },
  manifest: '/manifest.json',
  other: {
    'geo.region': 'KE',
    'geo.placename': 'Kenya',
    'geo.position': '-1.2921;36.8219',
    'ICBM': '-1.2921, 36.8219',
    'contact:phone_number': '+254721612348',
    'contact:country_name': 'Kenya',
  },
};


// Hello 
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
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Makonosi Junior Car Hire",
              "description": "Professional car hire services in Kenya with 15+ years experience. Airport transfers, VIP chauffeur service, safari tours, corporate events.",
              "url": "https://makonosi.vercel.app/",
              "logo": "https://makonosi.vercel.app//MAKONOSIBLUEORANGE.png",
              "image": "https://makonosi.vercel.app//og-image.jpg",
              "telephone": "+254721612348",
              "email": "info@makonosi.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KE",
                "addressRegion": "Nairobi",
                "addressLocality": "Nairobi"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -1.2921,
                "longitude": 36.8219
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "priceRange": "$$",
              "paymentAccepted": ["Cash", "Credit Card", "Mobile Money"],
              "currenciesAccepted": "KES, USD",
              "serviceArea": {
                "@type": "Country",
                "name": "Kenya"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Car Hire Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Airport Transfers",
                      "description": "Professional airport pick-up and drop-off services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "VIP Chauffeur Service",
                      "description": "Executive rides with professional chauffeurs"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Safari Tours",
                      "description": "Adventure tours to Maasai Mara, Amboseli, and other national parks"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
