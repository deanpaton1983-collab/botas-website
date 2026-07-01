import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News & Stories',
  description:
    'Stories, research, and updates from the Battle of the Atlantic Story museum. Articles covering the U-boat war, convoy history, Enigma codebreaking, veteran testimonies, and the latest project news.',
  openGraph: {
    title: 'News & Stories | Battle of the Atlantic Story',
    description:
      'Stories, research, and updates from the Battle of the Atlantic Story - covering the U-boat war, convoy history, Enigma, veteran testimonies, and museum developments.',
    url: 'https://battleoftheatlantic.org/news',
    images: [
      {
        url: '/images/og/og-news.jpg',
        width: 1200,
        height: 630,
        alt: 'News & Stories - Battle of the Atlantic Story',
      },
    ],
  },
  twitter: {
    title: 'News & Stories | Battle of the Atlantic Story',
    description:
      'Stories and research from the Battle of the Atlantic Story museum.',
    images: ['/images/og/og-news.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/news',
  },
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
