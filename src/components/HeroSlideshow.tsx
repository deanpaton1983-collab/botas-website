'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/* Dynamic hero background — iconic archival images crossfading
   with a slow alternating Ken Burns drift. */

const SLIDES = [
  {
    src: '/images/Allied_convoy_underway_in_the_Atlantic_Ocean_near_Iceland,_circa_in_1942_(80-G-72409).jpg',
    alt: 'Allied convoy underway in the Atlantic near Iceland, 1942',
  },
  {
    src: '/images/U-boat_Warfare_1939-1945_C3780.jpg',
    alt: 'A U-boat at sea during the Second World War',
  },
  {
    src: '/images/Leaning_against_a_depth_charge_thrower,_the_quarterdeck_lookout_on_board_HMS_VISCOUNT_searches_the_sea_for_submarines,_1942._A13362.jpg',
    alt: 'Lookout on HMS Viscount searching the sea for submarines, 1942',
  },
  {
    src: '/images/Convoy_WS-12_en_route_to_Cape_Town,_1941.jpg',
    alt: 'Convoy WS-12 en route to Cape Town, 1941',
  },
]

const SLIDE_MS = 6000

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {SLIDES.map((slide, i) => {
        const active = i === index
        const zoomIn = i % 2 === 0
        return (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            style={{ zIndex: active ? 1 : 0 }}
          >
            <motion.img
              src={slide.src}
              alt=""
              className="h-full w-full object-cover"
              style={{
                filter: 'grayscale(0.35) contrast(1.05) brightness(0.6)',
              }}
              initial={false}
              animate={{
                scale: active ? (zoomIn ? 1.16 : 1.06) : zoomIn ? 1.06 : 1.16,
                x: active ? (zoomIn ? '1.5%' : '-1.5%') : '0%',
              }}
              transition={{ duration: SLIDE_MS / 1000 + 2, ease: 'linear' }}
            />
          </motion.div>
        )
      })}

      {/* Navy/teal duotone wash to sit the photos in the brand palette */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(160deg, rgba(10,37,53,0.65) 0%, rgba(13,48,64,0.45) 45%, rgba(26,128,128,0.28) 100%)',
        }}
      />
    </div>
  )
}
