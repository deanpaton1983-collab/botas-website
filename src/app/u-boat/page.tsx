'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import ParallaxImage from '@/components/ParallaxImage'
import AnimatedCounter from '@/components/AnimatedCounter'
import TypeIXCutaway from '@/components/TypeIXCutaway'

const timelineEvents = [
  {
    date: '23 December 1942',
    title: 'Commissioned',
    body: 'Built at the Deutsche Werft yard in Hamburg-Finkenwerder, U-534 is launched on 23 September 1942 and commissioned into the German Kriegsmarine three months later as a Type IXC/40 ocean-going submarine, under Kapitänleutnant Herbert Nollau.',
    code: 'KM 534',
  },
  {
    date: '1943–1944',
    title: 'Atlantic Patrols',
    body: 'U-534 undertakes patrols in the North Atlantic and Bay of Biscay, including long weeks as a weather-reporting boat. By this stage the tide of war has shifted dramatically: Allied anti-submarine technology - radar, Huff-Duff, ASDIC - has given the hunter-killers a decisive advantage. U-534 achieves no confirmed Allied ship sinkings.',
    code: 'BI 44',
  },
  {
    date: 'Early 1945',
    title: 'Last Voyage',
    body: 'As Germany\'s defeat becomes inevitable, U-534 is ordered north as part of Operation Regenbogen - a plan to scuttle the U-boat fleet to prevent capture. Freshly fitted with a Schnorchel and an enlarged flak battery, she leaves Kiel on 2 May 1945.',
    code: 'NO 45',
  },
  {
    date: '5 May 1945',
    title: 'The Sinking',
    body: 'Just two days before VE Day, U-534 is intercepted by RAF Liberators from No. 86 Squadron in the Kattegat - the strait between Denmark and Sweden. Her gunners shoot one aircraft down, but a direct hit from a depth charge sends her to the bottom. Of the 52 crew, 49 survive.',
    code: 'KT 45',
  },
  {
    date: '23 August 1993',
    title: 'Recovery',
    body: 'After nearly five decades on the seabed, U-534 is raised from 67 metres of water in an extraordinary salvage operation financed by Danish publisher Karsten Ree. She is the only U-boat in the world ever to have been recovered after being sunk in combat - a fact that gives her unique historical value.',
    code: 'RC 93',
  },
  {
    date: '1996–2015',
    title: 'The U-Boat Story',
    body: 'U-534 is moved to Birkenhead and becomes the centrepiece of the U-Boat Story museum. She is carefully sectioned to allow visitors to see inside her pressure hull, experiencing the claustrophobic reality of life aboard a wartime submarine.',
    code: 'BH 96',
  },
  {
    date: '2026',
    title: 'Battle of the Atlantic Story',
    body: 'U-534 is reinterpreted and integrated into the new Battle of the Atlantic Story museum at Woodside, Birkenhead - alongside the collection of personal artefacts, diaries, letters, and photographs recovered with her from the seabed, offering an unparalleled insight into the German perspective on the campaign.',
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
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden"
        style={{ backgroundColor: '#0d3040' }}
      >
        {/* Archival photograph background with parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="/images/U-boat_Warfare_1939-1945_C3780.jpg"
            alt="A German U-boat running on the surface during the Second World War"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center 40%' }}
            sizes="100vw"
          />
          {/* Heavy cinematic grade so the low-res archive image reads as atmosphere */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(13,48,64,0.75) 0%, rgba(13,48,64,0.55) 40%, rgba(10,30,42,0.92) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(26,128,128,0.18)', mixBlendMode: 'color' }}
          />
        </motion.div>

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

        {/* Page content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24 w-full"
          style={{ opacity: heroOpacity }}
        >
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
                textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              }}
            >
              U-534<br />
              <span style={{ color: '#7ECECE', fontSize: '60%' }}>The Last U-Boat</span>
            </h1>
            <p
              className="font-montserrat text-xl max-w-2xl leading-relaxed"
              style={{ color: 'rgba(248, 244, 238, 0.85)' }}
            >
              One of only four surviving U-boats from World War II, and the only one ever raised from the seabed after being sunk in combat. U-534 is the extraordinary heart of the Battle of the Atlantic Story.
            </p>
            <p
              className="font-mono text-xs mt-8"
              style={{ color: 'rgba(248,244,238,0.4)', letterSpacing: '0.08em' }}
            >
              Background: a German U-boat at sea, 1939–45 · © IWM C 3780
            </p>
          </motion.div>
        </motion.div>
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
                  U-534 was built at the Deutsche Werft shipyard in Hamburg, launched in September 1942, and commissioned that December under the command of Kapitänleutnant Herbert Nollau. As a Type IXC/40 ocean-going submarine, she was designed for long-range patrols across the full breadth of the Atlantic - capable of reaching the Caribbean and beyond without refuelling.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed mb-4"
                  style={{ color: 'rgba(248, 244, 238, 0.85)' }}
                >
                  Unlike many of her counterparts, U-534 did not achieve any confirmed sinkings of Allied ships. By the time she became fully operational, the tide of the war had shifted. The Allies had developed devastating countermeasures: radar, the Leigh light, ASDIC, improved depth charges, and - crucially - the breaking of the Enigma codes. U-534's lack of success reflects this broader strategic reality.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed"
                  style={{ color: 'rgba(248, 244, 238, 0.85)' }}
                >
                  What makes U-534 unique among the four surviving U-boats worldwide is her fate: sunk on 5 May 1945 - just two days before Germany's surrender - and recovered from the seabed 48 years later in a remarkable engineering achievement. She is the only U-boat ever raised after being sunk in combat.
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
                  {specs.map((spec) => (
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

                {/* The hunters - archival image */}
                <div className="mt-8">
                  <ParallaxImage
                    src="/images/Vickers_Wellington_Leigh_Light.jpg"
                    alt="A Vickers Wellington bomber fitted with a Leigh Light for hunting surfaced U-boats at night"
                    caption="The hunters: a Leigh Light-equipped RAF Wellington"
                    credit="© IWM"
                    aspectRatio="500/215"
                    strength={4}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <p
                    className="font-montserrat text-sm mt-3 leading-relaxed"
                    style={{ color: 'rgba(248,244,238,0.6)' }}
                  >
                    Aircraft like this stripped U-boats of the cover of darkness - the same Allied air power that would eventually catch U-534 on the surface.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE TYPE IXC CUTAWAY ─────────────────────── */}
      <section
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ backgroundColor: '#0d1f35' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" style={{ opacity: 0.5 }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p
                className="font-mono text-xs uppercase mb-3"
                style={{ color: '#E07B45', letterSpacing: '0.2em' }}
              >
                Interactive Plan
              </p>
              <h2
                className="font-montserrat font-black uppercase mb-6"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  letterSpacing: '0.12em',
                  color: '#F8F4EE',
                }}
              >
                Inside a Type IXC
              </h2>
              <p
                className="font-montserrat text-lg leading-relaxed"
                style={{ color: 'rgba(248,244,238,0.75)' }}
              >
                U-534 packed around fifty men, six torpedo tubes, two diesel engines and enough fuel to cross the Atlantic twice into a steel tube less than seven metres wide. Select any compartment on the plan below - or tap the numbered markers - to discover what happened in every part of the boat, from the torpedo rooms to the galley.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <TypeIXCutaway />
          </ScrollReveal>
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
              <ScrollReveal key={event.date} delay={i * 0.08} direction={i % 2 === 0 ? 'left' : 'right'}>
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
                      className="p-6 lg:p-8 transition-colors duration-300 hover:border-teal-light/40"
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <p
                  className="font-mono text-xs uppercase mb-4"
                  style={{ color: 'rgba(248, 244, 238, 0.5)', letterSpacing: '0.2em' }}
                >
                  5 May 1945 · The Kattegat, 20 km north-east of Anholt
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
                  style={{ color: 'rgba(248, 244, 238, 0.85)' }}
                >
                  On 5 May 1945 - two days before Germany's official surrender - U-534 was running on the surface in the Kattegat, in company with two Type XXI U-boats, when Liberator bombers of No. 86 Squadron RAF attacked. Her gunners fought back, shooting one of the Liberators down, and nine depth charges fell wide. Then a single depth charge struck home near the stern. Mortally wounded, U-534 sank fast.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed"
                  style={{ color: 'rgba(248, 244, 238, 0.85)' }}
                >
                  All 52 men aboard escaped the sinking boat - five of them trapped inside, who waited until she settled on the seabed 67 metres down and then swam free through the torpedo loading hatch. Three men did not survive the freezing water. The 49 survivors were rescued, and the war, for them, was over.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-6">
                <ParallaxImage
                  src="/images/U507_under_attack_1943.jpg"
                  alt="A German U-boat under aerial attack, photographed from an Allied aircraft"
                  caption="A U-boat under air attack - the fate that met U-534"
                  credit="US Navy, 1943"
                  aspectRatio="561/440"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <ParallaxImage
                  src="/images/Depth_charges_explode_astern_of_HMS_STARLING_of_the_2nd_Escort_Group_in_the_Atlantic,_January_1944._A21992.jpg"
                  alt="Depth charges exploding astern of HMS Starling of the 2nd Escort Group in the Atlantic, January 1944"
                  caption="Depth charges explode astern of HMS Starling, 1944"
                  credit="© IWM A 21992"
                  aspectRatio="16/10"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </ScrollReveal>
          </div>
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
                  23 August 1993
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
                  In 1993, nearly five decades after her sinking, U-534 was raised from the seabed of the Kattegat in a painstaking salvage operation financed by the Danish publisher Karsten Ree - drawn by rumours of what her hull might contain. The recovery yielded an extraordinary collection of personal artefacts: letters home, diaries, photographs, board games, even a cocktail shaker - a deeply human record of life aboard a wartime U-boat.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed mb-4"
                  style={{ color: 'rgba(248, 244, 238, 0.8)' }}
                >
                  Sixteen torpedoes were recovered with her, including at least three advanced T11 acoustic homing torpedoes - among the most sophisticated weapons of the war. One has been restored and will be displayed alongside the boat.
                </p>
                <p
                  className="font-montserrat text-lg leading-relaxed"
                  style={{ color: 'rgba(248, 244, 238, 0.8)' }}
                >
                  These items, preserved by the cold, dark waters of the Kattegat, now form the core of the U-534 collection - offering an unparalleled insight into the German perspective on the Battle of the Atlantic, and into the humanity of those who fought on both sides. For transport to her new home at Woodside, the boat was carefully cut into five sections, two of which were later re-joined - opening up cross-sections of the hull that let visitors see directly into the world of her crew.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="space-y-4">
                {/* Recovery stats */}
                {[
                  { n: '48 years', l: 'on the seabed' },
                  { n: '67m', l: 'depth of recovery' },
                  { n: '49 / 52', l: 'crew survived' },
                  { n: '16', l: 'torpedoes recovered' },
                ].map((stat) => (
                  <div
                    key={stat.l}
                    className="flex items-center gap-6 p-5 transition-colors duration-300 hover:bg-teal-light/10"
                    style={{ background: 'rgba(126, 206, 206, 0.06)', border: '1px solid rgba(126, 206, 206, 0.12)' }}
                  >
                    <AnimatedCounter
                      value={stat.n}
                      className="font-montserrat font-black text-2xl flex-shrink-0"
                      style={{ color: '#7ECECE', minWidth: 96, display: 'inline-block' }}
                    />
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
              Opening in 2027 at Woodside, Birkenhead. Register your interest today to be the first to hear about tickets and opening events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="font-montserrat font-bold text-sm uppercase px-8 py-4 transition-opacity duration-200 hover:opacity-90"
                style={{ background: '#F5ECD7', color: '#B85C38', letterSpacing: '0.15em' }}
              >
                Register Interest
              </Link>
              <Link
                href="/history"
                className="font-montserrat font-bold text-sm uppercase px-8 py-4 border transition-colors duration-200 hover:bg-sand hover:text-orange-burnt"
                style={{ borderColor: 'rgba(245,236,215,0.5)', color: '#F5ECD7', letterSpacing: '0.15em' }}
              >
                The Battle of the Atlantic →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
