import { useState } from 'react';
import MapContainer from '../components/MapContainer';
import Sidebar from '../components/Sidebar';

export default function MapPage() {
  const [layers, setLayers] = useState({
    oilGas: true,
    renewable: false
  });

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="map-page-wrapper">
      <div className="map-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <MapContainer activeLayers={layers} />
      </div>
      <div className="ui-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none', display: 'flex', padding: '24px' }}>
        <Sidebar layers={layers} onToggleLayer={toggleLayer} />
      </div>
    </div>
  );
}
