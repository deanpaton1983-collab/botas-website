import type { Metadata } from 'next'
import { Suspense } from 'react'
import AtlanticFooter from '@/components/atlantic/AtlanticFooter'
import UBoatsBrowser from '@/components/atlantic/UBoatsBrowser'
import aggregates from '@/data/atlantic-aggregates.json'

export const metadata: Metadata = {
  title: 'U-Boat Database | The Battle at Sea',
  description:
    'Search all 1,153 German U-boats of the Second World War — types, commanders, wolfpacks, patrols and final fates, with each boat’s last recorded position charted.',
  alternates: {
    canonical: 'https://battleoftheatlantic.org/atlantic/u-boats',
  },
}

const fmt = (n: number) => n.toLocaleString('en-GB')

export default function UBoatsPage() {
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
            The Battle at Sea · Database 02
          </p>
          <h1
            className="font-montserrat font-black uppercase text-offwhite mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.08em', lineHeight: 1.05 }}
          >
            The <span style={{ color: '#7ECECE' }}>U-Boats</span>
          </h1>
          <p
            className="font-montserrat text-base max-w-3xl leading-relaxed"
            style={{ color: 'rgba(248,244,238,0.8)' }}
          >
            All {fmt(aggregates.totals.uboats)} U-boats of the Kriegsmarine in the record —
            who built them, who commanded them, which wolfpacks they sailed with, and how each
            boat’s war ended. {fmt(aggregates.totals.destroyedAtSea)} were destroyed at sea;
            {' '}{fmt(aggregates.totals.plottable)} have a final position that can be charted.
          </p>
        </div>
      </section>

      <section className="relative py-10 lg:py-14" style={{ backgroundColor: '#0d3040' }}>
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10">
          <Suspense fallback={null}>
            <UBoatsBrowser />
          </Suspense>
        </div>
      </section>

      <AtlanticFooter />
    </>
  )
}
