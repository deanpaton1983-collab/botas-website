'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollReveal from '@/components/ScrollReveal'
import HeroSlideshow from '@/components/HeroSlideshow'
import AnimatedCounter from '@/components/AnimatedCounter'

// Quote data
const quotes = [
  {
    text: '"Liverpool was the lifeline of the Atlantic."',
    attribution: 'Admiral Sir Max Horton, Commander-in-Chief Western Approaches',
  },
]

// Key facts
const facts = [
  { number: '3,500+', label: 'Allied ships lost' },
  { number: '70,000+', label: 'Allied lives lost' },
  { number: '28,000', label: 'German submariners lost' },
  { number: '6 years', label: 'Continuous campaign' },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <>
      <LoadingScreen />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[760px] overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        {/* Dynamic archival image background */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <HeroSlideshow />
          {/* Darkening overlay so text remains readable */}
          <div
            className="absolute inset-0 z-[3]"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(10, 37, 53, 0.35) 0%,
                rgba(13, 48, 64, 0.30) 55%,
                rgba(10, 30, 42, 0.92) 100%
              )`,
            }}
          />
        </motion.div>

        {/* Sonar rings overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0"
            aria-hidden="true"
          >
            {[120, 220, 320, 420, 520, 620].map((r, i) => (
              <circle
                key={i}
                cx="600"
                cy="380"
                r={r}
                fill="none"
                stroke="#7ECECE"
                strokeWidth={i === 0 ? 1.5 : 1}
                opacity={0.08 - i * 0.01}
              />
            ))}
            {/* Sweep line */}
            <line x1="600" y1="380" x2="600" y2="-260" stroke="#7ECECE" strokeWidth="1" opacity="0.06" />
            <line x1="600" y1="380" x2="1170" y2="180" stroke="#7ECECE" strokeWidth="1" opacity="0.06" />
          </svg>
        </div>

        {/* Convoy diagonal lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0" aria-hidden="true">
            <line x1="-5%" y1="100%" x2="110%" y2="20%" stroke="#7ECECE" strokeWidth="0.5" opacity="0.06" strokeDasharray="8,16" />
            <line x1="-5%" y1="80%" x2="110%" y2="0%" stroke="#7ECECE" strokeWidth="0.5" opacity="0.04" strokeDasharray="8,16" />
          </svg>
        </div>

        {/* Ship silhouette – bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1400 120" width="100%" className="opacity-[0.06]" aria-hidden="true">
            <polygon points="0,100 200,100 220,70 280,60 900,60 950,65 1400,60 1400,120 0,120" fill="#7ECECE" />
          </svg>
        </div>

        {/* Submarine silhouette */}
        <div className="absolute bottom-16 right-0 w-64 opacity-[0.05] pointer-events-none">
          <svg viewBox="0 0 240 60" aria-hidden="true">
            <ellipse cx="120" cy="35" rx="100" ry="18" fill="#7ECECE" />
            <rect x="100" y="12" width="30" height="22" rx="4" fill="#7ECECE" />
            <rect x="112" y="6" width="6" height="10" fill="#7ECECE" />
            <polygon points="20,35 40,22 40,48" fill="#7ECECE" />
            <polygon points="220,35 200,28 200,42" fill="#7ECECE" />
          </svg>
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12 w-full h-full flex flex-col justify-end"
          style={{ opacity: heroOpacity }}
        >
          <motion.h1
            className="font-montserrat font-black uppercase text-offwhite mb-4"
            style={{
              fontSize: 'clamp(1.9rem, 4.5vw, 3.75rem)',
              letterSpacing: '0.08em',
              lineHeight: 1.05,
              textShadow: '0 4px 40px rgba(0,0,0,0.55)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            The Battle<br />
            <span style={{ color: '#7ECECE' }}>of the</span><br />
            Atlantic Story
          </motion.h1>

          {/* Opening tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="mb-4"
          >
            <span
              className="font-mono text-xs uppercase"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              Opening in 2027 · Birkenhead, Liverpool City Region
            </span>
          </motion.div>

          <motion.p
            className="font-montserrat text-base max-w-xl mb-6 leading-relaxed"
            style={{ color: 'rgba(248, 244, 238, 0.8)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9, duration: 0.8 }}
          >
            The Battle of the Atlantic Story Experience is the world's first museum dedicated to the longest continuous military campaign of World War II - centred around U-534, the only U-boat raised from the seabed after combat - and home to the world's largest memorial to the Atlantic Campaign.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.8 }}
        >
          <span
            className="font-montserrat font-medium text-xs uppercase"
            style={{ color: 'rgba(126, 206, 206, 0.6)', letterSpacing: '0.2em' }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, rgba(126,206,206,0.6), transparent)' }}
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ── MISSION STATEMENT ────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p
              className="font-mono text-xs uppercase mb-4"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              Opening in 2027
            </p>
            <h2
              className="font-montserrat font-black uppercase mb-8"
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 3rem)',
                letterSpacing: '0.12em',
                color: '#F8F4EE',
              }}
            >
              A Story of Courage,<br />Sacrifice & Survival
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="font-montserrat text-lg leading-relaxed max-w-3xl mx-auto mb-6"
              style={{ color: 'rgba(248, 244, 238, 0.8)' }}
            >
                From 1939 to 1945, the Battle of the Atlantic determined the survival of Britain and the outcome of the Second World War. Without victory at sea, there would have been no D-Day and liberation of Europe. The war would have been lost. The Battle of the Atlantic Story exists so that this is never forgotten. The story is told through the artefacts, voices and experiences of those who bravely lived through the battle.
            </p>
            <p
              className="font-montserrat text-lg leading-relaxed max-w-3xl mx-auto mb-6"
              style={{ color: 'rgba(248, 244, 238, 0.8)' }}
            >
                At the heart of the museum is U-534, the last U-boat to leave Germany before the surrender. The submarine was sunk on 5 May 1945 and raised from the Kattegat seabed in 1993.
            </p>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 font-montserrat font-bold text-xs uppercase"
              style={{ color: '#7ECECE', letterSpacing: '0.15em' }}
            >
              What was the Battle of the Atlantic? →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── QUOTE BLOCK ──────────────────────────────────────── */}
      <section
        className="relative py-16 overflow-hidden"
        style={{ backgroundColor: '#1A8080' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <blockquote className="text-center">
              <p
                className="font-mono text-xl lg:text-2xl leading-loose mb-4"
                style={{ color: '#F8F4EE' }}
              >
                <span className="quote-block quote-block-teal">
                  {quotes[0].text}
                </span>
              </p>
              <cite
                className="font-mono text-sm not-italic"
                style={{ color: 'rgba(248, 244, 238, 0.6)', letterSpacing: '0.05em' }}
              >
                - {quotes[0].attribution}
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── KEY FACTS ────────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ backgroundColor: '#0d3040' }}
      >
        {/* Archival convoy photograph background */}
        <div className="absolute inset-0">
          <Image
            src="/images/Allied_convoy_underway_in_the_Atlantic_Ocean_near_Iceland,_circa_in_1942_(80-G-72409).jpg"
            alt="An Allied convoy underway in the Atlantic Ocean near Iceland, 1942"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(13,48,64,0.88) 0%, rgba(13,48,64,0.72) 50%, rgba(13,48,64,0.9) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p
              className="font-mono text-xs uppercase mb-10 text-center"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              The Cost of the Atlantic · 1939–1945
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {facts.map((fact, i) => (
              <ScrollReveal key={fact.label} delay={i * 0.1}>
                <div
                  className="text-center py-8 px-4 border backdrop-blur-[2px] transition-colors duration-300 hover:border-teal-light/50"
                  style={{ borderColor: 'rgba(126, 206, 206, 0.25)', background: 'rgba(13,48,64,0.35)' }}
                >
                  <AnimatedCounter
                    value={fact.number}
                    className="font-montserrat font-black mb-2 block"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      color: '#7ECECE',
                      letterSpacing: '0.02em',
                    }}
                  />
                  <p
                    className="font-montserrat font-medium text-sm uppercase"
                    style={{ color: 'rgba(248, 244, 238, 0.7)', letterSpacing: '0.1em' }}
                  >
                    {fact.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p
              className="font-mono text-xs mt-8 text-center"
              style={{ color: 'rgba(248,244,238,0.35)', letterSpacing: '0.08em' }}
            >
              An Allied convoy underway near Iceland, 1942 · US Navy 80-G-72409
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
