import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Museum',
  description:
    'Explore the Battle of the Atlantic Story museum. Four exhibition zones — Supply Lines, Warfare at Sea, Signals & Secrets, and Life at Sea — tell the definitive story of the longest continuous campaign of World War II.',
  openGraph: {
    title: 'The Museum | Battle of the Atlantic Story',
    description:
      'Four exhibition zones tell the story of the Battle of the Atlantic — from convoy warfare and the U-boat threat to Enigma codebreaking and the human cost. Opening in 2027, Birkenhead.',
    url: 'https://battleoftheatlantic.org/museum',
    images: [
      {
        url: '/images/og/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'The Museum — Battle of the Atlantic Story',
      },
    ],
  },
  twitter: {
    title: 'The Museum | Battle of the Atlantic Story',
    description:
      'Four exhibition zones. One story. Opening in 2027, Birkenhead.',
    images: ['/images/og/og-default.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/museum',
  },
}

export default function MuseumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
