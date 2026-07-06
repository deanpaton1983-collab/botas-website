'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: string // e.g. "3,500+", "70,000+", "6 years", "49 / 52"
  duration?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Animates the first number found in `value` from 0 up to its target
 * when scrolled into view, preserving any prefix/suffix (+, %, "years", etc.)
 */
export default function AnimatedCounter({
  value,
  duration = 1.8,
  className = '',
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!isInView) return

    const match = value.match(/([\d,.]+)/)
    if (!match) {
      setDisplay(value)
      return
    }

    const numStr = match[1]
    const target = parseFloat(numStr.replace(/,/g, ''))
    if (isNaN(target)) {
      setDisplay(value)
      return
    }

    const hasCommas = numStr.includes(',')
    const prefix = value.slice(0, match.index)
    const suffix = value.slice((match.index ?? 0) + numStr.length)
    const start = performance.now()
    const durMs = duration * 1000
    let raf: number

    const tick = (now: number) => {
      const t = Math.min((now - start) / durMs, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - t, 4)
      const current = Math.round(target * eased)
      const formatted = hasCommas
        ? current.toLocaleString('en-GB')
        : String(current)
      setDisplay(`${prefix}${formatted}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
