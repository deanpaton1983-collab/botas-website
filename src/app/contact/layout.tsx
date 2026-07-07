import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Plan Your Visit | Woodside, Birkenhead',
  description:
    'Plan your visit to the Battle of the Atlantic Story at Woodside, Birkenhead, CH41 6DU - 10 minutes from Liverpool by Mersey Ferry. Contact us for general enquiries, school visits, partnerships, and media requests. Opening 2027.',
  openGraph: {
    title: 'Contact & Plan Your Visit | Battle of the Atlantic Story',
    description:
      'Plan your visit to the Battle of the Atlantic Story at Woodside, Birkenhead - across the River Mersey from Liverpool. Opening in 2027 - register your interest today.',
    url: 'https://battleoftheatlantic.org/contact',
    images: [
      {
        url: '/images/memorial-building.jpg',
        width: 1200,
        height: 630,
        alt: 'The Battle of the Atlantic Story at Woodside, Birkenhead - contact and visitor information',
      },
    ],
  },
  twitter: {
    title: 'Contact & Plan Your Visit | Battle of the Atlantic Story',
    description:
      'Plan your visit to the Battle of the Atlantic Story, Woodside, Birkenhead. Opening in 2027.',
    images: ['/images/memorial-building.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
