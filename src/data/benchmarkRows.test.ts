import { describe, expect, it } from 'vitest';
import { buildBenchmarkRows } from './benchmarkRows';
import type { BenchmarkDef, PricesFile } from './benchmarks';

const anchor = (price: number, change: number, source = 'test') => ({
  price,
  change,
  pctChange: +((change / (price - change)) * 100).toFixed(2),
  asOf: '2026-09-18',
  source,
  live: true,
});

const prices: PricesFile = {
  updatedAt: '2026-09-18T13:15:00.000Z',
  anchors: {
    wti: anchor(80, 2, 'EIA'),
    brent: anchor(85, -1),
    hh: anchor(3, 0.1),
    wcs: anchor(62, 2),
    aeco: anchor(1.5, 0.1),
  },
};

const defs: BenchmarkDef[] = [
  { id: 'wti', name: 'WTI', type: 'oil', region: 'na', note: '', volume: 1, anchor: 'wti' },
  { id: 'lls', name: 'LLS', type: 'oil', region: 'na', note: '', volume: 1, base: 'wti', diff: 1.5 },
  { id: 'urals', name: 'Urals', type: 'oil', region: 'eu', note: '', volume: 1, base: 'brent', diff: -20 },
];

describe('buildBenchmarkRows', () => {
  it('passes anchor prices through unchanged and marks them live', () => {
    const [wti] = buildBenchmarkRows(prices, defs);
    expect(wti).toMatchObject({ id: 'wti', price: 80, change: 2, pctChange: 2.56, trend: 'up', live: true, source: 'EIA' });
  });

  it('prices derived rows as anchor plus differential, moving by the anchor change', () => {
    const rows = buildBenchmarkRows(prices, defs);
    const lls = rows.find((r) => r.id === 'lls')!;
    expect(lls.price).toBe(81.5);
    expect(lls.change).toBe(2);
    // 2 / (81.5 - 2) — recomputed against the derived row's own previous price.
    expect(lls.pctChange).toBe(2.52);
    expect(lls.live).toBe(false);
    expect(lls.asOf).toBe('2026-09-18');
  });

  it('reports a down trend when the anchor fell', () => {
    const urals = buildBenchmarkRows(prices, defs).find((r) => r.id === 'urals')!;
    expect(urals.price).toBe(65);
    expect(urals.trend).toBe('down');
    expect(urals.pctChange).toBeLessThan(0);
  });

  it('drops rows whose anchor is missing from the prices file', () => {
    const partial = { ...prices, anchors: { wti: prices.anchors.wti } } as unknown as PricesFile;
    expect(buildBenchmarkRows(partial, defs).map((r) => r.id)).toEqual(['wti', 'lls']);
  });

  it('never divides by zero when the previous price was zero', () => {
    const zero = { ...prices, anchors: { ...prices.anchors, wti: anchor(2, 2) } };
    const [wti] = buildBenchmarkRows(zero, defs.slice(0, 1));
    expect(wti.pctChange).toBe(0);
  });
});
