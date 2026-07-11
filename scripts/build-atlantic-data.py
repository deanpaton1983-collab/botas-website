#!/usr/bin/env python3
# Battle at Sea data pipeline — regenerates public/atlantic/data/ from the
# uboat.net CSV exports (allied_warships_clean.csv, allied_events_clean.csv,
# uboats_clean.csv, uboat_events_clean.csv, uboat_war_visualiser.html).
# Usage: place the CSVs next to this script, then run:
#   python3 build-atlantic-data.py small   (indexes, uboats, wolfpacks, aggregates, land)
#   python3 build-atlantic-data.py events  (5,831 per-ship event shards)
# Output goes to ./out/ — copy it to public/atlantic/data/.
"""Build static JSON for the Battle at Sea section. Stages: small | events"""
import csv, json, os, re, sys
from collections import defaultdict, Counter

csv.field_size_limit(10**9)
SRC = os.path.expanduser('~/atlantic')
OUT = os.path.join(SRC, 'out')
BUCKET = 128
stage = sys.argv[1] if len(sys.argv) > 1 else 'small'
os.makedirs(os.path.join(OUT, 'events'), exist_ok=True)
os.makedirs(os.path.join(OUT, 'warship-details'), exist_ok=True)

def jdump(obj, path):
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, separators=(',', ':'))
    os.replace(tmp, path)

def year(iso):
    return int(iso[:4]) if iso and len(iso) >= 4 else None

if stage == 'events':
    cur_id, cur_name, cur_events, n = None, None, [], 0
    written = skipped = 0
    def flush():
        global written, skipped
        if cur_id is None: return
        p = os.path.join(OUT, 'events', f'{cur_id}.json')
        if os.path.exists(p):
            skipped += 1
        else:
            jdump({'id': int(cur_id), 'name': cur_name, 'events': cur_events}, p)
            written += 1
    with open(os.path.join(SRC, 'allied_events_clean.csv'), encoding='utf-8') as f:
        for r in csv.DictReader(f):
            sid = r['ship_id']
            if sid != cur_id:
                flush()
                cur_id, cur_name, cur_events = sid, r['name'], []
            cur_events.append(r['event'])
            n += 1
    flush()
    print('EVENTS DONE rows:', n, 'written:', written, 'skipped:', skipped)
    sys.exit(0)

# ---- stage: small ----
boats = []
with open(os.path.join(SRC, 'uboats_clean.csv'), encoding='utf-8') as f:
    for r in csv.DictReader(f):
        w = (r['wolfpacks'] or '').strip()
        wolf, ops = [], []
        if w:
            if ':' in w:
                w = w.split(':', 1)[1]
            for name, d0, d1 in re.findall(
                    r'([^()]+?)\s*\((\d{1,2} [A-Z][a-z]{2} \d{4}) - (\d{1,2} [A-Z][a-z]{2} \d{4})\)', w):
                name = name.strip(' .,;|-')
                if not name:
                    continue
                ops.append({'pack': name, 'from': d0, 'to': d1})
                if name not in wolf:
                    wolf.append(name)
        boats.append({
            'boat': r['boat'], 'slug': r['slug'], 'type': r['type'],
            'ordered': r['ordered'], 'laid_down': r['laid_down'],
            'launched': r['launched'], 'commissioned': r['commissioned'],
            'ordered_iso': r['ordered_iso'] or None, 'laid_down_iso': r['laid_down_iso'] or None,
            'launched_iso': r['launched_iso'] or None, 'commissioned_iso': r['commissioned_iso'] or None,
            'shipyard': r['shipyard'],
            'commanders': [c.strip() for c in (r['commanders'] or '').split('|') if c.strip()],
            'career': r['career'], 'successes': r['successes'], 'fate': r['fate'],
            'notes': r['notes'] or None, 'url': r['url'],
            'fate_category': r['fate_category'], 'fate_date': r['fate_date'] or None,
            'lat': float(r['fate_lat']) if r['fate_lat'] else None,
            'lon': float(r['fate_lon']) if r['fate_lon'] else None,
            'wolfpacks': wolf, 'wolfpack_ops': ops})
jdump({'boats': boats}, os.path.join(OUT, 'uboats.json'))

packs = defaultdict(list)
for b in boats:
    seen = set()
    for op in b['wolfpack_ops']:
        p = op['pack']
        if p in seen:
            continue
        seen.add(p)
        packs[p].append({'boat': b['boat'], 'slug': b['slug'], 'type': b['type'],
                         'fc': b['fate_category'], 'fd': b['fate_date'], 'la': b['lat'], 'lo': b['lon'],
                         'from': op['from'], 'to': op['to']})
