'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

// Exhibition zone data
const zones = [
  {
    id: 'supply-lines',
    label: 'Supply Lines',
    code: 'SC 48',
    tagline: 'The Convoys That Kept Britain Alive',
    description:
      'Step into the world of the merchant convoys â vast armadas of ships that crossed the Atlantic carrying food, fuel, and munitions to a besieged Britain. Through personal accounts, original artefacts, and immersive displays, discover the courage of the ordinary men and women who risked everything to keep the supply lines open.',
    highlights: [
      'Original convoy route charts and shipping manifests',
      'Personal diaries and letters from merchant seamen',
      'Interactive convoy formation display',
    ],
    bg: '#F5ECD7',
    text: '#B85C38',
    accent: '#E07B45',
    accentBg: 'rgba(184, 92, 56, 0.08)',
    borderColor: 'rgba(184, 92, 56, 0.15)',
  },
  {
    id: 'warfare-at-sea',
    label: 'Warfare at Sea',
    code: 'ON 67',
    tagline: 'The Deadly Arms Race Beneath the Waves',
    description:
      'Explore the technological arms race that defined the longest continuous military campaign of the Second World War. From the lethal "Wolf Pack" tactics of the German U-boat fleet to the Allied countermeasures that eventually turned the tide, this zone brings you face to face with U-534 â the centrepiece of the museum.',
    highlights: [
      'Walk inside the sectioned hull of U-534',
      'Artefacts recovered from the seabed',
      'Depth charge and ASDIC demonstrations',
    ],
    bg: '#7ECECE',
    text: '#2D4F5C',
    accent: '#4A9B8E',
    accentBg: 'rgba(45, 79, 92, 0.08)',
    borderColor: 'rgba(45, 79, 92, 0.15)',
  },
  {
    id: 'signals-secrets',
    label: 'Signals & Secrets',
    code: 'HX 236',
    tagline: 'The Intelligence War That Changed Everything',
    description:
      'Uncover the secret war that raged behind the scenes â from the codebreakers of Bletchley Park to the radar pioneers of the Mersey. This zone reveals how the breaking of the Enigma codes and the race for technological superiority became the decisive turning point of the Battle of the Atlantic.',
    highlights: [
      'Enigma machine and signals intelligence displays',
      'Radar and Huff-Duff direction-finding technology',
      'The story of Western Approaches HQ in Liverpool',
    ],
    bg: '#B85C38',
    text: '#F5ECD7',
    accent: '#E07B45',
    accentBg: 'rgba(245, 236, 215, 0.1)',
    borderColor: 'rgba(245, 236, 215, 0.2)',
  },
  {
    id: 'life-at-sea',
    label: 'Life at Sea',
    code: 'SL 125',
    tagline: 'The Human Stories Behind the Battle',
    description:
      'At its heart, the Battle of the Atlantic is a story of people. In this zone, hear the voices of those who lived through it â submariners and merchant seamen, Wrens and dockworkers, families waiting at home. Through diaries, photographs, oral histories, and personal effects, discover the humanity on both sides of the conflict.',
    highlights: [
      'Oral history listening stations',
      'Personal effects and photographs of those who served',
      'Life aboard: recreated living quarters',
    ],
    bg: '#1A8080',
    text: '#F8F4EE',
    accent: '#7ECECE',
    accentBg: 'rgba(126, 206, 206, 0.1)',
    borderColor: 'rgba(126, 206, 206, 0.2)',
  },
]

