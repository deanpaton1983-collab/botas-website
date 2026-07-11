'use client'

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import Link from 'next/link'
import {
  UBoat, WolfpackMember, Aggregates,
  getUBoats, getWolfpacks, getLand, getAggregates,
  fateColour, FATE_COLOURS, formatIso, numberFmt,
  WAR_MONTHS, isoToWarMonth, warMonthLabel, warMonthKey,
} from '@/lib/atlantic'

const PANEL_BORDER = 'rgba(126,206,206,0.25)'
const INK_DIM = 'rgba(248,244,238,0.65)'
const SEA = '#0d2836'
const LAND_FILL = '#22414f'
const LAND_EDGE = '#2f556a'
const GRID = 'rgba(126,206,206,0.12)'

type ViewKey = 'atl' | 'usa' | 'med' | 'world'
const VIEWS: Record<ViewKey, { label: string; lon0: number; lon1: number; lat0: number; lat1: number }> = {
  atl: { label: 'North Atlantic', lon0: -75, lon1: 15, lat0: 70, lat1: 20 },
  usa: { label: 'American Coast', lon0: -100, lon1: -30, lat0: 52, lat1: 15 },
  med: { label: 'Mediterranean', lon0: -10, lon1: 37, lat0: 47, lat1: 29 },
  world: { label: 'World', lon0: -180, lon1: 180, lat0: 82, lat1: -60 },
}

const LOST_CATS = ['Sunk', 'Missing']

// ── story chapters ───────────────────────────────────────────────
// Prose gives established historical context; every figure shown in
// the chapter panel is computed from the dataset at runtime.

interface Chapter {
  title: string
  kicker: string
  from: string // YYYY-MM
  to: string
  view: ViewKey
  pack?: string
  boats?: string[] // slugs to feature, resolved against the dataset
  paras: string[]
}

const CHAPTERS: Chapter[] = [
  {
    title: 'The Outbreak',
    kicker: 'September – December 1939',
    from: '1939-09', to: '1939-12', view: 'atl',
    boats: ['u30', 'u47'],
    paras: [
      'The Battle of the Atlantic began within hours of the declaration of war, when U-30 torpedoed the liner SS Athenia on 3 September 1939. In October, Günther Prien took U-47 inside the Royal Navy’s anchorage at Scapa Flow and sank the battleship HMS Royal Oak at her moorings.',
      'The first winter set the pattern of the war at sea: merchant convoys, hunting escorts, and a small U-boat arm probing Britain’s Western Approaches.',
    ],
  },
  {
    title: 'The First Happy Time',
    kicker: 'June 1940 – March 1941',
    from: '1940-06', to: '1941-03', view: 'atl',
    boats: ['u47', 'u99', 'u100'],
    paras: [
      'The fall of France in June 1940 handed the U-boats bases on the Bay of Biscay, putting them hundreds of miles closer to the convoy routes. Aces such as Otto Kretschmer in U-99 and Joachim Schepke in U-100 attacked on the surface at night, inside the convoy columns, and sinkings soared — the crews called it die glückliche Zeit, the happy time.',
      'It ended abruptly. In March 1941 the escorts struck back: U-47, U-99 and U-100 were all lost within eleven days of each other — the dates recorded against each boat below.',
    ],
  },
  {
    title: 'Drumbeat: To America',
    kicker: 'January – July 1942',
    from: '1942-01', to: '1942-07', view: 'usa',
    boats: ['u123'],
    paras: [
      'When the United States entered the war, Dönitz sent his long-range Type IX boats west. Operation Paukenschlag — Drumbeat — opened in January 1942 against an American coast still lit by neon and unconvoyed shipping. Boats like U-123 sank tankers within sight of the shore.',
      'For six months the American seaboard was the deadliest place on the Atlantic. Only the belated adoption of coastal convoys and blackouts brought the “second happy time” to an end.',
    ],
  },
  {
    title: 'The Convoy Crisis',
    kicker: 'August 1942 – March 1943',
    from: '1942-08', to: '1943-03', view: 'atl',
    pack: 'Stürmer',
    paras: [
      'By late 1942 the U-boat arm was at its strongest, and the battle concentrated in the mid-Atlantic “air gap” beyond the reach of shore-based aircraft. Wolfpacks of a dozen or more boats were directed by radio onto the convoy lanes.',
      'The crisis peaked in March 1943, when the packs Raubgraf, Stürmer and Dränger converged on convoys SC 122 and HX 229 in the largest convoy battle of the war. The Stürmer pack’s roster — and where each of its boats ended the war — is highlighted on the chart.',
    ],
  },
  {
    title: 'Black May',
    kicker: 'May 1943',
    from: '1943-05', to: '1943-05', view: 'atl',
    boats: ['u954'],
    paras: [
      'Then, in a single month, the battle turned. Very-long-range Liberators closed the air gap, escort carriers and support groups joined the convoys, and centimetric radar found surfaced boats in the dark. The U-boat losses for May 1943 — counted below from the fate record of every boat — made it the worst month of the war for the Kriegsmarine; the submariners called it Black May.',
      'Among the boats that never came home was U-954, lost with all hands south-east of Cape Farewell — including Peter Dönitz, the admiral’s son. On 24 May Dönitz withdrew his boats from the North Atlantic convoy routes.',
    ],
  },
  {
    title: 'The Long Defeat',
    kicker: 'June 1943 – April 1945',
    from: '1943-06', to: '1945-04', view: 'world',
    paras: [
      'The U-boats fought on for two more years — with acoustic torpedoes, schnorchels and finally the revolutionary Type XXI — but the exchange rate never recovered. Allied aircraft and hunter-killer groups pursued the boats from the Bay of Biscay to the Indian Ocean, while the convoys crossed in growing safety.',
      'The chart tells the story: commissioning kept pace almost to the end, but the losses plotted across these months speak for themselves. Roughly seven in ten of the men who served in the U-boat arm did not survive the war.',
    ],
  },
  {
    title: 'Surrender',
    kicker: 'May 1945',
    from: '1945-05', to: '1945-05', view: 'world',
    paras: [
      'On 4 May 1945 Dönitz ordered his boats to cease operations; the codeword Regenbogen sent scores of crews to scuttle their boats rather than hand them over. The remainder surfaced, hoisted black flags and sailed into Allied ports.',
      'The counts below — scuttled and surrendered in May 1945 alone, computed from the fate of every boat in the record — mark the end of the longest campaign of the Second World War.',
    ],
  },
]

