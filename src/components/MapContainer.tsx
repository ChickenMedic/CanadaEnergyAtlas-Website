import Map, { NavigationControl, Source, Layer } from 'react-map-gl/maplibre';

interface MapContainerProps {
  activeLayers: {
    basins: boolean;
    pipelines: boolean;
    refineries: boolean;
    grid: boolean;
    renewables: boolean;
  };
}

// Minimal placeholder data for 5 layers
const dummyData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-113.4909, 53.5444] }, properties: { type: 'basin', name: 'WCSB' } },
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-114.0719, 51.0447] }, properties: { type: 'pipeline', name: 'NGTL' } },
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-111.3036, 52.6666] }, properties: { type: 'refinery', name: 'Hardisty Hub' } },
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-82.1906, 42.7486] }, properties: { type: 'refinery', name: 'Dawn Hub' } },
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-71.2079, 46.8138] }, properties: { type: 'grid', name: 'Quebec Intertie' } },
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-112.8218, 49.6942] }, properties: { type: 'renewable', name: 'Pincher Creek Wind' } }
  ]
};

export default function MapContainer({ activeLayers }: MapContainerProps) {
  const mapStyle = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

  const mapCenter = {
    longitude: -100.0,
    latitude: 45.0,
    zoom: 2.8,
    pitch: 0
  };

  return (
    <Map initialViewState={mapCenter} mapStyle={mapStyle} style={{ width: '100%', height: '100%' }}>
      <NavigationControl position="bottom-right" />

      {activeLayers.basins && (
        <Source id="basins-data" type="geojson" data={dummyData}>
          <Layer id="basins-layer" type="circle" filter={['==', 'type', 'basin']} paint={{ 'circle-radius': 14, 'circle-color': '#7c3aed', 'circle-stroke-width': 2, 'circle-stroke-color': '#161a21', 'circle-opacity': 0.6 }} />
        </Source>
      )}

      {activeLayers.pipelines && (
        <Source id="pipelines-data" type="geojson" data="/pipelines.geojson">
          <Layer id="pipelines-layer" type="line" paint={{ 'line-color': '#f59e0b', 'line-width': 1.5, 'line-opacity': 0.8 }} />
        </Source>
      )}

      {activeLayers.refineries && (
        <Source id="refineries-data" type="geojson" data={dummyData}>
          <Layer id="refineries-layer" type="circle" filter={['==', 'type', 'refinery']} paint={{ 'circle-radius': 10, 'circle-color': '#eab308', 'circle-stroke-width': 2, 'circle-stroke-color': '#161a21' }} />
        </Source>
      )}

      {activeLayers.grid && (
        <Source id="grid-data" type="geojson" data={dummyData}>
          <Layer id="grid-layer" type="circle" filter={['==', 'type', 'grid']} paint={{ 'circle-radius': 8, 'circle-color': '#38bdf8', 'circle-stroke-width': 2, 'circle-stroke-color': '#161a21' }} />
        </Source>
      )}

      {activeLayers.renewables && (
        <Source id="renewables-data" type="geojson" data={dummyData}>
          <Layer id="renewables-layer" type="circle" filter={['==', 'type', 'renewable']} paint={{ 'circle-radius': 10, 'circle-color': '#10b981', 'circle-stroke-width': 2, 'circle-stroke-color': '#161a21' }} />
        </Source>
      )}
    </Map>
  );
}