export default function MuseumPage() {
  return (
    <>
      {/* ââ HERO âââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section
        className="relative min-h-screen flex items-end overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        {/* Naval chart grid */}
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />

        {/* Sonar rings */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 pointer-events-none">
          <svg width="800" height="800" viewBox="0 0 800 800" aria-hidden="true">
            {[60, 130, 200, 270, 340, 410, 480].map((r, i) => (
              <circle
                key={i}
                cx="400"
                cy="400"
                r={r}
                fill="none"
                stroke="#7ECECE"
                strokeWidth={i === 0 ? 1.5 : 1}
                opacity={0.1 - i * 0.01}
              />
            ))}
          </svg>
        </div>

        {/* Convoy diagonal */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0" aria-hidden="true">
            <line x1="0%" y1="85%" x2="100%" y2="20%" stroke="#7ECECE" strokeWidth="0.5" opacity="0.06" strokeDasharray="8,16" />
            <line x1="0%" y1="95%" x2="100%" y2="30%" stroke="#7ECECE" strokeWidth="0.5" opacity="0.04" strokeDasharray="6,18" />
          </svg>
        </div>

        {/* Museum building silhouette */}
        <div className="absolute left-0 right-0 bottom-24 flex justify-center pointer-events-none">
          <svg viewBox="0 0 800 120" width="70%" className="opacity-[0.05]" aria-hidden="true">
            <rect x="100" y="40" width="600" height="80" rx="2" fill="none" stroke="#7ECECE" strokeWidth="2" />
            <rect x="340" y="10" width="120" height="110" rx="2" fill="none" stroke="#7ECECE" strokeWidth="2" />
            <rect x="370" y="50" width="20" height="40" fill="none" stroke="#7ECECE" strokeWidth="1.5" />
            <rect x="410" y="50" width="20" height="40" fill="none" stroke="#7ECECE" strokeWidth="1.5" />
            <rect x="150" y="60" width="30" height="30" fill="none" stroke="#7ECECE" strokeWidth="1" />
            <rect x="210" y="60" width="30" height="30" fill="none" stroke="#7ECECE" strokeWidth="1" />
            <rect x="560" y="60" width="30" height="30" fill="none" stroke="#7ECECE" strokeWidth="1" />
            <rect x="620" y="60" width="30" height="30" fill="none" stroke="#7ECECE" strokeWidth="1" />
          </svg>
        </div>

        {/* Page content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p
              className="font-mono text-xs uppercase mb-4"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              The Museum
            </p>
            <h1
              className="font-montserrat font-black uppercase text-offwhite mb-8"
              style={{
                fontSize: 'clamp(2.4rem, 7vw, 6rem)',
                letterSpacing: '0.08em',
                lineHeight: 1.0,
              }}
            >
              Discover the<br />
              <span style={{ color: '#7ECECE', fontSize: '85%' }}>Atlantic Story</span>
            </h1>
            <p
              className="font-montserrat text-xl max-w-2xl leading-relaxed"
              style={{ color: 'rgba(248, 244, 238, 0.8)' }}
            >
              {/* [PLACEHOLDER: Museum hero strapline] */}
              Four immersive exhibition zones. Thousands of original artefacts. One extraordinary story â the longest, most pivotal naval campaign of the Second World War, told from the shores of the Mersey where it was won.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ââ INTRO ââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: '#F8F4EE' }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div>
                <p
                  className="font-mono text-xs uppercase mb-4"
                  style={{ color: '#B85C38', letterSpacing: '0.2em' }}
                >
                  Opening Autumn 2026
                </p>
                <h2
                  className="font-montserrat font-black uppercase mb-6"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    letterSpacing: '0.12em',
                    color: '#2D4F5C',
                  }}
                >
                  A Museum Like<br />No Other
                </h2>
                <p
                  className="font-montserrat text-lg leading-relaxed mb-4"
                  style={{ color: 'rgba(45, 79, 92, 0.85)' }}
                >
                  {/* [PLACEHOLDER: Museum introduction paragraph 1] */}
                  The Battle of the Atlantic Story is the world's most comprehensive museum dedicated to the longest continuous campaign of the Second World War. Located at Woodside, Birkenhead â on the very waterfront where convoy escorts assembled and merchant crews said their goodbyes â the museum brings together original artefacts, personal testimonies, and cutting-edge immersive technology.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed"
                  style={{ color: 'rgba(45, 79, 92, 0.85)' }}
                >
                  {/* [PLACEHOLDER: Museum introduction paragraph 2] */}
                  At its heart stands U-534 â the only U-boat ever raised after being sunk in combat â alongside the extraordinary collection of personal effects recovered from her hull. Four themed exhibition zones guide visitors through the full story: the convoys, the combat, the intelligence war, and the human experience on both sides.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-4">
                {/* Museum at a glance */}
                <p
                  className="font-mono text-xs uppercase mb-6"
                  style={{ color: 'rgba(45, 79, 92, 0.5)', letterSpacing: '0.2em' }}
                >
                  At a Glance
                </p>
                {[
                  { n: '4', l: 'Exhibition zones' },
                  { n: 'U-534', l: 'The only combat-raised U-boat' },
                  { n: '1,000+', l: 'Original artefacts' },
                  { n: '6 years', l: 'Of history uncovered' },
                ].map((stat) => (
                  <div
                    key={stat.l}
                    className="flex items-center gap-6 p-5"
                    style={{ background: 'rgba(45, 79, 92, 0.04)', border: '1px solid rgba(45, 79, 92, 0.1)' }}
                  >
                    <span
                      className="font-montserrat font-black text-2xl flex-shrink-0"
                      style={{ color: '#1A8080', minWidth: 80 }}
                    >
                      {stat.n}
                    </span>
                    <span
                      className="font-montserrat font-medium text-sm uppercase"
                      style={{ color: 'rgba(45, 79, 92, 0.6)', letterSpacing: '0.1em' }}
                    >
                      {stat.l}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ââ EXHIBITION ZONES âââââââââââââââââââââââââââââââââââ */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <p
                className="font-mono text-xs uppercase mb-3"
                style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
              >
                Four Zones Â· One Story
              </p>
              <h2
                className="font-montserrat font-black uppercase"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  letterSpacing: '0.12em',
                  color: '#F8F4EE',
                }}
              >
                The Exhibition
              </h2>
            </div>
          </ScrollReveal>

          {/* Zone cards */}
          <div className="space-y-8">
            {zones.map((zone, i) => (
              <ScrollReveal key={zone.id} delay={i * 0.08}>
                <div
                  className="relative overflow-hidden"
                  style={{
                    backgroundColor: zone.bg,
                    border: `1px solid ${zone.borderColor}`,
                  }}
                >
                  {/* Convoy code badge */}
                  <div
                    className="absolute top-6 right-6"
                  >
                    <span
                      className="font-mono text-xs px-3 py-1.5"
                      style={{
                        background: zone.accentBg,
                        color: zone.accent,
                        letterSpacing: '0.12em',
                        border: `1px solid ${zone.borderColor}`,
                      }}
                    >
                      {zone.code}
                    </span>
                  </div>

                  <div className="p-8 lg:p-12">
                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                      {/* Main content â 3 cols */}
                      <div className="lg:col-span-3">
                        <p
                          className="font-mono text-xs uppercase mb-3"
                          style={{ color: zone.accent, letterSpacing: '0.2em' }}
                        >
                          Zone {i + 1}
                        </p>
                        <h3
                          className="font-montserrat font-black uppercase mb-2"
                          style={{
                            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                            letterSpacing: '0.1em',
                            color: zone.text,
                          }}
                        >
                          {zone.label}
                        </h3>
                        <p
                          className="font-montserrat font-medium text-base mb-5 italic"
                          style={{ color: zone.text, opacity: 0.7 }}
                        >
                          {zone.tagline}
                        </p>
                        <p
                          className="font-montserrat text-base leading-relaxed"
                          style={{ color: zone.text, opacity: 0.85 }}
                        >
                          {/* [PLACEHOLDER: Exhibition zone description] */}
                          {zone.description}
                        </p>
                      </div>

                      {/* Highlights â 2 cols */}
                      <div className="lg:col-span-2">
                        <p
                          className="font-mono text-xs uppercase mb-4"
                          style={{ color: zone.accent, letterSpacing: '0.15em' }}
                        >
                          What You'll Discover
                        </p>
                        <div className="space-y-3">
                          {zone.highlights.map((h, j) => (
                            <div
                              key={j}
                              className="flex items-start gap-3 p-4"
                              style={{
                                background: zone.accentBg,
                                border: `1px solid ${zone.borderColor}`,
                              }}
                            >
                              <span
                                className="font-mono text-xs mt-0.5 flex-shrink-0"
                                style={{ color: zone.accent }}
                              >
                                {String(j + 1).padStart(2, '0')}
                              </span>
                              <span
                                className="font-montserrat text-sm leading-relaxed"
                                style={{ color: zone.text, opacity: 0.85 }}
                              >
                                {/* [PLACEHOLDER: Zone highlight] */}
                                {h}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ââ QUOTE BREAK ââââââââââââââââââââââââââââââââââââââââ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: '#4A9B8E' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p
              className="font-mono text-2xl lg:text-3xl leading-relaxed mb-6"
              style={{ color: '#F8F4EE' }}
            >
              <span className="quote-block">
                "The only thing that ever really frightened me during the war was the U-boat peril."
              </span>
            </p>
            <p
              className="font-mono text-xs uppercase"
              style={{ color: 'rgba(248, 244, 238, 0.5)', letterSpacing: '0.15em' }}
            >
              Winston Churchill
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ââ VISITOR INFORMATION âââââââââââââââââââââââââââââââââ */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: '#F8F4EE' }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <ScrollReveal>
              <div className="lg:col-span-1">
                <p
                  className="font-mono text-xs uppercase mb-3"
                  style={{ color: '#B85C38', letterSpacing: '0.2em' }}
                >
                  Plan Your Visit
                </p>
                <h2
                  className="font-montserrat font-black uppercase mb-6"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    letterSpacing: '0.12em',
                    color: '#2D4F5C',
                  }}
                >
                  What to Expect
                </h2>
                <p
                  className="font-montserrat text-base leading-relaxed"
                  style={{ color: 'rgba(45, 79, 92, 0.8)' }}
                >
                  {/* [PLACEHOLDER: Visitor info intro] */}
                  Whether you're a history enthusiast, a family looking for an unforgettable day out, or a school group studying the Second World War, the Battle of the Atlantic Story offers something for everyone.
                </p>
              </div>
            </ScrollReveal>

            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Families',
                    body: 'Interactive displays, hands-on activities, and storytelling stations designed for visitors of all ages. Children can explore what life was like aboard a submarine and follow the journey of a convoy across the Atlantic.',
                    icon: 'â',
                  },
                  {
                    title: 'Schools & Groups',
                    body: 'Curriculum-linked workshops and guided tours tailored to KS2, KS3, and GCSE History. Our education programme brings the Battle of the Atlantic to life through primary sources and immersive experiences.',
                    icon: 'ð',
                  },
                  {
                    title: 'Accessibility',
                    body: 'The museum is fully wheelchair accessible with step-free access throughout. Audio guides, large-print materials, and sensory-friendly sessions are available. Assistance dogs are welcome.',
                    icon: 'â¿',
                  },
                  {
                    title: 'Getting Here',
                    body: 'Located at Woodside, Birkenhead â directly across the Mersey from Liverpool\'s Pier Head. Easily accessible by Mersey Ferry, bus, and car. Visitor parking is available on site.',
                    icon: 'ð',
                  },
                ].map((card, i) => (
                  <ScrollReveal key={card.title} delay={i * 0.1}>
                    <div
                      className="p-6 h-full"
                      style={{
                        background: 'rgba(45, 79, 92, 0.04)',
                        border: '1px solid rgba(45, 79, 92, 0.1)',
                      }}
                    >
                      <p
                        className="text-2xl mb-3"
                        aria-hidden="true"
                      >
                        {card.icon}
                      </p>
                      <h3
                        className="font-montserrat font-bold uppercase text-sm mb-3"
                        style={{ letterSpacing: '0.1em', color: '#2D4F5C' }}
                      >
                        {/* [PLACEHOLDER: Visitor info card title] */}
                        {card.title}
                      </h3>
                      <p
                        className="font-montserrat text-sm leading-relaxed"
                        style={{ color: 'rgba(45, 79, 92, 0.75)' }}
                      >
                        {/* [PLACEHOLDER: Visitor info card body] */}
                        {card.body}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ââ CTA ââââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section
        className="relative py-20 text-center overflow-hidden"
        style={{ backgroundColor: '#B85C38' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" style={{ opacity: 0.3 }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2
              className="font-montserrat font-black uppercase mb-6"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                letterSpacing: '0.12em',
                color: '#F5ECD7',
              }}
            >
              Be the First to Visit
            </h2>
            <p
              className="font-montserrat text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(245, 236, 215, 0.85)' }}
            >
              {/* [PLACEHOLDER: Museum CTA copy] */}
              Opening Autumn 2026 at Woodside, Birkenhead. Register your interest today to be the first to hear about tickets, events, and opening dates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="font-montserrat font-bold text-sm uppercase px-8 py-4"
                style={{ background: '#F5ECD7', color: '#B85C38', letterSpacing: '0.15em' }}
              >
                Register Interest
              </Link>
              <Link
                href="/u-boat"
                className="font-montserrat font-bold text-sm uppercase px-8 py-4 border"
                style={{ borderColor: 'rgba(245,236,215,0.5)', color: '#F5ECD7', letterSpacing: '0.15em' }}
              >
                Discover U-534 â
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
