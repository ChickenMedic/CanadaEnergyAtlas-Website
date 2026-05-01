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
            <div 
              key={key}
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
          ))}
        </div>

        <div>
          <h2 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            National Overview
          </h2>
          
          <div className="stats-card" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Activity size={18} color="var(--accent-blue)" />
              <span style={{ fontWeight: 500 }}>System Status</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Transmission</span>
              <span style={{ fontWeight: 600 }}>160k km</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Wind Capacity</span>
              <span style={{ fontWeight: 600 }}>19 GW</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Solar Capacity</span>
              <span style={{ fontWeight: 600 }}>5 GW</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
