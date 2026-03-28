'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

// Placeholder roll of honour names
// [PLACEHOLDER: Replace with actual names from historical records]
const rollOfHonour = [
  { name: 'Able Seaman James Hartley', ship: 'SS Empire Gale', date: 'November 1942', nationality: 'British' },
  { name: 'Merchant Seaman David O\'Brien', ship: 'MV Silvercedar', date: 'March 1943', nationality: 'British' },
  { name: 'Leading Seaman Thomas Blackwood', ship: 'HMS Veteran', date: 'September 1942', nationality: 'British' },
  { name: 'Kapitänleutnant Werner Vogel', ship: 'U-223', date: 'April 1944', nationality: 'German' },
  { name: 'Able Seaman Kofi Mensah', ship: 'SS Benlomond', date: 'November 1942', nationality: 'Gold Coast' },
  { name: 'Lieutenant Commander Patrick Forde', ship: 'HMS Gladiolus', date: 'October 1941', nationality: 'British' },
  { name: 'Mechaniker Heinz Brandt', ship: 'U-534', date: 'May 1945', nationality: 'German' },
  { name: 'Chief Engineer Samuel Clarke', ship: 'SS Dorset', date: 'August 1942', nationality: 'British' },
  { name: 'Bootsmann Karl Fischer', ship: 'U-402', date: 'October 1943', nationality: 'German' },
  { name: 'Merchant Seaman Ali Mohammed', ship: 'SS Baron Kinnaird', date: 'September 1942', nationality: 'Yemeni' },
  { name: 'Sub-Lieutenant Geoffrey Marsh', ship: 'HMS Harvester', date: 'March 1943', nationality: 'British' },
  { name: 'Stoker 1st Class Patrick Flynn', ship: 'HMS Exmoor', date: 'February 1941', nationality: 'Irish' },
  { name: 'Matrose Hans-Georg Ullrich', ship: 'U-175', date: 'April 1943', nationality: 'German' },
  { name: 'Able Seaman Pedro Rodrigues', ship: 'MV Dunedin Star', date: 'November 1942', nationality: 'Portuguese' },
  { name: 'Petty Officer William Armstrong', ship: 'HMS Laconia', date: 'September 1942', nationality: 'British' },
  { name: 'Flight Sergeant Arthur Donnelly', ship: 'No. 86 Squadron RAF', date: 'March 1943', nationality: 'Canadian' },
  { name: 'Leutnant zur See Friedrich Haupt', ship: 'U-521', date: 'June 1943', nationality: 'German' },
  { name: 'Radio Officer John Bain', ship: 'SS Harbury', date: 'November 1942', nationality: 'British' },
  { name: 'Donkeyman Hussein Ali', ship: 'SS Baron Ogilvy', date: 'March 1943', nationality: 'Somali' },
  { name: 'Chief Petty Officer Robert MacLeod', ship: 'HMS Forfar', date: 'December 1940', nationality: 'Scottish' },
  { name: 'Maschinenmaat Ernst Weber', ship: 'U-99', date: 'March 1941', nationality: 'German' },
  { name: 'Able Seaman George Mensah', ship: 'SS Elmwood', date: 'April 1943', nationality: 'British' },
  { name: 'Deck Officer Harold Prescott', ship: 'MV Cape Breton', date: 'July 1942', nationality: 'Canadian' },
  { name: 'Oberleutnant Horst Dieterich', ship: 'U-663', date: 'May 1943', nationality: 'German' },
]

const memorialFacts = [
  { number: '36,200', label: 'Merchant Navy dead', note: 'All nationalities' },
  { number: '28,000', label: 'U-boat crew dead', note: 'Of 40,000 who served' },
  { number: '2,000+', label: 'Allied warships lost' },
  { number: '175', label: 'Nations represented', note: 'Among the Allied merchant crew' },
]

const testimonials = [
  {
    text: '"In 1942, at just seventeen, I lied about my age to join the Royal Navy. I couldn\'t have known then that I\'d find myself crossing the Atlantic again and again."',
    attribution: 'John Dennett · Royal Navy Veteran',
  },
  {
    text: '"The ocean holds many secrets, both beautiful and terrifying. We knew they were out there — we just never knew exactly where."',
    attribution: '// [PLACEHOLDER: Veteran attribution]',
  },
  {
    text: '"Every ship has a soul, a personality known by its crew. When she went down, a part of all of us went with her."',
    attribution: '// [PLACEHOLDER: Merchant seaman attribution]',
  },
]

