'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollReveal from '@/components/ScrollReveal'

// Colourway section data
const colourways = [
  {
    id: 'supply-lines',
    label: 'Supply Lines',
    description:
      'The merchant convoys that crossed the Atlantic were the arteries of the Allied war effort — 3,000 vessels sailing through submarine-infested waters to keep Britain alive.',
    bg: '#F5ECD7',
    text: '#B85C38',
    accent: '#E07B45',
    link: '/news',
    linkLabel: 'Explore the Exhibition',
    code: 'SC 48',
  },
  {
    id: 'warfare-at-sea',
    label: 'Warfare at Sea',
    description:
      'German U-boats formed the lethal "Wolf Packs" that stalked the Atlantic, while the Allies developed increasingly sophisticated countermeasures in a deadly technological arms race.',
    bg: '#7ECECE',
    text: '#2D4F5C',
    accent: '#4A9B8E',
    link: '/u-boat',
    linkLabel: 'Discover U-534',
    code: 'ON 67',
  },
  {
    id: 'signals-secrets',
    label: 'Signals & Secrets',
    description:
      '"…radar was our first great invention…" — Roy \'Dick\' Dykes. The breaking of Enigma codes and the race for radar superiority changed the course of the Battle.',
    bg: '#B85C38',
    text: '#F5ECD7',
    accent: '#E07B45',
    link: '/news',
    linkLabel: 'Uncover the Intelligence War',
    code: 'HX 236',
  },
  {
    id: 'life-at-sea',
    label: 'Life at Sea',
    description:
      'For the men who crewed the merchant ships and warships, life at sea was a test of endurance, courage, and fellowship — on both sides of the conflict.',
    bg: '#1A8080',
    text: '#F8F4EE',
    accent: '#7ECECE',
    link: '/memorial',
    linkLabel: 'Remember Those Who Served',
    code: 'SL 125',
  },
]