// ── helpers ──────────────────────────────────────────────────────

interface PlotBoat extends UBoat {
  m: number | null // war month of fate
  cm: number | null // war month of commissioning
}

function monthOptions(): { value: number; label: string }[] {
  const out = []
  for (let m = 0; m <= WAR_MONTHS; m++) out.push({ value: m, label: warMonthLabel(m) })
  return out
}

const keyToMonth = (k: string) => isoToWarMonth(`${k}-01`)

// ── component ────────────────────────────────────────────────────

export default function WarChart() {
  const [boats, setBoats] = useState<PlotBoat[] | null>(null)
  const [packs, setPacks] = useState<Record<string, WolfpackMember[]> | null>(null)
  const [land, setLand] = useState<number[][][] | null>(null)
  const [agg, setAgg] = useState<Aggregates | null>(null)
  const [loadError, setLoadError] = useState(false)

  const [view, setView] = useState<ViewKey>('atl')
  const [curM, setCurM] = useState(WAR_MONTHS)
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const [typeFilter, setTypeFilter] = useState('')
  const [rangeFrom, setRangeFrom] = useState(0)
  const [rangeTo, setRangeTo] = useState(WAR_MONTHS)
  const [playing, setPlaying] = useState(false)

  const [trackQuery, setTrackQuery] = useState('')
  const [tracked, setTracked] = useState<PlotBoat | null>(null)
  const [packName, setPackName] = useState('')

  const [chapterIdx, setChapterIdx] = useState<number | null>(null)

  const [tip, setTip] = useState<{ x: number; y: number; b: PlotBoat } | null>(null)

  const mapRef = useRef<HTMLCanvasElement>(null)
  const flowRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const ptsRef = useRef<{ x: number; y: number; b: PlotBoat }[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const reducedMotion = useRef(false)
  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // ── data load ──────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([getUBoats(), getWolfpacks(), getLand(), getAggregates()])
      .then(([u, w, l, a]) => {
        setBoats(u.boats.map((b) => ({
          ...b,
          m: isoToWarMonth(b.fate_date),
          cm: isoToWarMonth(b.commissioned_iso),
        })))
        setPacks(w)
        setLand(l)
        setAgg(a)
      })
      .catch(() => setLoadError(true))
  }, [])

  // ── deep links: ?boat= / ?pack= ────────────────────────────────
  useEffect(() => {
    if (!boats || !packs) return
    const sp = new URLSearchParams(window.location.search)
    const boatQ = sp.get('boat')
    const packQ = sp.get('pack')
    if (boatQ) {
      const norm = boatQ.toLowerCase().replace(/[^a-z0-9]/g, '')
      const b = boats.find(
        (x) => x.slug === boatQ.toLowerCase() || x.slug === norm ||
               x.boat.toLowerCase().replace(/[^a-z0-9]/g, '') === norm,
      )
      if (b) { setTracked(b); setTrackQuery(b.boat) }
    }
    if (packQ && packs[packQ]) setPackName(packQ)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boats, packs])

  const types = useMemo(
    () => (boats ? Array.from(new Set(boats.map((b) => b.type))).sort() : []),
    [boats],
  )

  const packMembers = useMemo(
    () => (packName && packs ? packs[packName] ?? [] : []),
    [packName, packs],
  )
  const packSlugs = useMemo(
    () => new Set(packMembers.map((m) => m.slug)),
    [packMembers],
  )

  // boats matching current filters (independent of coords)
  const matching = useMemo(() => {
    if (!boats) return []
    return boats.filter((b) => {
      if (hidden.has(b.fate_category)) return false
      if (typeFilter && b.type !== typeFilter) return false
      if (b.m !== null && (b.m < rangeFrom || b.m > rangeTo)) return false
      if (b.m !== null && b.m > curM) return false
      return true
    })
  }, [boats, hidden, typeFilter, rangeFrom, rangeTo, curM])

  const plottable = useMemo(() => matching.filter((b) => b.lat !== null), [matching])

  const destroyedToDate = useMemo(() => {
    if (!boats) return 0
    return boats.filter((b) => b.m !== null && b.m <= curM && LOST_CATS.includes(b.fate_category)).length
  }, [boats, curM])

  // ── map drawing ────────────────────────────────────────────────
  const draw = useCallback(() => {
    const cv = mapRef.current
    if (!cv || !land || !boats) return
    const V = VIEWS[view]
    const w = cv.clientWidth
    const aspect = (V.lon1 - V.lon0) / ((V.lat0 - V.lat1) * 1.4)
    const h = Math.min(640, Math.max(340, w / aspect))
    cv.style.height = `${h}px`
    const dpr = window.devicePixelRatio || 1
    cv.width = w * dpr
    cv.height = h * dpr
    const cx = cv.getContext('2d')
    if (!cx) return
    cx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const px = (lon: number, lat: number): [number, number] => [
      ((lon - V.lon0) / (V.lon1 - V.lon0)) * w,
      ((V.lat0 - lat) / (V.lat0 - V.lat1)) * h,
    ]
    cx.fillStyle = SEA
    cx.fillRect(0, 0, w, h)
    // graticule
    cx.strokeStyle = GRID
    cx.lineWidth = 0.6
    cx.beginPath()
    for (let lon = -180; lon <= 180; lon += 10) {
      const [x] = px(lon, 0)
      if (x >= 0 && x <= w) { cx.moveTo(x, 0); cx.lineTo(x, h) }
    }
    for (let lat = -80; lat <= 80; lat += 10) {
      const [, y] = px(0, lat)
      if (y >= 0 && y <= h) { cx.moveTo(0, y); cx.lineTo(w, y) }
    }
    cx.stroke()
    // land
    cx.fillStyle = LAND_FILL
    cx.strokeStyle = LAND_EDGE
    cx.lineWidth = 0.8
    for (const ring of land) {
      cx.beginPath()
      for (let i = 0; i < ring.length; i++) {
        const [x, y] = px(ring[i][0], ring[i][1])
        i ? cx.lineTo(x, y) : cx.moveTo(x, y)
      }
      cx.closePath(); cx.fill(); cx.stroke()
    }
    // markers
    const pts: { x: number; y: number; b: PlotBoat }[] = []
    const packActive = packSlugs.size > 0
    for (const b of plottable) {
      const [x, y] = px(b.lon as number, b.lat as number)
      if (x < -6 || x > w + 6 || y < -6 || y > h + 6) continue
      const recent = b.m !== null && curM - b.m <= 1
      const inPack = packActive && packSlugs.has(b.slug)
      const dimmed = packActive && !inPack
      cx.beginPath()
      cx.arc(x, y, recent ? 4.4 : 3, 0, 7)
      cx.fillStyle = fateColour(b.fate_category)
      cx.globalAlpha = dimmed ? 0.12 : recent ? 1 : 0.82
      cx.fill()
      cx.globalAlpha = 1
      if (recent && !dimmed) {
        cx.strokeStyle = fateColour(b.fate_category)
        cx.lineWidth = 1
        cx.beginPath(); cx.arc(x, y, 7.5, 0, 7); cx.stroke()
      }
      if (inPack) {
        cx.strokeStyle = '#F8F4EE'
        cx.lineWidth = 1.2
        cx.beginPath(); cx.arc(x, y, 6.5, 0, 7); cx.stroke()
      }
      pts.push({ x, y, b })
    }
    // tracked boat
    if (tracked && tracked.lat !== null && tracked.lon !== null) {
      const [x, y] = px(tracked.lon, tracked.lat)
      if (x >= -20 && x <= w + 20 && y >= -20 && y <= h + 20) {
        cx.strokeStyle = '#7ECECE'
        cx.lineWidth = 0.8
        cx.setLineDash([4, 4])
        cx.beginPath()
        cx.moveTo(0, y); cx.lineTo(w, y)
        cx.moveTo(x, 0); cx.lineTo(x, h)
        cx.stroke()
        cx.setLineDash([])
        cx.lineWidth = 1.6
        cx.beginPath(); cx.arc(x, y, 9, 0, 7); cx.stroke()
        cx.fillStyle = '#7ECECE'
        cx.font = 'bold 12px Montserrat, sans-serif'
        cx.fillText(tracked.boat, Math.min(x + 12, w - 60), Math.max(y - 10, 14))
      }
    }
    ptsRef.current = pts
  }, [land, boats, view, plottable, curM, packSlugs, tracked])

  useEffect(() => { draw() }, [draw])
  useEffect(() => {
    const onResize = () => draw()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [draw])

  // ── flow chart (commissioned vs lost) ──────────────────────────
  const drawFlow = useCallback(() => {
    const cv = flowRef.current
    if (!cv || !agg) return
    const dpr = window.devicePixelRatio || 1
    const w = cv.clientWidth
    const h = 220
    cv.width = w * dpr
    cv.height = h * dpr
    const cx = cv.getContext('2d')
    if (!cx) return
    cx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cx.clearRect(0, 0, w, h)
    const pad = { l: 8, r: 8, t: 12, b: 22 }
    const iw = w - pad.l - pad.r
    const ih = h - pad.t - pad.b
    const mid = pad.t + ih * 0.48
    let maxC = 0
    let maxL = 0
    for (let m = 0; m <= WAR_MONTHS; m++) {
      maxC = Math.max(maxC, agg.comm[warMonthKey(m)] || 0)
      maxL = Math.max(maxL, agg.lost[warMonthKey(m)] || 0)
    }
    const bw = iw / (WAR_MONTHS + 1)
    // chapter shading
    if (chapterIdx !== null) {
      const ch = CHAPTERS[chapterIdx]
      const m0 = keyToMonth(ch.from) ?? 0
      const m1 = keyToMonth(ch.to) ?? WAR_MONTHS
      cx.fillStyle = 'rgba(126,206,206,0.08)'
      cx.fillRect(pad.l + m0 * bw, pad.t, (m1 - m0 + 1) * bw, ih)
    }
    for (let m = 0; m <= WAR_MONTHS; m++) {
      const x = pad.l + m * bw
      const c = agg.comm[warMonthKey(m)] || 0
      const l = agg.lost[warMonthKey(m)] || 0
      cx.fillStyle = '#5d7b8c'
      const ch2 = (c / maxC) * (ih * 0.46)
      cx.fillRect(x, mid - ch2, Math.max(bw - 1.2, 1), ch2)
      cx.fillStyle = FATE_COLOURS.Sunk
      const lh = (l / maxL) * (ih * 0.5)
      cx.fillRect(x, mid + 2, Math.max(bw - 1.2, 1), lh)
    }
    // axis + years
    cx.strokeStyle = PANEL_BORDER
    cx.beginPath(); cx.moveTo(pad.l, mid + 1); cx.lineTo(w - pad.r, mid + 1); cx.stroke()
    cx.fillStyle = INK_DIM
    cx.font = '10.5px "Courier Prime", monospace'
    cx.textAlign = 'center'
    for (let y = 1940; y <= 1945; y++) {
      const m = y * 12 - (1939 * 12 + 8)
      const x = pad.l + m * bw
      cx.fillText(String(y), x, h - 6)
      cx.strokeStyle = GRID
      cx.beginPath(); cx.moveTo(x, pad.t); cx.lineTo(x, h - pad.b); cx.stroke()
    }
    // current month marker
    const xm = pad.l + curM * bw
    cx.strokeStyle = '#7ECECE'
    cx.lineWidth = 1.4
    cx.beginPath(); cx.moveTo(xm, pad.t); cx.lineTo(xm, h - pad.b); cx.stroke()
    // tracked boat span
    if (tracked && tracked.cm !== null) {
      const m0 = Math.max(0, tracked.cm)
      const m1 = tracked.m ?? WAR_MONTHS
      cx.fillStyle = 'rgba(126,206,206,0.25)'
      cx.fillRect(pad.l + m0 * bw, pad.t, Math.max((m1 - m0) * bw, 2), 4)
    }
    cx.textAlign = 'left'
    cx.fillStyle = '#8fa4b1'
    cx.fillText(`commissioned ↑ (max ${maxC}/mo)`, pad.l + 4, pad.t + 10)
    cx.fillStyle = FATE_COLOURS.Sunk
    cx.fillText(`lost at sea ↓ (max ${maxL}/mo)`, pad.l + 4, h - pad.b - 6)
  }, [agg, curM, chapterIdx, tracked])

  useEffect(() => { drawFlow() }, [drawFlow])
  useEffect(() => {
    const onResize = () => drawFlow()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [drawFlow])

  // ── replay ─────────────────────────────────────────────────────
  const stopReplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    setPlaying(false)
  }, [])

  const startReplay = useCallback((fromM = 0, toM = WAR_MONTHS) => {
    stopReplay()
    if (reducedMotion.current) { setCurM(toM); return }
    setCurM(fromM)
    setPlaying(true)
    timerRef.current = setInterval(() => {
      setCurM((m) => {
        if (m >= toM) {
          if (timerRef.current) clearInterval(timerRef.current)
          timerRef.current = null
          setPlaying(false)
          return m
        }
        return m + 1
      })
    }, 190)
  }, [stopReplay])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  // ── story mode ─────────────────────────────────────────────────
  const enterChapter = useCallback((idx: number) => {
    const ch = CHAPTERS[idx]
    setChapterIdx(idx)
    setView(ch.view)
    setTypeFilter('')
    setHidden(new Set())
    const m0 = keyToMonth(ch.from) ?? 0
    const m1 = keyToMonth(ch.to) ?? WAR_MONTHS
    setRangeFrom(0)
    setRangeTo(WAR_MONTHS)
    setPackName(ch.pack ?? '')
    setTracked(null)
    startReplay(Math.max(0, m0 - 1), m1)
  }, [startReplay])

  const exitStory = useCallback(() => {
    setChapterIdx(null)
    setPackName('')
    stopReplay()
    setCurM(WAR_MONTHS)
    setView('atl')
  }, [stopReplay])

  const chapterStats = useMemo(() => {
    if (chapterIdx === null || !boats) return null
    const ch = CHAPTERS[chapterIdx]
    const m0 = keyToMonth(ch.from) ?? 0
    const m1 = keyToMonth(ch.to) ?? WAR_MONTHS
    const inRange = (m: number | null) => m !== null && m >= m0 && m <= m1
    const lost = boats.filter((b) => LOST_CATS.includes(b.fate_category) && inRange(b.m))
    const commissioned = boats.filter((b) => inRange(b.cm))
    const scuttled = boats.filter((b) => b.fate_category === 'Scuttled' && inRange(b.m))
    const surrendered = boats.filter((b) => b.fate_category === 'Surrendered' && inRange(b.m))
    const featured = (ch.boats ?? [])
      .map((slug) => boats.find((b) => b.slug === slug))
      .filter((b): b is PlotBoat => Boolean(b))
    return { lost, commissioned, scuttled, surrendered, featured, m0, m1 }
  }, [chapterIdx, boats])

  // ── tooltip ────────────────────────────────────────────────────
  const onMapMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = (e.target as HTMLCanvasElement).getBoundingClientRect()
    const mx = e.clientX - r.left
    const my = e.clientY - r.top
    let best: { x: number; y: number; b: PlotBoat } | null = null
    let bd = 120
    for (const p of ptsRef.current) {
      const d = (p.x - mx) ** 2 + (p.y - my) ** 2
      if (d < bd) { bd = d; best = p }
    }
    setTip(best ? { x: mx, y: my, b: best.b } : null)
  }, [])

  // ── track search ───────────────────────────────────────────────
  const trackMatches = useMemo(() => {
    if (!boats || trackQuery.trim().length < 2) return []
    const q = trackQuery.trim().toLowerCase()
    return boats.filter((b) => b.boat.toLowerCase().includes(q)).slice(0, 8)
  }, [boats, trackQuery])

  const selectTracked = useCallback((b: PlotBoat | null) => {
    setTracked(b)
    setTrackQuery(b ? b.boat : '')
    const url = new URL(window.location.href)
    if (b) url.searchParams.set('boat', b.slug)
    else url.searchParams.delete('boat')
    window.history.replaceState(null, '', url.toString())
  }, [])

  const selectPack = useCallback((name: string) => {
    setPackName(name)
    const url = new URL(window.location.href)
    if (name) url.searchParams.set('pack', name)
    else url.searchParams.delete('pack')
    window.history.replaceState(null, '', url.toString())
  }, [])

  // ── render ─────────────────────────────────────────────────────
  if (loadError) {
    return (
      <p className="font-mono text-sm py-20 text-center" style={{ color: '#E07B45' }}>
        The chart data could not be loaded. Please try again later.
      </p>
    )
  }

  const selStyle: React.CSSProperties = {
    background: 'rgba(13,48,64,0.6)',
    border: `1px solid ${PANEL_BORDER}`,
    color: '#F8F4EE',
    padding: '0.45rem 0.6rem',
    fontSize: '0.8rem',
    outline: 'none',
  }

  const chapter = chapterIdx !== null ? CHAPTERS[chapterIdx] : null

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={wrapRef}>
      {/* ── story mode bar ── */}
      <div
        className="border p-4 lg:p-5 mb-6 flex flex-wrap items-center gap-3"
        style={{ borderColor: PANEL_BORDER, background: 'rgba(13,48,64,0.45)' }}
      >
        <span
          className="font-mono text-[10px] uppercase"
          style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
        >
          Story of the Battle
        </span>
        <div className="flex flex-wrap gap-2">
          {CHAPTERS.map((ch, i) => (
            <button
              key={ch.title}
              onClick={() => enterChapter(i)}
              className="font-mono text-xs px-2.5 py-1.5 border transition-colors hover:bg-teal-light hover:text-slate-deep"
              style={{
                borderColor: chapterIdx === i ? '#7ECECE' : 'rgba(126,206,206,0.35)',
                color: chapterIdx === i ? '#0d3040' : '#7ECECE',
                background: chapterIdx === i ? '#7ECECE' : 'transparent',
                letterSpacing: '0.05em',
              }}
              aria-pressed={chapterIdx === i}
            >
              {i + 1}. {ch.title}
            </button>
          ))}
          {chapter && (
            <button
              onClick={exitStory}
              className="font-mono text-xs px-2.5 py-1.5 underline"
              style={{ color: INK_DIM }}
            >
              Exit story
            </button>
          )}
        </div>
      </div>

      {/* ── chapter panel ── */}
      {chapter && chapterStats && (
        <div
          className="border border-l-4 p-6 lg:p-8 mb-6"
          style={{ borderColor: PANEL_BORDER, borderLeftColor: '#7ECECE', background: 'rgba(13,48,64,0.6)' }}
          aria-live="polite"
        >
          <p className="font-mono text-xs uppercase mb-2" style={{ color: '#7ECECE', letterSpacing: '0.2em' }}>
            Chapter {chapterIdx! + 1} · {chapter.kicker}
          </p>
          <h3
            className="font-montserrat font-extrabold uppercase mb-4"
            style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)', color: '#F8F4EE', letterSpacing: '0.08em' }}
          >
            {chapter.title}
          </h3>
          {chapter.paras.map((p, i) => (
            <p key={i} className="font-montserrat text-sm lg:text-base leading-relaxed mb-3 max-w-3xl" style={{ color: INK_DIM }}>
              {p}
            </p>
          ))}

          {/* computed figures */}
          <div className="flex flex-wrap gap-6 mt-5">
            <div>
              <span className="font-montserrat font-black block" style={{ fontSize: '1.5rem', color: FATE_COLOURS.Sunk }}>
                {numberFmt(chapterStats.lost.length)}
              </span>
              <span className="font-mono text-[10px] uppercase" style={{ color: INK_DIM, letterSpacing: '0.12em' }}>
                boats destroyed at sea in this period
              </span>
            </div>
            <div>
              <span className="font-montserrat font-black block" style={{ fontSize: '1.5rem', color: '#8fa4b1' }}>
                {numberFmt(chapterStats.commissioned.length)}
              </span>
              <span className="font-mono text-[10px] uppercase" style={{ color: INK_DIM, letterSpacing: '0.12em' }}>
                boats commissioned in this period
              </span>
            </div>
            {chapterIdx === CHAPTERS.length - 1 && (
              <>
                <div>
                  <span className="font-montserrat font-black block" style={{ fontSize: '1.5rem', color: FATE_COLOURS.Scuttled }}>
                    {numberFmt(chapterStats.scuttled.length)}
                  </span>
                  <span className="font-mono text-[10px] uppercase" style={{ color: INK_DIM, letterSpacing: '0.12em' }}>
                    scuttled by their crews
                  </span>
                </div>
                <div>
                  <span className="font-montserrat font-black block" style={{ fontSize: '1.5rem', color: FATE_COLOURS.Surrendered }}>
                    {numberFmt(chapterStats.surrendered.length)}
                  </span>
                  <span className="font-mono text-[10px] uppercase" style={{ color: INK_DIM, letterSpacing: '0.12em' }}>
                    surrendered
                  </span>
                </div>
              </>
            )}
          </div>

          {/* featured boats, resolved from the dataset */}
          {chapterStats.featured.length > 0 && (
            <div className="mt-5">
              <p className="font-mono text-[10px] uppercase mb-2" style={{ color: '#7ECECE', letterSpacing: '0.15em' }}>
                From the record
              </p>
              <div className="flex flex-wrap gap-2">
                {chapterStats.featured.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/atlantic/u-boats?boat=${b.slug}`}
                    className="font-mono text-xs px-2.5 py-1.5 border hover:bg-teal-light hover:text-slate-deep transition-colors"
                    style={{ borderColor: fateColour(b.fate_category), color: fateColour(b.fate_category), letterSpacing: '0.05em' }}
                  >
                    {b.boat} · {b.fate_category}{b.fate_date ? ` ${formatIso(b.fate_date)}` : ''}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {chapterIdx! > 0 && (
              <button
                onClick={() => enterChapter(chapterIdx! - 1)}
                className="font-montserrat font-bold text-xs uppercase px-4 py-2 border hover:bg-teal-light hover:text-slate-deep transition-colors"
                style={{ borderColor: '#7ECECE', color: '#7ECECE', letterSpacing: '0.12em' }}
              >
                ← Previous
              </button>
            )}
            {chapterIdx! < CHAPTERS.length - 1 && (
              <button
                onClick={() => enterChapter(chapterIdx! + 1)}
                className="font-montserrat font-bold text-xs uppercase px-4 py-2 border hover:bg-teal-light hover:text-slate-deep transition-colors"
                style={{ borderColor: '#7ECECE', color: '#7ECECE', letterSpacing: '0.12em' }}
              >
                Next chapter →
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── filters ── */}
      <div
        className="border p-4 lg:p-5 mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        style={{ borderColor: PANEL_BORDER, background: 'rgba(13,48,64,0.45)' }}
      >
        <div>
          <span className="block font-mono text-[10px] uppercase mb-1" style={{ color: '#7ECECE', letterSpacing: '0.15em' }}>
            U-boat type
          </span>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ ...selStyle, width: '100%' }} aria-label="Filter by U-boat type">
            <option value="">All types</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase mb-1" style={{ color: '#7ECECE', letterSpacing: '0.15em' }}>
            Losses between
          </span>
          <div className="flex gap-2 items-center">
            <select value={rangeFrom} onChange={(e) => setRangeFrom(Number(e.target.value))} style={{ ...selStyle, flex: 1 }} aria-label="Losses from month">
              {monthOptions().map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <span className="font-mono text-xs" style={{ color: INK_DIM }}>–</span>
            <select value={rangeTo} onChange={(e) => setRangeTo(Number(e.target.value))} style={{ ...selStyle, flex: 1 }} aria-label="Losses to month">
              {monthOptions().map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <div className="relative">
          <span className="block font-mono text-[10px] uppercase mb-1" style={{ color: '#7ECECE', letterSpacing: '0.15em' }}>
            Track a boat
          </span>
          <input
            type="search"
            value={trackQuery}
            onChange={(e) => { setTrackQuery(e.target.value); if (tracked) setTracked(null) }}
            placeholder="e.g. U-534"
            style={{ ...selStyle, width: '100%' }}
            aria-label="Search for a U-boat to track"
          />
          {trackMatches.length > 0 && !tracked && (
            <ul
              className="absolute z-20 left-0 right-0 mt-1 border max-h-56 overflow-y-auto"
              style={{ background: '#0d3040', borderColor: PANEL_BORDER }}
            >
              {trackMatches.map((b) => (
                <li key={b.slug}>
                  <button
                    onClick={() => selectTracked(b)}
                    className="w-full text-left px-3 py-2 font-mono text-xs hover:bg-[rgba(126,206,206,0.12)]"
                    style={{ color: '#F8F4EE' }}
                  >
                    {b.boat} <span style={{ color: INK_DIM }}>· {b.type} · {b.fate_category}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {tracked && (
            <button
              onClick={() => selectTracked(null)}
              className="mt-1 font-mono text-[10px] uppercase underline"
              style={{ color: INK_DIM }}
            >
              Clear tracking
            </button>
          )}
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase mb-1" style={{ color: '#7ECECE', letterSpacing: '0.15em' }}>
            Wolfpack
          </span>
          <select
            value={packName}
            onChange={(e) => selectPack(e.target.value)}
            style={{ ...selStyle, width: '100%' }}
            aria-label="Highlight a wolfpack"
          >
            <option value="">None selected</option>
            {packs && Object.keys(packs).map((p) => <option key={p} value={p}>{p} ({packs[p].length})</option>)}
          </select>
        </div>
      </div>

      {/* ── live counts ── */}
      <p className="font-mono text-xs mb-3" style={{ color: '#7ECECE', letterSpacing: '0.08em' }} aria-live="polite">
        {boats
          ? `${numberFmt(matching.length)} boats match · ${numberFmt(plottable.length)} plotted (${numberFmt(matching.length - plottable.length)} without recorded position) · ${numberFmt(destroyedToDate)} destroyed at sea to date`
          : 'Loading chart data…'}
      </p>

      {/* ── map ── */}
      <div className="relative border" style={{ borderColor: PANEL_BORDER }}>
        <canvas
          ref={mapRef}
          className="w-full block"
          onMouseMove={onMapMove}
          onMouseLeave={() => setTip(null)}
          role="img"
          aria-label="Chart of U-boat final positions. Use the filters and boat list for a text alternative."
        />
        {/* view buttons */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {(Object.keys(VIEWS) as ViewKey[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="font-mono text-[11px] px-2 py-1 border transition-colors"
              style={{
                borderColor: view === v ? '#7ECECE' : 'rgba(126,206,206,0.35)',
                background: view === v ? '#7ECECE' : 'rgba(13,40,54,0.85)',
                color: view === v ? '#0d3040' : '#7ECECE',
              }}
              aria-pressed={view === v}
            >
              {VIEWS[v].label}
            </button>
          ))}
        </div>
        {/* legend */}
        <div
          className="absolute bottom-3 left-3 flex flex-wrap gap-x-3 gap-y-1 px-3 py-2"
          style={{ background: 'rgba(13,40,54,0.85)', border: `1px solid ${PANEL_BORDER}` }}
        >
          {Object.keys(FATE_COLOURS).map((f) => (
            <button
              key={f}
              onClick={() => setHidden((h) => {
                const n = new Set(h)
                n.has(f) ? n.delete(f) : n.add(f)
                return n
              })}
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase"
              style={{
                color: hidden.has(f) ? 'rgba(248,244,238,0.3)' : INK_DIM,
                letterSpacing: '0.08em',
                textDecoration: hidden.has(f) ? 'line-through' : 'none',
              }}
              aria-pressed={!hidden.has(f)}
              aria-label={`Toggle ${f} boats`}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: FATE_COLOURS[f], opacity: hidden.has(f) ? 0.25 : 1 }}
              />
              {f}
            </button>
          ))}
        </div>
        {/* tooltip */}
        {tip && (
          <div
            className="absolute z-30 max-w-xs px-3 py-2 pointer-events-none"
            style={{
              left: Math.min(tip.x + 14, (mapRef.current?.clientWidth ?? 400) - 280),
              top: Math.max(tip.y - 10, 8),
              background: '#0d3040',
              border: `1px solid ${PANEL_BORDER}`,
              borderLeft: `3px solid ${fateColour(tip.b.fate_category)}`,
            }}
          >
            <p className="font-montserrat font-bold text-sm text-offwhite">
              {tip.b.boat} · Type {tip.b.type}
            </p>
            <p className="font-mono text-[10px] uppercase mb-1" style={{ color: fateColour(tip.b.fate_category), letterSpacing: '0.1em' }}>
              {tip.b.fate_category}{tip.b.fate_date ? ` · ${formatIso(tip.b.fate_date)}` : ''}
            </p>
            <p className="font-montserrat text-xs leading-snug" style={{ color: INK_DIM }}>
              {tip.b.fate.length > 220 ? `${tip.b.fate.slice(0, 220)}…` : tip.b.fate}
            </p>
          </div>
        )}
      </div>

      {/* ── replay controls ── */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <button
          onClick={() => (playing ? stopReplay() : startReplay(0, WAR_MONTHS))}
          className="font-montserrat font-bold text-xs uppercase px-5 py-2.5 border hover:bg-teal-light hover:text-slate-deep transition-colors"
          style={{ borderColor: '#7ECECE', color: '#7ECECE', letterSpacing: '0.15em' }}
        >
          {playing ? '❚❚ Pause' : '▶ Replay the war'}
        </button>
        <span className="font-mono text-sm" style={{ color: '#7ECECE', minWidth: 90 }}>
          {warMonthLabel(curM)}
        </span>
        <input
          type="range"
          min={0}
          max={WAR_MONTHS}
          value={curM}
          onChange={(e) => { stopReplay(); setCurM(Number(e.target.value)) }}
          className="flex-1 min-w-[180px] accent-[#7ECECE]"
          aria-label="Date scrubber"
        />
      </div>

      {/* ── tracked boat detail strip ── */}
      {tracked && (
        <div
          className="border border-l-4 p-4 mt-4 flex flex-wrap items-center gap-x-6 gap-y-2"
          style={{ borderColor: PANEL_BORDER, borderLeftColor: '#7ECECE', background: 'rgba(13,48,64,0.6)' }}
        >
          <p className="font-montserrat font-bold text-sm text-offwhite">{tracked.boat} · Type {tracked.type}</p>
          <p className="font-mono text-xs" style={{ color: INK_DIM }}>
            Commissioned {formatIso(tracked.commissioned_iso)} ·{' '}
            <span style={{ color: fateColour(tracked.fate_category) }}>
              {tracked.fate_category}{tracked.fate_date ? ` ${formatIso(tracked.fate_date)}` : ''}
            </span>
            {tracked.lat === null && ' · no recorded final position to plot'}
          </p>
          <Link
            href={`/atlantic/u-boats?boat=${tracked.slug}`}
            className="font-mono text-xs underline"
            style={{ color: '#7ECECE' }}
          >
            Open full record →
          </Link>
        </div>
      )}

      {/* ── wolfpack roster ── */}
      {packName && packMembers.length > 0 && (
        <div
          className="border p-5 mt-4"
          style={{ borderColor: PANEL_BORDER, background: 'rgba(13,48,64,0.45)' }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <h3 className="font-montserrat font-extrabold uppercase text-offwhite" style={{ letterSpacing: '0.08em' }}>
              Wolfpack {packName}
              <span className="font-mono text-xs ml-3" style={{ color: INK_DIM }}>
                {packMembers.length} boats · members highlighted on the chart
              </span>
            </h3>
            <button onClick={() => selectPack('')} className="font-mono text-xs underline" style={{ color: INK_DIM }}>
              Clear
            </button>
          </div>
          <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {packMembers.map((m) => (
              <Link
                key={m.slug}
                href={`/atlantic/u-boats?boat=${m.slug}`}
                className="flex items-baseline justify-between gap-2 py-1.5 border-b hover:bg-[rgba(126,206,206,0.06)]"
                style={{ borderColor: 'rgba(126,206,206,0.1)' }}
              >
                <span className="font-montserrat font-semibold text-sm text-offwhite">{m.boat}</span>
                <span className="font-mono text-[11px]" style={{ color: fateColour(m.fc) }}>
                  {m.fc}{m.fd ? ` · ${formatIso(m.fd)}` : ''}{m.la === null ? ' · unplotted' : ''}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── exchange-rate chart ── */}
      <div className="mt-8">
        <p className="font-mono text-xs uppercase mb-2" style={{ color: '#7ECECE', letterSpacing: '0.2em' }}>
          The Exchange Rate · boats commissioned vs boats lost at sea, monthly
        </p>
        <div className="border p-3" style={{ borderColor: PANEL_BORDER, background: 'rgba(13,48,64,0.45)' }}>
          <canvas
            ref={flowRef}
            className="w-full block"
            style={{ height: 220 }}
            role="img"
            aria-label="Bar chart of U-boats commissioned versus lost at sea for each month of the war"
          />
        </div>
      </div>
    </div>
  )
}
