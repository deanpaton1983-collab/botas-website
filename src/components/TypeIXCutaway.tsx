'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Interactive cutaway plan of a Type IXC/40 U-boat (the class of U-534).
 * Compartment layout drawn from published design studies of the Type IX:
 * bow torpedo room, crew & petty officers' quarters (batteries below),
 * officers' wardroom & commander's berth, radio & hydrophone rooms,
 * Zentrale (control room) with conning tower above, galley & aft quarters,
 * diesel engine room, electric motor room, and stern torpedo room -
 * all within a double hull with saddle fuel/ballast tanks.
 */

interface Compartment {
  id: string
  num: string
  name: string
  german: string
  blurb: string
  facts: string[]
  u534?: string
}

const COMPARTMENTS: Compartment[] = [
  {
    id: 'bow-torpedo',
    num: '01',
    name: 'Bow Torpedo Room',
    german: 'Bugtorpedoraum',
    blurb:
      'The largest compartment aboard, dominated by four 53.3 cm torpedo tubes. Reserve torpedoes were stowed beneath the deck plates and slung from the ceiling, and around two dozen junior ratings lived, ate and slept here between them - sharing fold-down bunks in shifts.',
    facts: [
      'Four bow torpedo tubes, with up to 10 reserve torpedoes stowed in the compartment',
      'Torpedoes were moved with chain hoists - reloading a single tube took the crew around 20 minutes of hard labour',
      'The torpedo loading hatch above doubled as an emergency escape route',
    ],
    u534:
      'When U-534 went down on 5 May 1945, five men were trapped in the torpedo room. After the boat settled on the seabed 67 metres down, they escaped through the torpedo loading hatch - all five reached the surface.',
  },
  {
    id: 'crew-quarters',
    num: '02',
    name: 'Crew & Petty Officers’ Quarters',
    german: 'Wohnraum',
    blurb:
      'Tiered bunks lined both sides of this narrow living space for the boat’s senior ratings. Every spare corner held food, kit and spares. With more men than bunks, "hot-bunking" was standard: as one man went on watch, another climbed into his still-warm bed.',
    facts: [
      'Each man had roughly one square metre of personal space',
      'One of the boat’s two huge battery banks sat beneath the deck plates here',
      'Fresh food ran out within two weeks - after that, tinned and preserved rations',
    ],
  },
  {
    id: 'officers',
    num: '03',
    name: 'Officers’ Wardroom & Commander’s Berth',
    german: 'Offiziersraum & Kommandantenraum',
    blurb:
      'The wardroom’s folding table served as mess, office and operating theatre in emergencies. The commander’s "cabin" was no more than a bunk, a desk and a green curtain - placed deliberately opposite the radio and sound rooms so he heard every report the moment it came in.',
    facts: [
      'A curtain was the only privacy any man aboard enjoyed - and it belonged to the captain',
      'The second battery bank lay beneath this compartment',
      'Kapitänleutnant Herbert Nollau commanded U-534 from her commissioning to her sinking',
    ],
  },
  {
    id: 'radio',
    num: '04',
    name: 'Radio & Sound Rooms',
    german: 'Funkraum & Horchraum',
    blurb:
      'Two tiny cabins packed with the boat’s ears and voice. The radio room held the transmitters, receivers and the Enigma cipher machine; next door the hydrophone operator listened to the sea, able to hear a convoy’s propellers long before it could be seen.',
    facts: [
      'Hydrophones could detect a convoy up to 20 nautical miles away in good conditions',
      'Every signal was encrypted on the Enigma machine - traffic the Allies were secretly reading after Bletchley Park broke the naval codes',
      'Radio discipline was a matter of life and death: Allied Huff-Duff direction finders could fix a boat’s position from a few seconds of transmission',
    ],
  },
  {
    id: 'control',
    num: '05',
    name: 'Control Room',
    german: 'Zentrale',
    blurb:
      'The nerve centre of the boat, sealed by watertight bulkheads at either end. Here the helmsman and hydroplane operators held depth and course, the navigator worked at the chart table, and the chief engineer commanded the maze of valves, vents and pumps that made the boat dive, trim and surface.',
    facts: [
      'Diving stations: flooding the ballast tanks took the boat under in under a minute',
      'The navigation periscope and main chart table were located here',
      'Depth gauges, trim controls and the "Christmas tree" of valve indicator lights lined every surface',
    ],
  },
  {
    id: 'tower',
    num: '06',
    name: 'Conning Tower & Bridge',
    german: 'Turm',
    blurb:
      'A small armoured cylinder above the control room. During a submerged attack the commander sat here at the attack periscope, feeding bearings into the torpedo data computer. Above it lay the open bridge and the "Wintergarten" - the railed platforms carrying the boat’s anti-aircraft guns.',
    facts: [
      'The attack periscope and electro-mechanical torpedo data computer were housed here',
      'On the surface, four lookouts scanned the horizon in all weathers - aircraft could appear in seconds',
      'U-534 was fitted with a Schnorchel in 1944, letting her run her diesels at periscope depth',
    ],
  },
  {
    id: 'galley',
    num: '07',
    name: 'Galley & Aft Quarters',
    german: 'Kombüse',
    blurb:
      'One cook - the "Smutje" - fed the entire crew from two hotplates, a small oven and a kettle, working around the clock in a space smaller than a wardrobe. Aft of the galley lay the petty officers’ mess and bunks.',
    facts: [
      'Around 12 tonnes of food were crammed aboard for a long patrol',
      'One of the boat’s two toilets was used as a food store for the first weeks at sea',
      'Bread went mouldy fast - the crew called the half-edible loaves "rabbits" for their white fuzz',
    ],
  },
  {
    id: 'diesel',
    num: '08',
    name: 'Diesel Engine Room',
    german: 'Dieselmotorenraum',
    blurb:
      'Two supercharged nine-cylinder MAN diesels filled this compartment wall to wall, driving the boat at up to 18.3 knots on the surface. The heat, fumes and noise were ferocious - engine-room hands stood watch in little more than shorts, shouting to be heard.',
    facts: [
      'Combined output around 4,400 horsepower',
      'Some 208 tonnes of fuel oil gave a range of roughly 13,850 nautical miles at 10 knots - enough to reach the Caribbean and return without refuelling',
      'The diesels also recharged the batteries for submerged running',
    ],
  },
  {
    id: 'emotor',
    num: '09',
    name: 'Electric Motor Room',
    german: 'E-Maschinenraum',
    blurb:
      'Submerged, the boat ran silent on two Siemens-Schuckert electric motors drawing on the battery banks. This compartment also housed the air compressors that stored the high-pressure air used to blow the ballast tanks and surface the boat.',
    facts: [
      'Around 1,000 horsepower combined - a top submerged speed of 7.3 knots',
      'At slow "creep" speed the batteries could last more than two days underwater',
      'Every watt was rationed when hiding from an escort overhead',
    ],
  },
  {
    id: 'stern-torpedo',
    num: '10',
    name: 'Stern Torpedo Room',
    german: 'Hecktorpedoraum',
    blurb:
      'Two further torpedo tubes faced aft - a parting shot for pursuers - alongside the emergency steering position and yet more crew bunks squeezed between the machinery.',
    facts: [
      'Two stern tubes brought the boat’s total to six',
      'Manual steering gear here could take over if the bridge controls failed',
    ],
    u534:
      'Among the 16 torpedoes recovered with U-534 in 1993 were at least three T11 "Zaunkönig" acoustic homing torpedoes - some of the most advanced weapons of the war, and a key reason historians were so eager to study the wreck.',
  },
  {
    id: 'armament',
    num: '11',
    name: 'Deck & Anti-Aircraft Armament',
    german: 'Artillerie & Flak',
    blurb:
      'Type IX boats were completed with a 105 mm deck gun forward of the tower for surface attacks. As Allied air power made gun actions suicidal, deck guns were landed and the anti-aircraft fit was massively increased - a 37 mm gun and twin 20 mm mounts on the enlarged Wintergarten platforms.',
    facts: [
      '105 mm SK C/32 deck gun with around 110 rounds carried in early configuration',
      'By 1944–45 the priority was survival: flak guns, not deck guns',
    ],
    u534:
      'U-534’s gunners put her flak battery to use in her final action - shooting down one of the attacking RAF Liberators on 5 May 1945 before a direct hit sent her to the bottom.',
  },
  {
    id: 'tanks',
    num: '12',
    name: 'Fuel, Ballast & Trim Tanks',
    german: 'Tauchzellen & Treibstoffbunker',
    blurb:
      'The Type IX was a double-hulled design: between the crew’s pressure hull and the outer casing sat the saddle tanks holding fuel oil and ballast water. Flooding the ballast tanks took the boat under; blowing them with compressed air brought her back up. Trim tanks fore and aft kept her balanced to the kilogram.',
    facts: [
      'Double hull with multiple watertight compartments',
      'Test depth around 230 metres - though every metre below 100 strained the hull audibly',
      'Crash-diving a big Type IX took longer than the smaller Type VII - a dangerous handicap by 1943',
    ],
  },
]

