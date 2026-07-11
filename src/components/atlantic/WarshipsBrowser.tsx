'use client'

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import Link from 'next/link'
import {
  WarshipRow, WarshipDetail, ShipEvents,
  getWarshipIndex, getWarshipDetailBucket, getShipEvents,
  formatIso, numberFmt, MEGA_EVENT_CHARS, isDateHeading,
} from '@/lib/atlantic'

// ── constants ────────────────────────────────────────────────────

const ROW_H = 46
const OVERSCAN = 12
const PANEL_BORDER = 'rgba(126,206,206,0.25)'
const INK_DIM = 'rgba(248,244,238,0.65)'

type SortKey = 'name' | 'navy' | 'type' | 'class' | 'commYear' | 'events'
const SORT_COL: Record<SortKey, number> = {
  name: 1, navy: 2, type: 3, class: 4, commYear: 6, events: 8,
}

// ── small ui atoms ───────────────────────────────────────────────

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

// ── event list (shared with u-boats page style) ──────────────────

function EventParagraph({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  if (isDateHeading(text)) {
    return (
      <p
        className="font-mono text-xs uppercase mt-6 mb-2 pb-1 border-b"
        style={{ color: '#7ECECE', letterSpacing: '0.15em', borderColor: PANEL_BORDER }}
      >
        {text}
      </p>
    )
  }
  if (text.length > MEGA_EVENT_CHARS && !open) {
    return (
      <div
        className="mb-3 border p-4"
        style={{ borderColor: PANEL_BORDER, background: 'rgba(13,48,64,0.4)' }}
      >
        <p
          className="font-montserrat text-sm leading-relaxed"
          style={{ color: INK_DIM }}
        >
          {text.slice(0, 600)}…
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-3 font-mono text-xs uppercase underline"
          style={{ color: '#7ECECE', letterSpacing: '0.1em' }}
        >
          Read full account ({numberFmt(text.length)} characters)
        </button>
      </div>
    )
  }
  return (
    <p
      className="font-montserrat text-sm leading-relaxed mb-3 whitespace-pre-line"
      style={{ color: INK_DIM }}
    >
      {text}
    </p>
  )
}

// ── detail panel ─────────────────────────────────────────────────

function ShipDetail({
  row, bucketSize, onClose,
}: {
  row: WarshipRow
  bucketSize: number
  onClose: () => void
}) {
  const [id, name, navy, type, klass, pennant, , , evCount] = row
  const [detail, setDetail] = useState<WarshipDetail | null>(null)
  const [events, setEvents] = useState<ShipEvents | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [eventsOpen, setEventsOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setDetail(null); setEvents(null); setError(null); setEventsOpen(false)
    getWarshipDetailBucket(id, bucketSize)
      .then((b) => setDetail(b[String(id)] ?? null))
      .catch(() => setError('Could not load this ship’s record.'))
  }, [id, bucketSize])

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const loadEvents = useCallback(() => {
    setEventsOpen(true)
    if (!events) {
      getShipEvents(id)
        .then(setEvents)
        .catch(() => setError('Could not load the event history.'))
    }
  }, [events, id])

  const flags = detail?.quality_flags || ''
  const uncertain = (field: 'laid_down' | 'launched' | 'commissioned') =>
    (flags.includes('laid_down_after_launched') && (field === 'laid_down' || field === 'launched')) ||
    (flags.includes('launched_after_commissioned') && (field === 'launched' || field === 'commissioned'))

  const dates: { label: string; value: string; unc?: boolean }[] = detail
    ? [
        { label: 'Ordered', value: detail.ordered || formatIso(detail.ordered_iso) },
        { label: 'Laid down', value: detail.laid_down || formatIso(detail.laid_down_iso), unc: uncertain('laid_down') },
        { label: 'Launched', value: detail.launched || formatIso(detail.launched_iso), unc: uncertain('launched') },
        { label: 'Commissioned', value: detail.commissioned || formatIso(detail.commissioned_iso), unc: uncertain('commissioned') },
        { label: 'End service', value: detail.end_service || formatIso(detail.end_service_iso) },
      ]
    : []

  return (
    <div
      className="fixed inset-0 z-[110] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} record`}
    >
      <button
        className="absolute inset-0 cursor-default"
        style={{ background: 'rgba(6,15,26,0.7)' }}
        onClick={onClose}
        aria-label="Close ship record"
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
              Allied Warship · Record {id}
            </p>
            <h2
              className="font-montserrat font-extrabold uppercase"
              style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.6rem)', color: '#F8F4EE', letterSpacing: '0.05em', lineHeight: 1.15 }}
            >
              {name}
            </h2>
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
          {/* identity grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mb-8">
            <div><FieldLabel>Navy</FieldLabel><p className="text-sm text-offwhite">{navy}</p></div>
            <div><FieldLabel>Type</FieldLabel><p className="text-sm text-offwhite">{type}</p></div>
            <div><FieldLabel>Class</FieldLabel><p className="text-sm text-offwhite">{klass || '—'}</p></div>
            <div><FieldLabel>Pennant</FieldLabel><p className="text-sm text-offwhite font-mono">{pennant || '—'}</p></div>
            <div className="col-span-2">
              <FieldLabel>Built by</FieldLabel>
              <p className="text-sm text-offwhite">{detail ? (detail.built_by || '—') : '…'}</p>
            </div>
          </div>

          {error && (
            <p className="font-mono text-sm mb-6" style={{ color: '#E07B45' }}>{error}</p>
          )}

          {/* build timeline */}
          {detail && (
            <div className="mb-8">
              <FieldLabel>Service timeline</FieldLabel>
              <ol className="mt-2 border-l" style={{ borderColor: PANEL_BORDER }}>
                {dates.filter((d) => d.value && d.value !== '—').map((d) => (
                  <li key={d.label} className="relative pl-5 pb-3 last:pb-0">
                    <span
                      className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full"
                      style={{ background: '#7ECECE' }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs" style={{ color: '#7ECECE' }}>{d.label}</span>{' '}
                    <span className="font-montserrat text-sm text-offwhite">{d.value}</span>
                    {d.unc && (
                      <span
                        className="ml-2 font-mono text-[10px] uppercase px-1.5 py-0.5 border"
                        style={{ color: '#E07B45', borderColor: 'rgba(224,123,69,0.4)', letterSpacing: '0.1em' }}
                        title="This record has a known date-sequence inconsistency at source"
                      >
                        date uncertain
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* commanders */}
          {detail && detail.commanders.length > 0 && (
            <div className="mb-8">
              <FieldLabel>Commanders</FieldLabel>
              <ul className="mt-1">
                {detail.commanders.map((c, i) => (
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

          {/* history */}
          {detail && detail.history && (
            <div className="mb-8">
              <FieldLabel>History</FieldLabel>
              <p
                className="font-montserrat text-sm leading-relaxed whitespace-pre-line mt-1"
                style={{ color: INK_DIM }}
              >
                {detail.history}
              </p>
            </div>
          )}

          {/* events */}
          <div className="mb-8">
            <FieldLabel>Wartime event history</FieldLabel>
            {evCount === 0 && (
              <p className="font-montserrat text-sm mt-1" style={{ color: INK_DIM }}>
                No day-by-day event records survive for this vessel in the dataset.
              </p>
            )}
            {evCount > 0 && !eventsOpen && (
              <button
                onClick={loadEvents}
                className="mt-2 font-montserrat font-bold text-xs uppercase px-5 py-2.5 border hover:bg-teal-light hover:text-slate-deep transition-colors"
                style={{ borderColor: '#7ECECE', color: '#7ECECE', letterSpacing: '0.15em' }}
              >
                Load {numberFmt(evCount)} event record{evCount === 1 ? '' : 's'}
              </button>
            )}
            {eventsOpen && !events && !error && (
              <p className="font-mono text-xs mt-2 animate-pulse" style={{ color: '#7ECECE' }}>
                Retrieving records…
              </p>
            )}
            {events && (
              <div className="mt-3">
                {events.events.map((ev, i) => <EventParagraph key={i} text={ev} />)}
              </div>
            )}
          </div>

          {/* source */}
          {detail && (
            <p className="font-mono text-xs pb-10" style={{ color: 'rgba(248,244,238,0.45)' }}>
              Source record:{' '}
              <a
                href={detail.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: '#7ECECE' }}
              >
                uboat.net
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── main browser ─────────────────────────────────────────────────

export default function WarshipsBrowser() {
  const [rows, setRows] = useState<WarshipRow[] | null>(null)
  const [bucketSize, setBucketSize] = useState(128)
  const [loadError, setLoadError] = useState(false)

  // filters
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [navy, setNavy] = useState('')
  const [type, setType] = useState('')
  const [klass, setKlass] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [hasEvents, setHasEvents] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortAsc, setSortAsc] = useState(true)

  const [selected, setSelected] = useState<WarshipRow | null>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [viewH, setViewH] = useState(560)
  const scrollRef = useRef<HTMLDivElement>(null)

  // search strings, built once
  const searchStrings = useMemo(() => {
    if (!rows) return null
    return rows.map((r) =>
      `${r[1]} ${r[4]} ${r[5]} ${r[2]}`.toLowerCase(),
    )
  }, [rows])

  useEffect(() => {
    getWarshipIndex()
      .then((idx) => { setRows(idx.rows); setBucketSize(idx.bucketSize) })
      .catch(() => setLoadError(true))
  }, [])

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 150)
    return () => clearTimeout(t)
  }, [query])

  // deep link: ?ship=41 (read on load + back/forward)
  useEffect(() => {
    if (!rows) return
    const applyFromUrl = () => {
      const id = new URLSearchParams(window.location.search).get('ship')
      if (id) {
        const row = rows.find((r) => r[0] === Number(id))
        setSelected(row ?? null)
      } else {
        setSelected(null)
      }
    }
    applyFromUrl()
    window.addEventListener('popstate', applyFromUrl)
    return () => window.removeEventListener('popstate', applyFromUrl)
  }, [rows])

  const openShip = useCallback((row: WarshipRow | null) => {
    setSelected(row)
    const url = new URL(window.location.href)
    if (row) url.searchParams.set('ship', String(row[0]))
    else url.searchParams.delete('ship')
    window.history.pushState(null, '', url.toString())
  }, [])

  // filter + sort
  const filtered = useMemo(() => {
    if (!rows || !searchStrings) return []
    const yf = yearFrom ? parseInt(yearFrom, 10) : null
    const yt = yearTo ? parseInt(yearTo, 10) : null
    const out: WarshipRow[] = []
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i]
      if (debounced && !searchStrings[i].includes(debounced)) continue
      if (navy && r[2] !== navy) continue
      if (type && r[3] !== type) continue
      if (klass && r[4].toLowerCase() !== klass.toLowerCase()) continue
      if (hasEvents && r[8] === 0) continue
      if (yf !== null && (r[6] === null || r[6] < yf)) continue
      if (yt !== null && (r[6] === null || r[6] > yt)) continue
      out.push(r)
    }
    const col = SORT_COL[sortKey]
    const dir = sortAsc ? 1 : -1
    out.sort((a, b) => {
      const av = a[col], bv = b[col]
      if (av === null || av === '') return 1
      if (bv === null || bv === '') return -1
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
      return String(av).localeCompare(String(bv)) * dir
    })
    return out
  }, [rows, searchStrings, debounced, navy, type, klass, hasEvents, yearFrom, yearTo, sortKey, sortAsc])

  // facet options
  const navies = useMemo(
    () => (rows ? Array.from(new Set(rows.map((r) => r[2]))).sort() : []),
    [rows],
  )
  const types = useMemo(
    () => (rows ? Array.from(new Set(rows.map((r) => r[3]))).sort() : []),
    [rows],
  )
  const classes = useMemo(
    () => (rows ? Array.from(new Set(rows.map((r) => r[4]).filter(Boolean))).sort() : []),
    [rows],
  )

  // virtualisation
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const measure = () => setViewH(el.clientHeight)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [rows])

  const first = Math.max(0, Math.floor(scrollTop / ROW_H) - OVERSCAN)
  const last = Math.min(filtered.length, Math.ceil((scrollTop + viewH) / ROW_H) + OVERSCAN)

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortAsc(!sortAsc)
    else { setSortKey(k); setSortAsc(true) }
  }

  const th = (k: SortKey, label: string, cls = '') => (
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
        The warship index could not be loaded. Please try again later.
      </p>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      {/* controls */}
      <div
        className="border p-5 lg:p-6 mb-6"
        style={{ borderColor: PANEL_BORDER, background: 'rgba(13,48,64,0.45)' }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <FieldLabel>Search name, pennant, class…</FieldLabel>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Ark Royal, U 99 hunter, Flower…"
              style={inputStyle}
              aria-label="Search warships"
            />
          </div>
          <div>
            <FieldLabel>Navy</FieldLabel>
            <select value={navy} onChange={(e) => setNavy(e.target.value)} style={inputStyle} aria-label="Filter by navy">
              <option value="">All navies</option>
              {navies.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <FieldLabel>Type</FieldLabel>
            <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle} aria-label="Filter by ship type">
              <option value="">All types</option>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <FieldLabel>Class</FieldLabel>
            <input
              list="atlantic-classes"
              value={klass}
              onChange={(e) => setKlass(e.target.value)}
              placeholder="Any class"
              style={inputStyle}
              aria-label="Filter by class"
            />
            <datalist id="atlantic-classes">
              {classes.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div>
            <FieldLabel>Commissioned between</FieldLabel>
            <div className="flex gap-2">
              <input
                type="number" placeholder="1939" value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
                style={inputStyle} aria-label="Commissioned from year"
              />
              <input
                type="number" placeholder="1945" value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
                style={inputStyle} aria-label="Commissioned to year"
              />
            </div>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasEvents}
                onChange={(e) => setHasEvents(e.target.checked)}
                className="w-4 h-4 accent-[#7ECECE]"
              />
              <span className="font-mono text-xs uppercase" style={{ color: INK_DIM, letterSpacing: '0.1em' }}>
                Has wartime events
              </span>
            </label>
          </div>
          <div className="flex items-end justify-end lg:col-span-2">
            <p className="font-mono text-xs" style={{ color: '#7ECECE', letterSpacing: '0.1em' }} aria-live="polite">
              {rows ? `${numberFmt(filtered.length)} of ${numberFmt(rows.length)} warships` : 'Loading index…'}
            </p>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="border" style={{ borderColor: PANEL_BORDER, background: 'rgba(13,48,64,0.45)' }}>
        <div
          className="grid gap-2 px-4 py-3 border-b"
          style={{
            gridTemplateColumns: 'minmax(180px,2.2fr) 1.4fr 1.4fr 1fr 0.7fr 0.6fr',
            borderColor: PANEL_BORDER,
          }}
        >
          {th('name', 'Name')}
          {th('navy', 'Navy', 'hidden sm:block')}
          {th('type', 'Type', 'hidden md:block')}
          {th('class', 'Class', 'hidden lg:block')}
          {th('commYear', 'Comm.')}
          {th('events', 'Events')}
        </div>
        <div
          ref={scrollRef}
          onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
          className="overflow-y-auto"
          style={{ height: 'min(60vh, 640px)' }}
          tabIndex={0}
          aria-label="Warship results"
        >
          {!rows && (
            <p className="font-mono text-xs p-6 animate-pulse" style={{ color: '#7ECECE' }}>
              Loading 21,195 warship records…
            </p>
          )}
          {rows && filtered.length === 0 && (
            <p className="font-montserrat text-sm p-6" style={{ color: INK_DIM }}>
              No warships match the current filters.
            </p>
          )}
          <div style={{ height: filtered.length * ROW_H, position: 'relative' }}>
            {filtered.slice(first, last).map((r, i) => {
              const idx = first + i
              return (
                <button
                  key={r[0]}
                  onClick={() => openShip(r)}
                  className="grid gap-2 px-4 items-center w-full text-left hover:bg-[rgba(126,206,206,0.08)] focus-visible:bg-[rgba(126,206,206,0.12)] outline-none transition-colors"
                  style={{
                    gridTemplateColumns: 'minmax(180px,2.2fr) 1.4fr 1.4fr 1fr 0.7fr 0.6fr',
                    position: 'absolute',
                    top: idx * ROW_H,
                    height: ROW_H,
                    borderBottom: '1px solid rgba(126,206,206,0.08)',
                  }}
                  aria-label={`Open record for ${r[1]}`}
                >
                  <span className="font-montserrat font-semibold text-sm truncate text-offwhite">{r[1]}</span>
                  <span className="font-montserrat text-xs truncate hidden sm:block" style={{ color: INK_DIM }}>{r[2]}</span>
                  <span className="font-montserrat text-xs truncate hidden md:block" style={{ color: INK_DIM }}>{r[3]}</span>
                  <span className="font-montserrat text-xs truncate hidden lg:block" style={{ color: INK_DIM }}>{r[4] || '—'}</span>
                  <span className="font-mono text-xs" style={{ color: INK_DIM }}>{r[6] ?? '—'}</span>
                  <span className="font-mono text-xs" style={{ color: r[8] > 0 ? '#7ECECE' : 'rgba(248,244,238,0.3)' }}>
                    {r[8] > 0 ? numberFmt(r[8]) : '—'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p className="font-mono text-[11px] mt-4" style={{ color: 'rgba(248,244,238,0.45)' }}>
        Ship records can be bookmarked — selecting a vessel adds{' '}
        <span style={{ color: '#7ECECE' }}>?ship=…</span> to the address. Looking for the German side?{' '}
        <Link href="/atlantic/u-boats" className="underline" style={{ color: '#7ECECE' }}>
          Search the U-boats
        </Link>.
      </p>

      {selected && (
        <ShipDetail
          row={selected}
          bucketSize={bucketSize}
          onClose={() => openShip(null)}
        />
      )}
    </div>
  )
}
