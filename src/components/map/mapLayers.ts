// Data-driven configuration for every toggleable map layer group.
// Layer ids, filters, and paint values are transcribed 1:1 from the original
// hand-written layers, so rendering is unchanged; MapContainer, MapLegend and
// LayerGroupSources all derive their behavior from this table.

// Every sidebar toggle, in a fixed order; MapPage and Sidebar derive their
// state shape and types from this list so a new layer is added in one place.
export const SIDEBAR_LAYER_KEYS = [
  'basins', 'minerals', 'pipelines', 'refining',
  'storage', 'nonRenewable', 'grid', 'renewables',
] as const;

export type SidebarLayerKey = (typeof SIDEBAR_LAYER_KEYS)[number];

export type ActiveLayers = Record<SidebarLayerKey, boolean>;

// MapLibre expressions; typed loosely because they are opaque pass-through values.
export type MapExpression = unknown[];

export interface LayerCategory {
  key: string;
  layerId: string;
  label: string;
  color: string;
  /** Legend swatch shape: line bar, filled dot, or hollow ring (storage). */
  swatch: 'line' | 'dot' | 'ring';
  /** Which sidebar toggle gates this category (facilities span refining+storage). */
  sidebarKey: SidebarLayerKey;
  layerType: 'line' | 'circle';
  /** Base filter WITHOUT the renewables capacity term (appended at render time). */
  filter: MapExpression;
  paint: Record<string, unknown>;
}

export interface LabelLayerConfig {
  layerId: string;
  minzoom: number;
  textRadialOffset: number;
  haloColor: string;
}

export interface MapLayerGroup {
  id: string;
  sourceId: string;
  sourceUrl: string;
  sidebarKeys: SidebarLayerKey[];
  legendTitle: string;
  categories: LayerCategory[];
  labelLayer?: LabelLayerConfig;
  /** Whether this group's category layers participate in hover queries. */
  interactive: boolean;
  /** Whether hovering a feature shows a popup (pipelines are hover-queryable but popup-less). */
  showPopup: boolean;
  /** Renewables only: category filters get a >= capacity_num term appended. */
  supportsCapacityFilter?: boolean;
}

const circlePaint = (color: string, radius: unknown, strokeWidth = 1.5, strokeColor = '#ffffff') => ({
  'circle-radius': radius,
  'circle-color': color,
  'circle-stroke-width': strokeWidth,
  'circle-stroke-color': strokeColor,
});

const linePaint = (color: string) => ({
  'line-color': color,
  'line-width': 1.5,
  'line-opacity': 0.8,
});

const capInterp = (stops: [number, number, number, number]) => [
  'interpolate', ['linear'], ['get', 'capacity_num'],
  stops[0], stops[1],
  stops[2], stops[3],
];

const voltage = ['to-number', ['get', 'voltage'], 0];

