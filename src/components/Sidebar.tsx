import { Database, Route, Factory, Zap, Leaf, Activity } from 'lucide-react';

interface SidebarProps {
  layers: {
    basins: boolean;
    pipelines: boolean;
    refineries: boolean;
    grid: boolean;
    renewables: boolean;
  };
  onToggleLayer: (layer: keyof SidebarProps['layers']) => void;
}

export default function Sidebar({ layers, onToggleLayer }: SidebarProps) {
  const toggleConfigs = [
    { key: 'basins', icon: <Database size={20} />, label: 'Basins & Resources', desc: 'Geological Formations', colorClass: 'gas' },
    { key: 'pipelines', icon: <Route size={20} />, label: 'Pipelines & Flows', desc: 'Liquids & Gas Networks', colorClass: 'gas' },
    { key: 'refineries', icon: <Factory size={20} />, label: 'Refineries & Storage', desc: 'Processing Hubs', colorClass: 'gas' },
    { key: 'grid', icon: <Zap size={20} />, label: 'The Grid', desc: 'Transmission Lines', colorClass: 'renewable' },
    { key: 'renewables', icon: <Leaf size={20} />, label: 'Renewables', desc: 'Wind, Solar & Hydro', colorClass: 'renewable' },
  ] as const;

  const activeLayers = Object.entries(layers).filter(([_, v]) => v).map(([k]) => k);
  let overviewTitle = 'System Status';
  let overviewStats = [];

  if (activeLayers.length === 0) {
    overviewTitle = 'National Production';
    overviewStats = [
      { label: 'Oil Output', value: '4.8M bbl/d' },
      { label: 'Gas Output', value: '17.5 Bcf/d' },
      { label: 'Electricity', value: '640 TWh/yr' }
    ];
  } else if (activeLayers.includes('refineries')) {
    overviewTitle = 'Refining Infrastructure';
    overviewStats = [
      { label: 'Active Facilities', value: '17' },
      { label: 'Total Capacity', value: '2.0M bbl/d' },
      { label: 'Top Product', value: 'Distillate' }
    ];
  } else if (activeLayers.includes('pipelines')) {
    overviewTitle = 'Pipeline Network';
    overviewStats = [
      { label: 'Total Length', value: '840k km' },
      { label: 'Transmission', value: '117k km' },
      { label: 'US Exports', value: '3.8M bbl/d' }
    ];
  } else if (activeLayers.includes('basins')) {
    overviewTitle = 'Geological Resources';
    overviewStats = [
      { label: 'WCSB Area', value: '1.4M km²' },
      { label: 'Proven Oil', value: '168B bbls' },
      { label: 'Proven Gas', value: '83 Tcf' }
    ];
  } else if (activeLayers.includes('grid')) {
    overviewTitle = 'The Electrical Grid';
    overviewStats = [
      { label: 'Transmission', value: '160k km' },
      { label: 'Clean Energy', value: '82%' },
      { label: 'US Exports', value: '60 TWh' }
    ];
  } else if (activeLayers.includes('renewables')) {
    overviewTitle = 'Renewable Capacity';
    overviewStats = [
      { label: 'Hydroelectric', value: '82 GW' },
      { label: 'Wind Power', value: '19 GW' },
      { label: 'Solar Power', value: '5 GW' }
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
            National Overview
          </h2>
          
          <div className="stats-card" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Activity size={18} color="var(--accent-blue)" />
              <span style={{ fontWeight: 500 }}>{overviewTitle}</span>
            </div>
            {overviewStats.map((stat, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i === overviewStats.length - 1 ? 0 : '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
                <span style={{ fontWeight: 600 }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