jdump(dict(sorted(packs.items())), os.path.join(OUT, 'wolfpacks.json'))

uevents = defaultdict(list)
with open(os.path.join(SRC, 'uboat_events_clean.csv'), encoding='utf-8') as f:
    for r in csv.DictReader(f):
        uevents[r['slug']].append(r['event'])
jdump(dict(uevents), os.path.join(OUT, 'uboat-events.json'))

# warship event counts (stream, count only)
evcount = Counter()
with open(os.path.join(SRC, 'allied_events_clean.csv'), encoding='utf-8') as f:
    rd = csv.reader(f); next(rd)
    for row in rd:
        evcount[row[0]] += 1

ships, details = [], defaultdict(dict)
navy_counts, stype_counts = Counter(), Counter()
with open(os.path.join(SRC, 'allied_warships_clean.csv'), encoding='utf-8') as f:
    for r in csv.DictReader(f):
        sid = int(r['ship_id'])
        ships.append([sid, r['name'], r['Navy'], r['Type'], r['Class'] or '',
                      r['Pennant'] or '', year(r['commissioned_iso']), year(r['end_service_iso']),
                      evcount.get(r['ship_id'], 0)])
        navy_counts[r['Navy']] += 1
        stype_counts[r['Type']] += 1
        details[sid // BUCKET][str(sid)] = {
            'built_by': r['Built by'], 'ordered': r['Ordered'], 'laid_down': r['Laid down'],
            'launched': r['Launched'], 'commissioned': r['Commissioned'], 'end_service': r['End service'],
            'ordered_iso': r['ordered_iso'] or None, 'laid_down_iso': r['laid_down_iso'] or None,
            'launched_iso': r['launched_iso'] or None, 'commissioned_iso': r['commissioned_iso'] or None,
            'end_service_iso': r['end_service_iso'] or None,
            'history': r['History'],
            'commanders': [c.strip() for c in (r['commanders'] or '').split('|') if c.strip()],
            'url': r['url'], 'quality_flags': r['quality_flags'] or None}
jdump({'fields': ['id','name','navy','type','class','pennant','commYear','endYear','events'],
       'bucketSize': BUCKET, 'rows': ships}, os.path.join(OUT, 'warship-index.json'))
for bkt, d in details.items():
    jdump(d, os.path.join(OUT, 'warship-details', f'{bkt}.json'))

comm, lost = Counter(), Counter()
utype, fates = Counter(), Counter()
for b in boats:
    utype[b['type']] += 1
    fates[b['fate_category']] += 1
    if b['commissioned_iso']: comm[b['commissioned_iso'][:7]] += 1
    if b['fate_date'] and b['fate_category'] in ('Sunk', 'Missing'):
        lost[b['fate_date'][:7]] += 1
agg = {'totals': {'uboats': len(boats), 'warships': len(ships),
                  'destroyedAtSea': sum(1 for b in boats if b['fate_category'] in ('Sunk', 'Missing')),
                  'plottable': sum(1 for b in boats if b['lat'] is not None),
                  'alliedEvents': sum(evcount.values()), 'shipsWithEvents': len(evcount),
                  'wolfpacks': len(packs)},
       'comm': dict(comm), 'lost': dict(lost),
       'utype': dict(utype.most_common()), 'fates': dict(fates.most_common()),
       'navy': dict(navy_counts.most_common()), 'stype': dict(stype_counts.most_common())}
jdump(agg, os.path.join(OUT, 'aggregates.json'))

html = open(os.path.join(SRC, 'uboat_war_visualiser.html'), encoding='utf-8').read()
m = re.search(r'const LAND = (\[.*?\]);\nconst D = ', html, re.S)
jdump(json.loads(m.group(1)), os.path.join(OUT, 'land.json'))
m2 = re.search(r'const D = (\{.*?\});\n\nconst FC', html, re.S)
D = json.loads(m2.group(1))
print('embedded totals:', D['totals'], '| ours uboats:', agg['totals']['uboats'], 'warships:', agg['totals']['warships'])
print('May 1943 lost ours:', lost.get('1943-05'), '| embedded:', D['lost'].get('1943-05'))
print('destroyedAtSea:', agg['totals']['destroyedAtSea'], '| plottable:', agg['totals']['plottable'])
print('detail buckets:', len(details), '| max id:', max(s[0] for s in ships), '| ships w/events:', len(evcount))
print('wolfpacks:', len(packs))
for fn in ['warship-index.json','uboats.json','wolfpacks.json','uboat-events.json','aggregates.json','land.json']:
    print(fn, round(os.path.getsize(os.path.join(OUT, fn))/1e6, 2), 'MB')
print('SMALL DONE')