export const LAYER_GROUPS: MapLayerGroup[] = [
  {
    id: 'pipelines',
    sourceId: 'pipelines-data',
    sourceUrl: '/pipelines.display.geojson?v=1',
    sidebarKeys: ['pipelines'],
    legendTitle: 'Pipelines',
    interactive: true,
    showPopup: false,
    categories: [
      {
        key: 'liquids', layerId: 'pipelines-layer-liquids', label: 'Oil / Liquids', color: '#f97316',
        swatch: 'line', sidebarKey: 'pipelines', layerType: 'line',
        filter: ['in', ['get', 'Commodity'], ['literal', ['Liquid', 'crude']]],
        paint: linePaint('#f97316'),
      },
      {
        key: 'gas', layerId: 'pipelines-layer-gas', label: 'Natural Gas', color: '#3b82f6',
        swatch: 'line', sidebarKey: 'pipelines', layerType: 'line',
        filter: ['in', ['get', 'Commodity'], ['literal', ['Gas', 'natural gas']]],
        paint: linePaint('#3b82f6'),
      },
    ],
  },
  {
    id: 'facilities',
    sourceId: 'facilities-data',
    sourceUrl: '/facilities.geojson?v=2',
    sidebarKeys: ['refining', 'storage'],
    legendTitle: 'Facilities',
    interactive: true,
    showPopup: true,
    labelLayer: { layerId: 'facilities-labels', minzoom: 5, textRadialOffset: 1.5, haloColor: '#161a21' },
    categories: [
      {
        key: 'oilRefinery', layerId: 'facility-refineries-oil', label: 'Oil Refinery', color: '#f97316',
        swatch: 'dot', sidebarKey: 'refining', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'refinery'], ['==', ['get', 'subtype'], 'oil']],
        paint: circlePaint('#f97316', capInterp([50000, 5, 300000, 12])),
      },
      {
        key: 'gasProcessing', layerId: 'facility-refineries-gas', label: 'Gas Processing', color: '#3b82f6',
        swatch: 'dot', sidebarKey: 'refining', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'refinery'], ['==', ['get', 'subtype'], 'gas']],
        paint: circlePaint('#3b82f6', capInterp([50000, 5, 500000, 12])),
      },
      {
        key: 'oilStorage', layerId: 'facility-storage-oil', label: 'Oil Storage', color: '#f97316',
        swatch: 'ring', sidebarKey: 'storage', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'storage'], ['==', ['get', 'subtype'], 'oil']],
        paint: circlePaint('transparent', capInterp([100000, 4, 5000000, 12]), 2, '#f97316'),
      },
      {
        key: 'gasStorage', layerId: 'facility-storage-gas', label: 'Gas Storage', color: '#3b82f6',
        swatch: 'ring', sidebarKey: 'storage', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'storage'], ['==', ['get', 'subtype'], 'gas']],
        paint: circlePaint('transparent', capInterp([100000, 4, 5000000, 12]), 2, '#3b82f6'),
      },
    ],
  },
  {
    id: 'grid',
    sourceId: 'grid-data',
    sourceUrl: '/canada_grid.display.geojson?v=1',
    sidebarKeys: ['grid'],
    legendTitle: 'Grid Voltage',
    interactive: false,
    showPopup: false,
    categories: [
      {
        key: 'low', layerId: 'grid-line-low', label: '~150kV class', color: '#2dd4bf',
        swatch: 'line', sidebarKey: 'grid', layerType: 'line',
        filter: ['<', voltage, 230],
        paint: linePaint('#2dd4bf'),
      },
      {
        key: 'med', layerId: 'grid-line-med', label: '~300kV class', color: '#facc15',
        swatch: 'line', sidebarKey: 'grid', layerType: 'line',
        filter: ['all', ['>=', voltage, 230], ['<', voltage, 450]],
        paint: linePaint('#facc15'),
      },
      {
        key: 'high', layerId: 'grid-line-high', label: '450kV+', color: '#f43f5e',
        swatch: 'line', sidebarKey: 'grid', layerType: 'line',
        filter: ['>=', voltage, 450],
        paint: linePaint('#f43f5e'),
      },
    ],
  },
  {
    id: 'minerals',
    sourceId: 'minerals-data',
    sourceUrl: '/minerals.geojson',
    sidebarKeys: ['minerals'],
    legendTitle: 'Critical Minerals',
    interactive: true,
    showPopup: true,
    labelLayer: { layerId: 'minerals-labels', minzoom: 4, textRadialOffset: 1.2, haloColor: '#111' },
    categories: [
      { key: 'uranium', layerId: 'minerals-uranium', label: 'Uranium', color: '#a855f7', swatch: 'dot', sidebarKey: 'minerals', layerType: 'circle', filter: ['==', ['get', 'subtype'], 'uranium'], paint: circlePaint('#a855f7', 6) },
      { key: 'nickel', layerId: 'minerals-nickel', label: 'Nickel / Cobalt', color: '#64748b', swatch: 'dot', sidebarKey: 'minerals', layerType: 'circle', filter: ['==', ['get', 'subtype'], 'nickel'], paint: circlePaint('#64748b', 6) },
      { key: 'copper', layerId: 'minerals-copper', label: 'Copper', color: '#d97706', swatch: 'dot', sidebarKey: 'minerals', layerType: 'circle', filter: ['==', ['get', 'subtype'], 'copper'], paint: circlePaint('#d97706', 6) },
      { key: 'lithium', layerId: 'minerals-lithium', label: 'Lithium', color: '#ef4444', swatch: 'dot', sidebarKey: 'minerals', layerType: 'circle', filter: ['==', ['get', 'subtype'], 'lithium'], paint: circlePaint('#ef4444', 6) },
      { key: 'rareEarth', layerId: 'minerals-rareEarth', label: 'Rare Earth', color: '#ec4899', swatch: 'dot', sidebarKey: 'minerals', layerType: 'circle', filter: ['==', ['get', 'subtype'], 'rare_earth'], paint: circlePaint('#ec4899', 6) },
    ],
  },
  {
    id: 'renewables',
    sourceId: 'renewables-data',
    sourceUrl: '/renewables.display.geojson?v=1',
    sidebarKeys: ['renewables'],
    legendTitle: 'Renewables',
    interactive: true,
    showPopup: true,
    supportsCapacityFilter: true,
    labelLayer: { layerId: 'renewables-labels', minzoom: 5, textRadialOffset: 1.5, haloColor: '#161a21' },
    categories: [
      {
        key: 'hydro', layerId: 'renewable-hydro', label: 'Hydroelectric', color: '#0ea5e9',
        swatch: 'dot', sidebarKey: 'renewables', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'renewable'], ['==', ['get', 'subtype'], 'hydro']],
        paint: circlePaint('#0ea5e9', capInterp([10, 3, 5000, 15])),
      },
      {
        key: 'wind', layerId: 'renewable-wind', label: 'Wind Farm', color: '#22c55e',
        swatch: 'dot', sidebarKey: 'renewables', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'renewable'], ['==', ['get', 'subtype'], 'wind']],
        paint: circlePaint('#22c55e', capInterp([10, 3, 1000, 10])),
      },
      {
        key: 'solar', layerId: 'renewable-solar', label: 'Solar Farm', color: '#fbbf24',
        swatch: 'dot', sidebarKey: 'renewables', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'renewable'], ['==', ['get', 'subtype'], 'solar']],
        paint: circlePaint('#fbbf24', capInterp([10, 3, 500, 10])),
      },
    ],
  },
  {
    id: 'nonRenewable',
    sourceId: 'nonRenewable-data',
    sourceUrl: '/non_renewable.geojson?v=5',
    sidebarKeys: ['nonRenewable'],
    legendTitle: 'Non-Renewable & Nuclear',
    interactive: true,
    showPopup: true,
    labelLayer: { layerId: 'nonRenewable-labels', minzoom: 5, textRadialOffset: 1.5, haloColor: '#161a21' },
    categories: [
      {
        key: 'coal', layerId: 'nonRenewable-coal', label: 'Coal', color: '#57534e',
        swatch: 'dot', sidebarKey: 'nonRenewable', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'non-renewable'], ['==', ['get', 'subtype'], 'coal']],
        paint: circlePaint('#57534e', capInterp([50, 4, 2000, 12])),
      },
      {
        key: 'gas', layerId: 'nonRenewable-gas', label: 'Natural Gas', color: '#3b82f6',
        swatch: 'dot', sidebarKey: 'nonRenewable', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'non-renewable'], ['==', ['get', 'subtype'], 'gas']],
        paint: circlePaint('#3b82f6', capInterp([50, 3, 1500, 10])),
      },
      {
        key: 'oil', layerId: 'nonRenewable-oil', label: 'Oil', color: '#f97316',
        swatch: 'dot', sidebarKey: 'nonRenewable', layerType: 'circle',
        filter: ['all', ['==', ['get', 'type'], 'non-renewable'], ['==', ['get', 'subtype'], 'oil']],
        paint: circlePaint('#f97316', capInterp([50, 3, 1000, 10])),
      },
      {
        key: 'nuclear', layerId: 'nonRenewable-nuclear', label: 'Nuclear', color: '#8b5cf6',
        swatch: 'dot', sidebarKey: 'nonRenewable', layerType: 'circle',
        filter: ['==', ['get', 'type'], 'nuclear'],
        paint: circlePaint('#8b5cf6', capInterp([500, 6, 4000, 16]), 2),
      },
    ],
  },
];

export const visibilityKey = (groupId: string, categoryKey: string) => `${groupId}.${categoryKey}`;

export const DEFAULT_CATEGORY_VISIBILITY: Record<string, boolean> = Object.fromEntries(
  LAYER_GROUPS.flatMap((g) => g.categories.map((c) => [visibilityKey(g.id, c.key), true]))
);

export const isGroupActive = (group: MapLayerGroup, activeLayers: ActiveLayers) =>
  group.sidebarKeys.some((k) => activeLayers[k]);
