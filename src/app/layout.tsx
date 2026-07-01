import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://battleoftheatlantic.org'),
  title: {
    default: 'Battle of the Atlantic Story | Birkenhead',
    template: '%s | Battle of the Atlantic Story',
  },
  description:
    "The world's first museum dedicated to the longest continuous military campaign of World War II — the Battle of the Atlantic. Centred around U-534, the only U-boat ever raised from the seabed after combat. Opening in 2027, Birkenhead.",
  keywords: [
    'Battle of the Atlantic',
    'U-534',
    'U-boat',
    'World War II',
    'WWII museum',
    'Birkenhead',
    'Liverpool',
    'Merseyside',
    'naval history',
    'submarine museum',
    'Big Heritage',
  ],
  authors: [{ name: 'Battle of the Atlantic Story' }],
  creator: 'Big Heritage CIC',
  publisher: 'Big Heritage CIC',
  openGraph: {
    title: 'Battle of the Atlantic Story',
    description:
      "The world's first museum dedicated to the Battle of the Atlantic. Home of U-534 — the only U-boat ever raised from the seabed after combat. Opening in 2027, Birkenhead.",
    url: 'https://battleoftheatlantic.org',
    siteName: 'Battle of the Atlantic Story',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/og/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Battle of the Atlantic Story — Opening in 2027, Birkenhead',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Battle of the Atlantic Story',
    description:
      "The world's first museum dedicated to the Battle of the Atlantic. Opening in 2027, Birkenhead.",
    images: ['/images/og/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-montserrat bg-slate-deep text-offwhite antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
