'use client'

import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/museum', label: 'Museum' },
  { href: '/u-boat', label: 'The U-Boat' },
  { href: '/memorial', label: 'Memorial' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A8080' }} className="relative overflow-hidden">
      {/* Sonar rings decorative */}
      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
        <svg width="400" height="300" viewBox="0 0 400 300" aria-hidden="true">
          {[40, 90, 140, 190, 240, 290].map((r, i) => (
            <circle key={i} cx="400" cy="300" r={r} fill="none" stroke="#F8F4EE" strokeWidth="1" />
          ))}
        </svg>
      </div>

      {/* Naval grid overlay */}
      <div className="absolute inset-0 naval-grid-dashed pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: Stacked logo + mission */}
          <div className="space-y-6">
            <div className="relative w-56 h-20">
              <Image
                src="/images/logo/logo-stacked.png"
                alt="Battle of the Atlantic Story"
                fill
                className="object-contain object-left"
                sizes="224px"
              />
            </div>
            <p
              className="font-montserrat text-sm leading-relaxed"
              style={{ color: 'rgba(248, 244, 238, 0.75)', maxWidth: 280 }}
            >
              The world's first museum dedicated to the longest continuous military campaign of World War II.
              Opening Autumn 2026, Birkenhead.
            </p>
            {/* Convoy identification card */}
            <div
              className="inline-flex items-stretch rounded overflow-hidden shadow-lg"
              style={{ background: '#F5ECD7' }}
            >
              <div className="px-3 py-2">
                <p
                  className="font-mono text-slate-deep font-bold"
                  style={{ fontSize: 9, letterSpacing: '0.15em', opacity: 0.5 }}
                >
                  CONVOY
                </p>
                <div className="mt-1 space-y-0.5">
                  <div className="h-1 rounded" style={{ background: '#B85C38', width: 40 }} />
                  <div className="h-0.5 rounded" style={{ background: '#9BA8A8', width: 30 }} />
                </div>
              </div>
              <div
                className="flex items-center justify-center px-3"
                style={{ background: '#B85C38' }}
              >
                <span
                  className="font-montserrat font-black text-white"
                  style={{ fontSize: 13, letterSpacing: '0.02em' }}
                >
                  HX 236
                </span>
              </div>
            </div>
          </div>

          {/* Centre: Navigation */}
          <div>
            <h3
              className="font-montserrat font-extrabold text-xs uppercase mb-6"
              style={{ letterSpacing: '0.2em', color: 'rgba(248, 244, 238, 0.5)' }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-montserrat font-medium text-sm transition-colors duration-200 hover:text-offwhite"
                    style={{ color: 'rgba(248, 244, 238, 0.75)', letterSpacing: '0.05em' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact + socials */}
          <div>
            <h3
              className="font-montserrat font-extrabold text-xs uppercase mb-6"
              style={{ letterSpacing: '0.2em', color: 'rgba(248, 244, 238, 0.5)' }}
            >
              Find Us
            </h3>
            <address className="not-italic space-y-2">
              <p
                className="font-montserrat text-sm leading-relaxed"
                style={{ color: 'rgba(248, 244, 238, 0.75)' }}
              >
                Woodside, Birkenhead<br />
                Merseyside, CH41 6DU<br />
                United Kingdom
              </p>
              <p className="pt-2">
                <a
                  href="mailto:info@battleoftheatlantic.org"
                  className="font-montserrat text-sm transition-colors hover:text-offwhite"
                  style={{ color: 'rgba(248, 244, 238, 0.75)' }}
                >
                  info@battleoftheatlantic.org
                </a>
              </p>
              <p>
                <a
                  href="tel:+441512001943"
                  className="font-montserrat text-sm transition-colors hover:text-offwhite"
                  style={{ color: 'rgba(248, 244, 238, 0.75)' }}
                >
                  +44 (0)151 200 1943
                </a>
              </p>
            </address>

            <div className="flex gap-4 mt-6">
              {['Twitter', 'Facebook', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 border flex items-center justify-center transition-all duration-200 hover:bg-offwhite hover:border-offwhite hover:text-teal-primary"
                  style={{ borderColor: 'rgba(248, 244, 238, 0.3)', color: 'rgba(248, 244, 238, 0.6)' }}
                >
                  <span className="font-montserrat font-bold text-xs">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(248, 244, 238, 0.15)' }}
        >
          <p
            className="font-montserrat text-xs"
            style={{ color: 'rgba(248, 244, 238, 0.4)', letterSpacing: '0.05em' }}
          >
            Â© 2026 Battle of the Atlantic Story. All rights reserved.
          </p>
          <p
            className="font-montserrat text-xs"
            style={{ color: 'rgba(248, 244, 238, 0.4)' }}
          >
            Registered charity Â· Opening Autumn 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
