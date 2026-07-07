import type { Metadata } from 'next'
import { articleContent } from '@/data/articles'

const BASE = 'https://battleoftheatlantic.org'

export function generateMetadata({
  params,
}: {
  params: { id: string }
}): Metadata {
  const article = articleContent[Number(params.id)]

  if (!article) {
    return {
      title: 'Article Not Found',
      robots: { index: false, follow: true },
    }
  }

  const description =
    article.subtitle ||
    article.sections[0]?.body.replace(/\n+/g, ' ').slice(0, 155) ||
    'An article from the Battle of the Atlantic Story museum.'

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      url: `${BASE}/news/${article.id}`,
      type: 'article',
      images: [
        {
          url: '/images/1280px-Casablanca_convoy.jpg',
          width: 1200,
          height: 630,
          alt: 'An Allied convoy at sea - Battle of the Atlantic Story',
        },
      ],
    },
    twitter: {
      title: article.title,
      description,
    },
    alternates: {
      canonical: `${BASE}/news/${article.id}`,
    },
  }
}

export default function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const article = articleContent[Number(params.id)]

  const articleJsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.subtitle || undefined,
        url: `${BASE}/news/${article.id}`,
        image: `${BASE}/images/1280px-Casablanca_convoy.jpg`,
        author: {
          '@type': 'Organization',
          name: 'Battle of the Atlantic Story',
          url: BASE,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Big Heritage CIC',
          logo: {
            '@type': 'ImageObject',
            url: `${BASE}/images/logo/logo-main.png`,
          },
        },
        mainEntityOfPage: `${BASE}/news/${article.id}`,
      }
    : null

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      {children}
    </>
  )
}
