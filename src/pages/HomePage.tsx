import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Zap, TrendingUp, Activity, Droplet, Wind, Flame, Database, Leaf, Sun } from 'lucide-react';

const BarrelIcon = ({ size = 18, color = "#ef4444" }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="7" ry="3" />
    <path d="M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
    <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    <path d="M5 19c0 1.66 3.13 3 7 3s7-1.34 7-3" />
  </svg>
);

const benchmarks = [
  // North America Oil
  { id: 'wcs', name: 'WCS (Hardisty)', type: 'oil', region: 'na', price: 75.85, trend: 'up', note: 'Heavy sour crude', volume: 3.8 },
  { id: 'wti', name: 'WTI (Cushing)', type: 'oil', region: 'na', price: 91.38, trend: 'up', note: 'NA light sweet reference', volume: 4.5 },
  { id: 'lls', name: 'LLS (Louisiana)', type: 'oil', region: 'na', price: 93.10, trend: 'up', note: 'Light Louisiana Sweet', volume: 1.2 },
  { id: 'mars', name: 'Mars Blend', type: 'oil', region: 'na', price: 88.40, trend: 'down', note: 'Gulf Coast medium sour', volume: 0.9 },
  { id: 'syncrude', name: 'Syncrude Sweet', type: 'oil', region: 'na', price: 89.20, trend: 'up', note: 'Synthetic crude (Alberta)', volume: 1.1 },
  { id: 'bakken', name: 'Bakken Clearbrook', type: 'oil', region: 'na', price: 87.50, trend: 'up', note: 'North Dakota light sweet', volume: 1.4 },
  { id: 'ans', name: 'ANS (Alaska)', type: 'oil', region: 'na', price: 94.20, trend: 'up', note: 'Alaskan North Slope', volume: 0.5 },
  { id: 'wti-midland', name: 'WTI Midland', type: 'oil', region: 'na', price: 92.15, trend: 'up', note: 'Permian light sweet', volume: 5.8 },
  { id: 'bow-river', name: 'Bow River', type: 'oil', region: 'na', price: 74.30, trend: 'down', note: 'Canadian heavy blend', volume: 0.7 },
  { id: 'western-canadian-select', name: 'Cold Lake Blend', type: 'oil', region: 'na', price: 73.10, trend: 'down', note: 'Dilbit heavy sour', volume: 0.6 },
  
  // North America Gas
  { id: 'hh', name: 'Henry Hub', type: 'gas', region: 'na', price: 2.85, trend: 'down', note: 'US natural gas benchmark', volume: 102 },
  { id: 'aeco', name: 'AECO (Alberta)', type: 'gas', region: 'na', price: 2.10, trend: 'down', note: 'Canadian gas benchmark', volume: 16 },
  { id: 'dawn', name: 'Dawn Hub', type: 'gas', region: 'na', price: 2.45, trend: 'up', note: 'Eastern Canada gas pricing', volume: 8 },
  { id: 'station2', name: 'Station 2 (BC)', type: 'gas', region: 'na', price: 1.85, trend: 'down', note: 'Western Canada reference', volume: 5 },
  { id: 'chicago-cg', name: 'Chicago Citygate', type: 'gas', region: 'na', price: 2.65, trend: 'up', note: 'Midwest reference', volume: 14 },
  { id: 'socal-border', name: 'SoCal Border', type: 'gas', region: 'na', price: 4.10, trend: 'down', note: 'Southern California index', volume: 7 },
  { id: 'pg-and-e', name: 'PG&E Citygate', type: 'gas', region: 'na', price: 4.80, trend: 'down', note: 'Northern California', volume: 6 },
  { id: 'transco-z6', name: 'Transco Z6 (NY)', type: 'gas', region: 'na', price: 2.90, trend: 'up', note: 'Northeast reference', volume: 12 },
  { id: 'waha', name: 'Waha Hub', type: 'gas', region: 'na', price: 1.10, trend: 'down', note: 'Permian Basin gas', volume: 18 },
  
  // Europe Oil & Gas
  { id: 'brent', name: 'Brent Crude', type: 'oil', region: 'eu', price: 95.12, trend: 'up', note: 'Global light sweet reference', volume: 5.2 },
  { id: 'ttf', name: 'TTF (Netherlands)', type: 'gas', region: 'eu', price: 12.50, trend: 'up', note: 'European gas benchmark', volume: 20 },
  { id: 'urals', name: 'Urals Crude', type: 'oil', region: 'eu', price: 68.40, trend: 'down', note: 'Russian export blend', volume: 2.5 },
  { id: 'nbp', name: 'NBP (UK)', type: 'gas', region: 'eu', price: 11.90, trend: 'up', note: 'UK gas benchmark', volume: 8.5 },
  { id: 'forties', name: 'Forties', type: 'oil', region: 'eu', price: 94.80, trend: 'up', note: 'North Sea crude', volume: 0.8 },
  { id: 'ekofisk', name: 'Ekofisk', type: 'oil', region: 'eu', price: 96.00, trend: 'up', note: 'North Sea light sweet', volume: 0.4 },
  { id: 'oseberg', name: 'Oseberg', type: 'oil', region: 'eu', price: 96.50, trend: 'up', note: 'Norwegian crude', volume: 0.3 },
  { id: 'peg', name: 'PEG (France)', type: 'gas', region: 'eu', price: 12.10, trend: 'up', note: 'French gas benchmark', volume: 4 },

  // Asia Oil & Gas
  { id: 'dubai', name: 'Dubai Crude', type: 'oil', region: 'asia', price: 92.40, trend: 'up', note: 'Middle East/Asia reference', volume: 6.0 },
  { id: 'jkm', name: 'JKM (Japan/Korea)', type: 'gas', region: 'asia', price: 14.20, trend: 'up', note: 'Asian LNG benchmark', volume: 15 },
  { id: 'tapis', name: 'Tapis (Malaysia)', type: 'oil', region: 'asia', price: 98.15, trend: 'up', note: 'Light sweet Asian blend', volume: 0.5 },
  { id: 'oman', name: 'Oman Crude', type: 'oil', region: 'asia', price: 91.80, trend: 'up', note: 'Middle East sour reference', volume: 1.1 },
  { id: 'minat', name: 'Minas (Indonesia)', type: 'oil', region: 'asia', price: 93.50, trend: 'down', note: 'Heavy sweet reference', volume: 0.3 },
  { id: 'murban', name: 'Murban', type: 'oil', region: 'asia', price: 94.10, trend: 'up', note: 'Abu Dhabi light', volume: 1.5 },
  { id: 'espo', name: 'ESPO', type: 'oil', region: 'asia', price: 74.20, trend: 'down', note: 'Russian Pacific blend', volume: 1.2 }
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
  const [benchmarkSort, setBenchmarkSort] = useState<'price' | 'volume'>('volume');
  const [selectedRanking, setSelectedRanking] = useState(rankings[0]);

  const filteredBenchmarks = benchmarks
    .filter(b => benchmarkRegion === 'all' || b.region === benchmarkRegion)
    .filter(b => benchmarkType === 'all' || b.type === benchmarkType)
    .sort((a, b) => {
      if (benchmarkSort === 'price') return b.price - a.price;
      return b.volume - a.volume;
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
          <h2>Oil and Gas Benchmarks</h2>
          <p style={{ color: 'var(--text-muted)' }}>Current market prices across key hubs</p>
          
          <div className="benchmark-controls">
            <div className="toggle-group">
              <button className={`toggle-btn ${benchmarkRegion === 'all' ? 'active' : ''}`} onClick={() => setBenchmarkRegion('all')}>World</button>
              <button className={`toggle-btn ${benchmarkRegion === 'na' ? 'active' : ''}`} onClick={() => setBenchmarkRegion('na')}>NA</button>
              <button className={`toggle-btn ${benchmarkRegion === 'eu' ? 'active' : ''}`} onClick={() => setBenchmarkRegion('eu')}>Europe</button>
              <button className={`toggle-btn ${benchmarkRegion === 'asia' ? 'active' : ''}`} onClick={() => setBenchmarkRegion('asia')}>Asia</button>
            </div>
            <div className="toggle-group">
              <button className={`toggle-btn ${benchmarkType === 'all' ? 'active' : ''}`} onClick={() => setBenchmarkType('all')}>Both</button>
              <button className={`toggle-btn ${benchmarkType === 'oil' ? 'active' : ''}`} onClick={() => setBenchmarkType('oil')}>Oil</button>
              <button className={`toggle-btn ${benchmarkType === 'gas' ? 'active' : ''}`} onClick={() => setBenchmarkType('gas')}>Gas</button>
            </div>
            <div className="toggle-group">
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
                {b.type === 'oil' ? <BarrelIcon size={18} color="#ef4444" /> : <Flame size={18} color="#3b82f6" />}
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
          <h2>US & Canada Global Leadership</h2>
          <p style={{ color: 'var(--text-muted)' }}>North America sets the benchmark for energy security and innovation.</p>
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
