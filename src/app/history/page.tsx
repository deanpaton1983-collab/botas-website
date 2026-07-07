import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'What Was the Battle of the Atlantic? | History, Facts & Timeline',
  description:
    'The Battle of the Atlantic (1939-1945) was the longest continuous military campaign of the Second World War. Learn what happened, why Liverpool and Birkenhead were central to it, key facts, and how the Allies defeated the U-boats.',
  openGraph: {
    title: 'What Was the Battle of the Atlantic? | Battle of the Atlantic Story',
    description:
      'The longest continuous campaign of the Second World War, explained - the convoys, the U-boats, Western Approaches Command in Liverpool, and the human cost.',
    url: 'https://battleoftheatlantic.org/history',
    type: 'article',
    images: [
      {
        url: '/images/Allied_convoy_underway_in_the_Atlantic_Ocean_near_Iceland,_circa_in_1942_(80-G-72409).jpg',
        width: 1200,
        height: 630,
        alt: 'An Allied convoy underway in the Atlantic Ocean near Iceland, 1942',
      },
    ],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/history',
  },
}

const keyFacts = [
  { n: '1939–1945', l: 'The full duration of the war' },
  { n: '3,500+', l: 'Allied merchant ships lost' },
  { n: '70,000+', l: 'Allied lives lost at sea' },
  { n: '783', l: 'U-boats destroyed' },
  { n: '28,000', l: 'German submariners lost' },
  { n: '2,000+', l: 'Ships in port on the Mersey at busy times' },
]

const sections: { heading: string; paragraphs: React.ReactNode[] }[] = [
  {
    heading: 'The Longest Campaign of the Second World War',
    paragraphs: [
      <>
        The Battle of the Atlantic was the struggle for control of the sea
        routes between North America and Britain. It began on the first day of
        the Second World War in September 1939, when the liner SS Athenia was
        torpedoed, and it did not end until the German surrender in May 1945 -
        making it the longest continuous military campaign of the entire war.
      </>,
      <>
        Britain depended on the sea for survival. Food, fuel, raw materials,
        weapons, and eventually the American and Canadian troops needed for the
        liberation of Europe all had to cross the Atlantic by ship. Germany's
        U-boat fleet set out to cut that lifeline. If the U-boats had won,
        Britain could have been starved out of the war - there would have been
        no D-Day and no Allied victory in western Europe. Winston Churchill
        later wrote that the U-boat peril was the only thing that ever really
        frightened him during the war.
      </>,
    ],
  },
  {
    heading: 'Convoys and Wolf Packs',
    paragraphs: [
      <>
        The Allied answer to the U-boat threat was the convoy system: merchant
        ships crossing in organised groups, escorted by warships and, where
        possible, aircraft. Convoys with codes such as HX, SC, ON, and SL
        criss-crossed the ocean throughout the war, often through mountainous
        seas and Arctic cold as well as under constant threat of attack.
      </>,
      <>
        Against them, German U-boats hunted in coordinated groups - the
        infamous &ldquo;wolf packs&rdquo; - directed by radio to converge on a
        convoy and attack at night on the surface. In the darkest months of
        1940-42, Allied shipping losses were catastrophic. The battle became a
        deadly technological race: radar, ASDIC (sonar), high-frequency
        direction finding (&ldquo;Huff-Duff&rdquo;), the Leigh Light, long-range
        aircraft, and the breaking of the German Enigma codes gradually swung
        the advantage to the Allies. In May 1943 - &ldquo;Black May&rdquo; for
        the U-boat arm - Germany lost 41 boats in a single month and withdrew
        from the North Atlantic convoy routes. The lifeline held.
      </>,
    ],
  },
  {
    heading: 'Why Liverpool and Birkenhead Were at the Heart of It',
    paragraphs: [
      <>
        From 1941, the entire campaign was directed from Liverpool. Western
        Approaches Command, based in an underground bunker at Derby House,
        controlled the routing and protection of every convoy in and out of
        Britain&rsquo;s north-western ports. Admiral Sir Max Horton,
        Commander-in-Chief Western Approaches, called Liverpool &ldquo;the
        lifeline of the Atlantic&rdquo;. The bunker survives today as the{' '}
        <a
          href="https://liverpoolwarmuseum.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: '#7ECECE' }}
        >
          Western Approaches Museum
        </a>
        , a short ferry ride from our own site.
      </>,
      <>
        The Mersey was the busiest convoy port in Britain: over a thousand
        convoys arrived or departed here during the war. Across the river from
        Liverpool, Birkenhead&rsquo;s Cammell Laird shipyard built and repaired
        the warships and merchant vessels that kept the Atlantic lifeline open,
        while the docks on both banks handled millions of tons of vital cargo.
        Merseyside paid a heavy price - the Blitz of May 1941 made it the most
        heavily bombed area of Britain outside London. It is on this waterfront,
        at Woodside in Birkenhead, that the{' '}
        <Link href="/museum" className="underline" style={{ color: '#7ECECE' }}>
          Battle of the Atlantic Story museum
        </Link>{' '}
        is being created.
      </>,
    ],
  },
  {
    heading: 'The Human Cost - On Both Sides',
    paragraphs: [
      <>
        More than 70,000 Allied sailors, merchant seamen, and airmen lost their
        lives in the Battle of the Atlantic, including over 30,000 men of the
        Merchant Navy - civilians who sailed into danger voyage after voyage.
        They came from every corner of the world: Britain, Canada, the United
        States, Norway, Greece, the Netherlands, India, West Africa, Yemen,
        Somalia, and beyond.
      </>,
      <>
        The cost to the attackers was even more severe in proportion. Of around
        40,000 men who served in the U-boat arm, some 28,000 - roughly seven in
        ten - did not survive the war. Our{' '}
        <Link href="/memorial" className="underline" style={{ color: '#7ECECE' }}>
          memorial
        </Link>{' '}
        remembers all who served and died in the Atlantic, on every side of the
        conflict.
      </>,
    ],
  },
  {
    heading: 'U-534: A Survivor of the Final Days',
    paragraphs: [
      <>
        The story of the battle is told at our museum through{' '}
        <Link href="/u-boat" className="underline" style={{ color: '#7ECECE' }}>
          U-534
        </Link>
        , a Type IXC/40 U-boat sunk by RAF aircraft in the Kattegat on 5 May
        1945 - two days before Germany&rsquo;s surrender - and raised from the
        seabed in 1993. She is the only U-boat ever recovered after being sunk
        in combat, and the letters, diaries, and personal belongings found
        aboard her give an unmatched insight into the lives of the young men
        who crewed the U-boats.
      </>,
    ],
  },
]

