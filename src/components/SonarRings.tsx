'use client'

interface SonarRingsProps {
  className?: string
  color?: string
  size?: number
  rings?: number
  animated?: boolean
  opacity?: number
}

export default function SonarRings({
  className = '',
  color = '#7ECECE',
  size = 600,
  rings = 6,
  animated = true,
  opacity = 0.15,
}: SonarRingsProps) {
  const cx = size / 2
  const cy = size / 2
  const maxR = size * 0.46

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {/* Static background rings */}
      {Array.from({ length: rings }).map((_, i) => {
        const r = (maxR / rings) * (i + 1)
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={1}
            opacity={opacity * (1 - i * 0.1)}
          />
        )
      })}

      {/* Radar sweep line */}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - maxR}
        stroke={color}
        strokeWidth={1}
        opacity={opacity * 2}
      />

      {/* Centre dot */}
      <circle cx={cx} cy={cy} r={4} fill={color} opacity={opacity * 3} />

      {/* Animated pulse rings */}
      {animated && (
        <>
          <circle
            cx={cx}
            cy={cy}
            r={maxR * 0.4}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            opacity={0}
            className="sonar-ring"
          />
          <circle
            cx={cx}
            cy={cy}
            r={maxR * 0.4}
            fill="none"
            stroke={color}
            strokeWidth={1}
            opacity={0}
            className="sonar-ring"
          />
          <circle
            cx={cx}
            cy={cy}
            r={maxR * 0.4}
            fill="none"
            stroke={color}
            strokeWidth={0.5}
            opacity={0}
            className="sonar-ring"
          />
        </>
      )}
    </svg>
  )
}
