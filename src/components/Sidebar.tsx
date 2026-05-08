import { useState, useEffect } from 'react';
import { Database, Route, Factory, Zap, Leaf, Activity, Compass, Cylinder, Flame } from 'lucide-react';

interface SidebarProps {
  layers: {
    basins: boolean;
    minerals: boolean;
    pipelines: boolean;
    refining: boolean;
    storage: boolean;
    nonRenewable: boolean;
    grid: boolean;
    renewables: boolean;
  };
  onToggleLayer: (layer: keyof SidebarProps['layers']) => void;
}

export default function Sidebar({ layers, onToggleLayer }: SidebarProps) {
  const toggleConfigs = [
    { key: 'basins', icon: <Database size={20} />, label: 'Basins', desc: 'Geological Formations', colorClass: 'gas' },
    { key: 'minerals', icon: <Compass size={20} />, label: 'Critical Minerals', desc: 'NATO Supply Chain', colorClass: 'copper' },
    { key: 'pipelines', icon: <Route size={20} />, label: 'Pipelines & Flows', desc: 'Liquids & Gas Networks', colorClass: 'gas' },
    { key: 'refining', icon: <Factory size={20} />, label: 'Refineries', desc: 'Processing Hubs', colorClass: 'gas' },
    { key: 'nonRenewable', icon: <Flame size={20} />, label: 'Non-Renewables', desc: 'Coal, Gas, Oil & Nuclear', colorClass: 'gas' },
    { key: 'storage', icon: <Cylinder size={20} />, label: 'Storage', desc: 'Tank Farms & Caverns', colorClass: 'gas' },
    { key: 'grid', icon: <Zap size={20} />, label: 'The Grid', desc: 'Transmission Lines', colorClass: 'renewable' },
    { key: 'renewables', icon: <Leaf size={20} />, label: 'Renewables', desc: 'Wind, Solar & Hydro', colorClass: 'renewable' }
  ] as const;

  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.layer-toggle')) {
        setExpandedLayer(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const activeLayers = Object.entries(layers).filter(([_, v]) => v).map(([k]) => k);
  let overviewTitle = 'System Status';
  let canadaStats: { label: string; value: string }[] = [];
  let usStats: { label: string; value: string }[] = [];

  if (activeLayers.length === 0) {
    overviewTitle = 'Continental Production';
    canadaStats = [
      { label: 'Oil Output', value: '4.8M bbl/d' },
      { label: 'Gas Output', value: '17.5 Bcf/d' },
      { label: 'Electricity', value: '640 TWh/yr' }
    ];
    usStats = [
      { label: 'Oil Output', value: '12.9M bbl/d' },
      { label: 'Gas Output', value: '103 Bcf/d' },
      { label: 'Electricity', value: '4,240 TWh/yr' }
    ];
  } else if (activeLayers.includes('refining') || activeLayers.includes('storage')) {
    overviewTitle = 'Downstream Operations';
    canadaStats = [
      { label: 'Refining Cap', value: '2.0M bbl/d' },
      { label: 'Usage: Transport', value: '55%' },
      { label: 'Usage: Industrial', value: '25%' }
    ];
    usStats = [
      { label: 'Refining Cap', value: '18.1M bbl/d' },
      { label: 'Usage: Transport', value: '68%' },
      { label: 'Usage: Industrial', value: '26%' }
    ];
  } else if (activeLayers.includes('pipelines')) {
    overviewTitle = 'Network Flows & Usage';
    canadaStats = [
      { label: 'Total Length', value: '840k km' },
      { label: 'Usage: Industrial', value: '52%' },
      { label: 'Usage: Transport', value: '23%' },
      { label: 'Usage: Residential', value: '13%' }
    ];
    usStats = [
      { label: 'Total Length', value: '4.2M km' },
      { label: 'Usage: Industrial', value: '33%' },
      { label: 'Usage: Transport', value: '28%' },
      { label: 'Usage: Residential', value: '16%' }
    ];
  } else if (activeLayers.includes('basins')) {
    overviewTitle = 'Geological Resources';
    canadaStats = [
      { label: 'Primary Basin', value: 'WCSB' },
      { label: 'Proven Oil', value: '168B bbls' },
      { label: 'Proven Gas', value: '83 Tcf' }
    ];
    usStats = [
      { label: 'Primary Basin', value: 'Permian' },
      { label: 'Proven Oil', value: '44B bbls' },
      { label: 'Proven Gas', value: '473 Tcf' }
    ];
  } else if (activeLayers.includes('grid')) {
    overviewTitle = 'The Electrical Grid';
    canadaStats = [
      { label: 'Usage: Industrial', value: '40%' },
      { label: 'Usage: Residential', value: '33%' },
      { label: 'Usage: Commercial', value: '24%' }
    ];
    usStats = [
      { label: 'Usage: Residential', value: '39%' },
      { label: 'Usage: Commercial', value: '35%' },
      { label: 'Usage: Industrial', value: '26%' }
    ];
  } else if (activeLayers.includes('renewables')) {
    overviewTitle = 'Renewable Capacity';
    canadaStats = [
      { label: 'Hydroelectric', value: '82 GW' },
      { label: 'Wind Power', value: '19 GW' },
      { label: 'Solar Power', value: '5 GW' }
    ];
    usStats = [
      { label: 'Hydroelectric', value: '80 GW' },
      { label: 'Wind Power', value: '140 GW' },
      { label: 'Solar Power', value: '110 GW' }
    ];
  } else if (activeLayers.includes('nonRenewable')) {
    overviewTitle = 'Non-Renewables';
    canadaStats = [
      { label: 'Natural Gas', value: '25 GW' },
      { label: 'Coal Power', value: '6 GW' },
      { label: 'Diesel/Oil', value: '2 GW' }
    ];
    usStats = [
      { label: 'Natural Gas', value: '550 GW' },
      { label: 'Coal Power', value: '210 GW' },
      { label: 'Petroleum/Oil', value: '30 GW' }
    ];
  } else if (activeLayers.includes('minerals')) {
    overviewTitle = 'NATO Critical Minerals';
    canadaStats = [
      { label: 'Uranium Global Rank', value: '#2' },
      { label: 'Potash Global Rank', value: '#1' },
      { label: 'Developing Lithium', value: '15+ sites' }
    ];
    usStats = [
      { label: 'Copper Global Rank', value: '#5' },
      { label: 'Rare Earth Sites', value: '1 Active' },
      { label: 'Lithium Reserves', value: '14M Tons' }
    ];
  }

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-header">
        <h1>Canada Energy Atlas</h1>
        <p>Interactive exploration of North America's energy architecture and resources.</p>
      </div>
      
      <div className="sidebar-content">
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Data Layers
          </h2>
          
          {toggleConfigs.map(({ key, icon, label, desc, colorClass }) => (
            <div key={key} className="layer-toggle-wrapper" title={label}>
              <div 
                className={`layer-toggle ${colorClass} ${layers[key as keyof typeof layers] ? 'active' : ''} ${expandedLayer === key ? 'expanded' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 1024) {
                    if (layers[key as keyof typeof layers]) {
                      // If it's already active, just toggle the text visibility (expansion)
                      setExpandedLayer(expandedLayer === key ? null : key);
                    } else {
                      // If it's not active, turn it on and expand it
                      onToggleLayer(key as keyof typeof layers);
                      setExpandedLayer(key);
                    }
                  } else {
                    onToggleLayer(key as keyof typeof layers);
                  }
                }}
              >
                <div className="toggle-info">
                  <div className={`toggle-icon ${colorClass}`}>
                    {icon}
                  </div>
                  <div className="toggle-text">
                    <h3>{label}</h3>
                    <p>{desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Regional Overview
          </h2>
          
          <div className="stats-card" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Activity size={18} color="var(--accent-blue)" />
              <span style={{ fontWeight: 500 }}>{overviewTitle}</span>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>🇨🇦 Canada</h3>
              {canadaStats.map((stat, i) => (
                <div key={`ca-${i}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i === canadaStats.length - 1 ? 0 : '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{stat.label}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{stat.value}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>🇺🇸 United States</h3>
              {usStats.map((stat, i) => (
                <div key={`us-${i}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i === usStats.length - 1 ? 0 : '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{stat.label}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
