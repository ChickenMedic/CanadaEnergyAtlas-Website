import React from 'react';
import { Flame, Wind, Activity, ChevronRight } from 'lucide-react';

interface SidebarProps {
  layers: {
    oilGas: boolean;
    renewable: boolean;
  };
  onToggleLayer: (layer: 'oilGas' | 'renewable') => void;
}

export default function Sidebar({ layers, onToggleLayer }: SidebarProps) {
  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-header">
        <h1>Canadian Energy Atlas</h1>
        <p>Interactive exploration of Canada's energy infrastructure, tracking both conventional and renewable resources.</p>
      </div>
      
      <div className="sidebar-content">
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Data Layers
          </h2>
          
          <div 
            className={`layer-toggle gas ${layers.oilGas ? 'active' : ''}`}
            onClick={() => onToggleLayer('oilGas')}
          >
            <div className="toggle-info">
              <div className="toggle-icon gas">
                <Flame size={20} />
              </div>
              <div className="toggle-text">
                <h3>Oil & Gas</h3>
                <p>Pipelines & Facilities</p>
              </div>
            </div>
            <label className="switch" onClick={e => e.stopPropagation()}>
              <input 
                type="checkbox" 
                checked={layers.oilGas}
                onChange={() => onToggleLayer('oilGas')}
              />
              <span className="slider gas"></span>
            </label>
          </div>

          <div 
            className={`layer-toggle renewable ${layers.renewable ? 'active' : ''}`}
            onClick={() => onToggleLayer('renewable')}
          >
            <div className="toggle-info">
              <div className="toggle-icon renewable">
                <Wind size={20} />
              </div>
              <div className="toggle-text">
                <h3>Renewable Energy</h3>
                <p>Wind, Solar & Hydro</p>
              </div>
            </div>
            <label className="switch" onClick={e => e.stopPropagation()}>
              <input 
                type="checkbox" 
                checked={layers.renewable}
                onChange={() => onToggleLayer('renewable')}
              />
              <span className="slider renewable"></span>
            </label>
          </div>
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
              <span style={{ color: 'var(--text-muted)' }}>Active Pipelines</span>
              <span style={{ fontWeight: 600 }}>840,000 km</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Wind Capacity</span>
              <span style={{ fontWeight: 600 }}>15.3 GW</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Solar Capacity</span>
              <span style={{ fontWeight: 600 }}>4.3 GW</span>
            </div>
            
            <button style={{ 
              marginTop: '20px', 
              width: '100%', 
              padding: '12px', 
              background: 'var(--accent-blue)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = '#2563eb'}
            onMouseOut={e => e.currentTarget.style.background = 'var(--accent-blue)'}
            >
              View Detailed Report <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
