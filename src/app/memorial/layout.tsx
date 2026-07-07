import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Battle of the Atlantic Memorial | Birkenhead, Merseyside',
  description:
    'A national memorial to all who served and died in the Battle of the Atlantic - merchant seamen, Royal Navy sailors, RAF aircrew, and German submariners. By sculptor Emma Rodgers, at Woodside, Birkenhead, on the River Mersey.',
  openGraph: {
    title: 'Battle of the Atlantic Memorial | Battle of the Atlantic Story',
    description:
      'Remembering all who served in the Battle of the Atlantic. A place of reflection and remembrance at Woodside, Birkenhead - featuring a memorial by Liverpool sculptor Emma Rodgers.',
    url: 'https://battleoftheatlantic.org/memorial',
    images: [
      {
        url: '/images/memorial-building.jpg',
        width: 1200,
        height: 630,
        alt: 'The Battle of the Atlantic memorial building at Woodside, Birkenhead',
      },
    ],
  },
  twitter: {
    title: 'Battle of the Atlantic Memorial',
    description:
      'Remembering all who served in the Battle of the Atlantic. A memorial by sculptor Emma Rodgers at Woodside, Birkenhead.',
    images: ['/images/memorial-building.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/memorial',
  },
}

export default function MemorialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