export default function HistoryPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative py-36 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none">
          <svg width="500" height="500" viewBox="0 0 500 500" aria-hidden="true">
            {[60, 120, 180, 240, 300, 360].map((r, i) => (
              <circle
                key={i}
                cx="250"
                cy="250"
                r={r}
                fill="none"
                stroke="#7ECECE"
                strokeWidth="1"
                opacity={0.08 - i * 0.01}
              />
            ))}
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-8">
          <p
            className="font-mono text-xs uppercase mb-4"
            style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
          >
            1939–1945 · The History
          </p>
          <h1
            className="font-montserrat font-black uppercase text-offwhite mb-6"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '0.08em',
              lineHeight: 1.05,
            }}
          >
            What Was the Battle
            <br />
            <span style={{ color: '#7ECECE' }}>of the Atlantic?</span>
          </h1>
          <p
            className="font-montserrat text-lg max-w-2xl leading-relaxed"
            style={{ color: 'rgba(248, 244, 238, 0.8)' }}
          >
            The six-year struggle for control of the Atlantic Ocean - the
            longest continuous military campaign of the Second World War, and
            the one on which every other Allied victory depended.
          </p>
        </div>
      </section>

      {/* ── KEY FACTS ────────────────────────────────────────── */}
      <section
        className="relative py-16 lg:py-20 overflow-hidden"
        style={{ backgroundColor: '#0d3040' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p
              className="font-mono text-xs uppercase mb-8 text-center"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              Battle of the Atlantic · Key Facts
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFacts.map((fact, i) => (
              <ScrollReveal key={fact.l} delay={i * 0.06}>
                <div
                  className="text-center py-6 px-4 border"
                  style={{
                    borderColor: 'rgba(126, 206, 206, 0.25)',
                    background: 'rgba(13,48,64,0.35)',
                  }}
                >
                  <span
                    className="font-montserrat font-black block mb-1"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                      color: '#7ECECE',
                    }}
                  >
                    {fact.n}
                  </span>
                  <p
                    className="font-montserrat font-medium text-xs uppercase"
                    style={{
                      color: 'rgba(248, 244, 238, 0.7)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {fact.l}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ─────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12">
          {sections.map((section, i) => (
            <ScrollReveal key={section.heading} delay={i * 0.04}>
              <div className="mb-14 lg:mb-16">
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
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="font-montserrat text-base lg:text-lg leading-relaxed mb-5 last:mb-0"
                    style={{ color: 'rgba(248,244,238,0.82)' }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        className="relative py-20 text-center overflow-hidden"
        style={{ backgroundColor: '#B85C38' }}
      >
        <div
          className="absolute inset-0 naval-grid-dashed pointer-events-none"
          style={{ opacity: 0.3 }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2
            className="font-montserrat font-black uppercase mb-6"
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              letterSpacing: '0.12em',
              color: '#F5ECD7',
            }}
          >
            Experience the Story in Person
          </h2>
          <p
            className="font-montserrat text-lg leading-relaxed mb-8"
            style={{ color: 'rgba(245, 236, 215, 0.85)' }}
          >
            The Battle of the Atlantic Story opens in 2027 at Woodside,
            Birkenhead - on the Mersey waterfront where the battle was fought,
            supplied, and won.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/museum"
              className="font-montserrat font-bold text-sm uppercase px-8 py-4"
              style={{
                background: '#F5ECD7',
                color: '#B85C38',
                letterSpacing: '0.15em',
              }}
            >
              Plan Your Visit
            </Link>
            <Link
              href="/u-boat"
              className="font-montserrat font-bold text-sm uppercase px-8 py-4 border"
              style={{
                borderColor: 'rgba(245,236,215,0.5)',
                color: '#F5ECD7',
                letterSpacing: '0.15em',
              }}
            >
              Discover U-534 →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
