import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MapContainer from '../components/MapContainer';
import Sidebar from '../components/Sidebar';
import { SIDEBAR_LAYER_KEYS } from '../components/map/mapLayers';
import type { ActiveLayers, SidebarLayerKey } from '../components/map/mapLayers';

const allLayersOff = (): ActiveLayers =>
  Object.fromEntries(SIDEBAR_LAYER_KEYS.map((key) => [key, false])) as ActiveLayers;

const isSidebarLayerKey = (value: string | null): value is SidebarLayerKey =>
  value !== null && (SIDEBAR_LAYER_KEYS as readonly string[]).includes(value);

export default function MapPage() {
  // At most one sidebar layer is active at a time. Basins is on by default,
  // unless a deep dive linked here with ?layer=<key>.
  const [searchParams] = useSearchParams();
  const [layers, setLayers] = useState<ActiveLayers>(() => {
    const requested = searchParams.get('layer');
    const initial: SidebarLayerKey = isSidebarLayerKey(requested) ? requested : 'basins';
    return { ...allLayersOff(), [initial]: true };
  });

  const toggleLayer = (layer: SidebarLayerKey) => {
    setLayers((prev) => ({ ...allLayersOff(), [layer]: !prev[layer] }));
  };

  return (
    <div className="map-page-wrapper">
      <div className="map-wrapper">
        <MapContainer activeLayers={layers} />
      </div>
      <div className="ui-layer">
        <Sidebar layers={layers} onToggleLayer={toggleLayer} />
      </div>
    </div>
  );
}
