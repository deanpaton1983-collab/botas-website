# SEO Changelog — 7 July 2026

Rollback point: git commit `bd84bd0` ("Add radar sweep map zoom to intro"). Every change below can be reverted with `git checkout bd84bd0 -- <file>`.

## New files

| File | Purpose |
|---|---|
| `src/app/robots.ts` | Generates `/robots.txt` — allow all, disallow `/api/`, points to sitemap |
| `src/app/sitemap.ts` | Generates `/sitemap.xml` for all pages + news articles |
| `src/data/faqs.ts` | Visitor FAQ data (rendered on /museum + FAQPage JSON-LD) |
| `src/app/history/page.tsx` | New page: "What Was the Battle of the Atlantic?" — informational cornerstone |
| `src/app/news/[id]/layout.tsx` | Per-article metadata (generateMetadata), canonical, Article JSON-LD; noindex for unknown IDs |
| `SEO-CHANGELOG.md`, `SEO-REPORT.md` | This documentation |

## Metadata changes (before → after)

### Root layout (`src/app/layout.tsx`)
- Default title: `Battle of the Atlantic Story | Birkenhead` → `Battle of the Atlantic Story | WW2 Museum & U-534 U-Boat, Birkenhead`
- Description: rewritten to include Woodside, Birkenhead, River Mersey, Liverpool
- Keywords: added Battle of the Atlantic museum / Liverpool / Birkenhead, U-boat museum UK, WW2 museum Liverpool/Wirral, Woodside Ferry, Western Approaches, things to do in Liverpool/Wirral
- OG/Twitter image: `/images/og/og-default.jpg` (missing file, broken previews) → existing convoy photograph
- Added Museum + TouristAttraction JSON-LD (name, alternateName "Battle of the Atlantic Museum", address CH41 6DU, geo 53.3947/-3.0086, phone, email, parent org Big Heritage CIC)

### /museum (`museum/layout.tsx`)
- Title: `The Museum` → `Visit the Museum | WW2 Museum in Birkenhead, near Liverpool`
- Description: rewritten (Woodside, Mersey Ferry, families, school visits)
- OG image: missing og-default.jpg → `/images/museum/03CruelSea.jpg`
- Added FAQPage JSON-LD (mirrors visible FAQ section)

### /u-boat (`u-boat/layout.tsx`)
- Title: `The U-Boat: U-534` → `U-534 | The Only U-Boat Raised from the Seabed After Combat`
- Description: rewritten (see a real WW2 German U-boat in Birkenhead, near Liverpool)
- OG image: missing og-u-boat.jpg → existing IWM U-boat photograph

### /memorial (`memorial/layout.tsx`)
- Title: `Memorial` → `Battle of the Atlantic Memorial | Birkenhead, Merseyside`
- Description: adds Woodside/Birkenhead/River Mersey
- OG image: missing og-memorial.jpg → `/images/memorial-building.jpg`

### /news (`news/layout.tsx`)
- Title: `News & Stories` → `News & Stories | Battle of the Atlantic History & Museum Updates`
- OG image: missing og-news.jpg → existing convoy photograph

### /contact (`contact/layout.tsx`)
- Title: `Contact & Visit` → `Contact & Plan Your Visit | Woodside, Birkenhead`
- Description: adds CH41 6DU, Mersey Ferry from Liverpool
- OG image: missing og-default.jpg → `/images/memorial-building.jpg`

## On-page changes

### `src/app/museum/page.tsx`
- H1: `Discover the Atlantic Story` → `The Battle of the Atlantic Museum` (exact-match for the primary target query)
- Added "What was the Battle of the Atlantic?" link to /history in intro
- "Getting Here" card: now names Woodside Ferry terminal + Merseyrail/Hamilton Square
- Added visible FAQ section (6 questions) before the CTA — matches FAQPage schema

### `src/app/page.tsx` (home)
- Added "What was the Battle of the Atlantic? →" link (to /history) after the mission statement

### `src/app/u-boat/page.tsx`
- Final CTA secondary button: The Memorial → The Battle of the Atlantic (/history)

### `src/components/Navigation.tsx`
- "The Story" → "The Museum"; added "History" link

### `src/components/Footer.tsx`
- Nav labels: "Visit" → "Visit the Museum", "The U-Boat" → "U-534: The U-Boat"; added "Battle of the Atlantic History"
- Mission blurb: now includes "Woodside Ferry, Birkenhead, on the River Mersey opposite Liverpool"
- Fixed broken link: `westwnapproaches.co.uk` (typo domain) → `https://liverpoolwarmuseum.co.uk` (verified live Western Approaches Museum site)

## Not changed (deliberately)
- Phone number (0151 227 2008), address, opening year, all historical facts, roll-of-honour placeholders, quotes, form/API route, analytics (none installed), pricing/hours (not yet announced — excluded from FAQ answers beyond "to be announced")
