'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const timelineEvents = [
  {
    date: 'December 1942',
    title: 'Commissioned',
    body: 'U-534 is commissioned into the German Kriegsmarine as a Type IXC/40 ocean-going submarine under Kapitänleutnant Herbert Nollau. She is one of the most advanced U-boats of the war.',
    code: 'KM 534',
  },
  {
    date: '1943–1944',
    title: 'Atlantic Patrols',
    body: 'U-534 undertakes patrols in the North Atlantic and Bay of Biscay. By this stage the tide of war has shifted dramatically: Allied anti-submarine technology — radar, Huff-Duff, ASDIC — has given the hunter-killers a decisive advantage. U-534 achieves no confirmed Allied ship sinkings.',
    code: 'BI 44',
  },
  {
    date: 'Early 1945',
    title: 'Last Voyage',
    body: 'As Germany\'s defeat becomes inevitable, U-534 is ordered to Norway as part of Operation Regenbogen — a plan to scuttle the U-boat fleet to prevent capture. She leaves Kiel on 2 May 1945.',
    code: 'NO 45',
  },
  {
    date: '5 May 1945',
    title: 'The Sinking',
    body: 'Just two days before VE Day, U-534 is intercepted by RAF Liberators from No. 86 Squadron in the Kattegat — the strait between Denmark and Sweden. Hit by depth charges, she sinks rapidly. Of the 52 crew, 49 survive.',
    code: 'KT 45',
  },
  {
    date: '1993',
    title: 'Recovery',
    body: 'After nearly five decades on the seabed, U-534 is discovered and raised in an extraordinary salvage operation. She is the only U-boat in the world ever to have been recovered after being sunk in combat — a fact that gives her unique historical value.',
    code: 'RC 93',
  },
  {
    date: '1996–2015',
    title: 'The U-Boat Story',
    body: 'U-534 is moved to Birkenhead and becomes the centrepiece of the U-Boat Story museum. She is carefully sectioned to allow visitors to walk inside her pressure hull, experiencing the claustrophobic reality of life aboard a wartime submarine.',
    code: 'BH 96',
  },
  {
    date: '2026',
    title: 'Battle of the Atlantic Story',
    body: 'U-534 is reinterpreted and integrated into the new Battle of the Atlantic Story museum at Woodside, Birkenhead — alongside the collection of personal artefacts, diaries, letters, and photographs recovered with her from the seabed, offering an unparalleled insight into the German perspective on the campaign.',
    code: 'BA 26',
  },
]

const specs = [
  { label: 'Type', value: 'IXC/40' },
  { label: 'Length', value: '76.76 m' },
  { label: 'Displacement', value: '1,144 tonnes' },
  { label: 'Top Speed (surface)', value: '18.3 knots' },
  { label: 'Top Speed (submerged)', value: '7.3 knots' },
  { label: 'Crew', value: '48–56 men' },
  { label: 'Torpedo tubes', value: '4 bow + 2 stern' },
  { label: 'Max depth', value: '230 m' },
]

