import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The U-Boat: U-534',
  description:
    'U-534 — the only U-boat ever raised from the seabed after combat. Commissioned 1942, sunk 5 May 1945, recovered 1993. Explore her full history, specifications, and the personal stories of her crew.',
  openGraph: {
    title: 'U-534: The Last U-Boat | Battle of the Atlantic Story',
    description:
      'The extraordinary story of U-534 — commissioned into the Kriegsmarine in 1942, sunk days before VE Day, and raised from the Kattegat in 1993. The only U-boat ever recovered after combat.',
    url: 'https://battleoftheatlantic.org/u-boat',
    images: [
      {
        url: '/images/og/og-u-boat.jpg',
        width: 1200,
        height: 630,
        alt: 'U-534 — The Last U-Boat',
      },
    ],
  },
  twitter: {
    title: 'U-534: The Last U-Boat',
    description:
      'The extraordinary story of U-534 — sunk days before VE Day, raised from the Kattegat in 1993. The only U-boat ever recovered after combat.',
    images: ['/images/og/og-u-boat.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/u-boat',
  },
}

export default function UBoatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
