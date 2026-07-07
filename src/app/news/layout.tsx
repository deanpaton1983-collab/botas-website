import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News & Stories | Battle of the Atlantic History & Museum Updates',
  description:
    'Stories, research, and updates from the Battle of the Atlantic Story museum in Birkenhead. Articles covering the U-boat war, convoy history, Enigma codebreaking, veteran testimonies, and the latest project news.',
  openGraph: {
    title: 'News & Stories | Battle of the Atlantic Story',
    description:
      'Stories, research, and updates from the Battle of the Atlantic Story - covering the U-boat war, convoy history, Enigma, veteran testimonies, and museum developments.',
    url: 'https://battleoftheatlantic.org/news',
    images: [
      {
        url: '/images/1280px-Casablanca_convoy.jpg',
        width: 1200,
        height: 630,
        alt: 'An Allied convoy at sea - News & Stories from the Battle of the Atlantic Story',
      },
    ],
  },
  twitter: {
    title: 'News & Stories | Battle of the Atlantic Story',
    description:
      'Stories and research from the Battle of the Atlantic Story museum.',
    images: ['/images/1280px-Casablanca_convoy.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/news',
  },
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
