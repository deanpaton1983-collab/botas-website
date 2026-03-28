import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Battle of the Atlantic Story | Birkenhead',
  description: 'The world\'s first museum dedicated to the longest continuous military campaign of World War II — the Battle of the Atlantic. Centred around U-534, the only U-boat ever raised from the seabed after combat. Opening Autumn 2026, Birkenhead.',
  keywords: 'Battle of the Atlantic, U-534, U-boat, World War II, WWII, museum, Birkenhead, Liverpool, Mersey, naval history',
  openGraph: {
    title: 'Battle of the Atlantic Story',
    description: 'Opening Autumn 2026 · Birkenhead, Mersey',
    siteName: 'Battle of the Atlantic Story',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-montserrat bg-slate-deep text-offwhite antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
