import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import AtlanticFooter from '@/components/atlantic/AtlanticFooter'
import aggregates from '@/data/atlantic-aggregates.json'

export const metadata: Metadata = {
  title: 'The Battle at Sea | Every Warship & U-Boat of the Atlantic Campaign',
  description:
    'Explore the Battle of the Atlantic through the records of 21,195 Allied warships and 1,153 German U-boats — searchable databases, wartime service histories, and an interactive map of the U-boat war.',
  openGraph: {
    title: 'The Battle at Sea | Battle of the Atlantic Story',
    description:
      'The complete campaign in data: every Allied warship, every U-boat, every recorded fate — searchable, mapped, and told month by month.',
    url: 'https://battleoftheatlantic.org/atlantic',
    type: 'website',
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/atlantic',
  },
}

const fmt = (n: number) => n.toLocaleString('en-GB')

const stats = [
  { n: fmt(aggregates.totals.warships), l: 'Allied warships on record' },
  { n: fmt(aggregates.totals.uboats), l: 'German U-boats on record' },
  { n: fmt(aggregates.totals.destroyedAtSea), l: 'U-boats destroyed at sea' },
  { n: fmt(aggregates.totals.alliedEvents), l: 'Wartime event records' },
  { n: fmt(aggregates.totals.wolfpacks), l: 'Wolfpack patrol groups' },
  { n: fmt(aggregates.totals.plottable), l: 'Final positions plotted' },
]

const sections = [
  {
    href: '/atlantic/warships',
    kicker: 'Database 01',
    title: 'Allied Warships',
    body: `Search the full Allied order of battle — ${fmt(
      aggregates.totals.warships,
    )} warships from ${
      Object.keys(aggregates.navy).length
    } navies, from fleet carriers to armed trawlers. ${fmt(
      aggregates.totals.shipsWithEvents,
    )} of them carry day-by-day wartime service histories.`,
    cta: 'Search the fleet',
  },
  {
    href: '/atlantic/u-boats',
    kicker: 'Database 02',
    title: 'The U-Boats',
    body: `Every one of the ${fmt(
      aggregates.totals.uboats,
    )} U-boats in the dataset — builders, commanders, patrols, successes and final fates, from commissioning to the last recorded position.`,
    cta: 'Search the boats',
  },
  {
    href: '/atlantic/visualiser',
    kicker: 'Interactive Map',
    title: 'The U-Boat War, Charted',
    body: `Replay the war month by month on an interactive chart of ${fmt(
      aggregates.totals.plottable,
    )} recorded final positions. Track a single boat, light up a wolfpack, or follow the guided story of the campaign from 1939 to 1945.`,
    cta: 'Open the chart',
  },
]

export default function AtlanticPage() {
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
            1939–1945 · The Complete Record
          </p>
          <h1
            className="font-montserrat font-black uppercase text-offwhite mb-6"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '0.08em',
              lineHeight: 1.05,
            }}
          >
            The Battle
            <br />
            <span style={{ color: '#7ECECE' }}>at Sea</span>
          </h1>
          <p
            className="font-montserrat text-lg max-w-2xl leading-relaxed"
            style={{ color: 'rgba(248, 244, 238, 0.8)' }}
          >
            The Battle of the Atlantic was fought by tens of thousands of
            vessels across six years of ocean. This is the campaign in data:
            every Allied warship, every U-boat, every recorded fate — drawn
            from the records of uboat.net and told ship by ship.
          </p>
        </div>
      </section>

      {/* ── HEADLINE FIGURES ─────────────────────────────────── */}
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
              The Campaign in Numbers · Computed from the Records
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((fact, i) => (
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

      {/* ── SECTION CARDS ────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {sections.map((s, i) => (
              <ScrollReveal key={s.href} delay={i * 0.08}>
                <Link
                  href={s.href}
                  className="group block h-full border p-8 transition-colors duration-300"
                  style={{
                    borderColor: 'rgba(126, 206, 206, 0.25)',
                    background: 'rgba(13, 48, 64, 0.45)',
                  }}
                >
                  <p
                    className="font-mono text-xs uppercase mb-4"
                    style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
                  >
                    {s.kicker}
                  </p>
                  <h2
                    className="font-montserrat font-extrabold uppercase mb-4 group-hover:text-teal-light transition-colors"
                    style={{
                      fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)',
                      letterSpacing: '0.08em',
                      color: '#F8F4EE',
                      lineHeight: 1.15,
                    }}
                  >
                    {s.title}
                  </h2>
                  <p
                    className="font-montserrat text-sm leading-relaxed mb-6"
                    style={{ color: 'rgba(248,244,238,0.75)' }}
                  >
                    {s.body}
                  </p>
                  <span
                    className="font-montserrat font-bold text-xs uppercase inline-block border px-5 py-2.5 transition-all duration-200 group-hover:bg-teal-light group-hover:text-slate-deep"
                    style={{
                      borderColor: '#7ECECE',
                      color: '#7ECECE',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {s.cta} →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* context strip */}
          <ScrollReveal delay={0.2}>
            <div
              className="mt-16 border-l-2 pl-6 max-w-3xl"
              style={{ borderColor: '#7ECECE' }}
            >
              <p
                className="font-montserrat text-base leading-relaxed"
                style={{ color: 'rgba(248,244,238,0.75)' }}
              >
                New to the history? Start with{' '}
                <Link
                  href="/history"
                  className="underline"
                  style={{ color: '#7ECECE' }}
                >
                  What Was the Battle of the Atlantic?
                </Link>{' '}
                — then come back and meet the ships that fought it.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AtlanticFooter />
    </>
  )
}
