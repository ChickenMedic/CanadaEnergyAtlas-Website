import { describe, expect, it } from 'vitest';
import { DEFAULT_CATEGORY_VISIBILITY, LAYER_GROUPS, SIDEBAR_LAYER_KEYS, isGroupActive, visibilityKey } from './mapLayers';
import type { ActiveLayers } from './mapLayers';

// MapLibre rejects duplicate layer/source ids at runtime, and the hover/popup
// logic keys off layer ids, so drift in the config table should fail fast here.
describe('LAYER_GROUPS config', () => {
  it('has unique group, source and layer ids', () => {
    const groupIds = LAYER_GROUPS.map((g) => g.id);
    const sourceIds = LAYER_GROUPS.map((g) => g.sourceId);
    const layerIds = LAYER_GROUPS.flatMap((g) => [
      ...g.categories.map((c) => c.layerId),
      ...(g.labelLayer ? [g.labelLayer.layerId] : []),
    ]);
    for (const ids of [groupIds, sourceIds, layerIds]) {
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('gates every category by one of its group sidebar keys', () => {
    for (const g of LAYER_GROUPS) {
      for (const c of g.categories) {
        expect(g.sidebarKeys, `${g.id}.${c.key}`).toContain(c.sidebarKey);
      }
    }
  });

  it('only uses sidebar keys that exist', () => {
    for (const g of LAYER_GROUPS) {
      for (const k of g.sidebarKeys) {
        expect(SIDEBAR_LAYER_KEYS).toContain(k);
      }
    }
  });

  it('starts with every category visible', () => {
    for (const g of LAYER_GROUPS) {
      for (const c of g.categories) {
        expect(DEFAULT_CATEGORY_VISIBILITY[visibilityKey(g.id, c.key)]).toBe(true);
      }
    }
    const total = LAYER_GROUPS.reduce((n, g) => n + g.categories.length, 0);
    expect(Object.keys(DEFAULT_CATEGORY_VISIBILITY)).toHaveLength(total);
  });

  it('activates a multi-key group when any of its sidebar keys is on', () => {
    const facilities = LAYER_GROUPS.find((g) => g.id === 'facilities')!;
    const off = Object.fromEntries(SIDEBAR_LAYER_KEYS.map((k) => [k, false])) as ActiveLayers;
    expect(isGroupActive(facilities, off)).toBe(false);
    expect(isGroupActive(facilities, { ...off, storage: true })).toBe(true);
    expect(isGroupActive(facilities, { ...off, refining: true })).toBe(true);
  });
});
