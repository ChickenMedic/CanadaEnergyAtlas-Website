import { benchmarks } from './benchmarks';
import type { BenchmarkDef, PricesFile } from './benchmarks';

export interface BenchmarkRow extends BenchmarkDef {
  price: number;
  change: number;
  pctChange: number;
  trend: 'up' | 'down';
  asOf: string;
  live: boolean;
  /** Human-readable provenance of the anchor this row is priced from. */
  source: string;
}

// Turns the static benchmark definitions plus the daily anchor prices into
// displayable rows. An anchor benchmark shows the anchor price as-is; a derived
// benchmark is anchor + typical differential and moves by the anchor's daily
// change, so its percent change is recomputed against its own previous price.
export function buildBenchmarkRows(prices: PricesFile, defs: BenchmarkDef[] = benchmarks): BenchmarkRow[] {
  return defs.flatMap((def) => {
    const anchorId = def.anchor ?? def.base;
    const anchor = anchorId ? prices.anchors[anchorId] : undefined;
    if (!anchor) return [];
    const price = def.anchor ? anchor.price : +(anchor.price + (def.diff ?? 0)).toFixed(2);
    const change = anchor.change;
    const prevPrice = price - change;
    return [{
      ...def,
      price,
      change,
      pctChange: prevPrice !== 0 ? +((change / prevPrice) * 100).toFixed(2) : 0,
      trend: change >= 0 ? 'up' as const : 'down' as const,
      asOf: anchor.asOf,
      live: !!def.anchor,
      source: anchor.source,
    }];
  });
}
