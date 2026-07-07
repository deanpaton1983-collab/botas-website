'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ────────────────────────────────────────────────────────────────
   BOTAS cinematic intro
   Phase 1 (0–1.0s)    : static / grain, "INCOMING TRANSMISSION"
   Phase 2 (1.0–6.8s)  : morse code (audio + visual) decodes the
                         title letter-by-letter over archival images
   Phase 3 (6.8–8.9s)  : sonar ping reveal, tagline, fade to site
   Audio: WebAudio oscillator. Starts automatically if the browser
   allows; otherwise unlocks on first click / tap / keypress.
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
const REVEAL_HOLD_MS = 2100

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
const TOTAL_MS = MORSE_END + REVEAL_HOLD_MS

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

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [decoded, setDecoded] = useState(0)
  const [beep, setBeep] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [soundOn, setSoundOn] = useState(false)
  const [audioReady, setAudioReady] = useState(false)

  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const startRef = useRef(0)
  const rafRef = useRef(0)
  const scheduledRef = useRef(false)
  const finishedRef = useRef(false)
  const enabledAtRef = useRef(0)

  /* ── audio ── */

  const scheduleTones = useCallback((fromElapsed: number) => {
    const ctx = ctxRef.current
    const gain = gainRef.current
    if (!ctx || !gain || scheduledRef.current) return
    scheduledRef.current = true

    const now = ctx.currentTime
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

    // Sonar ping at the reveal
    if (MORSE_END > fromElapsed) {
      const pingAt = now + (MORSE_END - fromElapsed) / 1000
      for (const [delay, level] of [
        [0, 0.22],
        [0.55, 0.07],
      ] as const) {
        const osc = ctx.createOscillator()
        const env = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(1250, pingAt + delay)
        osc.frequency.exponentialRampToValueAtTime(680, pingAt + delay + 0.9)
        env.gain.setValueAtTime(level, pingAt + delay)
        env.gain.exponentialRampToValueAtTime(0.0001, pingAt + delay + 0.9)
        osc.connect(env)
        env.connect(gain)
        osc.start(pingAt + delay)
        osc.stop(pingAt + delay + 1)
      }
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
    setVisible(false)
    const ctx = ctxRef.current
    if (ctx) {
      setTimeout(() => ctx.close().catch(() => {}), 1000)
    }
  }, [])

  /* ── main timeline ── */

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      setDecoded(SCHEDULE.letters.length)
      setReveal(true)
      const t = setTimeout(finish, 1800)
      return () => clearTimeout(t)
    }

    startRef.current = performance.now()

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
      if (e >= MORSE_END) setReveal(true)
      if (e >= TOTAL_MS) {
        finish()
        return
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    // Try to start audio immediately; fall back to first interaction
    enableSound()
    const unlock = () => enableSound()
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    window.addEventListener('touchstart', unlock)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
    }
  }, [enableSound, finish])

  /* ── rendering ── */

  const currentLetter =
    decoded > 0 && decoded <= SCHEDULE.letters.length
      ? SCHEDULE.letters[decoded - 1]
      : null

  let letterIdx = -1

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
          {/* Archival imagery, Ken Burns drift */}
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: imgIndex === i ? 1 : 0 }}
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
            [0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full border pointer-events-none"
                style={{
                  borderColor: '#7ECECE',
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ width: 60, height: 60, opacity: 0.8, borderWidth: 2 }}
                animate={{ width: '160vmax', height: '160vmax', opacity: 0 }}
                transition={{ duration: 2.4, delay: i * 0.45, ease: 'easeOut' }}
              />
            ))}

          {/* Teal flash at reveal */}
          {reveal && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: '#7ECECE' }}
              initial={{ opacity: 0.18 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          )}

          {/* ── Content ── */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
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
                  backgroundColor: beep ? '#7ECECE' : 'rgba(126,206,206,0.25)',
                  boxShadow: beep ? '0 0 12px 2px #7ECECE' : 'none',
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
                  backgroundColor: beep ? '#7ECECE' : 'rgba(126,206,206,0.25)',
                  boxShadow: beep ? '0 0 12px 2px #7ECECE' : 'none',
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
                          color: isCurrent ? '#7ECECE' : undefined,
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
                        {ch === ' ' ? ' ' : ch}
                      </motion.span>
                    )
                  })}
                </span>
              ))}
            </h1>

            {/* Live morse readout */}
            <div className="mt-8 flex min-h-[2rem] items-center justify-center">
              {!reveal && currentLetter ? (
                <div className="flex items-center gap-4">
                  <span className="font-montserrat text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#7ECECE' }}>
                    {currentLetter.char}
                  </span>
                  <span
                    className="font-mono text-lg tracking-[0.35em]"
                    style={{ color: beep ? '#7ECECE' : 'rgba(126,206,206,0.45)' }}
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
                    style={{ backgroundColor: '#c4832a' }}
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
          </div>

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
