'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

// [PLACEHOLDER: Articles - replace with CMS data]
const articles = [
  {
    id: 10,
    date: 'March 2026',
    title: 'The World\'s First Museum Dedicated to the Battle of the Atlantic is Coming to Birkenhead',
    excerpt: 'Opening Spring 2027, the Battle of the Atlantic Story will open on the banks of the River Mersey in Birkenhead, becoming the world\'s first museum dedicated entirely to the six-year struggle for control of the Atlantic Ocean.',
    readTime: '12 min read',
    convoyCode: 'BA 27',
  },
  {
    id: 1,
    date: 'March 2026',
    title: 'BOTAS Secures Planning Approval for Woodside Development',
    excerpt: '// [PLACEHOLDER: Article excerpt] Planning consent has been granted for the new Battle of the Atlantic Story visitor centre on the banks of the River Mersey at Woodside, Birkenhead - marking a landmark moment in the project\'s development.',
    readTime: '3 min read',
    convoyCode: 'MN 26',
  },
  {
    id: 2,
    date: 'February 2026',
    title: 'New Research Sheds Light on Black May: The Turning Point in the Atlantic Campaign',
    excerpt: '// [PLACEHOLDER: Article excerpt] May 1943 - known as "Black May" - marked the decisive turning point in the Battle of the Atlantic, when Allied anti-submarine technology finally overwhelmed the U-boat threat. New archival research reveals fresh details about the month that changed everything.',
    readTime: '6 min read',
    convoyCode: 'ON 67',
  },
  {
    id: 3,
    date: 'February 2026',
    title: 'The Lascar Sailors: Recovering the Hidden Story of the Merchant Navy\'s Global Crew',
    excerpt: '// [PLACEHOLDER: Article excerpt] Yemeni sailors, often referred to as "lascars", were employed on British merchant ships performing essential roles in engine rooms and as deckhands. Their contribution to the Atlantic campaign has long been overlooked - a story this museum is determined to tell.',
    readTime: '5 min read',
    convoyCode: 'SL 125',
  },
  {
    id: 4,
    date: 'January 2026',
    title: '\u201cRadar Was Our First Great Invention\u201d - The Technology That Won the Atlantic',
    excerpt: '// [PLACEHOLDER: Article excerpt] Roy \'Dick\' Dykes, a radar operator with Coastal Command, knew that the small black box above his station was changing the war. His testimony, along with newly released documents from GCHQ, sheds new light on the intelligence war in the Atlantic.',
    readTime: '7 min read',
    convoyCode: 'HX 236',
  },
  {
    id: 5,
    date: 'January 2026',
    title: 'Emma Rodgers Confirmed as Sculptor for BOTAS Memorial Wall',
    excerpt: '// [PLACEHOLDER: Article excerpt] Acclaimed Liverpool sculptor Emma Rodgers has been confirmed as the artist for the memorial wall that will greet visitors at the entrance to the Battle of the Atlantic Story. The bronze work will bear the names of those who gave their lives in the campaign.',
    readTime: '4 min read',
    convoyCode: 'BH 26',
  },
  {
    id: 6,
    date: 'December 2025',
    title: 'Convoy HX 236: The Story of a Single Atlantic Crossing',
    excerpt: '// [PLACEHOLDER: Article excerpt] In April 1943, Convoy HX 236 departed Halifax, Nova Scotia, with 36 merchant vessels carrying vital supplies for a besieged Britain. The story of that crossing - the threats faced, the ships lost, the men who survived - tells the story of the Battle of the Atlantic in microcosm.',
    readTime: '8 min read',
    convoyCode: 'HX 236',
  },
  {
    id: 7,
    date: 'December 2025',
    title: 'The Wolf Packs: How German U-boats Coordinated Their Attacks',
    excerpt: '// [PLACEHOLDER: Article excerpt] The Rudeltaktik - the Wolf Pack tactic - was Grand Admiral Karl D\u00f6nitz\'s masterstroke. By coordinating multiple U-boats to attack convoys simultaneously, he hoped to overwhelm the Allied escorts. Understanding how it worked - and why it ultimately failed - is central to understanding the Battle of the Atlantic.',
    readTime: '6 min read',
    convoyCode: 'SC 48',
  },
  {
    id: 8,
    date: 'November 2025',
    title: 'Letters from the Deep: The Personal Effects Recovered from U-534',
    excerpt: '// [PLACEHOLDER: Article excerpt] When U-534 was raised from the Kattegat in 1993, she yielded an extraordinary collection of personal effects: letters home, diaries, photographs, personal keepsakes. These objects, preserved for nearly five decades on the seabed, offer an intimate portrait of the men who crewed her.',
    readTime: '5 min read',
    convoyCode: 'KT 45',
  },
  {
    id: 9,
    date: 'November 2025',
    title: 'Bletchley Park and the Battle of the Atlantic: How Enigma Changed Everything',
    excerpt: '// [PLACEHOLDER: Article excerpt] The breaking of the Naval Enigma cipher - and the Allied failure to maintain that intelligence advantage when Germany upgraded its machines in 1942 - is one of the most dramatic intelligence stories of the Second World War.',
    readTime: '7 min read',
    convoyCode: 'BP 43',
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
                  {/* Card header */}
                  <div
                    className="relative overflow-hidden px-6 py-8 flex-shrink-0"
                    style={{ backgroundColor: '#2D4F5C', minHeight: 140, border: '1px solid rgba(126, 206, 206, 0.15)', borderBottom: 'none' }}
                  >
                    {/* Sonar rings in card */}
                    <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 pointer-events-none">
                      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden="true">
                        {[20, 40, 60, 80].map((r, j) => (
                          <circle key={j} cx="75" cy="75" r={r} fill="none" stroke="#7ECECE" strokeWidth="0.5" opacity={0.08 - j * 0.015} />
                        ))}
                      </svg>
                    </div>

                    {/* Convoy code & date */}
                    <div className="flex items-center gap-3 mb-3">
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
                    </div>

                    {/* Date */}
                    <p
                      className="font-mono text-xs"
                      style={{ color: '#7ECECE', opacity: 0.6, letterSpacing: '0.08em' }}
                    >
                      {article.date}
                    </p>
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
                        Read More <span>\u2192</span>
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
              Sign Up \u2192
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
                }
