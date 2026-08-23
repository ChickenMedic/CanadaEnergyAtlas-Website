// Benchmark board definitions. Prices are NOT stored here — live anchor prices come
// from /prices.json (written daily by scripts/fetch-prices.mjs via GitHub Actions).
// A benchmark either IS an anchor (anchor set → shown as LIVE) or is derived from one
// (base + diff → anchor price plus a typical differential, shown as INDICATIVE).
// sourceCode is a placeholder for a paid market-data code (e.g. OilPriceAPI) if we
// ever upgrade a derived benchmark to a live feed.

export type AnchorId = 'wti' | 'brent' | 'hh' | 'wcs' | 'aeco';
export type BenchmarkType = 'oil' | 'gas';
export type BenchmarkRegion = 'na' | 'eu' | 'asia';

export interface BenchmarkDef {
  id: string;
  name: string;
  type: BenchmarkType;
  region: BenchmarkRegion;
  note: string;
  volume: number;
  anchor?: AnchorId;
  base?: AnchorId;
  diff?: number;
  sourceCode?: string;
}

export interface AnchorPrice {
  price: number;
  change: number;
  pctChange: number;
  asOf: string;
  source: string;
  live: boolean;
}

export interface PricesFile {
  updatedAt: string;
  anchors: Record<AnchorId, AnchorPrice>;
}

