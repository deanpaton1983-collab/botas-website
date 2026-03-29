'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/museum', label: 'Museum' },
  { href: '/u-boat', label: 'The U-Boat' },
  { href: '/memorial', label: 'Memorial' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          backgroundColor: scrolled ? '#2D4F5C' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(126, 206, 206, 0.15)' : 'none',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.4 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src="/images/logo/logo-main.png"
                  alt="Battle of the Atlantic Story"
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative font-montserrat font-semibold text-xs uppercase tracking-widest transition-colors duration-200 group"
                      style={{
                        color: active ? '#7ECECE' : '#F8F4EE',
                        letterSpacing: '0.18em',
                      }}
                    >
                      {link.label}
                      <span
                        className="absolute -bottom-1 left-0 w-full h-px transition-transform duration-300 origin-left"
                        style={{
                          background: '#7ECECE',
                          transform: active ? 'scaleX(1)' : 'scaleX(0)',
                        }}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contact"
                className="font-montserrat font-bold text-xs uppercase tracking-widest px-5 py-2.5 border transition-all duration-200 hover:bg-teal-light hover:text-slate-deep"
                style={{
                  borderColor: '#7ECECE',
                  color: '#7ECECE',
                  letterSpacing: '0.18em',
                }}
              >
                Plan Your Visit
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-0.5 transition-all duration-300 origin-center"
                style={{
                  background: '#7ECECE',
                  transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: '#7ECECE',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300 origin-center"
                style={{
                  background: '#7ECECE',
                  transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] lg:hidden flex flex-col pt-20"
            style={{ backgroundColor: '#2D4F5C' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Sonar rings decorative */}
            <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
              <svg width="300" height="300" viewBox="0 0 300 300" aria-hidden="true">
                {[40, 80, 120, 160, 200].map((r, i) => (
                  <circle key={i} cx="300" cy="300" r={r} fill="none" stroke="#7ECECE" strokeWidth="1" />
                ))}
              </svg>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-10 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block font-montserrat font-extrabold text-3xl uppercase py-3 border-b transition-colors hover:text-teal-light"
                    style={{
                      letterSpacing: '0.12em',
                      borderColor: 'rgba(126, 206, 206, 0.15)',
                      color: pathname === link.href ? '#7ECECE' : '#F8F4EE',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="inline-block font-montserrat font-bold text-xs uppercase tracking-widest px-6 py-3 border"
                  style={{ borderColor: '#7ECECE', color: '#7ECECE', letterSpacing: '0.18em' }}
                >
                  Plan Your Visit
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
