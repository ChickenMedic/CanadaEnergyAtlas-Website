import React from 'react';
import Map, { NavigationControl, Source, Layer } from 'react-map-gl/maplibre';

interface MapContainerProps {
  activeLayers: {
    oilGas: boolean;
    renewable: boolean;
  };
}

// Minimal placeholder data just for visual setup
const dummyGeoJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-113.4909, 53.5444] // Edmonton
      },
      properties: { type: 'oil' }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-114.0719, 51.0447] // Calgary
      },
      properties: { type: 'gas' }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-112.8218, 49.6942] // Lethbridge (Wind)
      },
      properties: { type: 'wind' }
    }
  ]
};

export default function MapContainer({ activeLayers }: MapContainerProps) {
  
  // We'll use a beautiful dark map style from Carto.
  const mapStyle = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

  const mapCenter = {
    longitude: -100.0,
    latitude: 55.0,
    zoom: 3.5,
    pitch: 45 // Slight tilt for depth
  };

  return (
    <Map
      initialViewState={mapCenter}
      mapStyle={mapStyle}
      style={{ width: '100%', height: '100%' }}
    >
      <NavigationControl position="bottom-right" />

      {/* Oil & Gas Dummy Source & Layer */}
      {activeLayers.oilGas && (
        <Source id="oil-gas-data" type="geojson" data={dummyGeoJSON}>
          <Layer 
            id="oil-gas-layer" 
            type="circle" 
            filter={['in', 'type', 'oil', 'gas']}
            paint={{
              'circle-radius': 8,
              'circle-color': '#f59e0b',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#161a21'
            }} 
          />
        </Source>
      )}

      {/* Renewable Dummy Source & Layer */}
      {activeLayers.renewable && (
        <Source id="renewable-data" type="geojson" data={dummyGeoJSON}>
          <Layer 
            id="renewable-layer" 
            type="circle" 
            filter={['==', 'type', 'wind']}
            paint={{
              'circle-radius': 10,
              'circle-color': '#10b981',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#161a21'
            }} 
          />
        </Source>
      )}

    </Map>
  );
}