/* ── SVG geometry ──────────────────────────────────────────────
   Interior compartment bands (clipped to the pressure hull shape).
   Bow is at the LEFT.                                            */
const BANDS: Record<string, { x: number; w: number }> = {
  'bow-torpedo': { x: 100, w: 168 },
  'crew-quarters': { x: 268, w: 108 },
  officers: { x: 376, w: 112 },
  radio: { x: 488, w: 52 },
  control: { x: 540, w: 116 },
  galley: { x: 656, w: 98 },
  diesel: { x: 754, w: 150 },
  emotor: { x: 904, w: 96 },
  'stern-torpedo': { x: 1000, w: 112 },
}

const LABELS: Record<string, { x: number; y: number }> = {
  'bow-torpedo': { x: 184, y: 236 },
  'crew-quarters': { x: 322, y: 236 },
  officers: { x: 432, y: 236 },
  radio: { x: 514, y: 236 },
  control: { x: 598, y: 236 },
  tower: { x: 600, y: 118 },
  galley: { x: 705, y: 236 },
  diesel: { x: 829, y: 236 },
  emotor: { x: 952, y: 236 },
  'stern-torpedo': { x: 1056, y: 236 },
  armament: { x: 468, y: 118 },
  tanks: { x: 700, y: 330 },
}

