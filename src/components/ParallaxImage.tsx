'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
  caption?: string
  credit?: string
  aspectRatio?: string
  className?: string
  sizes?: string
  priority?: boolean
  /** parallax intensity, 0 disables */
  strength?: number
}

/**
 * An archival photograph with a gentle parallax drift on scroll,
 * a caption bar, and a subtle hover treatment. Real photos only -
 * designed for IWM / archive imagery.
 */
export default function ParallaxImage({
  src,
  alt,
  caption,
  credit,
  aspectRatio = '3/2',
  className = '',
  sizes = '(max-width: 1024px) 100vw, 50vw',
  priority = false,
  strength = 6,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <figure className={`group ${className}`}>
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ aspectRatio }}
      >
        <motion.div className="absolute" style={{ y, inset: `-${strength * 1.5}% 0` }}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            sizes={sizes}
          />
        </motion.div>
        {/* Archival vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(10,30,42,0.55) 0%, transparent 30%), radial-gradient(ellipse at center, transparent 55%, rgba(10,30,42,0.25) 100%)',
          }}
        />
        {(caption || credit) && (
          <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between gap-4">
            {caption && (
              <span
                className="font-montserrat font-semibold text-sm leading-snug"
                style={{ color: '#F8F4EE', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
              >
                {caption}
              </span>
            )}
            {credit && (
              <span
                className="font-mono flex-shrink-0"
                style={{ color: 'rgba(248,244,238,0.55)', fontSize: 10, letterSpacing: '0.08em' }}
              >
                {credit}
              </span>
            )}
          </figcaption>
        )}
      </div>
    </figure>
  )
}
