import type { Metadata } from 'next'
import { Suspense } from 'react'
import AtlanticFooter from '@/components/atlantic/AtlanticFooter'
import WarChart from '@/components/atlantic/WarChart'
import aggregates from '@/data/atlantic-aggregates.json'

export const metadata: Metadata = {
  title: 'The U-Boat War, Charted | The Battle at Sea',
  description:
    'An interactive chart of the U-boat war, 1939–1945 — replay the Battle of the Atlantic month by month, track individual boats, highlight wolfpacks, and follow the guided story of the campaign.',
  alternates: {
    canonical: 'https://battleoftheatlantic.org/atlantic/visualiser',
  },
}

const fmt = (n: number) => n.toLocaleString('en-GB')

export default function VisualiserPage() {
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
            The Battle at Sea · Interactive Chart
          </p>
          <h1
            className="font-montserrat font-black uppercase text-offwhite mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.08em', lineHeight: 1.05 }}
          >
            The U-Boat War, <span style={{ color: '#7ECECE' }}>Charted</span>
          </h1>
          <p
            className="font-montserrat text-base max-w-3xl leading-relaxed"
            style={{ color: 'rgba(248,244,238,0.8)' }}
          >
            Every marker is a U-boat’s recorded final position — {fmt(aggregates.totals.plottable)} of
            the {fmt(aggregates.totals.uboats)} boats in the record. Drag the scrubber to replay the
            war month by month, track a single boat, light up a wolfpack, or follow the story
            chapter by chapter.
          </p>
        </div>
      </section>

      <section className="relative py-10 lg:py-14" style={{ backgroundColor: '#0d3040' }}>
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10">
          <Suspense fallback={null}>
            <WarChart />
          </Suspense>
        </div>
      </section>

      <AtlanticFooter />
    </>
  )
}
