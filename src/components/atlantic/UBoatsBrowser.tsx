'use client'

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import Link from 'next/link'
import {
  UBoat, getUBoats, getWolfpacks, getUBoatEvents, getLand,
  formatIso, numberFmt, fateColour, MEGA_EVENT_CHARS,
} from '@/lib/atlantic'

const PANEL_BORDER = 'rgba(126,206,206,0.25)'
const INK_DIM = 'rgba(248,244,238,0.65)'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block font-mono text-[10px] uppercase mb-1"
      style={{ color: '#7ECECE', letterSpacing: '0.15em' }}
    >
      {children}
    </span>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(13,48,64,0.6)',
  border: `1px solid ${PANEL_BORDER}`,
  color: '#F8F4EE',
  padding: '0.55rem 0.75rem',
  fontSize: '0.85rem',
  width: '100%',
  outline: 'none',
}

// ── inline final-position map ────────────────────────────────────

function MiniFateMap({ lat, lon, colour }: { lat: number; lon: number; colour: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [land, setLand] = useState<number[][][] | null>(null)

  useEffect(() => { getLand().then(setLand).catch(() => setLand([])) }, [])

  useEffect(() => {
    const cv = ref.current
    if (!cv || !land) return
    const draw = () => {
      const w = cv.clientWidth, h = 200
      const dpr = window.devicePixelRatio || 1
      cv.width = w * dpr; cv.height = h * dpr
      const cx = cv.getContext('2d')
      if (!cx) return
      cx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // view window centred on the position (equirectangular, matched to
      // the projection used by the main visualiser)
      const spanLon = 44
      const spanLat = spanLon / (w / h) / 1.4
      const lon0 = lon - spanLon / 2, lon1 = lon + spanLon / 2
      const lat0 = lat + spanLat / 2, lat1 = lat - spanLat / 2
      const px = (ln: number, lt: number): [number, number] => [
        ((ln - lon0) / (lon1 - lon0)) * w,
        ((lat0 - lt) / (lat0 - lat1)) * h,
      ]
      cx.fillStyle = '#0d2836'; cx.fillRect(0, 0, w, h)
      cx.strokeStyle = 'rgba(126,206,206,0.12)'; cx.lineWidth = 0.6
      cx.beginPath()
      for (let l = -180; l <= 180; l += 10) {
        const [x] = px(l, 0)
        if (x >= 0 && x <= w) { cx.moveTo(x, 0); cx.lineTo(x, h) }
      }
      for (let l = -80; l <= 80; l += 10) {
        const [, y] = px(0, l)
        if (y >= 0 && y <= h) { cx.moveTo(0, y); cx.lineTo(w, y) }
      }
      cx.stroke()
      cx.fillStyle = '#22414f'; cx.strokeStyle = '#2f556a'; cx.lineWidth = 0.8
      for (const ring of land) {
        cx.beginPath()
        for (let i = 0; i < ring.length; i++) {
          const [x, y] = px(ring[i][0], ring[i][1])
          i ? cx.lineTo(x, y) : cx.moveTo(x, y)
        }
        cx.closePath(); cx.fill(); cx.stroke()
      }
      const [mx, my] = px(lon, lat)
      cx.beginPath(); cx.arc(mx, my, 5, 0, 7)
      cx.fillStyle = colour; cx.fill()
      cx.strokeStyle = colour; cx.lineWidth = 1
      cx.beginPath(); cx.arc(mx, my, 10, 0, 7); cx.stroke()
    }
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [land, lat, lon, colour])

  return (
    <canvas
      ref={ref}
      className="w-full block"
      style={{ height: 200, border: `1px solid ${PANEL_BORDER}` }}
      role="img"
      aria-label={`Chart of final recorded position, ${lat.toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? 'E' : 'W'}`}
    />
  )
}

// ── detail panel ─────────────────────────────────────────────────

function UBoatDetail({ boat, onClose }: { boat: UBoat; onClose: () => void }) {
  const [events, setEvents] = useState<string[] | null>(null)
  const [eventsLoaded, setEventsLoaded] = useState(false)
  const [showFull, setShowFull] = useState<Record<number, boolean>>({})
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setEvents(null); setEventsLoaded(false); setShowFull({})
    getUBoatEvents()
      .then((all) => { setEvents(all[boat.slug] ?? []); setEventsLoaded(true) })
      .catch(() => setEventsLoaded(true))
  }, [boat.slug])

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const dates = [
    { label: 'Ordered', value: boat.ordered },
    { label: 'Laid down', value: boat.laid_down },
    { label: 'Launched', value: boat.launched },
    { label: 'Commissioned', value: boat.commissioned },
  ]
  const colour = fateColour(boat.fate_category)

  return (
    <div
      className="fixed inset-0 z-[110] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={`${boat.boat} record`}
    >
      <button
        className="absolute inset-0 cursor-default"
        style={{ background: 'rgba(6,15,26,0.7)' }}
        onClick={onClose}
        aria-label="Close U-boat record"
        tabIndex={-1}
      />
      <div
        className="relative h-full w-full max-w-2xl overflow-y-auto"
        style={{ background: '#0d3040', borderLeft: `1px solid ${PANEL_BORDER}` }}
      >
        <div
          className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 lg:px-10 pt-6 pb-4"
          style={{ background: '#0d3040', borderBottom: `1px solid ${PANEL_BORDER}` }}
        >
          <div>
            <p
              className="font-mono text-[10px] uppercase mb-1"
              style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
            >
              Kriegsmarine · Type {boat.type}
            </p>
            <h2
              className="font-montserrat font-extrabold uppercase"
              style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.7rem)', color: '#F8F4EE', letterSpacing: '0.08em' }}
            >
              {boat.boat}
            </h2>
            <span
              className="inline-block mt-2 font-mono text-[10px] uppercase px-2 py-1 border"
              style={{ color: colour, borderColor: colour, letterSpacing: '0.15em' }}
            >
              {boat.fate_category}
              {boat.fate_date ? ` · ${formatIso(boat.fate_date)}` : ''}
            </span>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="font-mono text-sm px-3 py-1.5 border shrink-0 hover:bg-teal-light hover:text-slate-deep transition-colors"
            style={{ borderColor: '#7ECECE', color: '#7ECECE' }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-6 lg:px-10 py-6">
          {/* build */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8">
            <div className="col-span-2">
              <FieldLabel>Shipyard</FieldLabel>
              <p className="text-sm text-offwhite">{boat.shipyard || '—'}</p>
            </div>
            {dates.map((d) => (
              <div key={d.label}>
                <FieldLabel>{d.label}</FieldLabel>
                <p className="text-sm text-offwhite font-mono">{d.value || '—'}</p>
              </div>
            ))}
          </div>

          {/* commanders */}
          {boat.commanders.length > 0 && (
            <div className="mb-8">
              <FieldLabel>Commanders</FieldLabel>
              <ul className="mt-1">
                {boat.commanders.map((c, i) => (
                  <li
                    key={i}
                    className="font-montserrat text-sm py-1.5 border-b last:border-0"
                    style={{ color: INK_DIM, borderColor: 'rgba(126,206,206,0.12)' }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* career + successes */}
          {boat.career && (
            <div className="mb-8">
              <FieldLabel>Career</FieldLabel>
              <p className="font-montserrat text-sm leading-relaxed whitespace-pre-line mt-1" style={{ color: INK_DIM }}>
                {boat.career}
              </p>
            </div>
          )}
          {boat.successes && (
            <div className="mb-8">
              <FieldLabel>Successes</FieldLabel>
              <p className="font-montserrat text-sm leading-relaxed whitespace-pre-line mt-1" style={{ color: INK_DIM }}>
                {boat.successes}
              </p>
            </div>
          )}

          {/* fate */}
          <div className="mb-8">
            <FieldLabel>Fate</FieldLabel>
            <p className="font-montserrat text-sm leading-relaxed whitespace-pre-line mt-1" style={{ color: INK_DIM }}>
              {boat.fate}
            </p>
            {boat.notes && (
              <p className="font-montserrat text-sm leading-relaxed whitespace-pre-line mt-3 italic" style={{ color: 'rgba(248,244,238,0.5)' }}>
                {boat.notes}
              </p>
            )}
          </div>

          {/* final position */}
          <div className="mb-8">
            <FieldLabel>Final recorded position</FieldLabel>
            {boat.lat !== null && boat.lon !== null ? (
              <div className="mt-2">
                <MiniFateMap lat={boat.lat} lon={boat.lon} colour={colour} />
                <p className="font-mono text-xs mt-2" style={{ color: INK_DIM }}>
                  {Math.abs(boat.lat).toFixed(2)}°{boat.lat >= 0 ? 'N' : 'S'}{' '}
                  {Math.abs(boat.lon).toFixed(2)}°{boat.lon >= 0 ? 'E' : 'W'} ·{' '}
                  <Link
                    href={`/atlantic/visualiser?boat=${boat.slug}`}
                    className="underline"
                    style={{ color: '#7ECECE' }}
                  >
                    View on the war chart
                  </Link>
                </p>
              </div>
            ) : (
              <p className="font-montserrat text-sm mt-1" style={{ color: INK_DIM }}>
                No position could be parsed from this boat’s fate record.
              </p>
            )}
          </div>

          {/* wolfpacks */}
          <div className="mb-8">
            <FieldLabel>Wolfpacks</FieldLabel>
            {boat.wolfpacks.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {boat.wolfpacks.map((p) => (
                  <Link
                    key={p}
                    href={`/atlantic/visualiser?pack=${encodeURIComponent(p)}`}
                    className="font-mono text-xs px-2.5 py-1.5 border hover:bg-teal-light hover:text-slate-deep transition-colors"
                    style={{ borderColor: '#7ECECE', color: '#7ECECE', letterSpacing: '0.08em' }}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="font-montserrat text-sm mt-1" style={{ color: INK_DIM }}>
                Not recorded as part of any wolfpack.
              </p>
            )}
          </div>

          {/* events */}
          <div className="mb-8">
            <FieldLabel>Recorded events</FieldLabel>
            {!eventsLoaded && (
              <p className="font-mono text-xs mt-2 animate-pulse" style={{ color: '#7ECECE' }}>
                Retrieving records…
              </p>
            )}
            {eventsLoaded && events && events.length === 0 && (
              <p className="font-montserrat text-sm mt-1" style={{ color: INK_DIM }}>
                No individual event records for this boat in the dataset.
              </p>
            )}
            {events && events.map((ev, i) => {
              const long = ev.length > MEGA_EVENT_CHARS && !showFull[i]
              return (
                <div key={i} className="mb-3">
                  <p className="font-montserrat text-sm leading-relaxed whitespace-pre-line" style={{ color: INK_DIM }}>
                    {long ? `${ev.slice(0, 600)}…` : ev}
                  </p>
                  {long && (
                    <button
                      onClick={() => setShowFull((s) => ({ ...s, [i]: true }))}
                      className="mt-1 font-mono text-xs uppercase underline"
                      style={{ color: '#7ECECE', letterSpacing: '0.1em' }}
                    >
                      Read full account
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          <p className="font-mono text-xs pb-10" style={{ color: 'rgba(248,244,238,0.45)' }}>
            Source record:{' '}
            <a
              href={boat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: '#7ECECE' }}
            >
              uboat.net
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// ── main browser ─────────────────────────────────────────────────

export default function UBoatsBrowser() {
  const [boats, setBoats] = useState<UBoat[] | null>(null)
  const [packs, setPacks] = useState<string[]>([])
  const [loadError, setLoadError] = useState(false)

  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [type, setType] = useState('')
  const [fate, setFate] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [pack, setPack] = useState('')
  const [sortKey, setSortKey] = useState<'boat' | 'type' | 'comm' | 'fate' | 'fateDate'>('boat')
  const [sortAsc, setSortAsc] = useState(true)
  const [selected, setSelected] = useState<UBoat | null>(null)

  useEffect(() => {
    getUBoats().then((d) => setBoats(d.boats)).catch(() => setLoadError(true))
    getWolfpacks().then((w) => setPacks(Object.keys(w))).catch(() => {})
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 150)
    return () => clearTimeout(t)
  }, [query])

  const searchStrings = useMemo(() => {
    if (!boats) return null
    return boats.map((b) =>
      `${b.boat} ${b.type} ${b.shipyard} ${b.commanders.join(' ')}`.toLowerCase(),
    )
  }, [boats])

  // deep link ?boat=u-99 or ?boat=u99
  useEffect(() => {
    if (!boats) return
    const applyFromUrl = () => {
      const q = new URLSearchParams(window.location.search).get('boat')
      if (q) {
        const norm = q.toLowerCase().replace(/[^a-z0-9]/g, '')
        const b = boats.find(
          (x) => x.slug === q.toLowerCase() || x.slug === norm ||
                 x.boat.toLowerCase().replace(/[^a-z0-9]/g, '') === norm,
        )
        setSelected(b ?? null)
      } else {
        setSelected(null)
      }
    }
    applyFromUrl()
    window.addEventListener('popstate', applyFromUrl)
    return () => window.removeEventListener('popstate', applyFromUrl)
  }, [boats])

  const openBoat = useCallback((b: UBoat | null) => {
    setSelected(b)
    const url = new URL(window.location.href)
    if (b) url.searchParams.set('boat', b.slug)
    else url.searchParams.delete('boat')
    window.history.pushState(null, '', url.toString())
  }, [])

  const types = useMemo(
    () => (boats ? Array.from(new Set(boats.map((b) => b.type))).sort() : []),
    [boats],
  )
  const fates = useMemo(
    () => (boats ? Array.from(new Set(boats.map((b) => b.fate_category))).sort() : []),
    [boats],
  )

  const filtered = useMemo(() => {
    if (!boats || !searchStrings) return []
    const yf = yearFrom ? parseInt(yearFrom, 10) : null
    const yt = yearTo ? parseInt(yearTo, 10) : null
    const out: UBoat[] = []
    for (let i = 0; i < boats.length; i++) {
      const b = boats[i]
      if (debounced && !searchStrings[i].includes(debounced)) continue
      if (type && b.type !== type) continue
      if (fate && b.fate_category !== fate) continue
      if (pack && !b.wolfpacks.includes(pack)) continue
      const cy = b.commissioned_iso ? parseInt(b.commissioned_iso.slice(0, 4), 10) : null
      if (yf !== null && (cy === null || cy < yf)) continue
      if (yt !== null && (cy === null || cy > yt)) continue
      out.push(b)
    }
    const dir = sortAsc ? 1 : -1
    const num = (s: string) => parseInt(s.replace(/\D/g, ''), 10) || 0
    out.sort((a, b) => {
      switch (sortKey) {
        case 'boat': return (num(a.boat) - num(b.boat)) * dir
        case 'type': return a.type.localeCompare(b.type) * dir
        case 'comm': return (a.commissioned_iso || '9999').localeCompare(b.commissioned_iso || '9999') * dir
        case 'fate': return a.fate_category.localeCompare(b.fate_category) * dir
        case 'fateDate': return (a.fate_date || '9999').localeCompare(b.fate_date || '9999') * dir
      }
    })
    return out
  }, [boats, searchStrings, debounced, type, fate, pack, yearFrom, yearTo, sortKey, sortAsc])

  const toggleSort = (k: typeof sortKey) => {
    if (sortKey === k) setSortAsc(!sortAsc)
    else { setSortKey(k); setSortAsc(true) }
  }

  const th = (k: typeof sortKey, label: string, cls = '') => (
    <button
      onClick={() => toggleSort(k)}
      className={`font-mono text-[10px] uppercase text-left hover:text-teal-light transition-colors ${cls}`}
      style={{ color: sortKey === k ? '#7ECECE' : 'rgba(248,244,238,0.6)', letterSpacing: '0.12em' }}
      aria-label={`Sort by ${label}`}
    >
      {label}{sortKey === k ? (sortAsc ? ' ↑' : ' ↓') : ''}
    </button>
  )

  if (loadError) {
    return (
      <p className="font-mono text-sm py-20 text-center" style={{ color: '#E07B45' }}>
        The U-boat index could not be loaded. Please try again later.
      </p>
    )
  }

  const cols = 'minmax(90px,0.9fr) 0.8fr 1fr 1fr 1fr 0.8fr'

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      {/* controls */}
      <div
        className="border p-5 lg:p-6 mb-6"
        style={{ borderColor: PANEL_BORDER, background: 'rgba(13,48,64,0.45)' }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <FieldLabel>Search boat, commander, shipyard…</FieldLabel>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. U-99, Kretschmer, Blohm…"
              style={inputStyle}
              aria-label="Search U-boats"
            />
          </div>
          <div>
            <FieldLabel>Type</FieldLabel>
            <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle} aria-label="Filter by type">
              <option value="">All types</option>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <FieldLabel>Fate</FieldLabel>
            <select value={fate} onChange={(e) => setFate(e.target.value)} style={inputStyle} aria-label="Filter by fate">
              <option value="">All fates</option>
              {fates.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <FieldLabel>Commissioned between</FieldLabel>
            <div className="flex gap-2">
              <input
                type="number" placeholder="1935" value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)} style={inputStyle}
                aria-label="Commissioned from year"
              />
              <input
                type="number" placeholder="1945" value={yearTo}
                onChange={(e) => setYearTo(e.target.value)} style={inputStyle}
                aria-label="Commissioned to year"
              />
            </div>
          </div>
          <div>
            <FieldLabel>Wolfpack</FieldLabel>
            <select value={pack} onChange={(e) => setPack(e.target.value)} style={inputStyle} aria-label="Filter by wolfpack">
              <option value="">Any / none</option>
              {packs.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex items-end justify-end lg:col-span-2">
            <p className="font-mono text-xs" style={{ color: '#7ECECE', letterSpacing: '0.1em' }} aria-live="polite">
              {boats ? `${numberFmt(filtered.length)} of ${numberFmt(boats.length)} boats` : 'Loading index…'}
            </p>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="border" style={{ borderColor: PANEL_BORDER, background: 'rgba(13,48,64,0.45)' }}>
        <div
          className="grid gap-2 px-4 py-3 border-b"
          style={{ gridTemplateColumns: cols, borderColor: PANEL_BORDER }}
        >
          {th('boat', 'Boat')}
          {th('type', 'Type')}
          {th('comm', 'Commissioned', 'hidden sm:block')}
          {th('fate', 'Fate')}
          {th('fateDate', 'Fate date', 'hidden md:block')}
          <span
            className="font-mono text-[10px] uppercase hidden lg:block"
            style={{ color: 'rgba(248,244,238,0.6)', letterSpacing: '0.12em' }}
          >
            Wolfpacks
          </span>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 'min(60vh, 640px)' }} aria-label="U-boat results">
          {!boats && (
            <p className="font-mono text-xs p-6 animate-pulse" style={{ color: '#7ECECE' }}>
              Loading 1,153 boat records…
            </p>
          )}
          {boats && filtered.length === 0 && (
            <p className="font-montserrat text-sm p-6" style={{ color: INK_DIM }}>
              No boats match the current filters.
            </p>
          )}
          {filtered.map((b) => (
            <button
              key={b.slug}
              onClick={() => openBoat(b)}
              className="grid gap-2 px-4 items-center w-full text-left hover:bg-[rgba(126,206,206,0.08)] focus-visible:bg-[rgba(126,206,206,0.12)] outline-none transition-colors"
              style={{
                gridTemplateColumns: cols,
                minHeight: 44,
                borderBottom: '1px solid rgba(126,206,206,0.08)',
              }}
              aria-label={`Open record for ${b.boat}`}
            >
              <span className="font-montserrat font-semibold text-sm text-offwhite">{b.boat}</span>
              <span className="font-mono text-xs" style={{ color: INK_DIM }}>{b.type}</span>
              <span className="font-mono text-xs hidden sm:block" style={{ color: INK_DIM }}>
                {formatIso(b.commissioned_iso)}
              </span>
              <span className="font-mono text-xs" style={{ color: fateColour(b.fate_category) }}>
                {b.fate_category}
              </span>
              <span className="font-mono text-xs hidden md:block" style={{ color: INK_DIM }}>
                {formatIso(b.fate_date)}
              </span>
              <span className="font-mono text-xs hidden lg:block" style={{ color: b.wolfpacks.length ? '#7ECECE' : 'rgba(248,244,238,0.3)' }}>
                {b.wolfpacks.length || '—'}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="font-mono text-[11px] mt-4" style={{ color: 'rgba(248,244,238,0.45)' }}>
        Boat records can be bookmarked — selecting a boat adds{' '}
        <span style={{ color: '#7ECECE' }}>?boat=…</span> to the address. See the boats plotted on{' '}
        <Link href="/atlantic/visualiser" className="underline" style={{ color: '#7ECECE' }}>
          the war chart
        </Link>.
      </p>

      {selected && <UBoatDetail boat={selected} onClose={() => openBoat(null)} />}
    </div>
  )
}
