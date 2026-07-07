import type { Metadata } from 'next'
import { visitorFaqs } from '@/data/faqs'

export const metadata: Metadata = {
  title: 'Visit the Museum | WW2 Museum in Birkenhead, near Liverpool',
  description:
    'Plan your visit to the Battle of the Atlantic Story - a new WW2 museum at Woodside, Birkenhead, minutes from Liverpool by Mersey Ferry. Four exhibition zones, the U-534 U-boat, family activities, and school visits. Opening 2027.',
  openGraph: {
    title: 'Visit the Museum | Battle of the Atlantic Story',
    description:
      'Four exhibition zones tell the story of the Battle of the Atlantic - from convoy warfare and the U-boat threat to Enigma codebreaking and the human cost. Opening 2027 at Woodside, Birkenhead, near Liverpool.',
    url: 'https://battleoftheatlantic.org/museum',
    images: [
      {
        url: '/images/museum/03CruelSea.jpg',
        width: 1200,
        height: 630,
        alt: 'Inside the Battle of the Atlantic Story museum - The Cruel Sea immersive gallery',
      },
    ],
  },
  twitter: {
    title: 'Visit the Museum | Battle of the Atlantic Story',
    description:
      'Four exhibition zones. One story. Opening 2027 at Woodside, Birkenhead, near Liverpool.',
    images: ['/images/museum/03CruelSea.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/museum',
  },
}

// FAQPage structured data - mirrors the FAQ section rendered on the page.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: visitorFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function MuseumLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
