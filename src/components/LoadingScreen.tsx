'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ────────────────────────────────────────────────────────────────
   BOTAS cinematic intro
   Phase 1 (0–1.0s)     : static / grain, "INCOMING TRANSMISSION"
   Phase 2 (1.0–6.8s)   : morse code (audio + visual) decodes the
                          title letter-by-letter over archival images
   Phase 3 (~6.8–8.4s)  : sonar ping reveal, title glow, tagline
   Phase 4 (radar)      : radar scope + sweep (with radar audio)
                          paints the North Atlantic — US & British
                          coastlines and the convoy route
   Phase 5 (uk)         : sweep continues, zoom into Great Britain
   Phase 6 (lcr)        : zoom into the Liverpool City Region —
                          pulsing contact dot on Birkenhead (Woodside)
   Audio: WebAudio oscillator. A click-to-enter gate is always shown
   first. Because browsers block autoplay of sound without a user
   gesture, the click both starts the intro AND unlocks audio — so the
   sequence always plays with sound on from its very first frame.
   "Enter silently" is offered for those who prefer no sound (audio can
   still be toggled on later via the speaker control).
   ──────────────────────────────────────────────────────────────── */

const MORSE: Record<string, string> = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  E: '.',
  F: '..-.',
  H: '....',
  I: '..',
  L: '.-..',
  N: '-.',
  O: '---',
  T: '-',
}

const TITLE = 'BATTLE OF THE ATLANTIC'
const TITLE_LINES = ['BATTLE', 'OF THE', 'ATLANTIC']

const UNIT = 34 // ms per morse unit (~30 wpm) → full title ≈ 5.8s
const STATIC_MS = 1000
const REVEAL_HOLD_MS = 1600

type Tone = { start: number; dur: number }
type LetterEvent = { reveal: number; code: string; char: string }

function buildSchedule() {
  const tones: Tone[] = []
  const letters: LetterEvent[] = []
  let t = 0
  for (const ch of TITLE) {
    if (ch === ' ') {
      t += UNIT * 4 // + trailing letter gap (3) = 7-unit word gap
      continue
    }
    const code = MORSE[ch]
    letters.push({ reveal: t, code, char: ch })
    for (const sym of code) {
      const dur = sym === '.' ? UNIT : UNIT * 3
      tones.push({ start: t, dur })
      t += dur + UNIT
    }
    t += UNIT * 2 // letter gap (1 already added) = 3 units
  }
  return { tones, letters, total: t }
}

const SCHEDULE = buildSchedule()
const MORSE_END = STATIC_MS + SCHEDULE.total

/* ── radar / map timeline ── */
const SWEEP_MS = 1700 // one full radar rotation
const RADAR_MS = SWEEP_MS * 2 // Atlantic scene
const UK_MS = 2300 // Great Britain scene
const LCR_MS = 3400 // Liverpool City Region scene

const RADAR_START = MORSE_END + REVEAL_HOLD_MS
const UK_START = RADAR_START + RADAR_MS
const LCR_START = UK_START + UK_MS
const TOTAL_MS = LCR_START + LCR_MS

type Phase = 'signal' | 'title' | 'radar' | 'uk' | 'lcr'
type Gate = 'checking' | 'shown' | 'passed'
const PHASE_ORDER: Record<Phase, number> = {
  signal: 0,
  title: 1,
  radar: 2,
  uk: 3,
  lcr: 4,
}

const IMAGES = [
  {
    src: '/images/Allied_convoy_underway_in_the_Atlantic_Ocean_near_Iceland,_circa_in_1942_(80-G-72409).jpg',
    alt: 'Allied convoy underway in the Atlantic Ocean near Iceland, 1942',
  },
  {
    src: '/images/Depth_charges_explode_astern_of_HMS_STARLING_of_the_2nd_Escort_Group_in_the_Atlantic,_January_1944._A21992.jpg',
    alt: 'Depth charges exploding astern of HMS Starling, 1944',
  },
  {
    src: '/images/U507_under_attack_1943.jpg',
    alt: 'U-507 under attack, 1943',
  },
]

// Image crossfade boundaries (elapsed ms)
const IMG_SWITCH = [
  STATIC_MS + SCHEDULE.total * 0.33,
  STATIC_MS + SCHEDULE.total * 0.66,
]

const TEAL = '#7ECECE'
const AMBER = '#c4832a'

