'use client'

interface ConvoyCardProps {
  code: string
  label?: string
  subtext?: string
  className?: string
  rotation?: number
}

export default function ConvoyCard({
  code,
  label = 'CONVOY',
  subtext,
  className = '',
  rotation = 0,
}: ConvoyCardProps) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="id-card bg-sand shadow-2xl relative" style={{ width: 160, borderRadius: 6 }}>
        {/* Top label strip */}
        <div className="bg-orange-warm px-3 py-1" style={{ borderRadius: '4px 4px 0 0' }}>
          <p
            className="font-montserrat font-bold text-offwhite uppercase"
            style={{ fontSize: 8, letterSpacing: '0.2em' }}
          >
            {label}
          </p>
        </div>
        {/* Card body */}
        <div className="flex">
          <div className="flex-1 px-3 py-2">
            {subtext && (
              <p
                className="font-mono text-slate-deep"
                style={{ fontSize: 9, opacity: 0.6 }}
              >
                {subtext}
              </p>
            )}
            <div className="mt-1 space-y-1">
              <div className="h-1.5 rounded" style={{ background: '#B85C38', width: '80%' }} />
              <div className="h-1 rounded" style={{ background: '#9BA8A8', width: '60%' }} />
              <div className="h-1 rounded" style={{ background: '#9BA8A8', width: '70%' }} />
            </div>
          </div>
          {/* Badge */}
          <div
            className="id-card-badge flex items-center justify-center px-3"
            style={{ minWidth: 56, borderRadius: '0 4px 4px 0' }}
          >
            <span
              className="font-montserrat font-black text-white text-center leading-tight"
              style={{ fontSize: 14, letterSpacing: '0.02em' }}
            >
              {code}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
