import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Visit',
  description:
    'Plan your visit to the Battle of the Atlantic Story, Woodside, Birkenhead. Contact us for general enquiries, educational visits, corporate partnerships, media requests, and to register your interest ahead of our 2027 opening.',
  openGraph: {
    title: 'Contact & Visit | Battle of the Atlantic Story',
    description:
      'Plan your visit to the Battle of the Atlantic Story at Woodside, Birkenhead. Opening in 2027 - register your interest today.',
    url: 'https://battleoftheatlantic.org/contact',
    images: [
      {
        url: '/images/og/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact - Battle of the Atlantic Story',
      },
    ],
  },
  twitter: {
    title: 'Contact & Visit | Battle of the Atlantic Story',
    description:
      'Plan your visit to the Battle of the Atlantic Story, Woodside, Birkenhead. Opening in 2027.',
    images: ['/images/og/og-default.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
