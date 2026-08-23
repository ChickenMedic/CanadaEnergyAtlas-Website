// Fetches live benchmark anchor prices from free official sources and writes public/prices.json.
// Sources:
//   - EIA API v2 (WTI, Brent, Henry Hub daily spot). Free key: https://www.eia.gov/opendata
//     Set EIA_API_KEY; falls back to the shared, rate-limited DEMO_KEY.
//   - Alberta Economic Dashboard API (WCS & WTI monthly, AECO monthly CAD/GJ). No key.
//   - Bank of Canada Valet API (USD/CAD daily). No key.
// WCS and AECO are anchored to the live daily WTI / Henry Hub price plus the latest
// official monthly differential, so they move daily while staying tied to published data.
// Run: node scripts/fetch-prices.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_PATH = join(ROOT, 'public', 'prices.json');
const EIA_KEY = process.env.EIA_API_KEY || 'DEMO_KEY';
const GJ_PER_MMBTU = 1.055056;

if (EIA_KEY === 'DEMO_KEY') {
  console.warn('EIA_API_KEY not set — using the shared DEMO_KEY (rate-limited, fine for local testing).');
}

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

// EIA daily spot series → { price, change, pctChange, asOf }
async function eiaDaily(seriesId) {
  const data = await getJson(`https://api.eia.gov/v2/seriesid/${seriesId}?api_key=${EIA_KEY}&length=10`);
  const rows = data.response.data.filter((r) => r.value != null);
  if (rows.length < 2) throw new Error(`EIA ${seriesId}: not enough observations`);
  const [latest, prev] = rows; // API returns newest first
  const change = +(latest.value - prev.value).toFixed(2);
  return {
    price: latest.value,
    change,
    pctChange: +((change / prev.value) * 100).toFixed(2),
    asOf: latest.period,
  };
}

// EIA monthly series → latest { value, period }
async function eiaMonthlyLatest(seriesId) {
  const data = await getJson(`https://api.eia.gov/v2/seriesid/${seriesId}?api_key=${EIA_KEY}&length=3`);
  const row = data.response.data.find((r) => r.value != null);
  if (!row) throw new Error(`EIA ${seriesId}: no data`);
  return { value: row.value, period: row.period };
}

// Alberta dashboard rows use a "Type " key with a trailing space.
function albertaRows(rows, type) {
  return rows
    .filter((r) => (r['Type '] ?? r.Type)?.trim() === type && r.Value != null)
    .sort((a, b) => new Date(b.Date) - new Date(a.Date));
}

// Latest month where both WCS and WTI are published → WCS−WTI differential.
async function albertaWcsDiff() {
  const rows = await getJson('https://api.economicdata.alberta.ca/data?table=OilPrices&Type=WCS;WTI');
  const wcs = albertaRows(rows, 'WCS');
  const wti = albertaRows(rows, 'WTI');
  for (const w of wcs) {
    const match = wti.find((t) => t.Date === w.Date);
    if (match) {
      return { diff: +(w.Value - match.Value).toFixed(2), month: w.Date.slice(0, 7) };
    }
  }
  throw new Error('Alberta OilPrices: no month with both WCS and WTI');
}

// Latest monthly AECO price in CAD/GJ → USD/MMBtu.
async function albertaAecoUsd() {
  const [rows, fxData] = await Promise.all([
    getJson('https://api.economicdata.alberta.ca/data?table=NaturalGasPrices&Type=NatGas'),
    getJson('https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=1'),
  ]);
  const latest = albertaRows(rows, 'NatGas')[0];
  if (!latest) throw new Error('Alberta NaturalGasPrices: no data');
  const usdCad = parseFloat(fxData.observations[0].FXUSDCAD.v);
  return {
    usdPerMmbtu: +((latest.Value * GJ_PER_MMBTU) / usdCad).toFixed(2),
    month: latest.Date.slice(0, 7),
  };
}

function loadPrevious() {
  try {
    return JSON.parse(readFileSync(OUT_PATH, 'utf8'));
  } catch {
    return null;
  }
}

async function main() {
  const prev = loadPrevious();
  const anchors = {};
  const failures = [];

  const attempt = async (key, fn) => {
    try {
      anchors[key] = await fn();
    } catch (err) {
      console.error(`Failed to build anchor "${key}": ${err.message}`);
      if (prev?.anchors?.[key]) {
        anchors[key] = prev.anchors[key];
        console.warn(`  → kept previous value from ${prev.updatedAt}`);
      } else {
        failures.push(key);
      }
    }
  };

  await attempt('wti', async () => ({
    ...(await eiaDaily('PET.RWTC.D')),
    source: 'EIA (Cushing, OK spot)',
    live: true,
  }));
  await attempt('brent', async () => ({
    ...(await eiaDaily('PET.RBRTE.D')),
    source: 'EIA (Europe Brent spot)',
    live: true,
  }));
  await attempt('hh', async () => ({
    ...(await eiaDaily('NG.RNGWHHD.D')),
    source: 'EIA (Henry Hub spot)',
    live: true,
  }));

  // WCS = live WTI + latest official monthly WCS−WTI differential.
  await attempt('wcs', async () => {
    if (!anchors.wti) throw new Error('needs live WTI');
    const { diff, month } = await albertaWcsDiff();
    return {
      price: +(anchors.wti.price + diff).toFixed(2),
      change: anchors.wti.change,
      pctChange: anchors.wti.pctChange,
      asOf: anchors.wti.asOf,
      diffVsWti: diff,
      diffMonth: month,
      source: `Live WTI + Alberta Gov ${month} differential`,
      live: true,
    };
  });

  // AECO = live Henry Hub + (monthly AECO − monthly HH) differential.
  await attempt('aeco', async () => {
    if (!anchors.hh) throw new Error('needs live Henry Hub');
    const [aeco, hhMonth] = await Promise.all([albertaAecoUsd(), eiaMonthlyLatest('NG.RNGWHHD.M')]);
    const diff = +(aeco.usdPerMmbtu - hhMonth.value).toFixed(2);
    return {
      price: +(anchors.hh.price + diff).toFixed(2),
      change: anchors.hh.change,
      pctChange: anchors.hh.pctChange,
      asOf: anchors.hh.asOf,
      diffVsHh: diff,
      diffMonth: aeco.month,
      source: `Live Henry Hub + Alberta Gov ${aeco.month} differential`,
      live: true,
    };
  });

  if (failures.length) {
    console.error(`No fresh or previous data for: ${failures.join(', ')} — not writing prices.json.`);
    process.exit(1);
  }

  // Keep the previous timestamp when nothing changed, so the CI commit step
  // (which diffs this file) skips no-op days instead of triggering a deploy.
  const unchanged = prev && JSON.stringify(prev.anchors) === JSON.stringify(anchors);
  const out = { updatedAt: unchanged ? prev.updatedAt : new Date().toISOString(), anchors };
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + '\n');
  console.log(`Wrote ${OUT_PATH}`);
  for (const [k, v] of Object.entries(anchors)) {
    console.log(`  ${k.padEnd(6)} $${v.price}  (${v.change >= 0 ? '+' : ''}${v.change}, as of ${v.asOf})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
