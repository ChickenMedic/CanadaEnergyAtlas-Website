import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Zap, TrendingUp, Activity, Droplet, Wind, Flame, Database, Leaf, Sun } from 'lucide-react';

// Data for benchmarks
const benchmarks = [
  // North America
  { id: 'wcs', name: 'WCS (Hardisty)', type: 'oil', region: 'na', price: 75.85, trend: 'up', note: 'Heavy sour crude', importance: 1, volume: 3.8 },
  { id: 'wti', name: 'WTI (Cushing)', type: 'oil', region: 'na', price: 91.38, trend: 'up', note: 'NA light sweet reference', importance: 2, volume: 4.5 },
  { id: 'hh', name: 'Henry Hub', type: 'gas', region: 'na', price: 2.85, trend: 'down', note: 'US natural gas benchmark', importance: 3, volume: 102 },
  { id: 'aeco', name: 'AECO (Alberta)', type: 'gas', region: 'na', price: 2.10, trend: 'down', note: 'Canadian gas benchmark', importance: 4, volume: 16 },
  { id: 'dawn', name: 'Dawn Hub', type: 'gas', region: 'na', price: 2.45, trend: 'up', note: 'Eastern Canada gas pricing', importance: 5, volume: 8 },
  // Europe
  { id: 'brent', name: 'Brent Crude', type: 'oil', region: 'eu', price: 95.12, trend: 'up', note: 'Global light sweet reference', importance: 1, volume: 5.2 },
  { id: 'ttf', name: 'TTF (Netherlands)', type: 'gas', region: 'eu', price: 12.50, trend: 'up', note: 'European gas benchmark', importance: 2, volume: 20 },
  { id: 'urals', name: 'Urals Crude', type: 'oil', region: 'eu', price: 68.40, trend: 'down', note: 'Russian export blend', importance: 6, volume: 2.5 },
  // Asia
  { id: 'dubai', name: 'Dubai Crude', type: 'oil', region: 'asia', price: 92.40, trend: 'up', note: 'Middle East/Asia reference', importance: 1, volume: 6.0 },
  { id: 'jkm', name: 'JKM (Japan/Korea)', type: 'gas', region: 'asia', price: 14.20, trend: 'up', note: 'Asian LNG benchmark', importance: 2, volume: 15 },
  { id: 'tapis', name: 'Tapis (Malaysia)', type: 'oil', region: 'asia', price: 98.15, trend: 'up', note: 'Light sweet Asian blend', importance: 7, volume: 0.5 },
];

const rankings = [
  { id: 'hydro', title: 'Hydroelectricity', rank: '3', suffix: 'rd', subtitle: 'Largest Producer', details: 'Canada operates over 500 hydroelectric facilities, generating roughly 60% of the country\'s total electricity. We are a clean energy powerhouse exporting significant surplus to the US.', icon: <Zap size={28} color="var(--accent-blue)" /> },
  { id: 'oil', title: 'Crude Oil', rank: '4', suffix: 'th', subtitle: 'Largest Producer', details: 'With the world\'s third-largest proven oil reserves, primarily in the oil sands, Canada is a cornerstone of global energy security, supplying over 4 million barrels per day.', icon: <Droplet size={28} color="var(--accent-orange)" /> },
  { id: 'uranium', title: 'Uranium', rank: '2', suffix: 'nd', subtitle: 'Largest Producer', details: 'Saskatchewan\'s McArthur River and Cigar Lake are among the highest-grade uranium mines globally, fueling zero-emission nuclear power around the world.', icon: <Activity size={28} color="var(--accent-green)" /> },
  { id: 'wind', title: 'Wind Energy', rank: '9', suffix: 'th', subtitle: 'Largest Capacity', details: 'Canada is rapidly expanding its wind footprint, with over 19 GW of installed capacity, harnessing vast wind resources across the prairies and coastlines.', icon: <Wind size={28} color="var(--text-muted)" /> },
  { id: 'gas', title: 'Natural Gas', rank: '6', suffix: 'th', subtitle: 'Largest Producer', details: 'Canada produces over 16 billion cubic feet per day, supporting domestic heating and international exports via LNG.', icon: <Flame size={28} color="var(--accent-orange)" /> },
  { id: 'reserves', title: 'Proven Reserves', rank: '3', suffix: 'rd', subtitle: 'Largest Globally', details: 'With 168 billion barrels of proven reserves, mostly in the oil sands, Canada represents a massive, stable global energy source.', icon: <Database size={28} color="var(--accent-orange)" /> },
  { id: 'potash', title: 'Potash', rank: '1', suffix: 'st', subtitle: 'Largest Producer', details: 'Canada is the undisputed global leader in potash production, essential for global agriculture and food security.', icon: <Leaf size={28} color="var(--accent-green)" /> },
  { id: 'solar', title: 'Solar Energy', rank: '12', suffix: 'th', subtitle: 'Largest Capacity', details: 'Rapidly growing solar capacity, especially in Alberta and Saskatchewan, is diversifying Canada\'s renewable portfolio.', icon: <Sun size={28} color="#fbbf24" /> }
];

export default function HomePage() {
  const [benchmarkRegion, setBenchmarkRegion] = useState<'all' | 'na' | 'eu' | 'asia'>('na');
  const [benchmarkType, setBenchmarkType] = useState<'all' | 'oil' | 'gas'>('all');
  const [benchmarkSort, setBenchmarkSort] = useState<'importance' | 'price' | 'volume'>('importance');
  const [selectedRanking, setSelectedRanking] = useState(rankings[0]);

  const filteredBenchmarks = benchmarks
    .filter(b => benchmarkRegion === 'all' || b.region === benchmarkRegion)
    .filter(b => benchmarkType === 'all' || b.type === benchmarkType)
    .sort((a, b) => {
      if (benchmarkSort === 'price') return b.price - a.price;
      if (benchmarkSort === 'volume') return b.volume - a.volume;
      return a.importance - b.importance;
    });

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
              <button className={`toggle-btn ${benchmarkRegion === 'all' ? 'active' : ''}`} onClick={() => setBenchmarkRegion('all')}>World</button>
              <button className={`toggle-btn ${benchmarkRegion === 'na' ? 'active' : ''}`} onClick={() => setBenchmarkRegion('na')}>NA</button>
              <button className={`toggle-btn ${benchmarkRegion === 'eu' ? 'active' : ''}`} onClick={() => setBenchmarkRegion('eu')}>Europe</button>
              <button className={`toggle-btn ${benchmarkRegion === 'asia' ? 'active' : ''}`} onClick={() => setBenchmarkRegion('asia')}>Asia</button>
            </div>
            <div className="toggle-group">
              <button className={`toggle-btn ${benchmarkType === 'all' ? 'active' : ''}`} onClick={() => setBenchmarkType('all')}>All</button>
              <button className={`toggle-btn ${benchmarkType === 'oil' ? 'active' : ''}`} onClick={() => setBenchmarkType('oil')}>Oil</button>
              <button className={`toggle-btn ${benchmarkType === 'gas' ? 'active' : ''}`} onClick={() => setBenchmarkType('gas')}>Gas</button>
            </div>
            <div className="toggle-group">
              <button className={`toggle-btn ${benchmarkSort === 'importance' ? 'active' : ''}`} onClick={() => setBenchmarkSort('importance')}>Importance</button>
              <button className={`toggle-btn ${benchmarkSort === 'price' ? 'active' : ''}`} onClick={() => setBenchmarkSort('price')}>Price</button>
              <button className={`toggle-btn ${benchmarkSort === 'volume' ? 'active' : ''}`} onClick={() => setBenchmarkSort('volume')}>Volume</button>
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