const TEAL = '#7ECECE'
const ORANGE = '#E07B45'
const INK = 'rgba(126, 206, 206, 0.55)'

export default function TypeIXCutaway() {
  const [selectedId, setSelectedId] = useState<string>('control')
  const [hoverId, setHoverId] = useState<string | null>(null)

  const selected = COMPARTMENTS.find((c) => c.id === selectedId)!
  const selectedIndex = COMPARTMENTS.findIndex((c) => c.id === selectedId)

  const go = (dir: 1 | -1) => {
    const next =
      (selectedIndex + dir + COMPARTMENTS.length) % COMPARTMENTS.length
    setSelectedId(COMPARTMENTS[next].id)
  }

  const fillFor = (id: string) =>
    selectedId === id
      ? 'rgba(224, 123, 69, 0.4)'
      : hoverId === id
        ? 'rgba(126, 206, 206, 0.28)'
        : 'rgba(126, 206, 206, 0.07)'

  const strokeFor = (id: string) =>
    selectedId === id ? ORANGE : 'rgba(126, 206, 206, 0.45)'

  const interactiveProps = (id: string) => ({
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': COMPARTMENTS.find((c) => c.id === id)?.name,
    'aria-pressed': selectedId === id,
    style: { cursor: 'pointer', outline: 'none' },
    onClick: () => setSelectedId(id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setSelectedId(id)
      }
    },
    onMouseEnter: () => setHoverId(id),
    onMouseLeave: () => setHoverId(null),
  })

  return (
    <div className="w-full">
      {/* ── The plan ── */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div style={{ minWidth: 760 }}>
          <svg
            viewBox="0 0 1200 400"
            width="100%"
            role="group"
            aria-label="Interactive cutaway plan of a Type IXC U-boat. Select a compartment to read about it."
          >
            <defs>
              {/* Pressure hull interior shape - long tapered cylinder */}
              <clipPath id="hullClip">
                <path d="M100,229 C106,182 150,162 210,160 L990,160 C1058,163 1100,186 1112,229 C1100,272 1058,296 990,298 L210,298 C150,296 106,276 100,229 Z" />
              </clipPath>
            </defs>

            {/* Waterline */}
            <line
              x1="0"
              y1="150"
              x2="1200"
              y2="150"
              stroke={TEAL}
              strokeWidth="0.75"
              strokeDasharray="10,14"
              opacity="0.25"
            />
            <text
              x="1196"
              y="144"
              textAnchor="end"
              fontFamily="'Courier Prime', monospace"
              fontSize="11"
              fill={TEAL}
              opacity="0.4"
            >
              waterline
            </text>

            {/* Saddle tanks / outer casing (interactive) */}
            <path
              d="M150,262 C210,318 320,330 600,330 C880,330 1000,318 1062,262 C1000,296 880,308 600,308 C320,308 210,296 150,262 Z"
              fill={fillFor('tanks')}
              stroke={strokeFor('tanks')}
              strokeWidth="1.25"
              strokeDasharray="4,5"
              {...interactiveProps('tanks')}
            />

            {/* Outer casing / deck line */}
            <path
              d="M58,208 C90,172 140,157 215,153 L975,150 C1042,152 1092,163 1128,186 L1148,208"
              fill="none"
              stroke={TEAL}
              strokeWidth="2"
              opacity="0.7"
            />
            {/* Bow & stern profile closing the outer hull */}
            <path
              d="M58,208 C64,252 92,282 150,296 M1148,208 C1140,252 1108,280 1060,292"
              fill="none"
              stroke={TEAL}
              strokeWidth="2"
              opacity="0.55"
            />

            {/* Bow hydroplane & stern gear */}
            <g stroke={TEAL} strokeWidth="1.5" opacity="0.5" fill="none">
              {/* fwd hydroplane */}
              <path d="M70,262 L34,270 L70,278" />
              {/* aft hydroplane */}
              <path d="M1122,258 L1166,266 L1122,274" />
              {/* propeller */}
              <ellipse cx="1146" cy="240" rx="7" ry="20" />
              {/* rudder */}
              <path d="M1160,220 L1184,214 L1184,250 L1160,246" />
            </g>

            {/* Pressure hull outline */}
            <path
              d="M100,229 C106,182 150,162 210,160 L990,160 C1058,163 1100,186 1112,229 C1100,272 1058,296 990,298 L210,298 C150,296 106,276 100,229 Z"
              fill="rgba(13, 48, 64, 0.55)"
              stroke={TEAL}
              strokeWidth="1.5"
              opacity="0.95"
            />

            {/* ── Compartment bands (clipped to hull) ── */}
            <g clipPath="url(#hullClip)">
              {Object.entries(BANDS).map(([id, b]) => (
                <rect
                  key={id}
                  x={b.x}
                  y={155}
                  width={b.w}
                  height={150}
                  fill={fillFor(id)}
                  {...interactiveProps(id)}
                />
              ))}

              {/* Bulkhead lines */}
              {Object.values(BANDS)
                .slice(1)
                .map((b, i) => (
                  <line
                    key={i}
                    x1={b.x}
                    y1={158}
                    x2={b.x}
                    y2={300}
                    stroke={INK}
                    strokeWidth={1}
                    pointerEvents="none"
                  />
                ))}

              {/* ── Interior detail line-art (non-interactive) ── */}
              <g stroke={INK} strokeWidth="1" fill="none" pointerEvents="none">
                {/* Bow torpedo room: tubes + stowed torpedoes + bunks */}
                <line x1="100" y1="212" x2="140" y2="212" />
                <line x1="100" y1="224" x2="140" y2="224" />
                <line x1="100" y1="236" x2="140" y2="236" />
                <line x1="100" y1="248" x2="140" y2="248" />
                <rect x="152" y="206" width="76" height="8" rx="4" />
                <rect x="152" y="222" width="76" height="8" rx="4" />
                <rect x="158" y="252" width="34" height="5" />
                <rect x="158" y="262" width="34" height="5" />
                <rect x="200" y="252" width="34" height="5" />
                <rect x="200" y="262" width="34" height="5" />
                {/* torpedo loading hatch */}
                <line x1="196" y1="160" x2="216" y2="160" strokeWidth="3" />

                {/* Crew quarters: tiered bunks + battery below */}
                {[284, 322].map((bx) => (
                  <g key={bx}>
                    <rect x={bx} y={198} width={38} height={5} />
                    <rect x={bx} y={212} width={38} height={5} />
                    <rect x={bx} y={226} width={38} height={5} />
                  </g>
                ))}
                <rect x="276" y="272" width="92" height="16" strokeDasharray="3,3" />
                {[292, 308, 324, 340, 356].map((bx) => (
                  <line key={bx} x1={bx} y1={272} x2={bx} y2={288} strokeDasharray="3,3" />
                ))}

                {/* Officers: table + bunks + battery below */}
                <rect x="388" y="230" width="40" height="4" />
                <line x1="394" y1="234" x2="394" y2="248" />
                <line x1="422" y1="234" x2="422" y2="248" />
                <rect x="440" y="200" width="38" height="5" />
                <rect x="440" y="216" width="38" height="5" />
                {/* commander's curtain */}
                <path d="M436,190 q3,6 0,12 q-3,6 0,12 q3,6 0,12" />
                <rect x="384" y="272" width="96" height="16" strokeDasharray="3,3" />
                {[400, 416, 432, 448, 464].map((bx) => (
                  <line key={bx} x1={bx} y1={272} x2={bx} y2={288} strokeDasharray="3,3" />
                ))}

                {/* Radio room: equipment racks */}
                <rect x="496" y="196" width="16" height="12" />
                <rect x="516" y="196" width="16" height="12" />
                <rect x="496" y="214" width="36" height="10" />
                {/* Enigma */}
                <rect x="502" y="232" width="22" height="8" />

                {/* Control room: periscope column, chart table, wheels */}
                <line x1="586" y1="160" x2="586" y2="252" strokeWidth="2" />
                <rect x="552" y="238" width="26" height="4" />
                <circle cx="626" cy="222" r="9" />
                <circle cx="626" cy="222" r="4" />
                <circle cx="646" cy="222" r="9" />
                <line x1="560" y1="196" x2="576" y2="196" />
                <line x1="560" y1="204" x2="576" y2="204" />
                <line x1="600" y1="196" x2="650" y2="196" />

                {/* Galley: stove + bunks */}
                <rect x="664" y="212" width="22" height="18" />
                <circle cx="670" cy="218" r="3" />
                <circle cx="680" cy="218" r="3" />
                <rect x="700" y="200" width="40" height="5" />
                <rect x="700" y="216" width="40" height="5" />

                {/* Diesel room: two engine blocks */}
                <rect x="768" y="200" width="54" height="56" rx="3" />
                <rect x="836" y="200" width="54" height="56" rx="3" />
                {[778, 790, 802, 812].map((bx) => (
                  <line key={bx} x1={bx} y1={200} x2={bx} y2={256} />
                ))}
                {[846, 858, 870, 880].map((bx) => (
                  <line key={bx} x1={bx} y1={200} x2={bx} y2={256} />
                ))}
                <line x1="754" y1="270" x2="904" y2="270" strokeDasharray="4,4" />

                {/* E-motor room: motor housings + switchboard */}
                <circle cx="930" cy="230" r="17" />
                <circle cx="930" cy="230" r="8" />
                <rect x="956" y="196" width="30" height="34" />
                <line x1="962" y1="204" x2="980" y2="204" />
                <line x1="962" y1="212" x2="980" y2="212" />
                <line x1="962" y1="220" x2="980" y2="220" />

                {/* Stern torpedo room: two tubes + bunk */}
                <line x1="1072" y1="216" x2="1112" y2="216" />
                <line x1="1072" y1="240" x2="1112" y2="240" />
                <rect x="1006" y="210" width="52" height="8" rx="4" />
                <rect x="1010" y="252" width="34" height="5" />
              </g>
            </g>

            {/* Propeller shaft line */}
            <line
              x1="1000"
              y1="240"
              x2="1140"
              y2="240"
              stroke={INK}
              strokeWidth="1"
              opacity="0.5"
              pointerEvents="none"
            />

            {/* ── Conning tower (interactive) ── */}
            <g {...interactiveProps('tower')}>
              <path
                d="M556,158 L556,108 C556,100 564,96 574,96 L628,96 C638,96 646,100 646,108 L646,158 Z"
                fill={fillFor('tower')}
                stroke={strokeFor('tower')}
                strokeWidth="1.5"
              />
              {/* periscopes + snorkel */}
              <g stroke={INK} strokeWidth="2" fill="none" pointerEvents="none">
                <line x1="584" y1="96" x2="584" y2="52" />
                <line x1="584" y1="52" x2="592" y2="52" />
                <line x1="604" y1="96" x2="604" y2="40" />
                <line x1="604" y1="40" x2="612" y2="40" />
                {/* snorkel mast, folded along tower */}
                <line x1="562" y1="96" x2="552" y2="60" strokeDasharray="4,4" strokeWidth="1.5" />
              </g>
            </g>

            {/* ── Deck armament (interactive): deck gun + AA platform ── */}
            <g {...interactiveProps('armament')}>
              {/* 105mm deck gun forward of tower */}
              <g
                stroke={strokeFor('armament')}
                strokeWidth="1.5"
                fill={fillFor('armament')}
              >
                <rect x="452" y="136" width="26" height="14" rx="3" />
                <line x1="478" y1="140" x2="508" y2="128" strokeWidth="2.5" />
                <line x1="462" y1="150" x2="462" y2="153" />
                <line x1="470" y1="150" x2="470" y2="153" />
              </g>
              {/* Wintergarten AA platform aft of tower */}
              <g
                stroke={strokeFor('armament')}
                strokeWidth="1.5"
                fill={fillFor('armament')}
              >
                <path d="M646,150 L708,150 L700,128 L646,128 Z" />
                <line x1="668" y1="128" x2="678" y2="112" strokeWidth="2" />
                <line x1="688" y1="128" x2="700" y2="114" strokeWidth="2" />
              </g>
              {/* invisible fat hit-area so the small guns are easy to tap */}
              <rect x="440" y="104" width="280" height="52" fill="transparent" stroke="none" />
            </g>

            {/* ── Number labels ── */}
            {COMPARTMENTS.map((c) => {
              const pos = LABELS[c.id]
              if (!pos) return null
              const active = selectedId === c.id
              return (
                <g
                  key={c.id}
                  {...interactiveProps(c.id)}
                  pointerEvents="bounding-box"
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="13"
                    fill={active ? ORANGE : '#0d3040'}
                    stroke={active ? ORANGE : TEAL}
                    strokeWidth="1.25"
                    opacity={active ? 1 : 0.9}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    fontFamily="'Courier Prime', monospace"
                    fontSize="11"
                    fontWeight="bold"
                    fill={active ? '#0d3040' : TEAL}
                  >
                    {c.num}
                  </text>
                </g>
              )
            })}

            {/* Bow / stern captions */}
            <text
              x="46"
              y="330"
              fontFamily="'Courier Prime', monospace"
              fontSize="11"
              fill={TEAL}
              opacity="0.45"
              letterSpacing="2"
            >
              BOW
            </text>
            <text
              x="1120"
              y="330"
              fontFamily="'Courier Prime', monospace"
              fontSize="11"
              fill={TEAL}
              opacity="0.45"
              letterSpacing="2"
            >
              STERN
            </text>
            {/* Scale note */}
            <line x1="100" y1="368" x2="1112" y2="368" stroke={TEAL} strokeWidth="0.75" opacity="0.3" />
            <line x1="100" y1="362" x2="100" y2="374" stroke={TEAL} strokeWidth="0.75" opacity="0.3" />
            <line x1="1112" y1="362" x2="1112" y2="374" stroke={TEAL} strokeWidth="0.75" opacity="0.3" />
            <text
              x="606"
              y="388"
              textAnchor="middle"
              fontFamily="'Courier Prime', monospace"
              fontSize="11"
              fill={TEAL}
              opacity="0.45"
              letterSpacing="1.5"
            >
              OVERALL LENGTH 76.76 M
            </text>
          </svg>
        </div>
      </div>

      {/* ── Compartment chips (mobile-friendly + a11y) ── */}
      <div className="flex flex-wrap gap-2 mt-6 mb-8">
        {COMPARTMENTS.map((c) => {
          const active = selectedId === c.id
          return (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className="font-mono text-xs px-3 py-1.5 transition-all duration-200"
              style={{
                background: active ? ORANGE : 'rgba(126,206,206,0.06)',
                color: active ? '#0d3040' : TEAL,
                border: `1px solid ${active ? ORANGE : 'rgba(126,206,206,0.25)'}`,
                letterSpacing: '0.08em',
              }}
            >
              {c.num} {c.name}
            </button>
          )
        })}
      </div>

      {/* ── Blow-out information panel ── */}
      <div
        className="relative"
        style={{
          background: 'rgba(13, 48, 64, 0.6)',
          border: '1px solid rgba(126, 206, 206, 0.2)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="p-6 lg:p-10"
          >
            <div className="flex items-start justify-between gap-6 mb-4">
              <div>
                <p
                  className="font-mono text-xs uppercase mb-2"
                  style={{ color: ORANGE, letterSpacing: '0.2em' }}
                >
                  Compartment {selected.num} / 12
                </p>
                <h3
                  className="font-montserrat font-black uppercase"
                  style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                    letterSpacing: '0.08em',
                    color: '#F8F4EE',
                    lineHeight: 1.15,
                  }}
                >
                  {selected.name}
                </h3>
                <p
                  className="font-mono text-sm mt-1 italic"
                  style={{ color: TEAL, letterSpacing: '0.05em' }}
                >
                  {selected.german}
                </p>
              </div>
              {/* Prev / next */}
              <div className="flex gap-2 flex-shrink-0 mt-1">
                {([-1, 1] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => go(dir as 1 | -1)}
                    aria-label={dir === -1 ? 'Previous compartment' : 'Next compartment'}
                    className="w-10 h-10 flex items-center justify-center transition-colors duration-200 hover:bg-teal-light hover:text-slate-deep"
                    style={{
                      border: '1px solid rgba(126,206,206,0.35)',
                      color: TEAL,
                      fontSize: 18,
                    }}
                  >
                    {dir === -1 ? '←' : '→'}
                  </button>
                ))}
              </div>
            </div>

            <p
              className="font-montserrat text-base leading-relaxed mb-6 max-w-3xl"
              style={{ color: 'rgba(248,244,238,0.85)' }}
            >
              {selected.blurb}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p
                  className="font-mono text-xs uppercase mb-3"
                  style={{ color: 'rgba(248,244,238,0.45)', letterSpacing: '0.18em' }}
                >
                  Key Details
                </p>
                <ul className="space-y-2.5">
                  {selected.facts.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="font-mono text-xs mt-1 flex-shrink-0"
                        style={{ color: ORANGE }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="font-montserrat text-sm leading-relaxed"
                        style={{ color: 'rgba(248,244,238,0.75)' }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {selected.u534 && (
                <div
                  className="p-5 self-start"
                  style={{
                    background: 'rgba(224, 123, 69, 0.08)',
                    borderLeft: `2px solid ${ORANGE}`,
                  }}
                >
                  <p
                    className="font-mono text-xs uppercase mb-2"
                    style={{ color: ORANGE, letterSpacing: '0.18em' }}
                  >
                    Aboard U-534
                  </p>
                  <p
                    className="font-montserrat text-sm leading-relaxed"
                    style={{ color: 'rgba(248,244,238,0.8)' }}
                  >
                    {selected.u534}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p
        className="font-mono text-xs mt-4"
        style={{ color: 'rgba(248,244,238,0.35)', letterSpacing: '0.06em' }}
      >
        Schematic plan based on published design studies of the Type IXC/40 ocean-going U-boat. Not to exact scale.
      </p>
    </div>
  )
}