// Quote data
const quotes = [
  {
    text: '"Liverpool was the lifeline of the Atlantic."',
    attribution: 'Admiral Sir Max Horton, Commander-in-Chief Western Approaches',
  },
  {
    text: '"The only thing that ever really frightened me during the war was the U-boat peril."',
    attribution: 'Winston Churchill, Prime Minister of the United Kingdom',
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
        className="relative h-screen min-h-[700px] flex items-end overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        {/* Hero background image placeholder (dark gradient as fallback) */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  to bottom,
                  rgba(45, 79, 92, 0.2) 0%,
                  rgba(45, 79, 92, 0.5) 50%,
                  rgba(45, 79, 92, 0.92) 100%
                ),
                linear-gradient(
                  135deg,
                  #1a4555 0%,
                  #2D4F5C 30%,
                  #1A8080 60%,
                  #0d3040 100%
                )
              `,
            }}
          />
          {/* Simulated moody photographic atmosphere using layered gradients */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 80% 60% at 60% 40%, rgba(26, 128, 128, 0.15) 0%, transparent 70%),
                radial-gradient(ellipse 50% 40% at 20% 70%, rgba(184, 92, 56, 0.08) 0%, transparent 60%)
              `,
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
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full"
          style={{ opacity: heroOpacity }}
        >
          {/* Opening tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mb-6"
          >
            <span
              className="font-mono text-xs uppercase"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              Opening Autumn 2026 · Birkenhead, Mersey
            </span>
          </motion.div>

          <motion.h1
            className="font-montserrat font-black uppercase text-offwhite mb-8"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              letterSpacing: '0.08em',
              lineHeight: 1.0,
              textShadow: '0 4px 40px rgba(0,0,0,0.4)',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            The Battle<br />
            <span style={{ color: '#7ECECE' }}>of the</span><br />
            Atlantic Story
          </motion.h1>

          <motion.p
            className="font-montserrat text-lg max-w-xl mb-10 leading-relaxed"
            style={{ color: 'rgba(248, 244, 238, 0.8)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, duration: 0.8 }}
          >
            The world's first museum dedicated to the longest continuous military campaign of World War II — centred around U-534, the only U-boat ever raised from the seabed after combat.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.7 }}
          >
            <Link
              href="/u-boat"
              className="font-montserrat font-bold text-sm uppercase px-8 py-4 transition-all duration-300"
              style={{
                background: '#7ECECE',
                color: '#2D4F5C',
                letterSpacing: '0.15em',
              }}
            >
              Explore U-534
            </Link>
            <Link
              href="/contact"
              className="font-montserrat font-bold text-sm uppercase px-8 py-4 border transition-all duration-300 hover:bg-white hover:text-slate-deep"
              style={{
                borderColor: 'rgba(248, 244, 238, 0.5)',
                color: '#F8F4EE',
                letterSpacing: '0.15em',
              }}
            >
              Plan Your Visit
            </Link>
          </motion.div>
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
              {/* [PLACEHOLDER: Tagline / strapline] */}
              Opening Autumn 2026
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
              {/* [PLACEHOLDER: Museum mission statement] */}
              From 1939 to 1945, the Battle of the Atlantic determined the survival of Britain and the outcome of the entire war. Without victory at sea, there would have been no D-Day, no liberation of Europe. The war would have been lost. This museum exists so that story is never forgotten — told through the artefacts, voices, and experiences of those who lived it.
            </p>
            <p
              className="font-montserrat text-lg leading-relaxed max-w-3xl mx-auto"
              style={{ color: 'rgba(248, 244, 238, 0.8)' }}
            >
              At its heart is U-534: the last U-boat to leave Germany before the surrender, sunk on 5 May 1945, raised from the Kattegat seabed in 1993, and now preserved in sections at Birkenhead — the only U-boat ever recovered after being sunk in combat.
            </p>
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
                — {quotes[0].attribution}
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── KEY FACTS ────────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {facts.map((fact, i) => (
              <ScrollReveal key={fact.label} delay={i * 0.1}>
                <div
                  className="text-center py-8 px-4 border"
                  style={{ borderColor: 'rgba(126, 206, 206, 0.2)' }}
                >
                  <p
                    className="font-montserrat font-black mb-2"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      color: '#7ECECE',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {fact.number}
                  </p>
                  <p
                    className="font-montserrat font-medium text-sm uppercase"
                    style={{ color: 'rgba(248, 244, 238, 0.6)', letterSpacing: '0.1em' }}
                  >
                    {fact.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLOURWAY EXHIBITION ZONES ───────────────────────── */}
      <section className="relative">
        <ScrollReveal>
          <div
            className="text-center py-16 px-6"
            style={{ backgroundColor: '#2D4F5C' }}
          >
            <p
              className="font-mono text-xs uppercase mb-3"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              The Exhibition
            </p>
            <h2
              className="font-montserrat font-black uppercase"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                letterSpacing: '0.15em',
                color: '#F8F4EE',
              }}
            >
              Four Zones. One Story.
            </h2>
          </div>
        </ScrollReveal>

        {colourways.map((zone, i) => (
          <ScrollReveal key={zone.id}>
            <div
              className="relative overflow-hidden"
              style={{ backgroundColor: zone.bg }}
            >
              {/* Convoy diagonal line */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg width="100%" height="100%" className="absolute inset-0" aria-hidden="true">
                  <line
                    x1="-5%"
                    y1="85%"
                    x2="110%"
                    y2="10%"
                    stroke={zone.text}
                    strokeWidth="1"
                    opacity="0.06"
                    strokeDasharray="6,12"
                  />
                </svg>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
                <div
                  className={`flex flex-col lg:flex-row items-start gap-12 lg:gap-20 ${
                    i % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text content */}
                  <div className="flex-1">
                    {/* Zone label with convoy code */}
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="font-montserrat font-extrabold text-xs uppercase px-3 py-1"
                        style={{
                          background: zone.accent,
                          color: zone.id === 'supply-lines' || zone.id === 'signals-secrets' ? '#F8F4EE' : zone.bg,
                          letterSpacing: '0.15em',
                        }}
                      >
                        {zone.label}
                      </span>
                      <span
                        className="font-mono text-xs"
                        style={{ color: zone.text, opacity: 0.5, letterSpacing: '0.1em' }}
                      >
                        Convoy {zone.code}
                      </span>
                    </div>

                    <h3
                      className="font-montserrat font-black uppercase mb-6"
                      style={{
                        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                        letterSpacing: '0.1em',
                        color: zone.text,
                        lineHeight: 1.1,
                      }}
                    >
                      {zone.label}
                    </h3>

                    <p
                      className="font-montserrat text-lg leading-relaxed mb-8 max-w-lg"
                      style={{ color: zone.text, opacity: 0.85 }}
                    >
                      {/* [PLACEHOLDER: Exhibition zone description] */}
                      {zone.description}
                    </p>

                    <Link
                      href={zone.link}
                      className="inline-flex items-center gap-3 font-montserrat font-bold text-xs uppercase px-6 py-3 border transition-all duration-200 hover:opacity-80"
                      style={{
                        borderColor: zone.text,
                        color: zone.text,
                        letterSpacing: '0.15em',
                      }}
                    >
                      {zone.linkLabel}
                      <span>→</span>
                    </Link>
                  </div>

                  {/* Identification card decorative element */}
                  <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-64">
                    <div
                      className="relative shadow-2xl"
                      style={{ transform: `rotate(${i % 2 === 0 ? '-3' : '3'}deg)` }}
                    >
                      {/* ID Card */}
                      <div
                        className="rounded overflow-hidden shadow-xl"
                        style={{ background: '#F5ECD7', width: 200 }}
                      >
                        <div
                          className="px-4 py-2"
                          style={{ background: zone.accent }}
                        >
                          <p
                            className="font-mono text-white uppercase"
                            style={{ fontSize: 8, letterSpacing: '0.15em' }}
                          >
                            CONVOY IDENTIFICATION
                          </p>
                        </div>
                        <div className="px-4 py-4">
                          <p
                            className="font-montserrat font-black uppercase"
                            style={{ fontSize: 28, color: '#2D4F5C', letterSpacing: '0.05em' }}
                          >
                            {zone.code}
                          </p>
                          <p
                            className="font-mono mt-1"
                            style={{ fontSize: 9, color: '#9BA8A8', letterSpacing: '0.1em' }}
                          >
                            {zone.label.toUpperCase()}
                          </p>
                          <div className="mt-3 space-y-1">
                            <div className="h-1 rounded" style={{ background: '#B85C38', width: '75%' }} />
                            <div className="h-0.5 rounded" style={{ background: '#9BA8A8', width: '55%' }} />
                            <div className="h-0.5 rounded" style={{ background: '#9BA8A8', width: '65%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* ── SECOND QUOTE ─────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />

        {/* Aircraft silhouette */}
        <div className="absolute top-8 right-8 opacity-[0.05] pointer-events-none">
          <svg viewBox="0 0 200 100" width="200" aria-hidden="true">
            <ellipse cx="100" cy="50" rx="60" ry="10" fill="#7ECECE" />
            <polygon points="80,50 120,50 140,80 60,80" fill="#7ECECE" />
            <polygon points="155,50 175,50 170,35 155,35" fill="#7ECECE" />
            <circle cx="100" cy="50" r="12" fill="none" stroke="#7ECECE" strokeWidth="2" />
            <circle cx="100" cy="50" r="6" fill="none" stroke="#7ECECE" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <blockquote>
              <p
                className="font-mono text-xl lg:text-2xl leading-loose mb-4"
                style={{ color: '#F8F4EE' }}
              >
                <span className="quote-block">
                  {quotes[1].text}
                </span>
              </p>
              <cite
                className="font-mono text-sm not-italic"
                style={{ color: 'rgba(248, 244, 238, 0.6)', letterSpacing: '0.05em' }}
              >
                — {quotes[1].attribution}
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── U-534 FEATURE ────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ backgroundColor: '#4A9B8E' }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />

        {/* Sonar rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 600 600" aria-hidden="true">
            {[80, 150, 220, 290, 360, 430].map((r, i) => (
              <circle
                key={i}
                cx="300"
                cy="300"
                r={r}
                fill="none"
                stroke="#F8F4EE"
                strokeWidth="1"
                opacity={0.08 - i * 0.01}
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <p
                  className="font-mono text-xs uppercase mb-4"
                  style={{ color: '#F5ECD7', letterSpacing: '0.2em', opacity: 0.7 }}
                >
                  The Centrepiece
                </p>
                <h2
                  className="font-montserrat font-black uppercase mb-6"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    letterSpacing: '0.1em',
                    color: '#F8F4EE',
                    lineHeight: 1.05,
                  }}
                >
                  U-534:<br />
                  <span style={{ color: '#F5ECD7', opacity: 0.85 }}>The Last U-Boat</span>
                </h2>
                <p
                  className="font-montserrat text-lg leading-relaxed mb-6"
                  style={{ color: 'rgba(248, 244, 238, 0.85)' }}
                >
                  {/* [PLACEHOLDER: U-534 introduction] */}
                  Commissioned in December 1942, U-534 was one of the last U-boats to leave Germany before the surrender. On 5 May 1945, just days before VE Day, she was intercepted by RAF Liberators from No. 86 Squadron and sunk in the Kattegat. For nearly five decades she lay on the seabed, until her remarkable recovery in 1993.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed mb-8"
                  style={{ color: 'rgba(248, 244, 238, 0.85)' }}
                >
                  Now carefully preserved in sections at Birkenhead, U-534 offers a rare and extraordinary window into life aboard a WWII German U-boat — and into the personal stories of the men who crewed her.
                </p>
                <Link
                  href="/u-boat"
                  className="inline-flex items-center gap-3 font-montserrat font-bold text-sm uppercase px-8 py-4 transition-all duration-200"
                  style={{
                    background: '#F5ECD7',
                    color: '#4A9B8E',
                    letterSpacing: '0.15em',
                  }}
                >
                  The U-534 Story →
                </Link>
              </div>
            </ScrollReveal>

            {/* Submarine silhouette block */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div
                  className="relative overflow-hidden"
                  style={{ background: 'rgba(45, 79, 92, 0.4)', aspectRatio: '4/3' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 400 160" width="90%" aria-hidden="true">
                      {/* Submarine body */}
                      <ellipse cx="200" cy="90" rx="170" ry="38" fill="none" stroke="#7ECECE" strokeWidth="1.5" opacity="0.4" />
                      <ellipse cx="200" cy="90" rx="170" ry="38" fill="#2D4F5C" opacity="0.5" />
                      {/* Conning tower */}
                      <rect x="155" y="48" width="55" height="44" rx="6" fill="none" stroke="#7ECECE" strokeWidth="1.5" opacity="0.4" />
                      <rect x="155" y="48" width="55" height="44" rx="6" fill="#2D4F5C" opacity="0.5" />
                      {/* Periscope */}
                      <rect x="178" y="30" width="5" height="20" fill="none" stroke="#7ECECE" strokeWidth="1.5" opacity="0.4" />
                      {/* Propellers */}
                      <ellipse cx="30" cy="90" rx="20" ry="8" fill="none" stroke="#7ECECE" strokeWidth="1" opacity="0.3" />
                      {/* Torpedo tubes */}
                      <rect x="355" y="85" width="30" height="8" rx="4" fill="none" stroke="#7ECECE" strokeWidth="1" opacity="0.3" />
                      <rect x="355" y="97" width="30" height="8" rx="4" fill="none" stroke="#7ECECE" strokeWidth="1" opacity="0.3" />
                      {/* Sonar rings emanating */}
                      {[40, 70, 100].map((r, i) => (
                        <circle key={i} cx="370" cy="90" r={r} fill="none" stroke="#7ECECE" strokeWidth="0.5" opacity={0.1 - i * 0.03} />
                      ))}
                    </svg>
                  </div>
                  {/* U-534 designation */}
                  <div className="absolute bottom-4 left-4">
                    <p
                      className="font-montserrat font-black"
                      style={{ color: '#7ECECE', fontSize: 48, opacity: 0.15, letterSpacing: '0.05em' }}
                    >
                      U-534
                    </p>
                  </div>
                </div>
                {/* Caption */}
                <p
                  className="font-mono text-xs mt-3"
                  style={{ color: 'rgba(248, 244, 238, 0.4)', letterSpacing: '0.08em' }}
                >
                  {/* [PLACEHOLDER: Image caption] */}
                  U-534 · Type IXC/40 · Commissioned December 1942 · Recovered 1993
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── MEMORIAL TEASER ──────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div
                className="relative overflow-hidden py-16 px-10"
                style={{ background: '#F5ECD7' }}
              >
                {/* Sonar rings in cream */}
                <div className="absolute -bottom-20 -right-20 pointer-events-none">
                  <svg width="300" height="300" viewBox="0 0 300 300" aria-hidden="true">
                    {[40, 80, 120, 160].map((r, i) => (
                      <circle key={i} cx="300" cy="300" r={r} fill="none" stroke="#B85C38" strokeWidth="1" opacity={0.08 + i * 0.02} />
                    ))}
                  </svg>
                </div>
                <p
                  className="font-mono text-xs uppercase mb-4"
                  style={{ color: '#B85C38', letterSpacing: '0.2em' }}
                >
                  Memorial
                </p>
                <h3
                  className="font-montserrat font-black uppercase mb-4"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    letterSpacing: '0.1em',
                    color: '#2D4F5C',
                    lineHeight: 1.1,
                  }}
                >
                  Remembering All<br />Who Served
                </h3>
                <p
                  className="font-montserrat text-base leading-relaxed mb-6"
                  style={{ color: '#2D4F5C', opacity: 0.75 }}
                >
                  {/* [PLACEHOLDER: Memorial intro text] */}
                  From merchant seamen to Royal Navy sailors, from RAF aircrew to German submariners — the Battle of the Atlantic claimed lives on all sides. This museum is dedicated to their memory.
                </p>
                <Link
                  href="/memorial"
                  className="inline-flex items-center gap-2 font-montserrat font-bold text-xs uppercase"
                  style={{ color: '#B85C38', letterSpacing: '0.15em' }}
                >
                  Visit the Memorial →
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-8">
                <div>
                  <p
                    className="font-mono text-xs uppercase mb-3"
                    style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
                  >
                    Memorial Wall
                  </p>
                  <p
                    className="font-montserrat text-lg leading-relaxed"
                    style={{ color: 'rgba(248, 244, 238, 0.8)' }}
                  >
                    {/* [PLACEHOLDER: Memorial wall description] */}
                    An external memorial wall — a bronze work by acclaimed Liverpool sculptor Emma Rodgers — will bear the names of those who gave their lives in the Battle of the Atlantic. Executed in traditional sand-cast bronze alloy, it will become a place of national pilgrimage.
                  </p>
                </div>
                <div
                  className="border-l-2 pl-6"
                  style={{ borderColor: '#7ECECE' }}
                >
                  <p
                    className="font-montserrat font-light text-base italic leading-relaxed"
                    style={{ color: 'rgba(248, 244, 238, 0.7)' }}
                  >
                    "In 1942, at just seventeen, I lied about my age to join the Royal Navy… The young German sailors we faced were just like us: brave, scared, and far too young to die."
                  </p>
                  <p
                    className="font-mono text-xs mt-3"
                    style={{ color: '#7ECECE', letterSpacing: '0.08em' }}
                  >
                    John Dennett · Royal Navy Veteran
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden text-center"
        style={{ backgroundColor: '#B85C38' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" style={{ opacity: 0.3 }} />
        {/* Sonar rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="800" height="400" viewBox="0 0 800 400" aria-hidden="true">
            {[60, 120, 180, 240, 300].map((r, i) => (
              <ellipse key={i} cx="400" cy="200" rx={r * 2} ry={r} fill="none" stroke="#F5ECD7" strokeWidth="1" opacity={0.05 + i * 0.01} />
            ))}
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p
              className="font-mono text-xs uppercase mb-4"
              style={{ color: 'rgba(245, 236, 215, 0.7)', letterSpacing: '0.2em' }}
            >
              Opening Autumn 2026
            </p>
            <h2
              className="font-montserrat font-black uppercase mb-6"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                letterSpacing: '0.12em',
                color: '#F5ECD7',
              }}
            >
              Plan Your Visit
            </h2>
            <p
              className="font-montserrat text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(245, 236, 215, 0.85)' }}
            >
              {/* [PLACEHOLDER: Visit info teaser] */}
              Located on the banks of the River Mersey in Birkenhead, with breathtaking views of the Liverpool skyline. Register your interest and be the first to hear about opening events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="font-montserrat font-bold text-sm uppercase px-8 py-4 transition-all duration-200 hover:opacity-90"
                style={{
                  background: '#F5ECD7',
                  color: '#B85C38',
                  letterSpacing: '0.15em',
                }}
              >
                Register Interest
              </Link>
              <Link
                href="/memorial"
                className="font-montserrat font-bold text-sm uppercase px-8 py-4 border transition-all duration-200 hover:bg-sand hover:text-orange-burnt"
                style={{
                  borderColor: 'rgba(245, 236, 215, 0.5)',
                  color: '#F5ECD7',
                  letterSpacing: '0.15em',
                }}
              >
                The Memorial
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