export default function MemorialPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-end overflow-hidden"
        style={{ backgroundColor: '#F5ECD7' }}
      >
        {/* Sonar rings – cream/terracotta palette */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none">
          <svg width="700" height="700" viewBox="0 0 700 700" aria-hidden="true">
            {[80, 160, 240, 320, 400, 480].map((r, i) => (
              <circle
                key={i}
                cx="350"
                cy="350"
                r={r}
                fill="none"
                stroke="#B85C38"
                strokeWidth={i === 0 ? 1.5 : 1}
                opacity={0.07 - i * 0.008}
              />
            ))}
          </svg>
        </div>

        {/* Convoy diagonal line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0" aria-hidden="true">
            <line x1="-5%" y1="90%" x2="110%" y2="15%" stroke="#B85C38" strokeWidth="0.5" opacity="0.06" strokeDasharray="8,16" />
          </svg>
        </div>

        {/* Memorial wall motif – horizontal faint text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <p
            className="font-montserrat font-black uppercase whitespace-nowrap"
            style={{
              fontSize: 'clamp(8rem, 25vw, 20rem)',
              color: '#B85C38',
              opacity: 0.04,
              letterSpacing: '0.05em',
            }}
          >
            IN MEMORIAM
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p
              className="font-mono text-xs uppercase mb-4"
              style={{ color: '#B85C38', letterSpacing: '0.2em', opacity: 0.7 }}
            >
              Battle of the Atlantic Memorial
            </p>
            <h1
              className="font-montserrat font-black uppercase mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                letterSpacing: '0.08em',
                lineHeight: 1.0,
                color: '#2D4F5C',
              }}
            >
              In<br />
              <span style={{ color: '#1A8080' }}>Memoriam</span>
            </h1>
            <p
              className="font-montserrat text-xl max-w-2xl leading-relaxed"
              style={{ color: 'rgba(45, 79, 92, 0.75)' }}
            >
              {/* [PLACEHOLDER: Memorial hero strapline] */}
              Dedicated to all who served and died in the Battle of the Atlantic — Royal Navy, Merchant Navy, Allied air forces, and German Kriegsmarine. Their sacrifice determined the outcome of the Second World War.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FACTS ────────────────────────────────────────────── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {memorialFacts.map((fact, i) => (
              <ScrollReveal key={fact.label} delay={i * 0.1}>
                <div
                  className="py-10 px-6 text-center"
                  style={{ background: 'rgba(126, 206, 206, 0.05)', border: '1px solid rgba(126, 206, 206, 0.15)' }}
                >
                  <p
                    className="font-montserrat font-black mb-1"
                    style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#7ECECE' }}
                  >
                    {fact.number}
                  </p>
                  <p
                    className="font-montserrat font-semibold text-xs uppercase mb-1"
                    style={{ color: 'rgba(248,244,238,0.7)', letterSpacing: '0.1em' }}
                  >
                    {fact.label}
                  </p>
                  {fact.note && (
                    <p
                      className="font-mono text-xs"
                      style={{ color: 'rgba(248,244,238,0.35)', letterSpacing: '0.05em' }}
                    >
                      {fact.note}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMORIAL WALL ────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: '#F8F4EE' }}
      >
        {/* Sonar rings */}
        <div className="absolute left-0 bottom-0 -translate-x-1/3 translate-y-1/4 pointer-events-none">
          <svg width="500" height="500" viewBox="0 0 500 500" aria-hidden="true">
            {[60, 120, 180, 240, 300].map((r, i) => (
              <circle key={i} cx="250" cy="250" r={r} fill="none" stroke="#1A8080" strokeWidth="1" opacity={0.06 - i * 0.008} />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <p
                className="font-mono text-xs uppercase mb-3"
                style={{ color: '#B85C38', letterSpacing: '0.2em' }}
              >
                Emma Rodgers · Sculptor
              </p>
              <h2
                className="font-montserrat font-black uppercase mb-4"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  letterSpacing: '0.1em',
                  color: '#2D4F5C',
                }}
              >
                The Memorial Wall
              </h2>
              <p
                className="font-montserrat text-lg leading-relaxed"
                style={{ color: 'rgba(45, 79, 92, 0.75)' }}
              >
                {/* [PLACEHOLDER: Memorial wall description] */}
                An external memorial wall, a bronze work by acclaimed Liverpool sculptor Emma Rodgers, will be created at the entrance to the museum. Executed in traditional sand-cast bronze alloy — 85% copper, 15% tin and zinc — it will bear the names of those who gave their lives in the Battle of the Atlantic, and will develop the characteristic verdigris patina of historic monuments over time.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p
                  className="font-montserrat text-lg leading-relaxed mb-6"
                  style={{ color: 'rgba(45, 79, 92, 0.75)' }}
                >
                  {/* [PLACEHOLDER: Memorial wall continued] */}
                  Emma Rodgers is recognised as one of Britain's leading sculptors — winner of the prestigious Victoria & Albert Museum Prize, with work held in National Museums Liverpool and celebrated public commissions including the Cilla Black memorial at Liverpool's Cavern Club and the world's largest Liver Bird sculpture.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed"
                  style={{ color: 'rgba(45, 79, 92, 0.75)' }}
                >
                  The prominent entrance placement, monumental scale, and artistic heritage of Emma Rodgers' bronze work creates a fitting memorial to all who fought in the longest campaign of the Second World War — Allied and German alike.
                </p>
              </div>
              {/* Memorial wall render placeholder */}
              <div
                className="relative overflow-hidden"
                style={{ background: '#E07B45', aspectRatio: '4/3' }}
              >
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                  <svg width="100%" height="100%" className="absolute inset-0 opacity-10" viewBox="0 0 400 300" aria-hidden="true">
                    {/* Abstract waves pattern representing the wall */}
                    {[0,1,2,3,4,5].map((i) => (
                      <path
                        key={i}
                        d={`M ${i * 80 - 40} 0 C ${i * 80 + 20} ${50 + i * 30} ${i * 80 + 60} ${100 + i * 20} ${i * 80 + 40} 300`}
                        fill="none"
                        stroke="#F5ECD7"
                        strokeWidth="1.5"
                        opacity="0.4"
                      />
                    ))}
                  </svg>
                  <p
                    className="font-montserrat font-black uppercase text-sand"
                    style={{ fontSize: 10, letterSpacing: '0.2em', opacity: 0.8 }}
                  >
                    THE BATTLE OF THE ATLANTIC
                  </p>
                  <p
                    className="font-mono text-xs text-sand mt-1"
                    style={{ opacity: 0.6, letterSpacing: '0.08em' }}
                  >
                    Memorial Wall · Artist impression
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2
              className="font-montserrat font-black uppercase mb-12 text-center"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                letterSpacing: '0.15em',
                color: '#F8F4EE',
              }}
            >
              Voices of the Atlantic
            </h2>
          </ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div
                  className="p-8 h-full flex flex-col"
                  style={{ background: 'rgba(126, 206, 206, 0.05)', border: '1px solid rgba(126, 206, 206, 0.12)' }}
                >
                  <blockquote className="flex-1">
                    <p
                      className="font-mono text-sm leading-loose mb-4"
                      style={{ color: '#F8F4EE' }}
                    >
                      <span className="quote-block quote-block-teal">
                        {t.text}
                      </span>
                    </p>
                  </blockquote>
                  <cite
                    className="font-mono text-xs not-italic mt-auto pt-4"
                    style={{
                      color: 'rgba(248,244,238,0.5)',
                      letterSpacing: '0.08em',
                      borderTop: '1px solid rgba(126,206,206,0.15)',
                    }}
                  >
                    — {t.attribution}
                  </cite>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLL OF HONOUR ───────────────────────────────────── */}
      <section
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ backgroundColor: '#F5ECD7' }}
      >
        {/* Sonar rings */}
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/4 pointer-events-none">
          <svg width="500" height="500" viewBox="0 0 500 500" aria-hidden="true">
            {[60, 120, 180, 240, 300].map((r, i) => (
              <circle key={i} cx="250" cy="250" r={r} fill="none" stroke="#1A8080" strokeWidth="1" opacity={0.06 - i * 0.008} />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="mb-12">
              <p
                className="font-mono text-xs uppercase mb-3"
                style={{ color: '#B85C38', letterSpacing: '0.2em' }}
              >
                {/* [PLACEHOLDER: This is a representative selection] */}
                A Representative Roll of Honour
              </p>
              <h2
                className="font-montserrat font-black uppercase mb-4"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  letterSpacing: '0.1em',
                  color: '#2D4F5C',
                }}
              >
                Those Who Gave Their Lives
              </h2>
              <p
                className="font-montserrat text-base leading-relaxed max-w-2xl"
                style={{ color: 'rgba(45, 79, 92, 0.7)' }}
              >
                {/* [PLACEHOLDER: Roll of honour introduction] */}
                The following is a representative selection from among the tens of thousands who died in the Battle of the Atlantic. They came from every corner of the globe: British, Canadian, American, Dutch, Norwegian, Greek, Yemeni, Somali, West African, German. The full Roll of Honour will be published at the museum's opening.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid of names */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {rollOfHonour.map((person, i) => (
              <ScrollReveal key={i} delay={(i % 6) * 0.05}>
                <div
                  className="py-4 px-4"
                  style={{
                    borderBottom: '1px solid rgba(45, 79, 92, 0.12)',
                    borderRight: (i % 3 !== 2) ? '1px solid rgba(45, 79, 92, 0.08)' : 'none',
                  }}
                >
                  <p
                    className="font-montserrat font-semibold text-sm mb-0.5"
                    style={{ color: '#2D4F5C' }}
                  >
                    {person.name}
                  </p>
                  <p
                    className="font-mono text-xs mb-0.5"
                    style={{ color: '#B85C38', letterSpacing: '0.05em' }}
                  >
                    {person.ship}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs"
                      style={{ color: 'rgba(45, 79, 92, 0.5)', letterSpacing: '0.05em' }}
                    >
                      {person.date}
                    </span>
                    <span
                      className="font-mono text-xs px-1.5 py-0.5"
                      style={{ background: 'rgba(26, 128, 128, 0.12)', color: '#1A8080', fontSize: 9, letterSpacing: '0.08em' }}
                    >
                      {person.nationality}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div
              className="mt-8 p-6 text-center"
              style={{ background: 'rgba(45, 79, 92, 0.06)', border: '1px solid rgba(45, 79, 92, 0.12)' }}
            >
              <p
                className="font-mono text-xs"
                style={{ color: 'rgba(45, 79, 92, 0.55)', letterSpacing: '0.08em' }}
              >
                {/* [PLACEHOLDER] */}
                This is a representative selection. The complete Roll of Honour — including all known casualties from all nations — will be published at the museum's opening in Autumn 2026.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── REFLECTIVE QUOTE ─────────────────────────────────── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: '#1A8080' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <blockquote>
              <p
                className="font-mono text-xl lg:text-2xl leading-loose mb-4"
                style={{ color: '#F8F4EE' }}
              >
                <span className="quote-block quote-block-teal">
                  "This museum is more than a memorial. It's a call for understanding, a testament to peace, and a tribute to those who never came home."
                </span>
              </p>
              <cite
                className="font-mono text-sm not-italic"
                style={{ color: 'rgba(248,244,238,0.6)', letterSpacing: '0.05em' }}
              >
                {/* [PLACEHOLDER: Attribution] */}
                — John Dennett · Royal Navy Veteran
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SUPPORT ──────────────────────────────────────────── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p
              className="font-mono text-xs uppercase mb-4"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              Support the Memorial
            </p>
            <h2
              className="font-montserrat font-black uppercase mb-6"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                letterSpacing: '0.12em',
                color: '#F8F4EE',
              }}
            >
              Help Us Honour Their Memory
            </h2>
            <p
              className="font-montserrat text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(248,244,238,0.8)' }}
            >
              {/* [PLACEHOLDER: Donation/support copy] */}
              The Battle of the Atlantic Story is a registered charity. Your support helps us build and maintain this permanent memorial to all who served and sacrificed in the longest campaign of the Second World War.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="font-montserrat font-bold text-sm uppercase px-8 py-4 transition-all duration-200"
                style={{ background: '#7ECECE', color: '#2D4F5C', letterSpacing: '0.15em' }}
              >
                Get Involved
              </Link>
              <Link
                href="/u-boat"
                className="font-montserrat font-bold text-sm uppercase px-8 py-4 border transition-all duration-200"
                style={{ borderColor: 'rgba(248,244,238,0.3)', color: '#F8F4EE', letterSpacing: '0.15em' }}
              >
                Discover U-534 →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
