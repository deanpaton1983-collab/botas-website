# SEO Audit & Implementation Report
**Battle of the Atlantic Story — battleoftheatlantic.org**
7 July 2026 · All safe changes implemented and type-checked · Rollback: git commit `bd84bd0`

---

## 1. Executive summary

The site had a strong content and design foundation but was missing the basic technical SEO plumbing (no sitemap, no robots.txt, no structured data, broken social-share images) and its titles/headings barely used the terms people actually search for ("museum", "Liverpool", "Wirral", "WW2", "U-boat museum"). All of that is now fixed and live in the codebase — push to GitHub to deploy.

The single biggest remaining wins are **off-site**: connecting the battleoftheatlantic.org domain, creating a Google Business Profile, and getting links from the Western Approaches Museum, Big Heritage, and Liverpool/Wirral tourism sites. Those need account access, so they're listed under manual actions.

## 2. What was audited
Every page (`/`, `/museum`, `/u-boat`, `/memorial`, `/news`, `/news/[id]`, `/contact`), all metadata, headings, alt text, internal links, image handling, robots/sitemap/canonical/indexing settings, structured data, OG/Twitter cards, navigation and footer, the news article data, and the contact API route. Analytics: **none installed** (no GA4/GTM/Search Console tags found). CMS: none — content lives in the Next.js codebase, so all edits were made directly and are version-controlled in git.

## 3. Key findings (before)

**Technical**
- No `sitemap.xml`, no `robots.txt` — Google discovers pages only by crawling links
- No structured data at all (no Museum, LocalBusiness, FAQ, or Article schema)
- All OG/Twitter images pointed to `/images/og/og-*.jpg` — files that don't exist, so every social/WhatsApp share showed no image
- Article pages had no per-article metadata or canonical (client-rendered only)
- Footer linked to a typo domain (`westwnapproaches.co.uk`) — broken outbound link
- Social icons link to `#` (placeholders)
- No analytics or Search Console

**On-page**
- Titles were brand-only ("Memorial", "The Museum") with none of the location/intent terms: Liverpool, Wirral, Woodside Ferry, WW2 museum, U-boat museum
- Museum page H1 ("Discover the Atlantic Story") didn't say "museum"
- No FAQ content answering visitor queries ("how do I get there from Liverpool", "when does it open")
- No informational page targeting "What was the Battle of the Atlantic?" — the highest-volume topic query
- Good: alt text, heading hierarchy, image handling (next/image), quotes and E-E-A-T signals were already strong

## 4. What was changed automatically
See `SEO-CHANGELOG.md` for the full before/after detail. In summary:

1. **robots.ts + sitemap.ts** — proper crawl directives and XML sitemap
2. **Rewritten titles & descriptions** on every page, front-loading target terms (WW2 museum, Birkenhead, Liverpool, U-534, Woodside) in natural UK English
3. **Structured data**: Museum + TouristAttraction (site-wide), FAQPage (/museum), Article (news articles)
4. **Fixed OG/Twitter images** site-wide (now use existing photography)
5. **New page `/history`** — "What Was the Battle of the Atlantic?" with key-facts grid, history in five sections, links to every main page (in nav + footer)
6. **Visible FAQ section** on /museum (6 visitor questions, matching schema)
7. **Museum H1** → "The Battle of the Atlantic Museum" (exact-match primary keyword)
8. **Internal linking**: home → history, museum → history, u-boat → history, nav + footer links, descriptive anchor text in footer ("Visit the Museum", "U-534: The U-Boat", "Battle of the Atlantic History")
9. **Local SEO copy**: Woodside Ferry terminal, Merseyrail/Hamilton Square, "opposite Liverpool" woven into footer, museum page, and metadata
10. **Fixed broken Western Approaches link** → liverpoolwarmuseum.co.uk (verified)
11. **Per-article metadata + canonicals + noindex** for non-existent article IDs

**Quality control done:** full `tsc` type-check passes on the complete patched project; production build run; all internal links point to existing routes; no page was noindexed; no facts, dates, prices, or partnerships invented; FAQ answers use only information already published on the site.

## 5. Keyword map

| Page | Primary keyword | Secondary |
|---|---|---|
| / | battle of the atlantic story | battle of the atlantic museum, WW2 museum Birkenhead |
| /museum | battle of the atlantic museum | WW2 museum Liverpool, WW2 museum Wirral, museum Birkenhead |
| /u-boat | U-534 | U-boat museum UK, WW2 U-boat, German submarine museum |
| /history | what was the battle of the atlantic | battle of the atlantic facts/timeline/summary, why was Liverpool important WW2 |
| /memorial | battle of the atlantic memorial | naval memorial Merseyside, merchant navy memorial |
| /contact | battle of the atlantic museum tickets/visit | Woodside Birkenhead directions |
| /news | battle of the atlantic news | museum opening 2027 |

