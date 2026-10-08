import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Database, Route, Factory, Zap, Leaf, Activity, Compass, Cylinder, Flame } from 'lucide-react';
import { SIDEBAR_LAYER_KEYS } from './map/mapLayers';
import type { ActiveLayers, SidebarLayerKey } from './map/mapLayers';

interface SidebarProps {
  layers: ActiveLayers;
  onToggleLayer: (layer: SidebarLayerKey) => void;
}

// Matches the `@media (max-width: 1024px)` breakpoint in index.css, where the
// sidebar collapses into a column of round icon buttons.
const MOBILE_BREAKPOINT = 1024;

interface ToggleConfig {
  key: SidebarLayerKey;
  icon: ReactNode;
  label: string;
  desc: string;
  colorClass: 'gas' | 'renewable' | 'copper';
}

const TOGGLES: ToggleConfig[] = [
  { key: 'basins', icon: <Database size={20} />, label: 'Basins', desc: 'Geological Formations', colorClass: 'gas' },
  { key: 'minerals', icon: <Compass size={20} />, label: 'Critical Minerals', desc: 'NATO Supply Chain', colorClass: 'copper' },
  { key: 'pipelines', icon: <Route size={20} />, label: 'Pipelines & Flows', desc: 'Liquids & Gas Networks', colorClass: 'gas' },
  { key: 'refining', icon: <Factory size={20} />, label: 'Refineries', desc: 'Processing Hubs', colorClass: 'gas' },
  { key: 'nonRenewable', icon: <Flame size={20} />, label: 'Non-Renewables', desc: 'Coal, Gas, Oil & Nuclear', colorClass: 'gas' },
  { key: 'storage', icon: <Cylinder size={20} />, label: 'Storage', desc: 'Tank Farms & Caverns', colorClass: 'gas' },
  { key: 'grid', icon: <Zap size={20} />, label: 'The Grid', desc: 'Transmission Lines', colorClass: 'renewable' },
  { key: 'renewables', icon: <Leaf size={20} />, label: 'Renewables', desc: 'Wind, Solar & Hydro', colorClass: 'renewable' },
];

interface Stat {
  label: string;
  value: string;
}

interface Overview {
  title: string;
  canada: Stat[];
  us: Stat[];
}

const CONTINENTAL_OVERVIEW: Overview = {
  title: 'Continental Production',
  canada: [
    { label: 'Oil Output', value: '4.8M bbl/d' },
    { label: 'Gas Output', value: '17.5 Bcf/d' },
    { label: 'Electricity', value: '640 TWh/yr' },
  ],
  us: [
    { label: 'Oil Output', value: '12.9M bbl/d' },
    { label: 'Gas Output', value: '103 Bcf/d' },
    { label: 'Electricity', value: '4,240 TWh/yr' },
  ],
};

const DOWNSTREAM_OVERVIEW: Overview = {
  title: 'Downstream Operations',
  canada: [
    { label: 'Refining Cap', value: '2.0M bbl/d' },
    { label: 'Usage: Transport', value: '55%' },
    { label: 'Usage: Industrial', value: '25%' },
  ],
  us: [
    { label: 'Refining Cap', value: '18.1M bbl/d' },
    { label: 'Usage: Transport', value: '68%' },
    { label: 'Usage: Industrial', value: '26%' },
  ],
};