const CAPTIONS: Record<'radar' | 'uk' | 'lcr', string> = {
  radar: 'The North Atlantic · Allied Convoy Routes',
  uk: 'Great Britain · The Western Approaches',
  lcr: 'Woodside, Birkenhead · Museum Location',
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [decoded, setDecoded] = useState(0)
  const [beep, setBeep] = useState(false)
  const [phase, setPhase] = useState<Phase>('signal')
  const [imgIndex, setImgIndex] = useState(0)
  const [soundOn, setSoundOn] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [gate, setGate] = useState<Gate>('checking')

  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const startRef = useRef(0)
  const rafRef = useRef(0)
  const scheduledRef = useRef(false)
  const finishedRef = useRef(false)
  const enabledAtRef = useRef(0)
  const sonarDataRef = useRef<ArrayBuffer | null>(null)
  const sonarBufferRef = useRef<AudioBuffer | null>(null)

  // Prefetch the sonar ping sample so it's ready when audio unlocks
  useEffect(() => {
    let cancelled = false
    fetch('/dragon-studio-deepsea-sonar-386156.mp3')
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()))
      .then((buf) => {
        if (!cancelled) sonarDataRef.current = buf
      })
      .catch(() => {
        /* sample unavailable — synthesised fallback is used */
      })
    return () => {
      cancelled = true
    }
  }, [])

  const atLeast = useCallback(
    (p: Phase) => PHASE_ORDER[phase] >= PHASE_ORDER[p],
    [phase]
  )
  const reveal = atLeast('title')
  const mapPhase = atLeast('radar')

  /* ── audio ── */

  const scheduleTones = useCallback((fromElapsed: number) => {
    const ctx = ctxRef.current
    const gain = gainRef.current
    if (!ctx || !gain || scheduledRef.current) return
    scheduledRef.current = true

    const now = ctx.currentTime

    // Morse tones
    for (const tone of SCHEDULE.tones) {
      const at = STATIC_MS + tone.start
      if (at + tone.dur <= fromElapsed) continue
      const start = now + Math.max(0, at - fromElapsed) / 1000
      const end = start + tone.dur / 1000
      const osc = ctx.createOscillator()
      const env = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 620
      env.gain.setValueAtTime(0, start)
      env.gain.linearRampToValueAtTime(0.16, start + 0.005)
      env.gain.setValueAtTime(0.16, Math.max(start + 0.005, end - 0.015))
      env.gain.linearRampToValueAtTime(0, end)
      osc.connect(env)
      env.connect(gain)
      osc.start(start)
      osc.stop(end + 0.02)
    }

    // Pitched ping helper (sonar / radar / blips)
    const ping = (
      atMs: number,
      f0: number,
      f1: number,
      dur: number,
      level: number
    ) => {
      if (atMs + dur * 1000 <= fromElapsed) return
      const t0 = now + Math.max(0, atMs - fromElapsed) / 1000
      const osc = ctx.createOscillator()
      const env = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(f0, t0)
      osc.frequency.exponentialRampToValueAtTime(f1, t0 + dur)
      env.gain.setValueAtTime(level, t0)
      env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
      osc.connect(env)
      env.connect(gain)
      osc.start(t0)
      osc.stop(t0 + dur + 0.05)
    }

    // Sonar pings (recorded sample): once at the title reveal, then one per
    // radar sweep rotation. Falls back to a synthesised ping if the sample
    // hasn't loaded or can't be decoded.
    const mapTotal = RADAR_MS + UK_MS + LCR_MS
    const sweeps = Math.floor(mapTotal / SWEEP_MS)
    const pingTimes: { at: number; level: number }[] = [
      { at: MORSE_END, level: 1 },
    ]
    for (let i = 0; i <= sweeps; i++) {
      const at = RADAR_START + i * SWEEP_MS
      if (at > TOTAL_MS - 400) break
      pingTimes.push({ at, level: Math.max(0.45, 1 - i * 0.08) })
    }

    const synthFallback = () => {
      for (const { at, level } of pingTimes) {
        ping(at, 1250, 680, 0.9, 0.22 * level)
        ping(at + 550, 1250, 680, 0.9, 0.07 * level)
      }
    }

    // Schedule the recorded sonar pings from an already-decoded buffer.
    const playSonarBuffer = (
      buffer: AudioBuffer,
      baseNow: number,
      baseElapsed: number
    ) => {
      for (const { at, level } of pingTimes) {
        if (at + buffer.duration * 1000 <= baseElapsed) continue
        const start = baseNow + Math.max(0, at - baseElapsed) / 1000
        const src = ctx.createBufferSource()
        src.buffer = buffer
        const env = ctx.createGain()
        env.gain.value = 0.9 * level
        src.connect(env)
        env.connect(gain)
        src.start(start)
      }
    }

    const decodeThenPlay = (data: ArrayBuffer) =>
      ctx
        .decodeAudioData(data.slice(0))
        .then((buffer) => {
          sonarBufferRef.current = buffer
          playSonarBuffer(
            buffer,
            ctx.currentTime,
            fromElapsed + (ctx.currentTime - now) * 1000
          )
        })
        .catch(synthFallback)

    if (sonarBufferRef.current) {
      // Pre-decoded — play immediately, no fallback risk.
      playSonarBuffer(sonarBufferRef.current, now, fromElapsed)
    } else if (sonarDataRef.current) {
      decodeThenPlay(sonarDataRef.current)
    } else {
      // Sample is still downloading. Wait for it (up to 3s) rather than
      // dropping to the synthesised beeps — the recorded ping is the
      // intended sound.
      let waited = 0
      const iv = setInterval(() => {
        if (finishedRef.current) {
          clearInterval(iv)
          return
        }
        waited += 80
        if (sonarDataRef.current) {
          clearInterval(iv)
          decodeThenPlay(sonarDataRef.current)
        } else if (waited >= 3000) {
          clearInterval(iv)
          synthFallback()
        }
      }, 80)
    }

    // Rising blips on each zoom step
    ping(UK_START, 480, 940, 0.35, 0.1)
    ping(LCR_START, 480, 940, 0.35, 0.1)

    // "Contact" blips when the Birkenhead dot appears
    for (const [d, lv] of [
      [0, 0.18],
      [140, 0.14],
      [280, 0.18],
    ] as const) {
      ping(LCR_START + 950 + d, 985, 960, 0.09, lv)
    }
  }, [])

  const enableSound = useCallback(() => {
    if (finishedRef.current) return
    try {
      if (!ctxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext
        ctxRef.current = new Ctx()
        gainRef.current = ctxRef.current.createGain()
        gainRef.current.gain.value = 1
        gainRef.current.connect(ctxRef.current.destination)
      }
      const ctx = ctxRef.current
      const activate = () => {
        if (finishedRef.current) return
        enabledAtRef.current = performance.now()
        setAudioReady(true)
        setSoundOn(true)
        scheduleTones(performance.now() - startRef.current)
      }
      if (ctx.state === 'running') activate()
      else ctx.resume().then(() => ctx.state === 'running' && activate()).catch(() => {})
    } catch {
      /* audio unsupported — visuals continue */
    }
  }, [scheduleTones])

  const toggleSound = useCallback(() => {
    if (!audioReady) {
      enableSound()
      return
    }
    // Ignore the click that just unlocked audio (window listener fires first)
    if (performance.now() - enabledAtRef.current < 300) return
    const gain = gainRef.current
    if (!gain) return
    const next = !soundOn
    gain.gain.value = next ? 1 : 0
    setSoundOn(next)
  }, [audioReady, enableSound, soundOn])

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    cancelAnimationFrame(rafRef.current)
    try {
      sessionStorage.setItem('botas-intro-seen', '1')
    } catch {
      /* storage unavailable — intro will simply replay */
    }
    setVisible(false)
    const ctx = ctxRef.current
    if (ctx) {
      setTimeout(() => ctx.close().catch(() => {}), 1000)
    }
  }, [])

  // Click-to-enter: the gesture unlocks audio, so the intro plays with
  // sound on from its very first frame. `withSound = false` lets visitors
  // enter silently (sound can still be toggled on later).
  const begin = useCallback(
    (withSound: boolean) => {
      setGate((g) => (g === 'passed' ? g : 'passed'))
      startRef.current = performance.now()
      if (withSound) enableSound()
    },
    [enableSound]
  )

  /* ── main timeline ── */

  // Decide, on mount, whether to show the gate. Reduced-motion visitors
  // skip the cinematic sequence (and its audio) entirely.
  useEffect(() => {
    // Play the intro once per browsing session — returning to Home in the
    // same session goes straight to the page.
    let seen = false
    try {
      seen = sessionStorage.getItem('botas-intro-seen') === '1'
    } catch {
      /* storage unavailable */
    }
    if (seen) {
      finishedRef.current = true
      setVisible(false)
      return
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      setGate('passed')
      setDecoded(SCHEDULE.letters.length)
      setPhase('title')
      const t = setTimeout(finish, 1800)
      return () => clearTimeout(t)
    }

    setGate('shown')
  }, [finish])

  /* ── main timeline (runs only once the visitor clicks "Enter") ── */

  useEffect(() => {
    if (gate !== 'passed' || finishedRef.current) return
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reducedMotion) return

    // startRef is set the moment the gate is clicked (see `begin`); fall
    // back to now in case this effect somehow runs first.
    if (!startRef.current) startRef.current = performance.now()

    const loop = () => {
      const e = performance.now() - startRef.current
      const morseElapsed = e - STATIC_MS

      let count = 0
      for (const l of SCHEDULE.letters) {
        if (l.reveal <= morseElapsed) count++
        else break
      }
      setDecoded(count)

      setBeep(
        SCHEDULE.tones.some(
          (t) => morseElapsed >= t.start && morseElapsed < t.start + t.dur
        )
      )

      setImgIndex(e >= IMG_SWITCH[1] ? 2 : e >= IMG_SWITCH[0] ? 1 : 0)

      setPhase(
        e >= LCR_START
          ? 'lcr'
          : e >= UK_START
            ? 'uk'
            : e >= RADAR_START
              ? 'radar'
              : e >= MORSE_END
                ? 'title'
                : 'signal'
      )

      if (e >= TOTAL_MS) {
        finish()
        return
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [gate, finish])

  /* ── rendering ── */

  const currentLetter =
    decoded > 0 && decoded <= SCHEDULE.letters.length
      ? SCHEDULE.letters[decoded - 1]
      : null

  let letterIdx = -1

  const coast = {
    stroke: TEAL,
    strokeWidth: 1.4,
    fill: 'rgba(126,206,206,0.05)',
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
    vectorEffect: 'non-scaling-stroke' as const,
  }
  const openCoast = { ...coast, fill: 'none' }

  const sceneTransition = { duration: 1.5, ease: 'easeInOut' as const }
  const drawIn = (active: boolean, delay = 0) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: active ? 1 : 0 },
    transition: { duration: 1.6, delay, ease: 'easeInOut' as const },
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden"
          style={{ backgroundColor: '#060f1a' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
          aria-label="Battle of the Atlantic Story — introduction"
        >
          {/* Archival imagery, Ken Burns drift (dims under the radar) */}
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: imgIndex === i ? (mapPhase ? 0.18 : 1) : 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            >
              <motion.img
                src={img.src}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
                style={{ filter: 'grayscale(0.55) contrast(1.1) brightness(0.5)' }}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 10, ease: 'linear' }}
              />
            </motion.div>
          ))}

          {/* Deep navy wash + vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(6,15,26,0.45) 0%, rgba(6,15,26,0.88) 78%, #060f1a 100%)',
            }}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)',
            }}
          />

          {/* Film grain */}
          <motion.div
            className="absolute -inset-10 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
              opacity: 0.08,
              mixBlendMode: 'overlay',
            }}
            animate={{ x: [0, -6, 4, -9, 2, 0], y: [0, 5, -7, 3, -4, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Sonar ping burst on reveal */}
          {reveal &&
            !mapPhase &&
            [0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full border pointer-events-none"
                style={{
                  borderColor: TEAL,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ width: 60, height: 60, opacity: 0.8, borderWidth: 2 }}
                animate={{ width: '160vmax', height: '160vmax', opacity: 0 }}
                transition={{ duration: 2.4, delay: i * 0.45, ease: 'easeOut' }}
              />
            ))}

          {/* Teal flash at reveal */}
          {reveal && !mapPhase && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: TEAL }}
              initial={{ opacity: 0.18 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          )}

          {/* ── Title / morse content (fades out for the radar) ── */}
          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center px-6"
            animate={{ opacity: mapPhase ? 0 : 1, y: mapPhase ? -24 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* Transmission header */}
            <motion.div
              className="mb-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: reveal ? 0 : 1 }}
              transition={{ duration: 0.5, delay: reveal ? 0 : 0.2 }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full transition-colors duration-75"
                style={{
                  backgroundColor: beep ? TEAL : 'rgba(126,206,206,0.25)',
                  boxShadow: beep ? `0 0 12px 2px ${TEAL}` : 'none',
                }}
              />
              <motion.span
                className="font-montserrat text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-offwhite/70"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                Incoming Transmission
              </motion.span>
              <span
                className="inline-block h-2 w-2 rounded-full transition-colors duration-75"
                style={{
                  backgroundColor: beep ? TEAL : 'rgba(126,206,206,0.25)',
                  boxShadow: beep ? `0 0 12px 2px ${TEAL}` : 'none',
                }}
              />
            </motion.div>

            {/* Decoding title */}
            <h1 className="text-center font-montserrat font-black uppercase leading-[1.05] tracking-[0.08em] text-offwhite text-4xl sm:text-5xl md:text-7xl">
              {TITLE_LINES.map((line) => (
                <span key={line} className="block">
                  {line.split('').map((ch, ci) => {
                    if (ch !== ' ') letterIdx++
                    const on = ch === ' ' || letterIdx < decoded
                    const isCurrent = ch !== ' ' && letterIdx === decoded - 1 && !reveal
                    return (
                      <motion.span
                        key={`${line}-${ci}`}
                        className="inline-block"
                        style={{
                          minWidth: ch === ' ' ? '0.4em' : undefined,
                          color: isCurrent ? TEAL : undefined,
                          textShadow: reveal
                            ? '0 0 30px rgba(126,206,206,0.55)'
                            : isCurrent
                              ? '0 0 18px rgba(126,206,206,0.8)'
                              : 'none',
                        }}
                        animate={{
                          opacity: on ? 1 : 0.07,
                          y: on ? 0 : 6,
                          scale: isCurrent ? 1.06 : 1,
                        }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                      >
                        {ch === ' ' ? ' ' : ch}
                      </motion.span>
                    )
                  })}
                </span>
              ))}
            </h1>

            {/* Live morse readout / tagline */}
            <div className="mt-8 flex min-h-[2rem] items-center justify-center">
              {!reveal && currentLetter ? (
                <div className="flex items-center gap-4">
                  <span className="font-montserrat text-xs font-bold uppercase tracking-[0.3em]" style={{ color: TEAL }}>
                    {currentLetter.char}
                  </span>
                  <span
                    className="font-mono text-lg tracking-[0.35em]"
                    style={{ color: beep ? TEAL : 'rgba(126,206,206,0.45)' }}
                  >
                    {currentLetter.code.split('').map((s, i) => (
                      <span key={i}>{s === '.' ? '·' : '—'}</span>
                    ))}
                  </span>
                </div>
              ) : reveal ? (
                <motion.div
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <motion.span
                    className="block h-px w-24"
                    style={{ backgroundColor: AMBER }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                  />
                  <span className="font-montserrat text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-offwhite/80 text-center">
                    The longest campaign of the Second World War
                  </span>
                </motion.div>
              ) : null}
            </div>
          </motion.div>

          {/* ── Radar scope + map zoom sequence ── */}
          {mapPhase && (
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6 pointer-events-none"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <div
                className="relative"
                style={{ width: 'min(72vmin, 540px)', height: 'min(72vmin, 540px)' }}
              >
                {/* Scope glow */}
                <div
                  className="absolute -inset-6 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(126,206,206,0.12) 0%, rgba(126,206,206,0.04) 55%, transparent 72%)',
                  }}
                />

                {/* Map area, clipped to the scope circle */}
                <div
                  className="absolute rounded-full overflow-hidden"
                  style={{
                    inset: '2.5%',
                    backgroundColor: 'rgba(6,20,32,0.88)',
                    boxShadow: 'inset 0 0 60px rgba(126,206,206,0.08)',
                  }}
                >
                  {/* Chart grid */}
                  <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    {[50, 100, 150, 200, 250, 300, 350].map((p) => (
                      <g key={p} stroke={TEAL} strokeOpacity="0.07" strokeWidth="0.6">
                        <line x1={p} y1="0" x2={p} y2="400" />
                        <line x1="0" y1={p} x2="400" y2={p} />
                      </g>
                    ))}
                  </svg>

                  {/* ── Scene 1: North Atlantic ── */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ transformOrigin: '86.5% 35.5%' }}
                    animate={{
                      scale: atLeast('uk') ? 3.4 : 1,
                      opacity: atLeast('uk') ? 0 : 1,
                    }}
                    transition={sceneTransition}
                  >
                    <svg viewBox="0 0 400 400" className="h-full w-full">
                      {/* North American eastern seaboard */}
                      <motion.path
                        d="M 26 396 L 34 352 L 40 322 L 38 296 L 46 268 L 44 258 L 56 252 L 62 250 L 70 242 L 78 236 L 90 226 L 100 220 L 96 210 L 108 212 L 120 206 L 128 200 L 136 196 L 130 184 L 124 168 L 120 148 L 112 128 L 106 112 L 98 96"
                        {...openCoast}
                        {...drawIn(true, 0.15)}
                      />
                      {/* Greenland */}
                      <motion.path
                        d="M 148 40 L 170 30 L 190 36 L 200 46 L 192 64 L 182 80 L 172 92 L 162 78 L 152 60 Z"
                        {...coast}
                        {...drawIn(true, 0.5)}
                      />
                      {/* Iceland */}
                      <motion.path
                        d="M 266 54 L 278 44 L 292 50 L 288 62 L 272 63 Z"
                        {...coast}
                        {...drawIn(true, 0.7)}
                      />
                      {/* Ireland */}
                      <motion.path
                        d="M 316 138 L 328 132 L 334 142 L 332 156 L 322 164 L 313 156 L 313 144 Z"
                        {...coast}
                        {...drawIn(true, 0.95)}
                      />
                      {/* Great Britain */}
                      <motion.path
                        d="M 344 98 L 352 104 L 350 118 L 355 132 L 352 146 L 358 158 L 364 156 L 362 170 L 353 177 L 341 179 L 335 170 L 342 160 L 336 150 L 340 138 L 334 128 L 338 112 Z"
                        {...coast}
                        {...drawIn(true, 1.05)}
                      />
                      {/* France / Iberia */}
                      <motion.path
                        d="M 352 188 L 340 193 L 330 201 L 326 215 L 321 238 L 318 262 L 318 288 L 325 301 L 337 305 L 352 301"
                        {...openCoast}
                        {...drawIn(true, 1.2)}
                      />
                      {/* Convoy route: Halifax → Liverpool */}
                      <motion.path
                        d="M 94 222 Q 210 126 346 148"
                        fill="none"
                        stroke={AMBER}
                        strokeWidth="1.3"
                        strokeDasharray="5 6"
                        vectorEffect="non-scaling-stroke"
                        {...drawIn(true, 1.5)}
                      />
                      {/* Convoy blips */}
                      {[
                        [150, 182],
                        [216, 158],
                        [284, 146],
                      ].map(([x, y], i) => (
                        <motion.circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="2.2"
                          fill={AMBER}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0.5, 1] }}
                          transition={{ duration: 1.2, delay: 1.9 + i * 0.25 }}
                        />
                      ))}
                      <motion.text
                        x="60"
                        y="300"
                        className="font-montserrat"
                        fill={TEAL}
                        fillOpacity="0.75"
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="2.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                      >
                        NORTH AMERICA
                      </motion.text>
                      <motion.text
                        x="300"
                        y="212"
                        className="font-montserrat"
                        fill={TEAL}
                        fillOpacity="0.75"
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="2.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.6 }}
                      >
                        BRITAIN
                      </motion.text>
                    </svg>
                  </motion.div>

                  {/* ── Scene 2: Great Britain & Ireland ── */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ transformOrigin: '61% 58%' }}
                    initial={{ scale: 0.38, opacity: 0 }}
                    animate={{
                      scale: atLeast('lcr') ? 3.6 : atLeast('uk') ? 1 : 0.38,
                      opacity: atLeast('lcr') ? 0 : atLeast('uk') ? 1 : 0,
                    }}
                    transition={sceneTransition}
                  >
                    <svg viewBox="0 0 400 400" className="h-full w-full">
                      {/* Great Britain */}
                      <motion.path
                        d="M 185 20 L 200 28 L 214 44 L 232 58 L 258 68 L 277 78 L 264 100 L 250 124 L 264 132 L 282 152 L 302 182 L 322 206 L 338 228 L 345 252 L 360 262 L 390 270 L 381 300 L 378 330 L 352 344 L 320 338 L 291 350 L 255 356 L 221 362 L 186 372 L 166 378 L 190 351 L 212 340 L 232 330 L 246 324 L 226 318 L 200 314 L 178 307 L 190 290 L 200 278 L 196 258 L 194 240 L 210 236 L 228 239 L 243 233 L 240 218 L 240 202 L 231 184 L 222 176 L 205 168 L 191 152 L 196 140 L 178 128 L 168 108 L 160 84 L 170 58 Z"
                        {...coast}
                        {...drawIn(atLeast('uk'), 0.2)}
                      />
                      {/* Ireland */}
                      <motion.path
                        d="M 148 188 L 156 220 L 154 256 L 150 282 L 120 300 L 88 312 L 60 306 L 36 292 L 42 250 L 46 200 L 70 172 L 96 158 L 124 164 Z"
                        {...coast}
                        {...drawIn(atLeast('uk'), 0.45)}
                      />
                      {/* Liverpool contact ring */}
                      <motion.circle
                        cx="243"
                        cy="232"
                        r="10"
                        fill="none"
                        stroke={AMBER}
                        strokeWidth="1.4"
                        vectorEffect="non-scaling-stroke"
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={
                          atLeast('uk')
                            ? { opacity: [0, 1, 0.5, 1], scale: 1 }
                            : { opacity: 0 }
                        }
                        transition={{ duration: 0.9, delay: 1.0 }}
                        style={{ transformOrigin: '243px 232px' }}
                      />
                      <motion.circle
                        cx="243"
                        cy="232"
                        r="3"
                        fill={AMBER}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: atLeast('uk') ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: 1.1 }}
                      />
                      <motion.text
                        x="262"
                        y="228"
                        className="font-montserrat"
                        fill={AMBER}
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: atLeast('uk') ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 1.25 }}
                      >
                        LIVERPOOL
                      </motion.text>
                    </svg>
                  </motion.div>

                  {/* ── Scene 3: Liverpool City Region ── */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 0.34, opacity: 0 }}
                    animate={{
                      scale: atLeast('lcr') ? 1 : 0.34,
                      opacity: atLeast('lcr') ? 1 : 0,
                    }}
                    transition={sceneTransition}
                  >
                    <svg viewBox="0 0 400 400" className="h-full w-full">
                      {/* Wirral peninsula: Dee shore → north coast → Mersey west bank */}
                      <motion.path
                        d="M 118 396 L 106 348 L 96 302 L 78 258 L 62 216 L 48 178 L 40 160 L 66 150 L 96 144 L 126 140 L 150 140 L 160 148 L 166 172 L 170 190 L 174 206 L 170 226 L 168 248 L 174 268 L 182 288 L 204 314 L 232 336 L 268 352 L 310 362 L 356 368 L 398 372"
                        {...openCoast}
                        {...drawIn(atLeast('lcr'), 0.25)}
                      />
                      {/* Sefton / Liverpool shore: Formby → Crosby → Mersey east bank */}
                      <motion.path
                        d="M 252 4 L 242 36 L 230 74 L 218 112 L 206 140 L 197 158 L 196 178 L 197 194 L 202 218 L 210 240 L 224 262 L 242 278 L 268 294 L 302 306 L 338 314 L 372 318 L 398 320"
                        {...openCoast}
                        {...drawIn(atLeast('lcr'), 0.45)}
                      />
                      {/* Place labels */}
                      {(
                        [
                          { x: 84, y: 232, t: 'WIRRAL', d: 0.9 },
                          { x: 244, y: 200, t: 'LIVERPOOL', d: 1.0 },
                          { x: 236, y: 328, t: 'RIVER MERSEY', d: 1.1, r: 14 },
                          { x: 66, y: 118, t: 'LIVERPOOL BAY', d: 1.2 },
                        ] as { x: number; y: number; t: string; d: number; r?: number }[]
                      ).map((l) => (
                        <motion.text
                          key={l.t}
                          x={l.x}
                          y={l.y}
                          className="font-montserrat"
                          fill={TEAL}
                          fillOpacity="0.7"
                          fontSize="9.5"
                          fontWeight="700"
                          letterSpacing="2.2"
                          transform={l.r ? `rotate(${l.r} ${l.x} ${l.y})` : undefined}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: atLeast('lcr') ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: l.d }}
                        >
                          {l.t}
                        </motion.text>
                      ))}
                      {/* Birkenhead — museum contact */}
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: atLeast('lcr') ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 0.95 }}
                      >
                        {[0, 1].map((i) => (
                          <motion.circle
                            key={i}
                            cx="174"
                            cy="206"
                            r="6"
                            fill="none"
                            stroke={AMBER}
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                            initial={{ scale: 0.5, opacity: 0.9 }}
                            animate={{ scale: 4.2, opacity: 0 }}
                            transition={{
                              duration: 1.8,
                              delay: 1.0 + i * 0.9,
                              repeat: Infinity,
                              repeatDelay: 0,
                              ease: 'easeOut',
                            }}
                            style={{ transformOrigin: '174px 206px' }}
                          />
                        ))}
                        <circle cx="174" cy="206" r="4.5" fill={AMBER} />
                        <circle cx="174" cy="206" r="9" fill="none" stroke={AMBER} strokeWidth="1" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
                        {/* Callout */}
                        <line x1="168" y1="199" x2="118" y2="162" stroke={AMBER} strokeWidth="0.8" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
                        <text
                          x="114"
                          y="150"
                          textAnchor="middle"
                          className="font-montserrat"
                          fill={AMBER}
                          fontSize="11"
                          fontWeight="800"
                          letterSpacing="2.4"
                        >
                          BIRKENHEAD
                        </text>
                        <text
                          x="114"
                          y="163"
                          textAnchor="middle"
                          className="font-montserrat"
                          fill="#f2ede4"
                          fillOpacity="0.85"
                          fontSize="7.5"
                          fontWeight="700"
                          letterSpacing="1.8"
                        >
                          WOODSIDE
                        </text>
                      </motion.g>
                    </svg>
                  </motion.div>

                  {/* Rotating radar sweep */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, rgba(126,206,206,0.5) 0deg, rgba(126,206,206,0.22) 3deg, rgba(126,206,206,0.1) 32deg, transparent 64deg)`,
                      mixBlendMode: 'screen',
                    }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: SWEEP_MS / 1000,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>

                {/* Scope frame: outer ring, range rings, ticks, crosshairs */}
                <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <circle cx="200" cy="200" r="195" fill="none" stroke={TEAL} strokeOpacity="0.7" strokeWidth="1.6" />
                  <circle cx="200" cy="200" r="190" fill="none" stroke={TEAL} strokeOpacity="0.2" strokeWidth="0.8" />
                  {[63, 127].map((r) => (
                    <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={TEAL} strokeOpacity="0.14" strokeWidth="0.8" />
                  ))}
                  <line x1="200" y1="10" x2="200" y2="390" stroke={TEAL} strokeOpacity="0.1" strokeWidth="0.8" />
                  <line x1="10" y1="200" x2="390" y2="200" stroke={TEAL} strokeOpacity="0.1" strokeWidth="0.8" />
                  {Array.from({ length: 36 }).map((_, i) => {
                    const a = (i * 10 * Math.PI) / 180
                    const long = i % 3 === 0
                    const r1 = long ? 183 : 188
                    return (
                      <line
                        key={i}
                        x1={200 + r1 * Math.sin(a)}
                        y1={200 - r1 * Math.cos(a)}
                        x2={200 + 194 * Math.sin(a)}
                        y2={200 - 194 * Math.cos(a)}
                        stroke={TEAL}
                        strokeOpacity={long ? 0.45 : 0.22}
                        strokeWidth="1"
                      />
                    )
                  })}
                  <circle cx="200" cy="200" r="2.4" fill={TEAL} fillOpacity="0.9" />
                </svg>
              </div>

              {/* Caption under the scope */}
              <div className="flex min-h-[1.5rem] items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    className="font-montserrat text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-offwhite/80 text-center"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45 }}
                  >
                    {CAPTIONS[(phase === 'signal' || phase === 'title' ? 'radar' : phase) as 'radar' | 'uk' | 'lcr']}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── Click-to-enter gate (unlocks audio) ── */}
          <AnimatePresence>
            {gate === 'shown' && (
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(6,15,26,0.72) 0%, rgba(6,15,26,0.92) 100%)',
                  backdropFilter: 'blur(2px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
              >
                <motion.div
                  className="mb-6 flex items-center gap-3"
                  animate={{ opacity: [1, 0.45, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: TEAL, boxShadow: `0 0 12px 2px ${TEAL}` }}
                  />
                  <span className="font-montserrat text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-offwhite/70">
                    Incoming Transmission
                  </span>
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: TEAL, boxShadow: `0 0 12px 2px ${TEAL}` }}
                  />
                </motion.div>

                <h1 className="font-montserrat font-black uppercase leading-[1.05] tracking-[0.08em] text-offwhite text-4xl sm:text-5xl md:text-6xl">
                  {TITLE_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>

                <motion.span
                  className="mt-6 block h-px w-24"
                  style={{ backgroundColor: AMBER }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
                <p className="mt-6 max-w-sm font-montserrat text-[11px] md:text-xs uppercase tracking-[0.3em] text-offwhite/55">
                  This experience is best with sound
                </p>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => begin(true)}
                    className="group flex items-center gap-3 rounded-full border px-8 py-3.5 font-montserrat text-xs font-bold uppercase tracking-[0.3em] transition-colors"
                    style={{ borderColor: TEAL, color: TEAL }}
                    autoFocus
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 6v4h3l4 3V3L5 6H2z" fill="currentColor" />
                      <path
                        d="M11 5.5c1 .8 1 4.2 0 5M12.5 4c1.8 1.5 1.8 6.5 0 8"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Enter with Sound
                  </button>
                  <button
                    type="button"
                    onClick={() => begin(false)}
                    className="font-montserrat text-[11px] font-bold uppercase tracking-[0.25em] text-offwhite/50 transition-colors hover:text-offwhite/80"
                  >
                    Enter silently
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sound toggle / hint */}
          <button
            type="button"
            onClick={toggleSound}
            className="absolute bottom-6 left-6 z-20 flex items-center gap-2 font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] text-offwhite/60 transition-colors hover:text-offwhite"
            aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 6v4h3l4 3V3L5 6H2z" fill="currentColor" />
              {soundOn ? (
                <path
                  d="M11 5.5c1 .8 1 4.2 0 5M12.5 4c1.8 1.5 1.8 6.5 0 8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              ) : (
                <path d="M11 6l4 4M15 6l-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              )}
            </svg>
            {!audioReady && (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                Tap for sound
              </motion.span>
            )}
          </button>

          {/* Skip */}
          <button
            type="button"
            onClick={finish}
            className="absolute bottom-6 right-6 z-20 font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] text-offwhite/60 transition-colors hover:text-offwhite"
          >
            Skip intro ▸
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
