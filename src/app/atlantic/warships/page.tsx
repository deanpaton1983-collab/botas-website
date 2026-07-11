import type { Metadata } from 'next'
import { Suspense } from 'react'
import AtlanticFooter from '@/components/atlantic/AtlanticFooter'
import WarshipsBrowser from '@/components/atlantic/WarshipsBrowser'
import aggregates from '@/data/atlantic-aggregates.json'

export const metadata: Metadata = {
  title: 'Allied Warships Database | The Battle at Sea',
  description:
    'Search 21,195 Allied warships of the Second World War — every navy, class and pennant, with commanders, build histories and day-by-day wartime event records from uboat.net.',
  alternates: {
    canonical: 'https://battleoftheatlantic.org/atlantic/warships',
  },
}

const fmt = (n: number) => n.toLocaleString('en-GB')

export default function WarshipsPage() {
  return (
    <>
      <section
        className="relative pt-32 pb-12 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p
            className="font-mono text-xs uppercase mb-3"
            style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
          >
            The Battle at Sea · Database 01
          </p>
          <h1
            className="font-montserrat font-black uppercase text-offwhite mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.08em', lineHeight: 1.05 }}
          >
            Allied <span style={{ color: '#7ECECE' }}>Warships</span>
          </h1>
          <p
            className="font-montserrat text-base max-w-3xl leading-relaxed"
            style={{ color: 'rgba(248,244,238,0.8)' }}
          >
            The Allied order of battle, ship by ship — {fmt(aggregates.totals.warships)} vessels
            across {Object.keys(aggregates.navy).length} navies, from battleships and escort
            carriers to the corvettes and trawlers that shepherded the convoys.{' '}
            {fmt(aggregates.totals.shipsWithEvents)} ships carry full wartime event histories,
            {' '}{fmt(aggregates.totals.alliedEvents)} records in all.
          </p>
        </div>
      </section>

      <section className="relative py-10 lg:py-14" style={{ backgroundColor: '#0d3040' }}>
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10">
          <Suspense fallback={null}>
            <WarshipsBrowser />
          </Suspense>
        </div>
      </section>

      <AtlanticFooter />
    </>
  )
}
