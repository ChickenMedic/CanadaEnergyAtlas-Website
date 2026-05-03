import { useState } from 'react';
import Map, { NavigationControl, Source, Layer, Popup } from 'react-map-gl/maplibre';

interface MapContainerProps {
  activeLayers: {
    basins: boolean;
    pipelines: boolean;
    refineries: boolean;
    grid: boolean;
    renewables: boolean;
  };
}

// Minimal placeholder data for unused layers
const dummyData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-112.8218, 49.6942] }, properties: { type: 'renewable', name: 'Pincher Creek Wind' } }
  ]
};

export default function MapContainer({ activeLayers }: MapContainerProps) {
  const mapStyle = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
  const [hoverInfo, setHoverInfo] = useState<any>(null);

  const mapCenter = {
    longitude: -100.0,
    latitude: 45.0,
    zoom: 2.8,
    pitch: 0
  };

  const onHover = (event: any) => {
    const {
      features,
      lngLat: { lng, lat }
    } = event;
    const hoveredFeature = features && features[0];
    
    if (hoveredFeature && hoveredFeature.layer.id.startsWith('facility-')) {
      setHoverInfo({
        longitude: lng,
        latitude: lat,
        feature: hoveredFeature
      });
    } else {
      setHoverInfo(null);
    }
  };

  return (
    <Map 
      initialViewState={mapCenter} 
      mapStyle={mapStyle} 
      style={{ width: '100%', height: '100%' }}
      interactiveLayerIds={['facility-refineries-oil', 'facility-refineries-gas', 'facility-storage-oil', 'facility-storage-gas']}
      onMouseMove={onHover}
      onMouseLeave={() => setHoverInfo(null)}
    >
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
        <Source id="pipelines-data" type="geojson" data="/pipelines.geojson?v=10">
          <Layer 
            id="pipelines-layer" 
            type="line" 
            paint={{ 
              'line-color': [
                'match',
                ['get', 'Commodity'],
                'Gas', '#3b82f6', // Blue for gas
                'Liquid', '#f97316', // Orange for oil/liquids
                'crude', '#f97316',
                'natural gas', '#3b82f6',
                '#f59e0b' // Fallback
              ], 
              'line-width': 1.5, 
              'line-opacity': 0.8 
            }} 
          />
        </Source>
      )}

      {activeLayers.refineries && (
        <Source id="facilities-data" type="geojson" data="/facilities.geojson">
          {/* Oil Refineries */}
          <Layer 
            id="facility-refineries-oil" 
            type="symbol" 
            filter={['all', ['==', 'type', 'refinery'], ['==', 'subtype', 'oil']]} 
            layout={{
              'text-field': '■',
              'text-size': [
                'interpolate', ['linear'], ['get', 'capacity_num'],
                50000, 12,
                300000, 24
              ]
            }}
            paint={{ 
              'text-color': '#f97316', 
              'text-halo-width': 1, 
              'text-halo-color': '#111' 
            }} 
          />
          {/* Gas Processing Plants */}
          <Layer 
            id="facility-refineries-gas" 
            type="symbol" 
            filter={['all', ['==', 'type', 'refinery'], ['==', 'subtype', 'gas']]} 
            layout={{
              'text-field': '▲',
              'text-size': [
                'interpolate', ['linear'], ['get', 'capacity_num'],
                50000, 12,
                500000, 24
              ]
            }}
            paint={{ 
              'text-color': '#3b82f6', 
              'text-halo-width': 1, 
              'text-halo-color': '#111' 
            }} 
          />
          {/* Oil Storage */}
          <Layer 
            id="facility-storage-oil" 
            type="circle" 
            filter={['all', ['==', 'type', 'storage'], ['==', 'subtype', 'oil']]} 
            paint={{ 
              'circle-radius': [
                'interpolate', ['linear'], ['get', 'capacity_num'],
                100000, 4,
                5000000, 12
              ], 
              'circle-color': '#111', 
              'circle-stroke-width': 2, 
              'circle-stroke-color': '#f97316' 
            }} 
          />
          {/* Gas Storage */}
          <Layer 
            id="facility-storage-gas" 
            type="circle" 
            filter={['all', ['==', 'type', 'storage'], ['==', 'subtype', 'gas']]} 
            paint={{ 
              'circle-radius': [
                'interpolate', ['linear'], ['get', 'capacity_num'],
                100000, 4,
                5000000, 12
              ], 
              'circle-color': '#111', 
              'circle-stroke-width': 2, 
              'circle-stroke-color': '#3b82f6' 
            }} 
          />
          
          {/* Labels appear only when zoomed in > 5 */}
          <Layer 
            id="facilities-labels" 
            type="symbol" 
            minzoom={5}
            layout={{ 
              'text-field': ['get', 'name'], 
              'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'], 
              'text-size': 11,
              'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
              'text-radial-offset': 1.5,
              'text-justify': 'auto'
            }} 
            paint={{ 
              'text-color': '#ffffff',
              'text-halo-color': '#161a21',
              'text-halo-width': 2
            }} 
          />
        </Source>
      )}

      {activeLayers.grid && (
        <Source id="grid-data" type="geojson" data="/canada_grid.geojson">
          <Layer 
            id="grid-line" 
            type="line" 
            paint={{ 
              'line-color': [
                'step',
                ['to-number', ['get', 'voltage'], 0],
                '#2dd4bf', // Default / < 230 (~150kV) - Teal
                230, '#facc15', // >= 230 (~300kV) - Yellow
                450, '#f43f5e'  // >= 450 (450+kV) - Rose
              ], 
              'line-width': 1.5, 
              'line-opacity': 0.8 
            }} 
          />
        </Source>
      )}

      {activeLayers.renewables && (
        <Source id="renewables-data" type="geojson" data={dummyData}>
          <Layer id="renewables-layer" type="circle" filter={['==', 'type', 'renewable']} paint={{ 'circle-radius': 10, 'circle-color': '#10b981', 'circle-stroke-width': 2, 'circle-stroke-color': '#161a21' }} />
        </Source>
      )}

      {/* Popups */}
      {hoverInfo && activeLayers.refineries && (
        <Popup
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom"
          offset={15}
        >
          <div style={{ color: '#111', padding: '4px', minWidth: '150px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 600 }}>{hoverInfo.feature.properties.name}</h3>
            <p style={{ margin: '0 0 2px 0', fontSize: '0.75rem', color: '#444' }}>
              <strong>Type:</strong> {hoverInfo.feature.properties.subtype.charAt(0).toUpperCase() + hoverInfo.feature.properties.subtype.slice(1)} {hoverInfo.feature.properties.type.charAt(0).toUpperCase() + hoverInfo.feature.properties.type.slice(1)}
            </p>
            {hoverInfo.feature.properties.operator && hoverInfo.feature.properties.operator !== 'Unknown' && (
              <p style={{ margin: '0 0 2px 0', fontSize: '0.75rem', color: '#444' }}>
                <strong>Operator:</strong> {hoverInfo.feature.properties.operator}
              </p>
            )}
            {hoverInfo.feature.properties.capacity && hoverInfo.feature.properties.capacity !== 'Unknown' && (
              <p style={{ margin: '0 0 2px 0', fontSize: '0.75rem', color: '#444' }}>
                <strong>Capacity:</strong> {hoverInfo.feature.properties.capacity}
              </p>
            )}
            {hoverInfo.feature.properties.utilization && (
              <p style={{ margin: '0 0 0 0', fontSize: '0.75rem', color: '#444' }}>
                <strong>Est. Utilization:</strong> {hoverInfo.feature.properties.utilization}%
              </p>
            )}
          </div>
        </Popup>
      )}

      {/* Unified Legends Container */}
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 10 }}>
        
        {activeLayers.pipelines && (
          <div className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Pipelines</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '16px', height: '4px', backgroundColor: '#f97316', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>Oil / Liquids</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '4px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>Natural Gas</span>
            </div>
          </div>
        )}

        {activeLayers.refineries && (
          <div className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Facilities</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '12px', height: '12px', color: '#f97316', fontSize: '14px', lineHeight: '12px', textAlign: 'center' }}>■</div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>Oil Refinery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '12px', height: '12px', color: '#3b82f6', fontSize: '14px', lineHeight: '12px', textAlign: 'center' }}>▲</div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>Gas Processing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#111', border: '2px solid #f97316', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>Oil Storage</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#111', border: '2px solid #3b82f6', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>Gas Storage</span>
            </div>
          </div>
        )}

        {activeLayers.grid && (
          <div className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Grid Voltage</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '16px', height: '4px', backgroundColor: '#2dd4bf', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>~150kV class</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '16px', height: '4px', backgroundColor: '#facc15', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>~300kV class</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '4px', backgroundColor: '#f43f5e', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>450kV+</span>
            </div>
          </div>
        )}
        
      </div>
    </Map>
  );
}
