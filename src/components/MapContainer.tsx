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

      {/* Base Canada Map (Always visible) */}
      <Source id="canada-base" type="geojson" data="/canada.geojson">
        <Layer id="canada-base-fill" type="fill" paint={{ 'fill-color': '#ffffff', 'fill-opacity': 0.02 }} />
        <Layer id="canada-base-line" type="line" paint={{ 'line-color': '#ffffff', 'line-width': 1, 'line-opacity': 0.1 }} />
      </Source>

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

      {activeLayers.pipelines && (
        <Source id="pipelines-data" type="geojson" data="/pipelines.geojson?v=5">
          <Layer id="pipelines-layer" type="line" paint={{ 'line-color': '#f59e0b', 'line-width': 2.5, 'line-opacity': 0.8 }} />
        </Source>
      )}

      {activeLayers.refineries && (
        <Source id="refineries-data" type="geojson" data={dummyData}>
          <Layer id="refineries-layer" type="circle" filter={['==', 'type', 'refinery']} paint={{ 'circle-radius': 10, 'circle-color': '#eab308', 'circle-stroke-width': 2, 'circle-stroke-color': '#161a21' }} />
        </Source>
      )}

      {activeLayers.grid && (
        <>
          <Source id="grid-data" type="geojson" data="/canada_grid.geojson">
            <Layer 
              id="grid-line" 
              type="line" 
              paint={{ 
                'line-color': [
                  'step',
                  ['to-number', ['get', 'voltage'], 0],
                  '#38bdf8', // Default / < 230 (~150kV)
                  230, '#818cf8', // >= 230 (~300kV)
                  450, '#c084fc'  // >= 450 (450+kV)
                ], 
                'line-width': 1.5, 
                'line-opacity': 0.8 
              }} 
            />
          </Source>
          
          {/* Grid Legend */}
          <div className="glass-panel" style={{ position: 'absolute', top: 20, right: 20, padding: '12px 16px', zIndex: 10, borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Grid Voltage</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '16px', height: '4px', backgroundColor: '#38bdf8', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>~150kV class</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '16px', height: '4px', backgroundColor: '#818cf8', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>~300kV class</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '4px', backgroundColor: '#c084fc', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>450kV+</span>
            </div>
          </div>
        </>
      )}

      {activeLayers.renewables && (
        <Source id="renewables-data" type="geojson" data={dummyData}>
          <Layer id="renewables-layer" type="circle" filter={['==', 'type', 'renewable']} paint={{ 'circle-radius': 10, 'circle-color': '#10b981', 'circle-stroke-width': 2, 'circle-stroke-color': '#161a21' }} />
        </Source>
      )}
    </Map>
  );
}
