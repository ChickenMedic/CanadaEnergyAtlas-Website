import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Zap, TrendingUp, Activity, Droplet, Wind } from 'lucide-react';

// Data for benchmarks
const benchmarks = [
  { id: 'wcs', name: 'WCS (Hardisty)', type: 'oil', price: 75.85, trend: 'up', note: 'Heavy sour crude, narrowed diff', importance: 1 },
  { id: 'wti', name: 'WTI (Cushing)', type: 'oil', price: 91.38, trend: 'up', note: 'NA light sweet reference', importance: 2 },
  { id: 'brent', name: 'Brent Crude', type: 'oil', price: 95.12, trend: 'up', note: 'Global light sweet reference', importance: 3 },
  { id: 'hh', name: 'Henry Hub', type: 'gas', price: 2.85, trend: 'down', note: 'US natural gas benchmark', importance: 4 },
  { id: 'aeco', name: 'AECO (Alberta)', type: 'gas', price: 2.10, trend: 'down', note: 'Canadian gas benchmark', importance: 5 },
  { id: 'dawn', name: 'Dawn Hub', type: 'gas', price: 2.45, trend: 'up', note: 'Eastern Canada gas pricing', importance: 6 },
];

const rankings = [
  { 
    id: 'hydro', 
    title: 'Hydroelectricity', 
    rank: '3',
    suffix: 'rd',
    subtitle: 'Largest Producer', 
    details: 'Canada operates over 500 hydroelectric facilities, generating roughly 60% of the country\'s total electricity. We are a clean energy powerhouse exporting significant surplus to the US.',
    icon: <Zap size={32} color="var(--accent-blue)" />
  },
  { 
    id: 'oil', 
    title: 'Crude Oil', 
    rank: '4',
    suffix: 'th',
    subtitle: 'Largest Producer', 
    details: 'With the world\'s third-largest proven oil reserves, primarily in the oil sands, Canada is a cornerstone of global energy security, supplying over 4 million barrels per day.',
    icon: <Droplet size={32} color="var(--accent-orange)" />
  },
  { 
    id: 'uranium', 
    title: 'Uranium', 
    rank: '2',
    suffix: 'nd',
    subtitle: 'Largest Producer', 
    details: 'Saskatchewan\'s McArthur River and Cigar Lake are among the highest-grade uranium mines globally, fueling zero-emission nuclear power around the world.',
    icon: <Activity size={32} color="var(--accent-green)" />
  },
  { 
    id: 'wind', 
    title: 'Wind Energy', 
    rank: '9',
    suffix: 'th',
    subtitle: 'Largest Capacity', 
    details: 'Canada is rapidly expanding its wind footprint, with over 19 GW of installed capacity, harnessing vast wind resources across the prairies and coastlines.',
    icon: <Wind size={32} color="var(--text-muted)" />
  }
];

export default function HomePage() {
  const [benchmarkType, setBenchmarkType] = useState<'all' | 'oil' | 'gas'>('all');
  const [benchmarkSort, setBenchmarkSort] = useState<'importance' | 'price'>('importance');
  const [selectedRanking, setSelectedRanking] = useState(rankings[0]);

  const filteredBenchmarks = benchmarks
    .filter(b => benchmarkType === 'all' || b.type === benchmarkType)
    .sort((a, b) => benchmarkSort === 'price' ? b.price - a.price : a.importance - b.importance);

  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <div className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="video-background">
           <video autoPlay loop muted playsInline>
              <source src="/digital-pipes-bg.mp4" type="video/mp4" />
           </video>
           <div className="video-overlay"></div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="hero-title">Understanding Canadian Energy</h1>
          <p className="hero-subtitle">
            Explore our continent's vast energy network through interactive maps, clear data, and insightful facts.
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
      </div>

      <div className="dashboard-section" style={{ marginTop: '-40px' }}>
        
        {/* Market Pricing Benchmarks */}
        <div className="dashboard-header" style={{ marginBottom: '40px' }}>
          <h2>North American Benchmarks</h2>
          <p style={{ color: 'var(--text-muted)' }}>Current market prices across key hubs</p>
          
          <div className="benchmark-controls">
            <div className="toggle-group">
              <button className={`toggle-btn ${benchmarkType === 'all' ? 'active' : ''}`} onClick={() => setBenchmarkType('all')}>All</button>
              <button className={`toggle-btn ${benchmarkType === 'oil' ? 'active' : ''}`} onClick={() => setBenchmarkType('oil')}>Oil</button>
              <button className={`toggle-btn ${benchmarkType === 'gas' ? 'active' : ''}`} onClick={() => setBenchmarkType('gas')}>Gas</button>
            </div>
            <div className="toggle-group">
              <button className={`toggle-btn ${benchmarkSort === 'importance' ? 'active' : ''}`} onClick={() => setBenchmarkSort('importance')}>Importance</button>
              <button className={`toggle-btn ${benchmarkSort === 'price' ? 'active' : ''}`} onClick={() => setBenchmarkSort('price')}>Price</button>
            </div>
          </div>
        </div>

        <div className="benchmark-grid">
          {filteredBenchmarks.map(b => (
            <div key={b.id} className="stat-card">
              <div className="stat-header">
                <span>{b.name}</span>
                {b.type === 'oil' ? <Droplet size={18} color="var(--accent-orange)" /> : <Activity size={18} color="var(--accent-blue)" />}
              </div>
              <div className="stat-value">${b.price.toFixed(2)}</div>
              <div className={`stat-trend ${b.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                {b.trend === 'up' ? <TrendingUp size={16} /> : <TrendingUp size={16} style={{transform: 'scaleY(-1)'}} />}
                <span>{b.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Rankings */}
        <div className="dashboard-header" style={{ marginTop: '80px', marginBottom: '40px' }}>
          <h2>Global Leadership</h2>
          <p style={{ color: 'var(--text-muted)' }}>Canada's position on the world stage</p>
        </div>

        <div className="rankings-container">
          <div className="rankings-list">
            {rankings.map(r => (
              <div 
                key={r.id} 
                className={`ranking-item ${selectedRanking.id === r.id ? 'active' : ''}`}
                onClick={() => setSelectedRanking(r)}
              >
                <div className="ranking-icon-container">{r.icon}</div>
                <div className="ranking-info">
                  <div className="ranking-title">{r.title}</div>
                  <div className="ranking-subtitle">{r.subtitle}</div>
                </div>
                <div className="ranking-number">
                  {r.rank}<span className="ranking-suffix">{r.suffix}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="ranking-details glass-panel">
            <div className="ranking-details-header">
              {selectedRanking.icon}
              <h3>{selectedRanking.title}</h3>
            </div>
            <div className="ranking-huge-number">
              {selectedRanking.rank}<span>{selectedRanking.suffix}</span>
            </div>
            <div className="ranking-subtitle-large">{selectedRanking.subtitle} Worldwide</div>
            <p className="ranking-description">{selectedRanking.details}</p>
            <Link to="/deep-dives" className="primary-btn ranking-action">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