// Regional Overview card content for each active layer.
const OVERVIEWS: Record<SidebarLayerKey, Overview> = {
  refining: DOWNSTREAM_OVERVIEW,
  storage: DOWNSTREAM_OVERVIEW,
  pipelines: {
    title: 'Network Flows & Usage',
    canada: [
      { label: 'Total Length', value: '840k km' },
      { label: 'Usage: Industrial', value: '52%' },
      { label: 'Usage: Transport', value: '23%' },
      { label: 'Usage: Residential', value: '13%' },
    ],
    us: [
      { label: 'Total Length', value: '4.2M km' },
      { label: 'Usage: Industrial', value: '33%' },
      { label: 'Usage: Transport', value: '28%' },
      { label: 'Usage: Residential', value: '16%' },
    ],
  },
  basins: {
    title: 'Geological Resources',
    canada: [
      { label: 'Primary Basin', value: 'WCSB' },
      { label: 'Proven Oil', value: '168B bbls' },
      { label: 'Proven Gas', value: '83 Tcf' },
    ],
    us: [
      { label: 'Primary Basin', value: 'Permian' },
      { label: 'Proven Oil', value: '44B bbls' },
      { label: 'Proven Gas', value: '473 Tcf' },
    ],
  },
  grid: {
    title: 'The Electrical Grid',
    canada: [
      { label: 'Usage: Industrial', value: '40%' },
      { label: 'Usage: Residential', value: '33%' },
      { label: 'Usage: Commercial', value: '24%' },
    ],
    us: [
      { label: 'Usage: Residential', value: '39%' },
      { label: 'Usage: Commercial', value: '35%' },
      { label: 'Usage: Industrial', value: '26%' },
    ],
  },
  renewables: {
    title: 'Renewable Capacity',
    canada: [
      { label: 'Hydroelectric', value: '82 GW' },
      { label: 'Wind Power', value: '19 GW' },
      { label: 'Solar Power', value: '5 GW' },
    ],
    us: [
      { label: 'Hydroelectric', value: '80 GW' },
      { label: 'Wind Power', value: '140 GW' },
      { label: 'Solar Power', value: '110 GW' },
    ],
  },
  nonRenewable: {
    title: 'Non-Renewables',
    canada: [
      { label: 'Natural Gas', value: '25 GW' },
      { label: 'Coal Power', value: '6 GW' },
      { label: 'Diesel/Oil', value: '2 GW' },
    ],
    us: [
      { label: 'Natural Gas', value: '550 GW' },
      { label: 'Coal Power', value: '210 GW' },
      { label: 'Petroleum/Oil', value: '30 GW' },
    ],
  },
  minerals: {
    title: 'NATO Critical Minerals',
    canada: [
      { label: 'Uranium Global Rank', value: '#2' },
      { label: 'Potash Global Rank', value: '#1' },
      { label: 'Developing Lithium', value: '15+ sites' },
    ],
    us: [
      { label: 'Copper Global Rank', value: '#5' },
      { label: 'Rare Earth Sites', value: '1 Active' },
      { label: 'Lithium Reserves', value: '14M Tons' },
    ],
  },
};

function StatsList({ heading, stats }: { heading: string; stats: Stat[] }) {
  return (
    <div>
      <h3 className="stats-heading">{heading}</h3>
      {stats.map((stat) => (
        <div key={stat.label} className="stats-row">
          <span className="stats-label">{stat.label}</span>
          <span className="stats-value">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function Sidebar({ layers, onToggleLayer }: SidebarProps) {
  // On mobile the toggles are icon-only; tapping an active one expands its label.
  const [expandedLayer, setExpandedLayer] = useState<SidebarLayerKey | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.layer-toggle')) {
        setExpandedLayer(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleClick = (key: SidebarLayerKey, isActive: boolean) => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      onToggleLayer(key);
      return;
    }
    if (isActive) {
      setExpandedLayer(expandedLayer === key ? null : key);
    } else {
      onToggleLayer(key);
      setExpandedLayer(key);
    }
  };

  const activeKey = SIDEBAR_LAYER_KEYS.find((key) => layers[key]);
  const overview = activeKey ? OVERVIEWS[activeKey] : CONTINENTAL_OVERVIEW;

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-header">
        <h1>Canada Energy Atlas</h1>
        <p>Interactive exploration of North America's energy architecture and resources.</p>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <h2 className="sidebar-section-title">Data Layers</h2>

          {TOGGLES.map(({ key, icon, label, desc, colorClass }) => {
            const isActive = layers[key];
            return (
              <div key={key} className="layer-toggle-wrapper" title={label}>
                <button
                  type="button"
                  className={`layer-toggle ${colorClass} ${isActive ? 'active' : ''} ${expandedLayer === key ? 'expanded' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => handleToggleClick(key, isActive)}
                >
                  <span className="toggle-info">
                    <span className={`toggle-icon ${colorClass}`}>{icon}</span>
                    <span className="toggle-text">
                      <span className="toggle-title">{label}</span>
                      <span className="toggle-desc">{desc}</span>
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="sidebar-section-title">Regional Overview</h2>

          <div className="stats-card">
            <div className="stats-card-header">
              <Activity size={18} color="var(--accent-blue)" />
              <span>{overview.title}</span>
            </div>
            <StatsList heading="🇨🇦 Canada" stats={overview.canada} />
            <StatsList heading="🇺🇸 United States" stats={overview.us} />
          </div>
        </div>
      </div>
    </div>
  );
}
