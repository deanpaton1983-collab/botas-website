import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memorial',
  description:
    'A memorial to all who served and gave their lives in the Battle of the Atlantic — merchant seamen, Royal Navy sailors, RAF aircrew, and German submariners. Featuring a bronze memorial wall by sculptor Emma Rodgers.',
  openGraph: {
    title: 'Memorial | Battle of the Atlantic Story',
    description:
      'Remembering all who served in the Battle of the Atlantic. A place of reflection and remembrance — featuring a bronze memorial wall by Liverpool sculptor Emma Rodgers.',
    url: 'https://battleoftheatlantic.org/memorial',
    images: [
      {
        url: '/images/og/og-memorial.jpg',
        width: 1200,
        height: 630,
        alt: 'Memorial — Battle of the Atlantic Story',
      },
    ],
  },
  twitter: {
    title: 'Memorial | Battle of the Atlantic Story',
    description:
      'Remembering all who served in the Battle of the Atlantic. A bronze memorial wall by sculptor Emma Rodgers.',
    images: ['/images/og/og-memorial.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/memorial',
  },
}

export default function MemorialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
