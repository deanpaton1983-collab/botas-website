'use client'

import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/museum', label: 'Visit the Museum' },
  { href: '/u-boat', label: 'U-534: The U-Boat' },
  { href: '/history', label: 'Battle of the Atlantic History' },
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
              The world's first museum dedicated to the Battle of the Atlantic - the longest continuous
              military campaign of World War II. Opening in 2027 at Woodside Ferry, Birkenhead, on the
              River Mersey opposite Liverpool.
            </p>
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
                  href="tel:+441512272008"
                  className="font-montserrat text-sm transition-colors hover:text-offwhite"
                  style={{ color: 'rgba(248, 244, 238, 0.75)' }}
                >
                  0151 227 2008
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Partner logos */}
        <div
          className="mt-12 pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(248, 244, 238, 0.15)' }}
        >
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
            <span className="font-montserrat text-xs uppercase" style={{ color: 'rgba(248,244,238,0.4)', letterSpacing: '0.12em' }}>
              A Big Heritage project
            </span>
            <a
              href="https://bigheritage.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat font-bold text-xs uppercase transition-opacity hover:opacity-100"
              style={{ color: 'rgba(248,244,238,0.65)', letterSpacing: '0.12em', textDecoration: 'none' }}
            >
              bigheritage.co.uk
            </a>
          </div>
          <a
            href="https://liverpoolwarmuseum.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-montserrat text-xs transition-opacity hover:opacity-100"
            style={{ color: 'rgba(248,244,238,0.5)', letterSpacing: '0.05em' }}
          >
            Also visit: Western Approaches Museum, Liverpool →
          </a>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(248, 244, 238, 0.1)' }}
        >
          <p
            className="font-montserrat text-xs"
            style={{ color: 'rgba(248, 244, 238, 0.4)', letterSpacing: '0.05em' }}
          >
            © 2025 Battle of the Atlantic Story. All rights reserved.
          </p>
          <p
            className="font-montserrat text-xs"
            style={{ color: 'rgba(248, 244, 238, 0.4)' }}
          >
            Registered charity · Opening in 2027
          </p>
        </div>
      </div>
    </footer>
  )
}
