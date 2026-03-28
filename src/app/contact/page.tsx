'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const enquiryTypes = [
  'General Enquiry',
  'Register Interest (Opening)',
  'Educational Visit',
  'Corporate Partnership',
  'Donation / Fundraising',
  'Media & Press',
  'Research & Archives',
  'Other',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    type: '',
    message: '',
    newsletter: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // [PLACEHOLDER: Form submission logic — connect to email service / CMS]
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative py-36 overflow-hidden"
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
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
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: '#2D4F5C' }}
      >
        <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-16">

            {/* ── CONTACT INFO ──────────────────────────── */}
            <div className="lg:col-span-2 space-y-10">
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
                        href="tel:+441512001943"
                        className="font-montserrat text-sm transition-colors hover:text-teal-light"
                        style={{ color: 'rgba(248,244,238,0.7)' }}
                      >
                        +44 (0)151 200 1943
                      </a>
                    </p>
                    <p>
                      <a
                        href="mailto:info@battleoftheatlantic.org"
                        className="font-montserrat text-sm transition-colors hover:text-teal-light"
                        style={{ color: 'rgba(248,244,238,0.7)' }}
                      >
                        info@battleoftheatlantic.org
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
                      Opening Autumn 2026
                    </p>
                    <p
                      className="font-montserrat text-sm leading-relaxed"
                      style={{ color: 'rgba(248,244,238,0.6)' }}
                    >
                      {/* [PLACEHOLDER: Opening hours] */}
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
                      { mode: 'Ferry', detail: 'Mersey Ferry from Pier Head Liverpool — 10 minutes' },
                      { mode: 'Bus', detail: 'Routes 432 and 433 from Hamilton Square' },
                      { mode: 'Train', detail: 'Birkenhead Central, 10-minute walk' },
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

            {/* ── CONTACT FORM ──────────────────────────── */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div
                  className="p-8 lg:p-10"
                  style={{ background: 'rgba(126,206,206,0.04)', border: '1px solid rgba(126,206,206,0.12)' }}
                >
                  {submitted ? (
                    <div className="py-12 text-center">
                      <div className="mb-6">
                        <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto" aria-hidden="true">
                          <circle cx="30" cy="30" r="28" fill="none" stroke="#7ECECE" strokeWidth="1.5" />
                          <polyline points="18,30 26,38 42,22" fill="none" stroke="#7ECECE" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <h3
                        className="font-montserrat font-black uppercase mb-3"
                        style={{ fontSize: '1.4rem', letterSpacing: '0.1em', color: '#7ECECE' }}
                      >
                        Message Received
                      </h3>
                      <p
                        className="font-montserrat text-base"
                        style={{ color: 'rgba(248,244,238,0.7)' }}
                      >
                        Thank you for getting in touch. We'll respond as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2
                        className="font-montserrat font-black uppercase mb-8"
                        style={{
                          fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                          letterSpacing: '0.12em',
                          color: '#F8F4EE',
                        }}
                      >
                        Send a Message
                      </h2>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name + email */}
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label
                              className="block font-montserrat font-semibold text-xs uppercase mb-2"
                              style={{ color: 'rgba(248,244,238,0.5)', letterSpacing: '0.12em' }}
                            >
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 font-montserrat text-sm bg-transparent outline-none transition-colors"
                              style={{
                                border: '1px solid rgba(126,206,206,0.25)',
                                color: '#F8F4EE',
                              }}
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label
                              className="block font-montserrat font-semibold text-xs uppercase mb-2"
                              style={{ color: 'rgba(248,244,238,0.5)', letterSpacing: '0.12em' }}
                            >
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 font-montserrat text-sm bg-transparent outline-none transition-colors"
                              style={{
                                border: '1px solid rgba(126,206,206,0.25)',
                                color: '#F8F4EE',
                              }}
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        {/* Phone + org */}
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label
                              className="block font-montserrat font-semibold text-xs uppercase mb-2"
                              style={{ color: 'rgba(248,244,238,0.5)', letterSpacing: '0.12em' }}
                            >
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 font-montserrat text-sm bg-transparent outline-none"
                              style={{
                                border: '1px solid rgba(126,206,206,0.25)',
                                color: '#F8F4EE',
                              }}
                              placeholder="+44 (0)151..."
                            />
                          </div>
                          <div>
                            <label
                              className="block font-montserrat font-semibold text-xs uppercase mb-2"
                              style={{ color: 'rgba(248,244,238,0.5)', letterSpacing: '0.12em' }}
                            >
                              Organisation
                            </label>
                            <input
                              type="text"
                              name="organisation"
                              value={formData.organisation}
                              onChange={handleChange}
                              className="w-full px-4 py-3 font-montserrat text-sm bg-transparent outline-none"
                              style={{
                                border: '1px solid rgba(126,206,206,0.25)',
                                color: '#F8F4EE',
                              }}
                              placeholder="School, charity, business..."
                            />
                          </div>
                        </div>

                        {/* Enquiry type */}
                        <div>
                          <label
                            className="block font-montserrat font-semibold text-xs uppercase mb-2"
                            style={{ color: 'rgba(248,244,238,0.5)', letterSpacing: '0.12em' }}
                          >
                            Nature of Enquiry *
                          </label>
                          <select
                            name="type"
                            required
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 font-montserrat text-sm bg-transparent outline-none appearance-none cursor-pointer"
                            style={{
                              border: '1px solid rgba(126,206,206,0.25)',
                              color: formData.type ? '#F8F4EE' : 'rgba(248,244,238,0.35)',
                              background: '#2D4F5C',
                            }}
                          >
                            <option value="" disabled style={{ color: '#2D4F5C', background: '#2D4F5C' }}>
                              Select enquiry type
                            </option>
                            {enquiryTypes.map((t) => (
                              <option key={t} value={t} style={{ color: '#F8F4EE', background: '#2D4F5C' }}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            className="block font-montserrat font-semibold text-xs uppercase mb-2"
                            style={{ color: 'rgba(248,244,238,0.5)', letterSpacing: '0.12em' }}
                          >
                            Message *
                          </label>
                          <textarea
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 font-montserrat text-sm bg-transparent outline-none resize-none"
                            style={{
                              border: '1px solid rgba(126,206,206,0.25)',
                              color: '#F8F4EE',
                            }}
                            placeholder="How can we help you?"
                          />
                        </div>

                        {/* Newsletter checkbox */}
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="newsletter"
                            name="newsletter"
                            checked={formData.newsletter}
                            onChange={handleChange}
                            className="mt-0.5 flex-shrink-0 cursor-pointer"
                            style={{ accentColor: '#7ECECE' }}
                          />
                          <label
                            htmlFor="newsletter"
                            className="font-montserrat text-sm cursor-pointer"
                            style={{ color: 'rgba(248,244,238,0.6)' }}
                          >
                            I would like to receive news and updates about the Battle of the Atlantic Story, including opening announcements and events.
                          </label>
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          className="w-full font-montserrat font-bold text-sm uppercase py-4 transition-all duration-200 hover:opacity-90 mt-2"
                          style={{
                            background: '#7ECECE',
                            color: '#2D4F5C',
                            letterSpacing: '0.15em',
                          }}
                        >
                          Send Message
                        </button>

                        <p
                          className="font-mono text-xs text-center"
                          style={{ color: 'rgba(248,244,238,0.3)', letterSpacing: '0.05em' }}
                        >
                          Your data will be processed in accordance with our Privacy Policy.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP EMBED ────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 420 }}>
        {/* Map placeholder — replace with actual Google Maps embed */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: '#1A3040' }}
        >
          {/* Naval chart grid texture */}
          <div className="absolute inset-0 naval-grid pointer-events-none" />
          {/* Sonar at map centre */}
          <div className="relative flex items-center justify-center">
            <svg width="300" height="300" viewBox="0 0 300 300" className="absolute" aria-hidden="true">
              {[40, 80, 120, 160, 200].map((r, i) => (
                <circle key={i} cx="150" cy="150" r={r} fill="none" stroke="#7ECECE" strokeWidth="1" opacity={0.08 - i * 0.01} />
              ))}
              <circle cx="150" cy="150" r="5" fill="#7ECECE" opacity="0.6" />
              <circle cx="150" cy="150" r="10" fill="none" stroke="#7ECECE" strokeWidth="1.5" opacity="0.4" />
            </svg>
            <div className="relative z-10 text-center">
              <p
                className="font-montserrat font-black uppercase mb-2"
                style={{ color: '#7ECECE', letterSpacing: '0.15em', fontSize: 12 }}
              >
                Battle of the Atlantic Story
              </p>
              <p
                className="font-mono text-xs"
                style={{ color: 'rgba(248,244,238,0.5)', letterSpacing: '0.08em' }}
              >
                Woodside, Birkenhead, CH41 6DU
              </p>
              <p
                className="font-mono text-xs mt-1"
                style={{ color: 'rgba(248,244,238,0.35)' }}
              >
                {/* [PLACEHOLDER: Replace with Google Maps iframe embed] */}
                53.3914° N, 3.0104° W
              </p>
            </div>
          </div>
          {/* Ship silhouette */}
          <div className="absolute bottom-0 left-0 right-0 opacity-[0.04] pointer-events-none">
            <svg viewBox="0 0 1400 80" width="100%" aria-hidden="true">
              <polygon points="0,60 200,60 220,40 300,32 1100,32 1200,38 1400,30 1400,80 0,80" fill="#7ECECE" />
            </svg>
          </div>
        </div>

        {/* Actual iframe embed — uncomment and fill in when ready */}
        {/*
        <iframe
          src="https://www.google.com/maps/embed?pb=EMBED_URL_HERE"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Battle of the Atlantic Story location"
        />
        */}
      </section>
    </>
  )
}
