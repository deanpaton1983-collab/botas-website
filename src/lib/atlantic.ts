// Shared types, constants and helpers for The Battle at Sea section.
// All vessel data derives from the uboat.net dataset (see /atlantic/data).

export const DATA_BASE = '/atlantic/data'

// ── Types ────────────────────────────────────────────────────────

/** Compact warship index row:
 *  [id, name, navy, type, class, pennant, commYear, endYear, eventCount] */
export type WarshipRow = [
  number, string, string, string, string, string,
  number | null, number | null, number,
]

export interface WarshipIndex {
  fields: string[]
  bucketSize: number
  rows: WarshipRow[]
}

export interface WarshipDetail {
  built_by: string
  ordered: string
  laid_down: string
  launched: string
  commissioned: string
  end_service: string
  ordered_iso: string | null
  laid_down_iso: string | null
  launched_iso: string | null
  commissioned_iso: string | null
  end_service_iso: string | null
  history: string
  commanders: string[]
  url: string
  quality_flags: string | null
}

export interface ShipEvents {
  id: number
  name: string
  events: string[]
}

export interface UBoat {
  boat: string
  slug: string
  type: string
  ordered: string
  laid_down: string
  launched: string
  commissioned: string
  ordered_iso: string | null
  laid_down_iso: string | null
  launched_iso: string | null
  commissioned_iso: string | null
  shipyard: string
  commanders: string[]
  career: string
  successes: string
  fate: string
  notes: string | null
  url: string
  fate_category: string
  fate_date: string | null
  lat: number | null
  lon: number | null
  wolfpacks: string[]
}

export interface WolfpackMember {
  boat: string
  slug: string
  type: string
  fc: string
  fd: string | null
  la: number | null
  lo: number | null
}

export interface Aggregates {
  totals: {
    uboats: number
    warships: number
    destroyedAtSea: number
    plottable: number
    alliedEvents: number
    shipsWithEvents: number
    wolfpacks: number
  }
  comm: Record<string, number>
  lost: Record<string, number>
  utype: Record<string, number>
  fates: Record<string, number>
  navy: Record<string, number>
  stype: Record<string, number>
}

// ── Fate colours (site palette) ──────────────────────────────────

export const FATE_COLOURS: Record<string, string> = {
  Sunk: '#E07B45',
  Missing: '#F5ECD7',
  Scuttled: '#9BA8A8',
  Surrendered: '#7ECECE',
  Decommissioned: '#4A9B8E',
  Other: '#6B7F8C',
}

export const fateColour = (fc: string) => FATE_COLOURS[fc] || FATE_COLOURS.Other

// ── Fetch helpers (memoised per session) ─────────────────────────

const cache = new Map<string, Promise<unknown>>()

export function fetchJson<T>(path: string): Promise<T> {
  let p = cache.get(path)
  if (!p) {
    p = fetch(path).then((r) => {
      if (!r.ok) throw new Error(`${r.status} for ${path}`)
      return r.json()
    })
    p.catch(() => cache.delete(path))
    cache.set(path, p)
  }
  return p as Promise<T>
}

export const getWarshipIndex = () =>
  fetchJson<WarshipIndex>(`${DATA_BASE}/warship-index.json`)

export const getWarshipDetailBucket = (id: number, bucketSize: number) =>
  fetchJson<Record<string, WarshipDetail>>(
    `${DATA_BASE}/warship-details/${Math.floor(id / bucketSize)}.json`,
  )

export const getShipEvents = (id: number) =>
  fetchJson<ShipEvents>(`${DATA_BASE}/events/${id}.json`)

export const getUBoats = () =>
  fetchJson<{ boats: UBoat[] }>(`${DATA_BASE}/uboats.json`)

export const getWolfpacks = () =>
  fetchJson<Record<string, WolfpackMember[]>>(`${DATA_BASE}/wolfpacks.json`)

export const getUBoatEvents = () =>
  fetchJson<Record<string, string[]>>(`${DATA_BASE}/uboat-events.json`)

export const getAggregates = () =>
  fetchJson<Aggregates>(`${DATA_BASE}/aggregates.json`)

export const getLand = () =>
  fetchJson<number[][][]>(`${DATA_BASE}/land.json`)

// ── Date / formatting helpers ────────────────────────────────────

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/** "1943-05-24" → "24 May 1943"; "1943-05" → "May 1943"; "1943" → "1943" */
export function formatIso(iso: string | null | undefined): string {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  if (d) return `${parseInt(d, 10)} ${MONTHS[parseInt(m, 10) - 1]} ${y}`
  if (m) return `${MONTHS[parseInt(m, 10) - 1]} ${y}`
  return y
}

/** War month scale: Sep 1939 = 0 … May 1945 = 68 */
export const WAR_M0 = 1939 * 12 + 8
export const WAR_M1 = 1945 * 12 + 4
export const WAR_MONTHS = WAR_M1 - WAR_M0 // 68

export function isoToWarMonth(iso: string | null | undefined): number | null {
  if (!iso || iso.length < 7) return null
  const y = parseInt(iso.slice(0, 4), 10)
  const m = parseInt(iso.slice(5, 7), 10) - 1
  return y * 12 + m - WAR_M0
}

export function warMonthLabel(m: number): string {
  const abs = WAR_M0 + m
  return `${MONTHS[abs % 12]} ${Math.floor(abs / 12)}`
}

export function warMonthKey(m: number): string {
  const abs = WAR_M0 + m
  return `${Math.floor(abs / 12)}-${String((abs % 12) + 1).padStart(2, '0')}`
}

export const numberFmt = (n: number) => n.toLocaleString('en-GB')

/** Events over this length are rendered collapsed with an expander. */
export const MEGA_EVENT_CHARS = 10000

/** True when the event text is just a date heading like "17 Jul 1944". */
export const isDateHeading = (s: string) =>
  /^\d{1,2} [A-Z][a-z]{2} \d{4}$/.test(s.trim())
