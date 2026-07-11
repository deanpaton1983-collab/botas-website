import type { MetadataRoute } from 'next'
import { articleContent } from '@/data/articles'

const BASE = 'https://battleoftheatlantic.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = Object.values(articleContent).map((article) => ({
    url: `${BASE}/news/${article.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/museum`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/u-boat`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/history`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/atlantic`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/atlantic/warships`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/atlantic/u-boats`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/atlantic/visualiser`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/memorial`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/news`, changeFrequency: 'weekly', priority: 0.7 },
    ...articles,
  ]
}
