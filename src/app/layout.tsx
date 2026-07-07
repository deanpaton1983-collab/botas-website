import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const SITE_URL = 'https://battleoftheatlantic.org'
const OG_IMAGE =
  '/images/Allied_convoy_underway_in_the_Atlantic_Ocean_near_Iceland,_circa_in_1942_(80-G-72409).jpg'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Battle of the Atlantic Story | WW2 Museum & U-534 U-Boat, Birkenhead',
    template: '%s | Battle of the Atlantic Story',
  },
  description:
    "The world's first museum dedicated to the Battle of the Atlantic, home of U-534 - the only U-boat ever raised from the seabed after combat. Opening 2027 at Woodside, Birkenhead, across the River Mersey from Liverpool.",
  keywords: [
    'Battle of the Atlantic',
    'Battle of the Atlantic museum',
    'Battle of the Atlantic Liverpool',
    'Battle of the Atlantic Birkenhead',
    'U-534',
    'U-boat',
    'U-boat museum UK',
    'World War II',
    'WW2 museum Liverpool',
    'WW2 museum Wirral',
    'WWII museum',
    'Woodside Ferry',
    'Birkenhead',
    'Liverpool',
    'Wirral',
    'Merseyside',
    'Western Approaches',
    'naval history',
    'submarine museum',
    'maritime museum',
    'things to do in Liverpool',
    'things to do in Wirral',
    'Big Heritage',
  ],
  authors: [{ name: 'Battle of the Atlantic Story' }],
  creator: 'Big Heritage CIC',
  publisher: 'Big Heritage CIC',
  openGraph: {
    title: 'Battle of the Atlantic Story | WW2 Museum & U-534, Birkenhead',
    description:
      "The world's first museum dedicated to the Battle of the Atlantic. Home of U-534 - the only U-boat ever raised from the seabed after combat. Opening in 2027 at Woodside, Birkenhead, opposite Liverpool.",
    url: SITE_URL,
    siteName: 'Battle of the Atlantic Story',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'An Allied convoy underway in the Atlantic Ocean, 1942 - Battle of the Atlantic Story, opening 2027 in Birkenhead',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Battle of the Atlantic Story',
    description:
      "The world's first museum dedicated to the Battle of the Atlantic. Opening in 2027 at Woodside, Birkenhead, opposite Liverpool.",
    images: [OG_IMAGE],
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
    canonical: SITE_URL,
  },
}

// Museum / TouristAttraction structured data (site-wide).
// Facts only: address, contact, and parent organisation as published on this site.
const museumJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Museum', 'TouristAttraction'],
  name: 'The Battle of the Atlantic Story',
  alternateName: 'Battle of the Atlantic Museum',
  description:
    "The world's first museum dedicated to the Battle of the Atlantic - the longest continuous military campaign of the Second World War. Home of U-534, the only U-boat ever raised from the seabed after being sunk in combat. Opening 2027 at Woodside, Birkenhead, on the River Mersey opposite Liverpool.",
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  logo: `${SITE_URL}/images/logo/logo-main.png`,
  telephone: '+44 151 227 2008',
  email: 'info@battleoftheatlantic.org',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Woodside',
    addressLocality: 'Birkenhead',
    addressRegion: 'Merseyside',
    postalCode: 'CH41 6DU',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 53.3947,
    longitude: -3.0086,
  },
  publicAccess: true,
  isAccessibleForFree: false,
  parentOrganization: {
    '@type': 'Organization',
    name: 'Big Heritage CIC',
    url: 'https://bigheritage.co.uk',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(museumJsonLd) }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
