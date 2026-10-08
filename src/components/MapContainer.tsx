import { useState } from 'react';
import Map, { NavigationControl, Source, Layer, Popup } from 'react-map-gl/maplibre';
import type { MapGeoJSONFeature, MapLayerMouseEvent, MapSourceDataEvent } from 'maplibre-gl';
import { LAYER_GROUPS, DEFAULT_CATEGORY_VISIBILITY, isGroupActive, visibilityKey } from './map/mapLayers';
import type { ActiveLayers } from './map/mapLayers';
import LayerGroupSources from './map/LayerGroupSources';
import MapLegend from './map/MapLegend';
import MapPopupContent from './map/MapPopupContent';

interface MapContainerProps {
  activeLayers: ActiveLayers;
}

interface HoverInfo {
  longitude: number;
  latitude: number;
  feature: MapGeoJSONFeature;
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const INITIAL_VIEW_STATE = {
  longitude: -100.0,
  latitude: 45.0,
  zoom: 2.8,
  pitch: 0,
};

const INTERACTIVE_GROUPS = LAYER_GROUPS.filter((g) => g.interactive);
const POPUP_LAYER_IDS = new Set(
  LAYER_GROUPS.filter((g) => g.showPopup).flatMap((g) => g.categories.map((c) => c.layerId))
);
const HOVER_LAYER_IDS = new Set(
  INTERACTIVE_GROUPS.flatMap((g) => g.categories.map((c) => c.layerId))
);

export default function MapContainer({ activeLayers }: MapContainerProps) {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [categoryVisibility, setCategoryVisibility] = useState<Record<string, boolean>>(DEFAULT_CATEGORY_VISIBILITY);
  const [minRenewableCapacity, setMinRenewableCapacity] = useState(0);

  // Sources mount lazily the first time their group activates, then stay mounted
  // so re-enabling a layer never refetches its GeoJSON. everActiveGroupIds is
  // adjusted during render (React's "adjusting state when props change" pattern);
  // mountedGroups unions in the currently active groups so the render is correct
  // even before the recorded state catches up.
  const [everActiveGroupIds, setEverActiveGroupIds] = useState<Set<string>>(new Set());
  const newlyActiveIds = LAYER_GROUPS
    .filter((g) => !everActiveGroupIds.has(g.id) && isGroupActive(g, activeLayers))
    .map((g) => g.id);
  if (newlyActiveIds.length > 0) {
    setEverActiveGroupIds(new Set([...everActiveGroupIds, ...newlyActiveIds]));
  }
  const mountedGroups = LAYER_GROUPS.filter(
    (g) => everActiveGroupIds.has(g.id) || isGroupActive(g, activeLayers)
  );

  // Source ids whose GeoJSON finished fetching/parsing; the spinner shows while
  // any mounted source hasn't loaded yet.
  const [loadedSources, setLoadedSources] = useState<Set<string>>(new Set());
  const isLoading = mountedGroups.some((g) => !loadedSources.has(g.sourceId));

  const onSourceData = (event: MapSourceDataEvent) => {
    if (event.sourceId && event.isSourceLoaded) {
      setLoadedSources((prev) => (prev.has(event.sourceId) ? prev : new Set([...prev, event.sourceId])));
    }
  };

  // Idle fires once everything is fetched and rendered — backstop so the
  // spinner can never stick (e.g. if a source request fails).
  const onIdle = () => {
    if (isLoading) {
      setLoadedSources((prev) => new Set([...prev, ...mountedGroups.map((g) => g.sourceId)]));
    }
  };

  const onHover = (event: MapLayerMouseEvent) => {
    const hoveredFeature = event.features?.[0];
    if (hoveredFeature && HOVER_LAYER_IDS.has(hoveredFeature.layer.id)) {
      setHoverInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        feature: hoveredFeature,
      });
    } else {
      setHoverInfo(null);
    }
  };

  const toggleCategory = (groupId: string, categoryKey: string) => {
    const key = visibilityKey(groupId, categoryKey);
    setCategoryVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const mountedGroupIds = new Set(mountedGroups.map((g) => g.id));
  const interactiveLayerIds = INTERACTIVE_GROUPS
    .filter((g) => mountedGroupIds.has(g.id))
    .flatMap((g) => g.categories.map((c) => c.layerId));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <div className="map-loading" role="status">
          <div className="map-loading-spinner" aria-hidden="true"></div>
          <span>Loading map data...</span>
        </div>
      )}
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={MAP_STYLE}
        style={{ width: '100%', height: '100%' }}
        interactiveLayerIds={interactiveLayerIds}
        onMouseMove={onHover}
        onMouseLeave={() => setHoverInfo(null)}
        onSourceData={onSourceData}
        onIdle={onIdle}
      >
        <NavigationControl position="bottom-right" />

        {/* Base Canada Map (Always visible) */}
        <Source id="canada-base" type="geojson" data="/canada.geojson">
          <Layer id="canada-base-fill" type="fill" paint={{ 'fill-color': '#ffffff', 'fill-opacity': 0.02 }} />
          <Layer id="canada-base-line" type="line" paint={{ 'line-color': '#ffffff', 'line-width': 1, 'line-opacity': 0.1 }} />
        </Source>

        {/* Basins: bespoke feature-property-driven styling, no legend sub-toggles */}
        {activeLayers.basins && (
          <Source id="basins-data" type="geojson" data="/oil_gas_plays.geojson">
            <Layer id="basins-fill" type="fill" paint={{ 'fill-color': ['get', 'color'], 'fill-opacity': 0.2 }} />
            <Layer id="basins-line" type="line" paint={{ 'line-color': ['get', 'color'], 'line-width': 2, 'line-opacity': 0.8 }} />
            <Layer
              id="basins-label"
              type="symbol"
              layout={{
                'text-field': ['get', 'name'],
                'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                'text-size': 12,
                'symbol-placement': 'point'
              }}
              paint={{
                'text-color': '#ffffff',
                'text-halo-color': '#161a21',
                'text-halo-width': 2
              }}
            />
          </Source>
        )}

        {mountedGroups.map((group) => (
          <LayerGroupSources
            key={group.id}
            group={group}
            activeLayers={activeLayers}
            categoryVisibility={categoryVisibility}
            minRenewableCapacity={minRenewableCapacity}
          />
        ))}

        {hoverInfo && POPUP_LAYER_IDS.has(hoverInfo.feature.layer.id) && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
            offset={15}
            className="dark-popup"
          >
            <MapPopupContent layerId={hoverInfo.feature.layer.id} properties={hoverInfo.feature.properties} />
          </Popup>
        )}

        <MapLegend
          activeLayers={activeLayers}
          categoryVisibility={categoryVisibility}
          onToggleCategory={toggleCategory}
          isLegendOpen={isLegendOpen}
          setIsLegendOpen={setIsLegendOpen}
          minRenewableCapacity={minRenewableCapacity}
          setMinRenewableCapacity={setMinRenewableCapacity}
        />
      </Map>
    </div>
  );
}
