'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { articleContent } from '@/data/articles'

const categoryLabels: Record<string, string> = {
  'supply-lines': 'Supply Lines',
  'warfare-at-sea': 'Warfare at Sea',
  'signals-secrets': 'Signals & Secrets',
  'life-at-sea': 'Life at Sea',
  'museum': 'Museum News',
}

const categoryStyles: Record<string, { bg: string; text: string; badge: string }> = {
  'supply-lines': { bg: '#F5ECD7', text: '#B85C38', badge: '#E07B45' },
  'warfare-at-sea': { bg: '#7ECECE', text: '#2D4F5C', badge: '#4A9B8E' },
  'signals-secrets': { bg: '#B85C38', text: '#F5ECD7', badge: '#E07B45' },
  'life-at-sea': { bg: '#1A8080', text: '#F8F4EE', badge: '#7ECECE' },
  'museum': { bg: '#2D4F5C', text: '#7ECECE', badge: '#4A9B8E' },
}

export default function ArticlePage() {
  const params = useParams()
  const id = Number(params.id)
  const article = articleContent[id]

  if (!article) {
    return (
      <section
        className="relative py-36 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="font-montserrat font-black uppercase text-offwhite mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.08em' }}
          >
            Article Not Found
          </h1>
          <p
            className="font-montserrat text-lg mb-8"
            style={{ color: 'rgba(248,244,238,0.6)' }}
          >
            This article hasn&apos;t been published yet. Check back soon.
          </p>
          <Link
            href="/news"
            className="inline-block font-montserrat font-bold text-sm uppercase px-8 py-4 transition-all duration-200 hover:opacity-90"
            style={{ background: '#7ECECE', color: '#2D4F5C', letterSpacing: '0.15em' }}
          >
            &larr; Back to News
          </Link>
        </div>
      </section>
    )
  }

  const style = categoryStyles[article.category] || categoryStyles['museum']

  return (
    <>
      {/* HERO */}
      <section
        className="relative py-28 lg:py-36 overflow-hidden"
        style={{ backgroundColor: style.bg }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        {/* Sonar rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 600 600" aria-hidden="true">
            {[70, 140, 210, 280, 350, 420].map((r, i) => (
              <circle key={i} cx="300" cy="300" r={r} fill="none" stroke={style.text} strokeWidth="1" opacity={0.06 - i * 0.008} />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {/* Back link */}
            <Link
              href="/news"
              className="inline-flex items-center gap-2 font-montserrat font-bold text-xs uppercase mb-8 transition-opacity hover:opacity-70"
              style={{ color: style.text, letterSpacing: '0.12em', opacity: 0.7 }}
            >
              <span>&larr;</span> Back to News
            </Link>

            {/* Category & meta */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-montserrat font-bold text-xs uppercase px-2.5 py-1"
                style={{
                  background: style.badge,
                  color: article.category === 'supply-lines' || article.category === 'signals-secrets' ? '#F8F4EE' : style.bg,
                  letterSpacing: '0.12em',
                }}
              >
                {categoryLabels[article.category]}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: style.text, opacity: 0.5, letterSpacing: '0.1em' }}
              >
                {article.convoyCode}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-montserrat font-black uppercase leading-tight mb-5"
              style={{
                fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
                letterSpacing: '0.06em',
                color: style.text,
                lineHeight: 1.1,
              }}
            >
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p
                className="font-montserrat text-lg lg:text-xl leading-relaxed mb-6"
                style={{ color: style.text, opacity: 0.8 }}
              >
                {article.subtitle}
              </p>
            )}

            {/* Date & read time */}
            <div className="flex items-center gap-4">
              <span
                className="font-mono text-xs"
                style={{ color: style.text, opacity: 0.5, letterSpacing: '0.08em' }}
              >
                {article.date}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: style.text, opacity: 0.35 }}
              >
                |
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: style.text, opacity: 0.5, letterSpacing: '0.08em' }}
              >
                {article.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12">
          {article.sections.map((section, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="mb-12 lg:mb-16">
                {section.heading && (
                  <h2
                    className="font-montserrat font-bold uppercase mb-5"
                    style={{
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                      letterSpacing: '0.08em',
                      color: '#7ECECE',
                      lineHeight: 1.2,
                    }}
                  >
                    {section.heading}
                  </h2>
                )}
                <div
                  className="font-montserrat text-base lg:text-lg leading-relaxed"
                  style={{ color: 'rgba(248,244,238,0.82)' }}
                >
                  {section.body.split('\n\n').map((paragraph, j) => (
                    <p key={j} className="mb-5 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Divider */}
          <div
            className="my-12 lg:my-16"
            style={{ borderTop: '1px solid rgba(126, 206, 206, 0.15)' }}
          />

          {/* Back to news */}
          <ScrollReveal>
            <div className="flex items-center justify-between">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 font-montserrat font-bold text-sm uppercase transition-colors hover:opacity-80"
                style={{ color: '#7ECECE', letterSpacing: '0.12em' }}
              >
                <span>&larr;</span> Back to News
              </Link>
              <Link
                href="/contact"
                className="inline-block font-montserrat font-bold text-sm uppercase px-6 py-3 transition-all duration-200 hover:opacity-90"
                style={{ background: '#7ECECE', color: '#2D4F5C', letterSpacing: '0.12em' }}
              >
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