**By intent:** visitors → /museum, /contact · U-534 enthusiasts → /u-boat · schools → /museum (+ future /schools page) · tourists → /museum, /contact · history audiences → /history, /news · press/funders → /news, /contact.

## 6. Search landscape (summary)
Competing results for the target queries are: Western Approaches Museum (liverpoolwarmuseum.co.uk — a Big Heritage sister site: collaborate, don't compete; cross-linking both ways is the single easiest authority win), Merseyside Maritime Museum (National Museums Liverpool), IWM (topic authority for "Battle of the Atlantic" informational queries), Wikipedia (U-534, Battle of the Atlantic), and the legacy "U-boat Story" pages/references that still exist around the web (worth chasing for link updates/redirects — see manual actions). Opportunity: **nobody owns "Battle of the Atlantic museum"** as an entity — the new schema `alternateName` plus the /museum H1 targets exactly that, and "U-boat museum UK" has weak competition since the U-boat Story closed.

## 7. Content plan (next pages to add)
Priority order; all can be drafted on request:

1. **/schools** — "School Visits & Learning Resources" (KS2/KS3/GCSE keywords; conversion: education enquiries) — highest value
2. **/history/u-534-timeline** or expand /u-boat — "U-534 timeline" long-tail
3. **/history/liverpool-western-approaches** — "Why Liverpool was central to the Battle of the Atlantic" / "Western Approaches" queries
4. **/history/convoys-and-u-boats** — "Atlantic convoys explained", "wolf packs"
5. **/visit/woodside** — "Things to do near Woodside Ferry / Hamilton Square" local-tourism page
6. **/history/cammell-laird** — "Birkenhead shipbuilding WW2" — strong local press/link bait
7. News cadence: one article/month minimum (construction milestones, artefact stories, veteran interviews) — each is digital-PR material

## 8. Local SEO recommendations (manual)
- **Google Business Profile**: create now as "Battle of the Atlantic Story" (category: Museum; secondary: Tourist attraction), CH41 6DU, "Opening 2027" in description. Being established for a year before opening compounds
- Bing Places, Apple Maps (Apple Business Connect), TripAdvisor listing (pre-opening "coming soon")
- Citations: VisitLiverpool.com, VisitWirral, Marketing Liverpool, Wirral Council tourism pages, Culture Liverpool
- After opening: reviews strategy (QR at exit, respond to all reviews)

## 9. Authority & backlink strategy
- **Immediate**: reciprocal links from liverpoolwarmuseum.co.uk + bigheritage.co.uk (same organisation); Naval Club Charitable Trust and other named supporters; Wikipedia — update the U-534 and "U-Boat Story" articles' external links/museum status (factual edits)
- **Local press**: Liverpool Echo, Wirral Globe — construction milestones, memorial-wall donations campaign (Emma Rodgers angle is genuinely newsworthy)
- **National/specialist**: Navy News, Forces News, BBC History/History Extra, Warfare History Network; naval associations (Merchant Navy Association, RNA branches); IWM partnership content
- **Education**: history teaching resource directories (TES), Historical Association
- **Campaign ideas that earn links**: "Add a ship to the memorial" public donation campaign; U-534 artefact digitisation stories; 85th anniversary tie-ins; HMS Whimbrel campaign coverage
- No outreach has been sent — strategy only, per your instruction

## 10. Manual actions required (can't be done from the codebase)
1. **Push to GitHub** → Vercel deploy (`git add -A; git commit; git push`)
2. **Connect battleoftheatlantic.org** to the Vercel project (DNS). Until then, canonicals point at the production domain while the site serves from botas-website.vercel.app — correct long-term, but the domain must go live
3. **Google Search Console**: verify domain, submit sitemap.xml
4. **Analytics**: install GA4 (or Plausible/Fathom if you prefer privacy-first) — nothing is currently measured
5. **Google Business Profile** + Bing/Apple/TripAdvisor listings (section 8)
6. **Social profiles**: footer icons currently link to "#" — create/supply real URLs and I'll wire them in (also feeds `sameAs` in schema)
7. **OG images**: I've pointed shares at existing photos (works fine); purpose-made 1200×630 branded crops would look sharper — I can generate these next session
8. **Legacy U-boat Story**: if Big Heritage controls any old u-boatstory URLs/listings, redirect or update them to battleoftheatlantic.org — likely the strongest single backlink/redirect win available
9. **Phone number check**: the site lists 0151 227 2008 (Western Approaches' number). If BOTAS gets its own line, update Footer, /contact, and the schema in `src/app/layout.tsx`

## 11. 30 / 60 / 90 days
- **30**: deploy; domain live; Search Console + sitemap submitted; GA4; GBP created; reciprocal links from WA/Big Heritage; social URLs added
- **60**: /schools page; 2 history articles; Liverpool Echo/Wirral Globe story; TripAdvisor + tourism citations; branded OG images
- **90**: full history cluster live; memorial donation campaign launch (link-earning); monthly news cadence established; first Search Console review — adjust titles based on real query data
