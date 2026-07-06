'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 600 600" aria-hidden="true">
            {[80, 160, 240, 320, 400].map((r, i) => (
              <circle key={i} cx="300" cy="300" r={r} fill="none" stroke="#7ECECE" strokeWidth="1" opacity={0.08 - i * 0.012} />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <p
                className="font-mono text-xs uppercase mb-4"
                style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
              >
                Get In Touch
              </p>
              <h1
                className="font-montserrat font-black uppercase"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '0.08em',
                  lineHeight: 1.0,
                  color: '#F8F4EE',
                }}
              >
                Contact<br />
                <span style={{ color: '#7ECECE' }}>Us</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <p className="font-mono text-xs uppercase mb-2" style={{ color: '#7ECECE', letterSpacing: '0.2em' }}>Location</p>
                <address className="not-italic font-montserrat text-sm" style={{ color: 'rgba(248,244,238,0.75)' }}>
                  Battle of the Atlantic Story, Woodside, Birkenhead, Merseyside, CH41 6DU
                </address>
              </div>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="font-mono text-xs uppercase mb-2" style={{ color: '#7ECECE', letterSpacing: '0.2em' }}>Email</p>
                  <a href="mailto:info@battleoftheatlantic.org" className="font-montserrat text-sm transition-colors hover:text-white" style={{ color: 'rgba(248,244,238,0.75)' }}>
                    info@battleoftheatlantic.org
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase mb-2" style={{ color: '#7ECECE', letterSpacing: '0.2em' }}>Phone</p>
                  <a href="tel:+441512272008" className="font-montserrat text-sm transition-colors hover:text-white" style={{ color: 'rgba(248,244,238,0.75)' }}>
                    0151 227 2008
                  </a>
                </div>
              </div>
              <div
                className="inline-block px-4 py-2"
                style={{ background: 'rgba(126,206,206,0.1)', border: '1px solid rgba(126,206,206,0.2)' }}
              >
                <p className="font-montserrat text-sm font-semibold" style={{ color: '#7ECECE' }}>Opening in 2027 · Woodside, Birkenhead</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Email callout */}
          <ScrollReveal>
            <div
              className="text-center p-10 lg:p-14 mb-14"
              style={{ background: 'rgba(126,206,206,0.05)', border: '1px solid rgba(126,206,206,0.15)' }}
            >
              <p
                className="font-mono text-xs uppercase mb-4"
                style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
              >
                Send Us an Email
              </p>
              <a
                href="mailto:info@battleoftheatlantic.org"
                className="font-montserrat font-black inline-block transition-colors hover:text-teal-light"
                style={{
                  fontSize: 'clamp(1.2rem, 3.5vw, 2.4rem)',
                  letterSpacing: '0.03em',
                  color: '#F8F4EE',
                  wordBreak: 'break-word',
                }}
              >
                info@battleoftheatlantic.org
              </a>
              <p
                className="font-montserrat text-sm mt-4"
                style={{ color: 'rgba(248,244,238,0.55)' }}
              >
                For all enquiries - general, educational visits, partnerships, donations, media, and research.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <ScrollReveal>
              {/* Address */}
              <div>
                <p
                  className="font-mono text-xs uppercase mb-4"
                  style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
                >
                  Location
                </p>
                <address className="not-italic space-y-1">
                  <p className="font-montserrat font-semibold text-sm" style={{ color: '#F8F4EE' }}>
                    Battle of the Atlantic Story
                  </p>
                  <p className="font-montserrat text-sm" style={{ color: 'rgba(248,244,238,0.7)' }}>
                    Woodside<br />
                    Birkenhead<br />
                    Merseyside<br />
                    CH41 6DU
                  </p>
                </address>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              {/* Contact details */}
              <div>
                <p
                  className="font-mono text-xs uppercase mb-4"
                  style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
                >
                  Contact Details
                </p>
                <div className="space-y-2">
                  <p>
                    <a
                      href="mailto:info@battleoftheatlantic.org"
                      className="font-montserrat text-sm transition-colors hover:text-teal-light"
                      style={{ color: 'rgba(248,244,238,0.7)' }}
                    >
                      info@battleoftheatlantic.org
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+441512272008"
                      className="font-montserrat text-sm transition-colors hover:text-teal-light"
                      style={{ color: 'rgba(248,244,238,0.7)' }}
                    >
                      0151 227 2008
                    </a>
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              {/* Opening */}
              <div>
                <p
                  className="font-mono text-xs uppercase mb-4"
                  style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
                >
                  Opening
                </p>
                <div
                  className="p-5"
                  style={{ background: 'rgba(126,206,206,0.06)', border: '1px solid rgba(126,206,206,0.15)' }}
                >
                  <p
                    className="font-montserrat font-bold text-sm mb-1"
                    style={{ color: '#7ECECE', letterSpacing: '0.05em' }}
                  >
                    Opening in 2027
                  </p>
                  <p
                    className="font-montserrat text-sm leading-relaxed"
                    style={{ color: 'rgba(248,244,238,0.6)' }}
                  >
                    Opening times and ticket prices will be announced closer to the opening date. Register your interest to be the first to hear.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              {/* Getting here */}
              <div>
                <p
                  className="font-mono text-xs uppercase mb-4"
                  style={{ color: '#7ECECE', letterSpacing: '0.2em' }}
                >
                  Getting Here
                </p>
                <div className="space-y-3">
                  {[
                    { mode: 'Ferry', detail: 'Mersey Ferry from Pier Head Liverpool - 10 minutes' },
                    { mode: 'Bus', detail: 'Routes 432 and 433 from Hamilton Square' },
                    { mode: 'Train', detail: 'Hamilton Square, 5-minute walk' },
                    { mode: 'Car', detail: 'CH41 6DU · Free visitor parking on site' },
                  ].map((item) => (
                    <div key={item.mode} className="flex gap-3">
                      <span
                        className="font-mono text-xs flex-shrink-0 pt-0.5"
                        style={{ color: '#7ECECE', letterSpacing: '0.1em', minWidth: 40 }}
                      >
                        {item.mode}
                      </span>
                      <span
                        className="font-montserrat text-sm"
                        style={{ color: 'rgba(248,244,238,0.6)' }}
                      >
                        {item.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── MAP EMBED ────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 420 }}>
        <iframe
          src="https://maps.google.com/maps?q=Woodside+Ferry+Terminal,+Birkenhead,+Merseyside,+CH41+6DU&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Battle of the Atlantic Story - Woodside, Birkenhead"
        />
        {/* Overlay label */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(13,31,53,0.85) 0%, transparent 100%)',
            padding: '24px 32px 20px',
          }}
        >
          <p
            className="font-montserrat font-bold uppercase"
            style={{ color: '#7ECECE', letterSpacing: '0.18em', fontSize: 11 }}
          >
            Battle of the Atlantic Story
          </p>
          <p
            className="font-mono text-xs mt-1"
            style={{ color: 'rgba(248,244,238,0.55)', letterSpacing: '0.06em' }}
          >
            Woodside, Birkenhead, Merseyside, CH41 6DU
          </p>
        </div>
      </section>
    </>
  )
}
