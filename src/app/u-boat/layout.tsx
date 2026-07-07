import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'U-534 | The Only U-Boat Raised from the Seabed After Combat',
  description:
    'See U-534 in Birkenhead, near Liverpool - a real WW2 German U-boat, sunk on 5 May 1945 and raised from the Kattegat in 1993. Explore her history, technical specifications, interactive Type IXC plans, and the stories of her crew.',
  openGraph: {
    title: 'U-534: The Last U-Boat | Battle of the Atlantic Story',
    description:
      'The extraordinary story of U-534 - commissioned into the Kriegsmarine in 1942, sunk days before VE Day, and raised from the Kattegat in 1993. The only U-boat ever recovered after combat, preserved at Woodside, Birkenhead.',
    url: 'https://battleoftheatlantic.org/u-boat',
    images: [
      {
        url: '/images/U-boat_Warfare_1939-1945_C3780.jpg',
        width: 1200,
        height: 630,
        alt: 'A German U-boat at sea during the Second World War - U-534, the last U-boat',
      },
    ],
  },
  twitter: {
    title: 'U-534: The Last U-Boat',
    description:
      'The extraordinary story of U-534 - sunk days before VE Day, raised from the Kattegat in 1993. The only U-boat ever recovered after combat. See her in Birkenhead, near Liverpool.',
    images: ['/images/U-boat_Warfare_1939-1945_C3780.jpg'],
  },
  alternates: {
    canonical: 'https://battleoftheatlantic.org/u-boat',
  },
}

export default function UBoatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