export default function UBoatPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-end overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        {/* Naval chart grid */}
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />

        {/* Sonar rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none">
          <svg width="700" height="700" viewBox="0 0 700 700" aria-hidden="true">
            {[80, 160, 240, 320, 400, 480].map((r, i) => (
              <circle
                key={i}
                cx="350"
                cy="350"
                r={r}
                fill="none"
                stroke="#7ECECE"
                strokeWidth={i === 0 ? 1.5 : 1}
                opacity={0.1 - i * 0.012}
              />
            ))}
          </svg>
        </div>

        {/* Convoy diagonal */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0" aria-hidden="true">
            <line x1="-5%" y1="90%" x2="110%" y2="15%" stroke="#7ECECE" strokeWidth="0.5" opacity="0.06" strokeDasharray="8,16" />
          </svg>
        </div>

        {/* Submarine line drawing */}
        <div className="absolute left-0 right-0 bottom-32 flex justify-center pointer-events-none">
          <svg viewBox="0 0 700 160" width="80%" className="opacity-[0.06]" aria-hidden="true">
            <ellipse cx="350" cy="90" rx="300" ry="52" fill="none" stroke="#7ECECE" strokeWidth="2" />
            <rect x="285" y="34" width="90" height="56" rx="8" fill="none" stroke="#7ECECE" strokeWidth="2" />
            <rect x="323" y="14" width="10" height="24" fill="none" stroke="#7ECECE" strokeWidth="2" />
            <ellipse cx="55" cy="90" rx="30" ry="12" fill="none" stroke="#7ECECE" strokeWidth="1.5" />
            <rect x="620" y="84" width="50" height="10" rx="5" fill="none" stroke="#7ECECE" strokeWidth="1.5" />
            <rect x="620" y="100" width="50" height="10" rx="5" fill="none" stroke="#7ECECE" strokeWidth="1.5" />
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
              The Centrepiece
            </p>
            <h1
              className="font-montserrat font-black uppercase text-offwhite mb-8"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                letterSpacing: '0.08em',
                lineHeight: 1.0,
              }}
            >
              U-534<br />
              <span style={{ color: '#7ECECE', fontSize: '60%' }}>The Last U-Boat</span>
            </h1>
            <p
              className="font-montserrat text-xl max-w-2xl leading-relaxed"
              style={{ color: 'rgba(248, 244, 238, 0.8)' }}
            >
              {/* [PLACEHOLDER: U-534 hero strapline] */}
              One of only four surviving U-boats from World War II, and the only one ever raised from the seabed after being sunk in combat. U-534 is the extraordinary heart of the Battle of the Atlantic Story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: '#4A9B8E' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div>
                <h2
                  className="font-montserrat font-black uppercase mb-6"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    letterSpacing: '0.12em',
                    color: '#F8F4EE',
                  }}
                >
                  An Extraordinary Survivor
                </h2>
                <p
                  className="font-montserrat text-lg leading-relaxed mb-4"
                  style={{ color: 'rgba(248, 244, 238, 0.85)' }}
                >
                  {/* [PLACEHOLDER: Introduction paragraph 1] */}
                  U-534 was commissioned in December 1942 and joined the German Kriegsmarine under the command of Kapitänleutnant Herbert Nollau. As a Type IXC/40 ocean-going submarine, she was designed for long-range patrols across the full breadth of the Atlantic — capable of reaching the Caribbean and beyond.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed mb-4"
                  style={{ color: 'rgba(248, 244, 238, 0.85)' }}
                >
                  Unlike many of her counterparts, U-534 did not achieve any confirmed sinkings of Allied ships. By the time she became fully operational, the tide of the war had shifted. The Allies had developed devastating countermeasures: radar, the Leigh light, ASDIC, improved depth charges, and — crucially — the breaking of the Enigma codes. U-534's lack of success reflects this broader strategic reality.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed"
                  style={{ color: 'rgba(248, 244, 238, 0.85)' }}
                >
                  {/* [PLACEHOLDER: Introduction paragraph 3] */}
                  What makes U-534 unique among the four surviving U-boats worldwide is her fate: sunk on 5 May 1945 — just two days before Germany's surrender — and recovered from the seabed 48 years later in a remarkable engineering achievement. She is the only U-boat ever raised after being sunk in combat.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              {/* Technical specifications */}
              <div>
                <p
                  className="font-mono text-xs uppercase mb-6"
                  style={{ color: 'rgba(248, 244, 238, 0.5)', letterSpacing: '0.2em' }}
                >
                  Technical Specifications
                </p>
                <div className="space-y-0">
                  {specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className="flex items-center gap-4 py-3"
                      style={{
                        borderBottom: '1px solid rgba(248, 244, 238, 0.1)',
                      }}
                    >
                      <span
                        className="font-mono text-xs w-36 flex-shrink-0"
                        style={{ color: 'rgba(248, 244, 238, 0.5)', letterSpacing: '0.05em' }}
                      >
                        {spec.label}
                      </span>
                      <span
                        className="font-montserrat font-semibold text-sm"
                        style={{ color: '#F8F4EE' }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="mt-8 p-6" style={{ background: 'rgba(45, 79, 92, 0.4)' }}>
                  <p
                    className="font-mono text-base leading-relaxed"
                    style={{ color: '#F8F4EE' }}
                  >
                    <span className="quote-block">
                      "Every ship has a soul, a personality known by its crew."
                    </span>
                  </p>
                  <p
                    className="font-mono text-xs mt-3"
                    style={{ color: 'rgba(248, 244, 238, 0.5)', letterSpacing: '0.08em' }}
                  >
                    — Montserrat · {/* [PLACEHOLDER: quote attribution] */}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        {/* Naval grid */}
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />

        {/* Convoy diagonal lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0" aria-hidden="true">
            <line x1="-5%" y1="95%" x2="110%" y2="5%" stroke="#7ECECE" strokeWidth="0.5" opacity="0.05" strokeDasharray="10,20" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="mb-16">
              <p
                className="font-mono text-xs uppercase mb-3"
                style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
              >
                Timeline
              </p>
              <h2
                className="font-montserrat font-black uppercase"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  letterSpacing: '0.12em',
                  color: '#F8F4EE',
                }}
              >
                The Story of U-534
              </h2>
            </div>
          </ScrollReveal>

          {/* Timeline items */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(126, 206, 206, 0.3) 10%, rgba(126, 206, 206, 0.3) 90%, transparent)',
                transform: 'translateX(-50%)',
              }}
            />

            {timelineEvents.map((event, i) => (
              <ScrollReveal key={event.date} delay={i * 0.08}>
                <div
                  className={`relative flex flex-col lg:flex-row gap-8 mb-12 ${
                    i % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline node */}
                  <div
                    className="absolute left-0 lg:left-1/2 top-6 w-3 h-3 rounded-full border-2"
                    style={{
                      transform: 'translateX(-50%)',
                      borderColor: '#7ECECE',
                      background: '#2D4F5C',
                    }}
                  />

                  {/* Content card */}
                  <div
                    className={`ml-8 lg:ml-0 flex-1 ${
                      i % 2 === 0
                        ? 'lg:pr-16 lg:text-right'
                        : 'lg:pl-16 lg:text-left'
                    }`}
                    style={{ maxWidth: '46%' }}
                  >
                    <div
                      className="p-6 lg:p-8"
                      style={{ background: 'rgba(126, 206, 206, 0.05)', border: '1px solid rgba(126, 206, 206, 0.12)' }}
                    >
                      {/* Date + convoy code */}
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          i % 2 === 0 ? 'lg:justify-end' : 'justify-start'
                        }`}
                      >
                        <span
                          className="font-mono text-xs"
                          style={{ color: '#7ECECE', letterSpacing: '0.15em' }}
                        >
                          {event.date}
                        </span>
                        <span
                          className="font-mono text-xs px-2 py-0.5"
                          style={{ background: 'rgba(184, 92, 56, 0.3)', color: '#E07B45', letterSpacing: '0.1em' }}
                        >
                          {event.code}
                        </span>
                      </div>
                      <h3
                        className="font-montserrat font-black uppercase mb-3"
                        style={{
                          fontSize: '1.1rem',
                          letterSpacing: '0.1em',
                          color: '#F8F4EE',
                        }}
                      >
                        {event.title}
                      </h3>
                      <p
                        className="font-montserrat text-sm leading-relaxed"
                        style={{ color: 'rgba(248, 244, 238, 0.7)' }}
                      >
                        {/* [PLACEHOLDER: Timeline event detail] */}
                        {event.body}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SINKING ──────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: '#1A8080' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p
              className="font-mono text-xs uppercase mb-4"
              style={{ color: 'rgba(248, 244, 238, 0.5)', letterSpacing: '0.2em' }}
            >
              5 May 1945
            </p>
            <h2
              className="font-montserrat font-black uppercase mb-8"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                letterSpacing: '0.12em',
                color: '#F8F4EE',
              }}
            >
              The Final Battle
            </h2>
            <p
              className="font-montserrat text-lg leading-relaxed mb-6"
              style={{ color: 'rgba(248, 244, 238, 0.85)', maxWidth: 800, margin: '0 auto 24px' }}
            >
              {/* [PLACEHOLDER: Sinking narrative] */}
              On 5 May 1945 — two days before Germany's official surrender — U-534 was running on the surface in the Kattegat when she was spotted by aircraft of No. 86 Squadron RAF. Three Liberator bombers attacked with depth charges. The crew fought desperately to save their vessel, but U-534 was mortally wounded. She sank within hours.
            </p>
            <p
              className="font-montserrat text-lg leading-relaxed"
              style={{ color: 'rgba(248, 244, 238, 0.85)', maxWidth: 800, margin: '0 auto' }}
            >
              Of the 52 men aboard, 49 survived — testament to the crew's composure under fire. Three men were lost. The survivors were taken prisoner and the war, for them, was over. The submarine sank to a depth of 60 metres, where she would remain for nearly five decades.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── RECOVERY ─────────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <p
                  className="font-mono text-xs uppercase mb-4"
                  style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
                >
                  1993
                </p>
                <h2
                  className="font-montserrat font-black uppercase mb-6"
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    letterSpacing: '0.1em',
                    color: '#F8F4EE',
                  }}
                >
                  Raised From<br />the Deep
                </h2>
                <p
                  className="font-montserrat text-lg leading-relaxed mb-4"
                  style={{ color: 'rgba(248, 244, 238, 0.8)' }}
                >
                  {/* [PLACEHOLDER: Recovery narrative] */}
                  In 1993, nearly five decades after her sinking, U-534 was rediscovered and raised in a painstaking salvage operation. The recovery yielded an extraordinary collection of personal artefacts: letters home, diaries, photographs, personal effects — a deeply human record of life aboard a wartime U-boat.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed"
                  style={{ color: 'rgba(248, 244, 238, 0.8)' }}
                >
                  These items, preserved by the cold, dark waters of the Kattegat, now form the core of the U-534 collection — offering an unparalleled insight into the German perspective on the Battle of the Atlantic, and into the humanity of those who fought on both sides.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="space-y-4">
                {/* Recovery stats */}
                {[
                  { n: '48 years', l: 'on the seabed' },
                  { n: '60m', l: 'depth of recovery' },
                  { n: '49 / 52', l: 'crew survived' },
                  { n: '1993', l: 'year of recovery' },
                ].map((stat) => (
                  <div
                    key={stat.l}
                    className="flex items-center gap-6 p-5"
                    style={{ background: 'rgba(126, 206, 206, 0.06)', border: '1px solid rgba(126, 206, 206, 0.12)' }}
                  >
                    <span
                      className="font-montserrat font-black text-2xl flex-shrink-0"
                      style={{ color: '#7ECECE', minWidth: 80 }}
                    >
                      {stat.n}
                    </span>
                    <span
                      className="font-montserrat font-medium text-sm uppercase"
                      style={{ color: 'rgba(248, 244, 238, 0.6)', letterSpacing: '0.1em' }}
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

      {/* ── CTA ──────────────────────────────────────────────── */}
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
              Visit U-534 in Person
            </h2>
            <p
              className="font-montserrat text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(245, 236, 215, 0.85)' }}
            >
              {/* [PLACEHOLDER: Visit CTA copy] */}
              Opening Autumn 2026 at Woodside, Birkenhead. Register your interest today to be the first to hear about tickets and opening events.
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
                href="/memorial"
                className="font-montserrat font-bold text-sm uppercase px-8 py-4 border"
                style={{ borderColor: 'rgba(245,236,215,0.5)', color: '#F5ECD7', letterSpacing: '0.15em' }}
              >
                The Memorial →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
