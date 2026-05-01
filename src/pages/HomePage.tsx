import { Link } from 'react-router-dom';
import { Globe, Zap, TrendingUp, BarChart3, Activity } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <div className="hero-section">
        <h1 className="hero-title">Visualizing the Future of Canadian Energy</h1>
        <p className="hero-subtitle">
          Explore our nation's expansive energy infrastructure through stunning interactive 3D maps, historical deep dives, and augmented reality experiences.
        </p>
        
        <div className="hero-actions">
          <Link to="/map" className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={20} />
            Explore the Map
          </Link>
          <Link to="/deep-dives" className="secondary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} />
            Read Deep Dives
          </Link>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-header">
          <h2>The Pulse of Canadian Energy</h2>
          <p style={{ color: 'var(--text-muted)' }}>Real-time scale and market benchmarks</p>
        </div>
        
        <div className="dashboard-grid">
          {/* Market Pricing */}
          <div className="stat-card">
            <div className="stat-header">
              <span>WCS (Hardisty) Benchmark</span>
              <TrendingUp size={20} className="trend-up" />
            </div>
            <div className="stat-value">$75.85</div>
            <div className="stat-trend trend-up">
              <span>Differential narrowed to $15.50 (TMX Effect)</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>WTI (Cushing) Benchmark</span>
              <Activity size={20} color="var(--accent-blue)" />
            </div>
            <div className="stat-value">$91.38</div>
            <div className="stat-trend">
              <span style={{ color: 'var(--text-muted)' }}>Global reference price</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Global Rankings</span>
              <BarChart3 size={20} color="var(--accent-orange)" />
            </div>
            <div style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Hydroelectricity</span>
                <span style={{ fontWeight: 600 }}>3rd Largest Producer</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Crude Oil</span>
                <span style={{ fontWeight: 600 }}>4th Largest Producer</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Uranium</span>
                <span style={{ fontWeight: 600 }}>2nd Largest Producer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
