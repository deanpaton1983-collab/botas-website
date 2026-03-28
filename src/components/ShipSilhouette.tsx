'use client'

interface ShipSilhouetteProps {
  className?: string
  color?: string
  opacity?: number
  type?: 'merchant' | 'submarine' | 'destroyer' | 'aircraft'
}

export default function ShipSilhouette({
  className = '',
  color = '#7ECECE',
  opacity = 0.08,
  type = 'merchant',
}: ShipSilhouetteProps) {
  if (type === 'submarine') {
    return (
      <svg viewBox="0 0 240 60" className={className} aria-hidden="true">
        <ellipse cx="120" cy="35" rx="100" ry="18" fill={color} opacity={opacity} />
        <rect x="100" y="12" width="30" height="22" rx="4" fill={color} opacity={opacity} />
        <rect x="112" y="6" width="6" height="10" fill={color} opacity={opacity} />
        <polygon points="20,35 40,22 40,48" fill={color} opacity={opacity} />
        <polygon points="220,35 200,28 200,42" fill={color} opacity={opacity} />
      </svg>
    )
  }

  if (type === 'destroyer') {
    return (
      <svg viewBox="0 0 300 80" className={className} aria-hidden="true">
        <polygon points="10,55 290,55 280,35 260,30 240,28 60,28 30,35" fill={color} opacity={opacity} />
        <rect x="80" y="14" width="20" height="24" fill={color} opacity={opacity} />
        <rect x="110" y="8" width="16" height="30" fill={color} opacity={opacity} />
        <rect x="150" y="16" width="12" height="22" fill={color} opacity={opacity} />
        <rect x="170" y="20" width="8" height="18" fill={color} opacity={opacity} />
        <polygon points="280,55 295,40 295,55" fill={color} opacity={opacity} />
      </svg>
    )
  }

  if (type === 'aircraft') {
    return (
      <svg viewBox="0 0 200 100" className={className} aria-hidden="true">
        {/* Fuselage */}
        <ellipse cx="100" cy="50" rx="60" ry="10" fill={color} opacity={opacity} />
        {/* Wings */}
        <polygon points="80,50 120,50 140,80 60,80" fill={color} opacity={opacity} />
        {/* Tail */}
        <polygon points="155,50 175,50 170,35 155,35" fill={color} opacity={opacity} />
        {/* Roundel */}
        <circle cx="100" cy="50" r="12" fill="none" stroke={color} strokeWidth="2" opacity={opacity * 2} />
        <circle cx="100" cy="50" r="6" fill="none" stroke={color} strokeWidth="2" opacity={opacity * 2} />
      </svg>
    )
  }

  // Default: merchant vessel
  return (
    <svg viewBox="0 0 320 90" className={className} aria-hidden="true">
      <polygon points="15,65 305,65 290,45 270,38 250,36 70,36 35,45" fill={color} opacity={opacity} />
      <rect x="60" y="16" width="28" height="32" fill={color} opacity={opacity} />
      <rect x="92" y="8" width="18" height="40" fill={color} opacity={opacity} />
      <rect x="120" y="20" width="12" height="28" fill={color} opacity={opacity} />
      <rect x="150" y="22" width="8" height="26" fill={color} opacity={opacity} />
      <rect x="180" y="26" width="40" height="22" fill={color} opacity={opacity} />
      <rect x="96" y="2" width="4" height="12" fill={color} opacity={opacity} />
      <rect x="152" y="14" width="3" height="10" fill={color} opacity={opacity} />
      <polygon points="305,65 316,55 316,65" fill={color} opacity={opacity} />
    </svg>
  )
}
