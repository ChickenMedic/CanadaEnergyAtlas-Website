import { Database, Route, Factory, Zap, Leaf, Activity } from 'lucide-react';

interface SidebarProps {
  layers: {
    basins: boolean;
    minerals: boolean;
    pipelines: boolean;
    refineries: boolean;
    grid: boolean;
    renewables: boolean;
  };
  onToggleLayer: (layer: keyof SidebarProps['layers']) => void;
}

export default function Sidebar({ layers, onToggleLayer }: SidebarProps) {
  const toggleConfigs = [
    { key: 'basins', icon: <Database size={20} />, label: 'Basins', desc: 'Geological Formations', colorClass: 'gas' },
    { key: 'minerals', icon: <Database size={20} />, label: 'Critical Minerals', desc: 'NATO Supply Chain', colorClass: 'copper' },
    { key: 'pipelines', icon: <Route size={20} />, label: 'Pipelines & Flows', desc: 'Liquids & Gas Networks', colorClass: 'gas' },
    { key: 'refineries', icon: <Factory size={20} />, label: 'Refineries & Storage', desc: 'Processing Hubs', colorClass: 'gas' },
    { key: 'grid', icon: <Zap size={20} />, label: 'The Grid', desc: 'Transmission Lines', colorClass: 'renewable' },
    { key: 'renewables', icon: <Leaf size={20} />, label: 'Renewables', desc: 'Wind, Solar & Hydro', colorClass: 'renewable' },
  ] as const;

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
  } else if (activeLayers.includes('refineries')) {
    overviewTitle = 'Refining Infrastructure';
    canadaStats = [
      { label: 'Active Facilities', value: '17' },
      { label: 'Total Capacity', value: '2.0M bbl/d' },
      { label: 'Top Product', value: 'Distillate' }
    ];
    usStats = [
      { label: 'Active Facilities', value: '130' },
      { label: 'Total Capacity', value: '18.1M bbl/d' },
      { label: 'Top Product', value: 'Gasoline' }
    ];
  } else if (activeLayers.includes('pipelines')) {
    overviewTitle = 'Pipeline Network';
    canadaStats = [
      { label: 'Total Length', value: '840k km' },
      { label: 'Transmission', value: '117k km' },
      { label: 'Exports to US', value: '3.8M bbl/d' }
    ];
    usStats = [
      { label: 'Total Length', value: '4.2M km' },
      { label: 'Transmission', value: '480k km' },
      { label: 'Imports from CA', value: '3.8M bbl/d' }
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
      { label: 'Clean Energy', value: '82%' },
      { label: 'Cross-border Lines', value: '34' },
      { label: 'US Exports', value: '60 TWh' }
    ];
    usStats = [
      { label: 'Clean Energy', value: '40%' },
      { label: 'Major Interconnects', value: '3' },
      { label: 'CA Imports', value: '60 TWh' }
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
            <div key={key} className="layer-toggle-wrapper">
              <div 
                className={`layer-toggle ${colorClass} ${layers[key as keyof typeof layers] ? 'active' : ''}`}
                onClick={() => onToggleLayer(key as keyof typeof layers)}
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
                <label className="switch" onClick={e => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={layers[key as keyof typeof layers]}
                    onChange={() => onToggleLayer(key as keyof typeof layers)}
                  />
                  <span className={`slider ${colorClass}`}></span>
                </label>
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
