// Visitor FAQs — rendered on /museum and emitted as FAQPage JSON-LD.
// Keep questions factual: no ticket prices, opening hours, or dates
// beyond what is confirmed elsewhere on the site.

export interface Faq {
  question: string
  answer: string
}

export const visitorFaqs: Faq[] = [
  {
    question: 'When does the Battle of the Atlantic Story open?',
    answer:
      'The museum is due to open in 2027 at Woodside, Birkenhead, on the banks of the River Mersey. Opening times and ticket prices will be announced closer to the opening date — register your interest to be the first to hear.',
  },
  {
    question: 'Where is the Battle of the Atlantic museum?',
    answer:
      'The Battle of the Atlantic Story is located at Woodside, Birkenhead, Merseyside, CH41 6DU — beside the Woodside Ferry terminal, directly across the River Mersey from Liverpool’s Pier Head, with views of the Liverpool skyline.',
  },
  {
    question: 'How do I get to the museum from Liverpool?',
    answer:
      'Take the Mersey Ferry from Pier Head to Woodside (around 10 minutes), or the Merseyrail train to Hamilton Square station, a five-minute walk away. Buses 432 and 433 stop at Hamilton Square, and drivers can use postcode CH41 6DU, with visitor parking on site.',
  },
  {
    question: 'What is U-534?',
    answer:
      'U-534 is a Type IXC/40 German U-boat and the centrepiece of the museum. Sunk by RAF aircraft in the Kattegat on 5 May 1945 — two days before Germany’s surrender — she was raised from the seabed in 1993 and is the only U-boat ever recovered after being sunk in combat. She is one of only four surviving Second World War U-boats.',
  },
  {
    question: 'Is the museum suitable for families and school groups?',
    answer:
      'Yes. The museum is designed for visitors of all ages, with interactive displays and hands-on activities for families, and curriculum-linked workshops and guided tours for schools covering KS2, KS3, and GCSE History.',
  },
  {
    question: 'Is the museum wheelchair accessible?',
    answer:
      'Yes. The museum is being designed to be fully wheelchair accessible with step-free access throughout. Audio guides, large-print materials, and sensory-friendly sessions are planned, and assistance dogs are welcome.',
  },
]
