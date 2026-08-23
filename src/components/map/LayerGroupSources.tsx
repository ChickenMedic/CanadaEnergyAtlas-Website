import { Source, Layer } from 'react-map-gl/maplibre';
import { visibilityKey } from './mapLayers';
import type { ActiveLayers, LayerCategory, MapExpression, MapLayerGroup } from './mapLayers';

interface LayerGroupSourcesProps {
  group: MapLayerGroup;
  activeLayers: ActiveLayers;
  categoryVisibility: Record<string, boolean>;
  minRenewableCapacity: number;
}

// Renders one layer group's <Source> with all its category layers permanently
// mounted; toggling switches layout.visibility (a cheap setLayoutProperty call)
// instead of unmounting the Source, which would refetch multi-MB GeoJSON.
export default function LayerGroupSources({ group, activeLayers, categoryVisibility, minRenewableCapacity }: LayerGroupSourcesProps) {
  const categoryFilter = (cat: LayerCategory): MapExpression =>
    group.supportsCapacityFilter
      ? ['all', cat.filter, ['>=', ['get', 'capacity_num'], minRenewableCapacity]]
      : cat.filter;

  const isCategoryVisible = (cat: LayerCategory) =>
    activeLayers[cat.sidebarKey] && categoryVisibility[visibilityKey(group.id, cat.key)];

  const visibleLabelFilters = group.categories.filter(isCategoryVisible).map(categoryFilter);

  return (
    <Source id={group.sourceId} type="geojson" data={group.sourceUrl}>
      {group.categories.map((cat) => (
        <Layer
          key={cat.layerId}
          id={cat.layerId}
          type={cat.layerType}
          filter={categoryFilter(cat) as never}
          layout={{ visibility: isCategoryVisible(cat) ? 'visible' : 'none' }}
          paint={cat.paint as never}
        />
      ))}
      {group.labelLayer && (
        <Layer
          id={group.labelLayer.layerId}
          type="symbol"
          // Children must all be expression-syntax: mixing in a legacy-style
          // sentinel makes MapLibre validate the whole filter as legacy and
          // reject the layer. The never-matching fallback covers the all-off
          // case (the layer is also hidden via visibility then).
          filter={(visibleLabelFilters.length > 0
            ? ['any', ...visibleLabelFilters]
            : ['==', ['get', 'name'], '__none__']) as never}
          minzoom={group.labelLayer.minzoom}
          layout={{
            visibility: visibleLabelFilters.length > 0 ? 'visible' : 'none',
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 11,
            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
            'text-radial-offset': group.labelLayer.textRadialOffset,
            'text-justify': 'auto',
          }}
          paint={{
            'text-color': '#ffffff',
            'text-halo-color': group.labelLayer.haloColor,
            'text-halo-width': 2,
          }}
        />
      )}
    </Source>
  );
}
