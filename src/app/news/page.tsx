'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const articles = [
  {
    id: 10,
    date: 'March 2026',
    title: 'The World\'s First Museum Dedicated to the Battle of the Atlantic is Coming to Birkenhead',
    excerpt: 'Opening Spring 2027, the Battle of the Atlantic Story will open on the banks of the River Mersey in Birkenhead, becoming the world\'s first museum dedicated entirely to the six-year struggle for control of the Atlantic Ocean.',
    readTime: '12 min read',
    convoyCode: 'BA 27',
    image: '/images/1280px-Casablanca_convoy.jpg',
    imageAlt: 'An Allied convoy at sea, seen from the air',
  },
]

export default function NewsPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative py-36 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none">
          <svg width="500" height="500" viewBox="0 0 500 500" aria-hidden="true">
            {[60, 120, 180, 240, 300, 360].map((r, i) => (
              <circle key={i} cx="250" cy="250" r={r} fill="none" stroke="#7ECECE" strokeWidth="1" opacity={0.08 - i * 0.01} />
            ))}
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p
              className="font-mono text-xs uppercase mb-4"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              Latest News & Stories
            </p>
            <h1
              className="font-montserrat font-black uppercase text-offwhite"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                letterSpacing: '0.08em',
                lineHeight: 1.0,
              }}
            >
              News &<br />
              <span style={{ color: '#7ECECE' }}>Stories</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <ScrollReveal key={article.id} delay={(i % 3) * 0.1}>
                <article className="group h-full flex flex-col">
                  {/* Card header - archival image */}
                  <div
                    className="relative overflow-hidden flex-shrink-0"
                    style={{ aspectRatio: '16/9', border: '1px solid rgba(126, 206, 206, 0.15)', borderBottom: 'none' }}
                  >
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(to top, rgba(13,48,64,0.8) 0%, transparent 45%)' }}
                    />

                    {/* Convoy code & date */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span
                        className="font-mono text-xs font-bold uppercase px-2 py-1"
                        style={{
                          background: '#4A9B8E',
                          color: '#F8F4EE',
                          letterSpacing: '0.12em',
                        }}
                      >
                        {article.convoyCode}
                      </span>
                      <p
                        className="font-mono text-xs"
                        style={{ color: '#7ECECE', letterSpacing: '0.08em', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
                      >
                        {article.date}
                      </p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div
                    className="flex-1 flex flex-col p-6"
                    style={{ background: 'rgba(126, 206, 206, 0.04)', border: '1px solid rgba(126, 206, 206, 0.1)', borderTop: 'none' }}
                  >
                    <h2
                      className="font-montserrat font-bold text-base mb-3 leading-snug group-hover:text-teal-light transition-colors duration-200"
                      style={{ color: '#F8F4EE', letterSpacing: '0.02em' }}
                    >
                      {article.title}
                    </h2>
                    <p
                      className="font-montserrat text-sm leading-relaxed flex-1 mb-6"
                      style={{ color: 'rgba(248,244,238,0.6)' }}
                    >
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-xs"
                        style={{ color: 'rgba(248,244,238,0.35)', letterSpacing: '0.08em' }}
                      >
                        {article.readTime}
                      </span>
                      <Link
                        href={`/news/${article.id}`}
                        className="font-montserrat font-bold text-xs uppercase flex items-center gap-1.5 transition-colors hover:text-teal-light"
                        style={{ color: '#7ECECE', letterSpacing: '0.12em' }}
                      >
                        Read More <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: '#4A9B8E' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p
              className="font-mono text-xs uppercase mb-4"
              style={{ color: 'rgba(248,244,238,0.6)', letterSpacing: '0.2em' }}
            >
              Stay Informed
            </p>
            <h2
              className="font-montserrat font-black uppercase mb-6"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                letterSpacing: '0.12em',
                color: '#F8F4EE',
              }}
            >
              Register Your Interest
            </h2>
            <p
              className="font-montserrat text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(248,244,238,0.8)' }}
            >
              {/* [PLACEHOLDER: Newsletter copy] */}
              Sign up to receive news about the Battle of the Atlantic Story's opening, events, and the stories behind the campaign.
            </p>
            <Link
              href="/contact"
              className="inline-block font-montserrat font-bold text-sm uppercase px-8 py-4 transition-all duration-200 hover:opacity-90"
              style={{ background: '#F5ECD7', color: '#4A9B8E', letterSpacing: '0.15em' }}
            >
              Sign Up →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}