import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Zap, Activity, Droplet, Wind, Flame, Database, Leaf, Sun } from 'lucide-react';
import { benchmarks } from '../data/benchmarks';
import type { BenchmarkDef, BenchmarkRegion, BenchmarkType, PricesFile } from '../data/benchmarks';

const BarrelIcon = ({ size = 18, color = "#ef4444" }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="7" ry="3" />
    <path d="M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
    <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    <path d="M5 19c0 1.66 3.13 3 7 3s7-1.34 7-3" />
  </svg>
);

interface BenchmarkRow extends BenchmarkDef {
  price: number;
  change: number;
  pctChange: number;
  trend: 'up' | 'down';
  asOf: string;
  live: boolean;
}

function buildRows(prices: PricesFile): BenchmarkRow[] {
  return benchmarks.flatMap((def) => {
    const anchorId = def.anchor ?? def.base;
    const anchor = anchorId ? prices.anchors[anchorId] : undefined;
    if (!anchor) return [];
    const price = def.anchor ? anchor.price : +(anchor.price + (def.diff ?? 0)).toFixed(2);
    const change = anchor.change;
    const prevPrice = price - change;
    return [{
      ...def,
      price,
      change,
      pctChange: prevPrice !== 0 ? +((change / prevPrice) * 100).toFixed(2) : 0,
      trend: change >= 0 ? 'up' as const : 'down' as const,
      asOf: anchor.asOf,
      live: !!def.anchor,
    }];
  });
}

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
  const [benchmarkRegion, setBenchmarkRegion] = useState<'all' | BenchmarkRegion>('na');
  const [benchmarkType, setBenchmarkType] = useState<'all' | BenchmarkType>('oil');
  const [selectedRanking, setSelectedRanking] = useState(rankings[0]);
  const [prices, setPrices] = useState<PricesFile | null>(null);
  const [pricesError, setPricesError] = useState(false);

  useEffect(() => {
    fetch('/prices.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: PricesFile) => setPrices(data))
      .catch((err) => {
        console.error('Failed to load market data', err);
        setPricesError(true);
      });
  }, []);

  const filteredBenchmarks = (prices ? buildRows(prices) : [])
    .filter(b => benchmarkRegion === 'all' || b.region === benchmarkRegion)
    .filter(b => benchmarkType === 'all' || b.type === benchmarkType)
    .sort((a, b) => b.price - a.price);

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
          <p style={{ color: 'var(--text-muted)' }}>
            Live anchor prices from the U.S. EIA and Government of Alberta, updated daily
            {prices ? ` (last refresh ${prices.updatedAt.split('T')[0]})` : ''}.
            Other benchmarks are indicative — derived from a live anchor plus a typical differential.
          </p>

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
          </div>
        </div>

        {pricesError && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
            Market data is temporarily unavailable.
          </p>
        )}
        {!prices && !pricesError && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
            Loading market data…
          </p>
        )}

        <div className="benchmark-grid">
          {filteredBenchmarks.map((b) => (
            <div key={b.id} className="stat-card">
              <div className="stat-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {b.name}
                  {b.live ? (
                    <span
                      title={`Live market data — ${prices?.anchors[b.anchor!]?.source ?? ''}`}
                      style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', color: '#4ade80', background: 'rgba(74, 222, 128, 0.12)', padding: '2px 6px', borderRadius: '4px', cursor: 'help' }}
                    >
                      LIVE
                    </span>
                  ) : (
                    <span
                      title={`Indicative estimate: live ${b.base?.toUpperCase()} price ${b.diff! >= 0 ? '+' : '−'}$${Math.abs(b.diff!).toFixed(2)} typical differential`}
                      style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 6px', borderRadius: '4px', cursor: 'help' }}
                    >
                      INDICATIVE
                    </span>
                  )}
                </span>
                {b.type === 'oil' ? <BarrelIcon size={18} color="#ef4444" /> : <Flame size={18} color="#3b82f6" />}
              </div>
              <div className="stat-value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  ${b.price.toFixed(2)}
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                    {b.type === 'oil' ? '/ bbl' : '/ MMBtu'}
                  </span>
                </div>
                <div className={`stat-change ${b.trend === 'up' ? 'trend-up' : 'trend-down'}`} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', rowGap: '2px', columnGap: '2px', fontSize: '1.05rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>
                  <span style={{ textAlign: 'right' }}>{b.trend === 'up' ? '+$' : '-$'}</span>
                  <span style={{ textAlign: 'right' }}>{Math.abs(b.change).toFixed(2)}</span>
                  <span></span>
                  <span style={{ textAlign: 'right' }}>{b.trend === 'up' ? '+' : '-'}</span>
                  <span style={{ textAlign: 'right' }}>{Math.abs(b.pctChange).toFixed(2)}</span>
                  <span style={{ textAlign: 'left' }}>%</span>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                <span>{b.note}</span>
                <span style={{ color: 'var(--accent-blue)', opacity: 0.9, fontWeight: 500 }}>As of {b.asOf}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Rankings */}
        <div className="dashboard-header" style={{ marginTop: '80px', marginBottom: '40px' }}>
          <h2>Canada's Global Leadership</h2>
          <p style={{ color: 'var(--text-muted)' }}>Canada is uniquely positioned to provide the world with secure, sustainable, and reliable energy products.</p>
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

      <footer style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '60px 20px 40px', background: 'var(--bg-panel-solid)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Globe size={24} color="var(--accent-blue)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Canada Energy Atlas</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', marginBottom: '24px', lineHeight: 1.6 }}>
            An interactive exploration of North America's energy architecture and resources. Built to educate and highlight the critical role of energy infrastructure in powering the modern world.
          </p>
          <div style={{ display: 'flex', gap: '24px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Home</Link>
            <Link to="/map" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Map Dashboard</Link>
            <Link to="/deep-dives" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Deep Dives</Link>
            <Link to="/data-sources" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Data Sources</Link>
          </div>
          <div style={{ marginTop: '32px', color: '#666', fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} Canada Energy Atlas. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
