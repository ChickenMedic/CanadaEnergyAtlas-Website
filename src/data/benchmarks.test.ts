import { describe, expect, it } from 'vitest';
import { benchmarks } from './benchmarks';
import type { AnchorId } from './benchmarks';

const ANCHOR_IDS: AnchorId[] = ['wti', 'brent', 'hh', 'wcs', 'aeco'];

describe('benchmark definitions', () => {
  it('have unique ids', () => {
    const ids = benchmarks.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('are either an anchor or derived from one, never both', () => {
    for (const b of benchmarks) {
      const isAnchor = b.anchor !== undefined;
      const isDerived = b.base !== undefined && b.diff !== undefined;
      expect(isAnchor !== isDerived, `${b.id} must be exactly one of anchor/derived`).toBe(true);
    }
  });

  it('only reference anchors the price pipeline produces', () => {
    for (const b of benchmarks) {
      const ref = b.anchor ?? b.base;
      expect(ANCHOR_IDS, `${b.id} references unknown anchor ${ref}`).toContain(ref);
    }
  });

  it('use the anchor id as the benchmark id for anchor rows', () => {
    for (const b of benchmarks.filter((x) => x.anchor)) {
      expect(b.id).toBe(b.anchor);
    }
  });
});