export const benchmarks: BenchmarkDef[] = [
  // North America Oil
  { id: 'wcs', name: 'WCS (Hardisty)', type: 'oil', region: 'na', note: 'Heavy sour crude', volume: 3.8, anchor: 'wcs' },
  { id: 'wti', name: 'WTI (Cushing)', type: 'oil', region: 'na', note: 'NA light sweet reference', volume: 4.5, anchor: 'wti' },
  { id: 'lls', name: 'LLS (Louisiana)', type: 'oil', region: 'na', note: 'Light Louisiana Sweet', volume: 1.2, base: 'wti', diff: 1.72 },
  { id: 'mars', name: 'Mars Blend', type: 'oil', region: 'na', note: 'Gulf Coast medium sour', volume: 0.9, base: 'wti', diff: -2.98 },
  { id: 'syncrude', name: 'Syncrude Sweet', type: 'oil', region: 'na', note: 'Synthetic crude (Alberta)', volume: 1.1, base: 'wti', diff: -2.18 },
  { id: 'bakken', name: 'Bakken Clearbrook', type: 'oil', region: 'na', note: 'North Dakota light sweet', volume: 1.4, base: 'wti', diff: -3.88 },
  { id: 'ans', name: 'ANS (Alaska)', type: 'oil', region: 'na', note: 'Alaskan North Slope', volume: 0.5, base: 'wti', diff: 2.82 },
  { id: 'wti-midland', name: 'WTI Midland', type: 'oil', region: 'na', note: 'Permian light sweet', volume: 5.8, base: 'wti', diff: 0.77 },
  { id: 'bow-river', name: 'Bow River', type: 'oil', region: 'na', note: 'Canadian heavy blend', volume: 0.7, base: 'wcs', diff: -1.58 },
  { id: 'cold-lake', name: 'Cold Lake Blend', type: 'oil', region: 'na', note: 'Dilbit heavy sour', volume: 0.6, base: 'wcs', diff: -2.78 },

  // North America Gas
  { id: 'hh', name: 'Henry Hub', type: 'gas', region: 'na', note: 'US natural gas benchmark', volume: 102, anchor: 'hh' },
  { id: 'aeco', name: 'AECO (Alberta)', type: 'gas', region: 'na', note: 'Canadian gas benchmark', volume: 16, anchor: 'aeco' },
  { id: 'dawn', name: 'Dawn Hub', type: 'gas', region: 'na', note: 'Eastern Canada gas pricing', volume: 8, base: 'hh', diff: -0.40 },
  { id: 'station2', name: 'Station 2 (BC)', type: 'gas', region: 'na', note: 'Western Canada reference', volume: 5, base: 'aeco', diff: -0.25 },
  { id: 'chicago-cg', name: 'Chicago Citygate', type: 'gas', region: 'na', note: 'Midwest reference', volume: 14, base: 'hh', diff: -0.20 },
  { id: 'socal-border', name: 'SoCal Border', type: 'gas', region: 'na', note: 'Southern California index', volume: 7, base: 'hh', diff: 1.25 },
  { id: 'pg-and-e', name: 'PG&E Citygate', type: 'gas', region: 'na', note: 'Northern California', volume: 6, base: 'hh', diff: 1.95 },
  { id: 'transco-z6', name: 'Transco Z6 (NY)', type: 'gas', region: 'na', note: 'Northeast reference', volume: 12, base: 'hh', diff: 0.05 },
  { id: 'waha', name: 'Waha Hub', type: 'gas', region: 'na', note: 'Permian Basin gas', volume: 18, base: 'hh', diff: -1.75 },

  // Europe Oil & Gas
  { id: 'brent', name: 'Brent Crude', type: 'oil', region: 'eu', note: 'Global light sweet reference', volume: 5.2, anchor: 'brent' },
  { id: 'ttf', name: 'TTF (Netherlands)', type: 'gas', region: 'eu', note: 'European gas benchmark', volume: 20, base: 'hh', diff: 9.65 },
  { id: 'urals', name: 'Urals Crude', type: 'oil', region: 'eu', note: 'Russian export blend', volume: 2.5, base: 'brent', diff: -26.72 },
  { id: 'nbp', name: 'NBP (UK)', type: 'gas', region: 'eu', note: 'UK gas benchmark', volume: 8.5, base: 'hh', diff: 9.05 },
  { id: 'forties', name: 'Forties', type: 'oil', region: 'eu', note: 'North Sea crude', volume: 0.8, base: 'brent', diff: -0.32 },
  { id: 'ekofisk', name: 'Ekofisk', type: 'oil', region: 'eu', note: 'North Sea light sweet', volume: 0.4, base: 'brent', diff: 0.88 },
  { id: 'oseberg', name: 'Oseberg', type: 'oil', region: 'eu', note: 'Norwegian crude', volume: 0.3, base: 'brent', diff: 1.38 },
  { id: 'peg', name: 'PEG (France)', type: 'gas', region: 'eu', note: 'French gas benchmark', volume: 4, base: 'hh', diff: 9.25 },

  // Asia Oil & Gas
  { id: 'dubai', name: 'Dubai Crude', type: 'oil', region: 'asia', note: 'Middle East/Asia reference', volume: 6.0, base: 'brent', diff: -2.72 },
  { id: 'jkm', name: 'JKM (Japan/Korea)', type: 'gas', region: 'asia', note: 'Asian LNG benchmark', volume: 15, base: 'hh', diff: 11.35 },
  { id: 'tapis', name: 'Tapis (Malaysia)', type: 'oil', region: 'asia', note: 'Light sweet Asian blend', volume: 0.5, base: 'brent', diff: 3.03 },
  { id: 'oman', name: 'Oman Crude', type: 'oil', region: 'asia', note: 'Middle East sour reference', volume: 1.1, base: 'brent', diff: -3.32 },
  { id: 'minas', name: 'Minas (Indonesia)', type: 'oil', region: 'asia', note: 'Heavy sweet reference', volume: 0.3, base: 'brent', diff: -1.62 },
  { id: 'murban', name: 'Murban', type: 'oil', region: 'asia', note: 'Abu Dhabi light', volume: 1.5, base: 'brent', diff: -1.02 },
  { id: 'espo', name: 'ESPO', type: 'oil', region: 'asia', note: 'Russian Pacific blend', volume: 1.2, base: 'brent', diff: -20.92 },
];
