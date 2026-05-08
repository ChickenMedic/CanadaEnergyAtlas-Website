import { useState, useEffect } from 'react';
import Map, { NavigationControl, Source, Layer, Popup } from 'react-map-gl/maplibre';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface MapContainerProps {
  activeLayers: {
    basins: boolean;
    minerals: boolean;
    pipelines: boolean;
    refining: boolean;
    storage: boolean;
    nonRenewable: boolean;
    grid: boolean;
    renewables: boolean;
  };
}

export default function MapContainer({ activeLayers }: MapContainerProps) {
  const mapStyle = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  
  // Legend toggle states
  const [activeRenewables, setActiveRenewables] = useState({ hydro: true, wind: true, solar: true });
  const [activePipelines, setActivePipelines] = useState({ liquids: true, gas: true });
  const [activeFacilities, setActiveFacilities] = useState({ oilRefinery: true, gasProcessing: true, oilStorage: true, gasStorage: true });
  const [activeGrid, setActiveGrid] = useState({ low: true, med: true, high: true });
  const [activeMinerals, setActiveMinerals] = useState({ uranium: true, nickel: true, copper: true, rareEarth: true, lithium: true });
  const [activeNonRenewable, setActiveNonRenewable] = useState({ coal: true, gas: true, oil: true, nuclear: true });
  const [minRenewableCapacity, setMinRenewableCapacity] = useState(0);

  useEffect(() => {
    // Show a loading spinner briefly when heavy layers toggle
    let timer: ReturnType<typeof setTimeout>;
    if (Object.values(activeLayers).some(v => v)) {
      setIsLoading(true);
      timer = setTimeout(() => setIsLoading(false), 500);
    } else {
      setIsLoading(false);
    }
    return () => clearTimeout(timer);
  }, [activeLayers]);

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
    if (hoveredFeature && (hoveredFeature.layer.id.startsWith('facility-') || hoveredFeature.layer.id.startsWith('renewable-') || hoveredFeature.layer.id.startsWith('minerals-') || hoveredFeature.layer.id.startsWith('nonRenewable-') || hoveredFeature.layer.id.startsWith('pipelines-'))) {
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
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100, background: 'rgba(0,0,0,0.7)', padding: '16px 24px', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="spinner" style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Loading map data...</span>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <Map 
        initialViewState={mapCenter} 
        mapStyle={mapStyle} 
        style={{ width: '100%', height: '100%' }}
        interactiveLayerIds={[
          'facility-refineries-oil', 'facility-refineries-gas', 'facility-storage-oil', 'facility-storage-gas',
          'renewable-hydro', 'renewable-wind', 'renewable-solar',
          'nonRenewable-coal', 'nonRenewable-gas', 'nonRenewable-oil', 'nonRenewable-nuclear',
          'minerals-uranium', 'minerals-nickel', 'minerals-copper', 'minerals-rareEarth', 'minerals-lithium',
          'pipelines-layer-liquids', 'pipelines-layer-gas'
        ]}
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
          {activePipelines.liquids && (
            <Layer 
              id="pipelines-layer-liquids" 
              type="line" 
              filter={['in', ['get', 'Commodity'], ['literal', ['Liquid', 'crude']]]}
              paint={{ 
                'line-color': '#f97316', // Orange for oil/liquids
                'line-width': 1.5, 
                'line-opacity': 0.8 
              }} 
            />
          )}
          {activePipelines.gas && (
            <Layer 
              id="pipelines-layer-gas" 
              type="line" 
              filter={['in', ['get', 'Commodity'], ['literal', ['Gas', 'natural gas']]]}
              paint={{ 
                'line-color': '#3b82f6', // Blue for gas
                'line-width': 1.5, 
                'line-opacity': 0.8 
              }} 
            />
          )}
        </Source>
      )}

      {(activeLayers.refining || activeLayers.storage) && (
        <Source id="facilities-data" type="geojson" data="/facilities.geojson?v=2">
          {/* Oil Refineries */}
          {activeLayers.refining && activeFacilities.oilRefinery && (
            <Layer 
              id="facility-refineries-oil" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'refinery'], ['==', ['get', 'subtype'], 'oil']]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  50000, 5,
                  300000, 12
                ], 
                'circle-color': '#f97316', 
                'circle-stroke-width': 1.5, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
          )}
          {/* Gas Processing Plants */}
          {activeLayers.refining && activeFacilities.gasProcessing && (
            <Layer 
              id="facility-refineries-gas" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'refinery'], ['==', ['get', 'subtype'], 'gas']]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  50000, 5,
                  500000, 12
                ], 
                'circle-color': '#3b82f6', 
                'circle-stroke-width': 1.5, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
          )}
          {/* Oil Storage */}
          {activeLayers.storage && activeFacilities.oilStorage && (
            <Layer 
              id="facility-storage-oil" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'storage'], ['==', ['get', 'subtype'], 'oil']]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  100000, 4,
                  5000000, 12
                ], 
                'circle-color': 'transparent', 
                'circle-stroke-width': 2, 
                'circle-stroke-color': '#f97316' 
              }} 
            />
          )}
          {/* Gas Storage */}
          {activeLayers.storage && activeFacilities.gasStorage && (
            <Layer 
              id="facility-storage-gas" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'storage'], ['==', ['get', 'subtype'], 'gas']]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  100000, 4,
                  5000000, 12
                ], 
                'circle-color': 'transparent', 
                'circle-stroke-width': 2, 
                'circle-stroke-color': '#3b82f6' 
              }} 
            />
          )}
          
          {/* Labels appear only when zoomed in > 5 */}
          <Layer 
            id="facilities-labels" 
            type="symbol" 
            filter={[
              'any',
              ...(activeLayers.refining && activeFacilities.oilRefinery ? [['all', ['==', ['get', 'type'], 'refinery'], ['==', ['get', 'subtype'], 'oil']]] : []),
              ...(activeLayers.refining && activeFacilities.gasProcessing ? [['all', ['==', ['get', 'type'], 'refinery'], ['==', ['get', 'subtype'], 'gas']]] : []),
              ...(activeLayers.storage && activeFacilities.oilStorage ? [['all', ['==', ['get', 'type'], 'storage'], ['==', ['get', 'subtype'], 'oil']]] : []),
              ...(activeLayers.storage && activeFacilities.gasStorage ? [['all', ['==', ['get', 'type'], 'storage'], ['==', ['get', 'subtype'], 'gas']]] : []),
              ['==', '1', '2']
            ] as any}
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
          {activeGrid.low && (
            <Layer 
              id="grid-line-low" 
              type="line" 
              filter={['<', ['to-number', ['get', 'voltage'], 0], 230]}
              paint={{ 
                'line-color': '#2dd4bf', // Teal for < 230
                'line-width': 1.5, 
                'line-opacity': 0.8 
              }} 
            />
          )}
          {activeGrid.med && (
            <Layer 
              id="grid-line-med" 
              type="line" 
              filter={['all', ['>=', ['to-number', ['get', 'voltage'], 0], 230], ['<', ['to-number', ['get', 'voltage'], 0], 450]]}
              paint={{ 
                'line-color': '#facc15', // Yellow for >= 230 and < 450
                'line-width': 1.5, 
                'line-opacity': 0.8 
              }} 
            />
          )}
          {activeGrid.high && (
            <Layer 
              id="grid-line-high" 
              type="line" 
              filter={['>=', ['to-number', ['get', 'voltage'], 0], 450]}
              paint={{ 
                'line-color': '#f43f5e', // Rose for >= 450
                'line-width': 1.5, 
                'line-opacity': 0.8 
              }} 
            />
          )}
        </Source>
      )}

      {activeLayers.minerals && (
        <Source id="minerals-data" type="geojson" data="/minerals.geojson">
          {activeMinerals.uranium && (
            <Layer id="minerals-uranium" type="circle" filter={['==', 'subtype', 'uranium']} paint={{ 'circle-radius': 6, 'circle-color': '#a855f7', 'circle-stroke-width': 1.5, 'circle-stroke-color': '#ffffff' }} />
          )}
          {activeMinerals.nickel && (
            <Layer id="minerals-nickel" type="circle" filter={['==', 'subtype', 'nickel']} paint={{ 'circle-radius': 6, 'circle-color': '#64748b', 'circle-stroke-width': 1.5, 'circle-stroke-color': '#ffffff' }} />
          )}
          {activeMinerals.copper && (
            <Layer id="minerals-copper" type="circle" filter={['==', 'subtype', 'copper']} paint={{ 'circle-radius': 6, 'circle-color': '#d97706', 'circle-stroke-width': 1.5, 'circle-stroke-color': '#ffffff' }} />
          )}
          {activeMinerals.rareEarth && (
            <Layer id="minerals-rareEarth" type="circle" filter={['==', 'subtype', 'rare_earth']} paint={{ 'circle-radius': 6, 'circle-color': '#ec4899', 'circle-stroke-width': 1.5, 'circle-stroke-color': '#ffffff' }} />
          )}
          {activeMinerals.lithium && (
            <Layer id="minerals-lithium" type="circle" filter={['==', 'subtype', 'lithium']} paint={{ 'circle-radius': 6, 'circle-color': '#ef4444', 'circle-stroke-width': 1.5, 'circle-stroke-color': '#ffffff' }} />
          )}
          <Layer 
            id="minerals-labels" 
            type="symbol" 
            filter={[
              'any',
              ...(activeMinerals.uranium ? [['==', 'subtype', 'uranium']] : []),
              ...(activeMinerals.nickel ? [['==', 'subtype', 'nickel']] : []),
              ...(activeMinerals.copper ? [['==', 'subtype', 'copper']] : []),
              ...(activeMinerals.rareEarth ? [['==', 'subtype', 'rare_earth']] : []),
              ...(activeMinerals.lithium ? [['==', 'subtype', 'lithium']] : []),
              ['==', '1', '2']
            ] as any}
            minzoom={4}
            layout={{ 
              'text-field': ['get', 'name'], 
              'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'], 
              'text-size': 11,
              'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
              'text-radial-offset': 1.2,
              'text-justify': 'auto'
            }} 
            paint={{ 
              'text-color': '#ffffff',
              'text-halo-color': '#111',
              'text-halo-width': 2
            }} 
          />
        </Source>
      )}



      {activeLayers.renewables && (
        <Source id="renewables-data" type="geojson" data="/renewables.geojson">
          {/* Hydro Plants */}
          {activeRenewables.hydro && (
            <Layer 
              id="renewable-hydro" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'renewable'], ['==', ['get', 'subtype'], 'hydro'], ['>=', ['get', 'capacity_num'], minRenewableCapacity]]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  10, 3,
                  5000, 15
                ], 
                'circle-color': '#0ea5e9', // Blue for Hydro
                'circle-stroke-width': 1.5, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
          )}
          {/* Wind Farms */}
          {activeRenewables.wind && (
            <Layer 
              id="renewable-wind" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'renewable'], ['==', ['get', 'subtype'], 'wind'], ['>=', ['get', 'capacity_num'], minRenewableCapacity]]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  10, 3,
                  1000, 10
                ], 
                'circle-color': '#22c55e', // Green for Wind
                'circle-stroke-width': 1.5, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
          )}
          {/* Solar Farms */}
          {activeRenewables.solar && (
            <Layer 
              id="renewable-solar" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'renewable'], ['==', ['get', 'subtype'], 'solar'], ['>=', ['get', 'capacity_num'], minRenewableCapacity]]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  10, 3,
                  500, 10
                ], 
                'circle-color': '#fbbf24', // Yellow for Solar
                'circle-stroke-width': 1.5, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
          )}
          
          {/* Name labels (zoom > 5) */}
          <Layer 
            id="renewables-labels" 
            type="symbol" 
            filter={[
              'any',
              ...(activeRenewables.hydro ? [['all', ['==', ['get', 'type'], 'renewable'], ['==', ['get', 'subtype'], 'hydro'], ['>=', ['get', 'capacity_num'], minRenewableCapacity]]] : []),
              ...(activeRenewables.wind ? [['all', ['==', ['get', 'type'], 'renewable'], ['==', ['get', 'subtype'], 'wind'], ['>=', ['get', 'capacity_num'], minRenewableCapacity]]] : []),
              ...(activeRenewables.solar ? [['all', ['==', ['get', 'type'], 'renewable'], ['==', ['get', 'subtype'], 'solar'], ['>=', ['get', 'capacity_num'], minRenewableCapacity]]] : []),
              ['==', '1', '2']
            ] as any}
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

      {activeLayers.nonRenewable && (
        <Source id="nonRenewable-data" type="geojson" data="/non_renewable.geojson?v=5">
          {/* Coal Plants */}
          {activeNonRenewable.coal && (
            <Layer 
              id="nonRenewable-coal" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'non-renewable'], ['==', ['get', 'subtype'], 'coal']]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  50, 4,
                  2000, 12
                ], 
                'circle-color': '#57534e', // Stone/Dark Gray for Coal
                'circle-stroke-width': 1.5, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
          )}
          {/* Gas Plants */}
          {activeNonRenewable.gas && (
            <Layer 
              id="nonRenewable-gas" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'non-renewable'], ['==', ['get', 'subtype'], 'gas']]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  50, 3,
                  1500, 10
                ], 
                'circle-color': '#3b82f6', // Blue for Gas
                'circle-stroke-width': 1.5, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
          )}
          {/* Oil Plants */}
          {activeNonRenewable.oil && (
            <Layer 
              id="nonRenewable-oil" 
              type="circle" 
              filter={['all', ['==', ['get', 'type'], 'non-renewable'], ['==', ['get', 'subtype'], 'oil']]} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  50, 3,
                  1000, 10
                ], 
                'circle-color': '#f97316', // Orange for Oil
                'circle-stroke-width': 1.5, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
          )}
          {/* Nuclear Plants */}
          {activeNonRenewable.nuclear && (
            <Layer 
              id="nonRenewable-nuclear" 
              type="circle" 
              filter={['==', ['get', 'type'], 'nuclear']} 
              paint={{ 
                'circle-radius': [
                  'interpolate', ['linear'], ['get', 'capacity_num'],
                  500, 6,
                  4000, 16
                ], 
                'circle-color': '#8b5cf6', // Violet for Nuclear
                'circle-stroke-width': 2, 
                'circle-stroke-color': '#ffffff' 
              }} 
            />
          )}
          
          <Layer 
            id="nonRenewable-labels" 
            type="symbol" 
            filter={[
              'any',
              ...(activeNonRenewable.coal ? [['all', ['==', ['get', 'type'], 'non-renewable'], ['==', ['get', 'subtype'], 'coal']]] : []),
              ...(activeNonRenewable.gas ? [['all', ['==', ['get', 'type'], 'non-renewable'], ['==', ['get', 'subtype'], 'gas']]] : []),
              ...(activeNonRenewable.oil ? [['all', ['==', ['get', 'type'], 'non-renewable'], ['==', ['get', 'subtype'], 'oil']]] : []),
              ...(activeNonRenewable.nuclear ? [['==', ['get', 'type'], 'nuclear']] : []),
              ['==', '1', '2']
            ] as any}
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

      {/* Popups */}
      {hoverInfo && (hoverInfo.feature.layer.id.startsWith('facility-') || hoverInfo.feature.layer.id.startsWith('renewable-') || hoverInfo.feature.layer.id.startsWith('minerals-') || hoverInfo.feature.layer.id.startsWith('nonRenewable-')) && (
        <Popup
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom"
          offset={15}
          className="dark-popup"
        >
          <div style={{ padding: '2px', minWidth: '160px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 600, borderBottom: '1px solid var(--border-light)', paddingBottom: '6px' }}>
              {hoverInfo.feature.properties.Pipeline_Name || hoverInfo.feature.properties.name || hoverInfo.feature.properties.Name || 'Energy Asset'}
            </h3>
            
            {hoverInfo.feature.layer.id.startsWith('pipelines-') ? (
              <>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <strong>Commodity:</strong> {hoverInfo.feature.properties.Commodity}
                </p>
                {hoverInfo.feature.properties.Operator && hoverInfo.feature.properties.Operator !== 'Unknown' && (
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <strong>Operator:</strong> {hoverInfo.feature.properties.Operator}
                  </p>
                )}
              </>
            ) : (
              <>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <strong>Type:</strong> {
                    (hoverInfo.feature.properties.type === 'non-renewable' || hoverInfo.feature.properties.type === 'nuclear' || hoverInfo.feature.properties.type === 'renewable')
                    ? ((hoverInfo.feature.properties.subtype || '').charAt(0).toUpperCase() + (hoverInfo.feature.properties.subtype || '').replace('_', ' ').slice(1) + ' Power Plant')
                    : ((hoverInfo.feature.properties.subtype || '').charAt(0).toUpperCase() + (hoverInfo.feature.properties.subtype || '').replace('_', ' ').slice(1) + ' ' + (hoverInfo.feature.properties.type || '').charAt(0).toUpperCase() + (hoverInfo.feature.properties.type || '').slice(1))
                  }
                </p>
                {hoverInfo.feature.properties.operator && hoverInfo.feature.properties.operator !== 'Unknown' && (
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <strong>Operator:</strong> {hoverInfo.feature.properties.operator}
                  </p>
                )}
                {hoverInfo.feature.properties.capacity && hoverInfo.feature.properties.capacity !== 'Unknown' && (
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <strong>Capacity:</strong> {hoverInfo.feature.properties.capacity}
                  </p>
                )}
                {hoverInfo.feature.properties.capacity_num && (hoverInfo.feature.layer.id.startsWith('renewable-') || hoverInfo.feature.layer.id.startsWith('nonRenewable-')) && (
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <strong>Powers:</strong> {Math.round(hoverInfo.feature.properties.capacity_num * 800).toLocaleString()} Homes
                  </p>
                )}
                {hoverInfo.feature.properties.status && (
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <strong>Status:</strong> {hoverInfo.feature.properties.status}
                  </p>
                )}
                {hoverInfo.feature.properties.description && (
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#888', fontStyle: 'italic', maxWidth: '200px' }}>
                    {hoverInfo.feature.properties.description}
                  </p>
                )}
              </>
            )}
          </div>
        </Popup>
      )}

      {/* Unified Legends Container */}
      <div style={{ position: 'absolute', top: 100, right: 20, display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 10 }}>
        
        {(activeLayers.pipelines || activeLayers.refining || activeLayers.storage || activeLayers.grid || activeLayers.minerals || activeLayers.renewables || activeLayers.nonRenewable) && (
          <button 
            onClick={() => setIsLegendOpen(!isLegendOpen)}
            className="glass-panel"
            style={{ 
              padding: '6px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer', 
              border: '1px solid var(--border-light)', 
              color: '#fff', 
              background: 'var(--bg-panel)', 
              alignSelf: 'flex-end',
              boxShadow: 'var(--glass-shadow)',
              backdropFilter: 'var(--glass-blur)'
            }}
            title={isLegendOpen ? "Collapse Legend" : "Expand Legend"}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 600, marginRight: '4px' }}>Legend</span>
            {isLegendOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        )}

        {isLegendOpen && (
          <>
            {activeLayers.pipelines && (
          <div className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px', minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Pipelines</h4>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activePipelines.liquids ? 1 : 0.6 }}
              onClick={() => setActivePipelines(prev => ({ ...prev, liquids: !prev.liquids }))}
            >
              <div style={{ width: '16px', height: '4px', backgroundColor: '#f97316', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Oil / Liquids</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activePipelines.liquids ? '#f97316' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activePipelines.liquids ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: activePipelines.gas ? 1 : 0.6 }}
              onClick={() => setActivePipelines(prev => ({ ...prev, gas: !prev.gas }))}
            >
              <div style={{ width: '16px', height: '4px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Natural Gas</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activePipelines.gas ? '#3b82f6' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activePipelines.gas ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
          </div>
        )}


        {(activeLayers.refining || activeLayers.storage) && (
          <div className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px', minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Facilities</h4>
            {activeLayers.refining && (
              <>
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeFacilities.oilRefinery ? 1 : 0.6 }}
              onClick={() => setActiveFacilities(prev => ({ ...prev, oilRefinery: !prev.oilRefinery }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#f97316', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Oil Refinery</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeFacilities.oilRefinery ? '#f97316' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeFacilities.oilRefinery ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeFacilities.gasProcessing ? 1 : 0.6 }}
              onClick={() => setActiveFacilities(prev => ({ ...prev, gasProcessing: !prev.gasProcessing }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Gas Processing</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeFacilities.gasProcessing ? '#3b82f6' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeFacilities.gasProcessing ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
              </>
            )}
            {activeLayers.storage && (
              <>
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeFacilities.oilStorage ? 1 : 0.6 }}
              onClick={() => setActiveFacilities(prev => ({ ...prev, oilStorage: !prev.oilStorage }))}
            >
              <div style={{ width: '10px', height: '10px', backgroundColor: '#111', border: '2px solid #f97316', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Oil Storage</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeFacilities.oilStorage ? '#f97316' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeFacilities.oilStorage ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: activeFacilities.gasStorage ? 1 : 0.6 }}
              onClick={() => setActiveFacilities(prev => ({ ...prev, gasStorage: !prev.gasStorage }))}
            >
              <div style={{ width: '10px', height: '10px', backgroundColor: '#111', border: '2px solid #3b82f6', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Gas Storage</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeFacilities.gasStorage ? '#3b82f6' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeFacilities.gasStorage ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
              </>
            )}
          </div>
        )}

        {activeLayers.grid && (
          <div className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px', minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Grid Voltage</h4>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeGrid.low ? 1 : 0.6 }}
              onClick={() => setActiveGrid(prev => ({ ...prev, low: !prev.low }))}
            >
              <div style={{ width: '16px', height: '4px', backgroundColor: '#2dd4bf', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>~150kV class</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeGrid.low ? '#2dd4bf' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeGrid.low ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeGrid.med ? 1 : 0.6 }}
              onClick={() => setActiveGrid(prev => ({ ...prev, med: !prev.med }))}
            >
              <div style={{ width: '16px', height: '4px', backgroundColor: '#facc15', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>~300kV class</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeGrid.med ? '#facc15' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeGrid.med ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: activeGrid.high ? 1 : 0.6 }}
              onClick={() => setActiveGrid(prev => ({ ...prev, high: !prev.high }))}
            >
              <div style={{ width: '16px', height: '4px', backgroundColor: '#f43f5e', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>450kV+</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeGrid.high ? '#f43f5e' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeGrid.high ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {activeLayers.minerals && (
          <div className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px', minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Critical Minerals</h4>
            
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeMinerals.uranium ? 1 : 0.6 }}
              onClick={() => setActiveMinerals(prev => ({ ...prev, uranium: !prev.uranium }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#a855f7', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Uranium</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeMinerals.uranium ? '#a855f7' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeMinerals.uranium ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeMinerals.nickel ? 1 : 0.6 }}
              onClick={() => setActiveMinerals(prev => ({ ...prev, nickel: !prev.nickel }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#64748b', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Nickel / Cobalt</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeMinerals.nickel ? '#64748b' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeMinerals.nickel ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeMinerals.copper ? 1 : 0.6 }}
              onClick={() => setActiveMinerals(prev => ({ ...prev, copper: !prev.copper }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#d97706', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Copper</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeMinerals.copper ? '#d97706' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeMinerals.copper ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeMinerals.lithium ? 1 : 0.6 }}
              onClick={() => setActiveMinerals(prev => ({ ...prev, lithium: !prev.lithium }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Lithium</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeMinerals.lithium ? '#ef4444' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeMinerals.lithium ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: activeMinerals.rareEarth ? 1 : 0.6 }}
              onClick={() => setActiveMinerals(prev => ({ ...prev, rareEarth: !prev.rareEarth }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#ec4899', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Rare Earth</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeMinerals.rareEarth ? '#ec4899' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeMinerals.rareEarth ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {activeLayers.renewables && (
          <div className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px', minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Renewables</h4>
            
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeRenewables.hydro ? 1 : 0.6 }}
              onClick={() => setActiveRenewables(prev => ({ ...prev, hydro: !prev.hydro }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#0ea5e9', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Hydroelectric</span>
              {/* Toggle Switch UI */}
              <div style={{ width: '28px', height: '14px', backgroundColor: activeRenewables.hydro ? '#0ea5e9' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeRenewables.hydro ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeRenewables.wind ? 1 : 0.6 }}
              onClick={() => setActiveRenewables(prev => ({ ...prev, wind: !prev.wind }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#22c55e', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Wind Farm</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeRenewables.wind ? '#22c55e' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeRenewables.wind ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: activeRenewables.solar ? 1 : 0.6 }}
              onClick={() => setActiveRenewables(prev => ({ ...prev, solar: !prev.solar }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#fbbf24', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Solar Farm</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeRenewables.solar ? '#fbbf24' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeRenewables.solar ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#e5e7eb', marginBottom: '8px' }}>
                <span>Min Capacity</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#e5e7eb' }}>
                  <input type="radio" name="renewable-capacity" checked={minRenewableCapacity === 0} onChange={() => setMinRenewableCapacity(0)} /> All
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#e5e7eb' }}>
                  <input type="radio" name="renewable-capacity" checked={minRenewableCapacity === 100} onChange={() => setMinRenewableCapacity(100)} /> Over 100MW
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#e5e7eb' }}>
                  <input type="radio" name="renewable-capacity" checked={minRenewableCapacity === 250} onChange={() => setMinRenewableCapacity(250)} /> Over 250MW
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#e5e7eb' }}>
                  <input type="radio" name="renewable-capacity" checked={minRenewableCapacity === 400} onChange={() => setMinRenewableCapacity(400)} /> 400MW+
                </label>
              </div>
            </div>
          </div>
        )}

        {activeLayers.nonRenewable && (
          <div className="glass-panel" style={{ padding: '12px 16px', borderRadius: '8px', minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Non-Renewable & Nuclear</h4>
            
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeNonRenewable.coal ? 1 : 0.6 }}
              onClick={() => setActiveNonRenewable(prev => ({ ...prev, coal: !prev.coal }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#57534e', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Coal</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeNonRenewable.coal ? '#57534e' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeNonRenewable.coal ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeNonRenewable.gas ? 1 : 0.6 }}
              onClick={() => setActiveNonRenewable(prev => ({ ...prev, gas: !prev.gas }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Natural Gas</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeNonRenewable.gas ? '#3b82f6' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeNonRenewable.gas ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', opacity: activeNonRenewable.oil ? 1 : 0.6 }}
              onClick={() => setActiveNonRenewable(prev => ({ ...prev, oil: !prev.oil }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#f97316', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Oil</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeNonRenewable.oil ? '#f97316' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeNonRenewable.oil ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: activeNonRenewable.nuclear ? 1 : 0.6 }}
              onClick={() => setActiveNonRenewable(prev => ({ ...prev, nuclear: !prev.nuclear }))}
            >
              <div style={{ width: '12px', height: '12px', backgroundColor: '#8b5cf6', border: '1.5px solid #fff', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb', flexGrow: 1 }}>Nuclear</span>
              <div style={{ width: '28px', height: '14px', backgroundColor: activeNonRenewable.nuclear ? '#8b5cf6' : '#4b5563', borderRadius: '7px', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: activeNonRenewable.nuclear ? '16px' : '2px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </Map>
    </div>
  );
}
