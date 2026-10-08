import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Zap, Activity, Droplet, Wind, Flame, Database, Leaf, Sun } from 'lucide-react';
import { buildBenchmarkRows } from '../data/benchmarkRows';
import type { BenchmarkRegion, BenchmarkType, PricesFile } from '../data/benchmarks';
import SiteFooter from '../components/SiteFooter';

const BarrelIcon = ({ size = 18, color = "#ef4444" }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="7" ry="3" />
    <path d="M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
    <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    <path d="M5 19c0 1.66 3.13 3 7 3s7-1.34 7-3" />
  </svg>
);

type RegionFilter = 'all' | BenchmarkRegion;
type TypeFilter = 'all' | BenchmarkType;

const REGION_OPTIONS: { value: RegionFilter; label: string }[] = [
  { value: 'all', label: 'World' },
  { value: 'na', label: 'NA' },
  { value: 'eu', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
];

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: 'all', label: 'Both' },
  { value: 'oil', label: 'Oil' },
  { value: 'gas', label: 'Gas' },
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
  const [benchmarkRegion, setBenchmarkRegion] = useState<RegionFilter>('na');
  const [benchmarkType, setBenchmarkType] = useState<TypeFilter>('oil');
  const [selectedRanking, setSelectedRanking] = useState(rankings[0]);
  const [prices, setPrices] = useState<PricesFile | null>(null);
  const [pricesError, setPricesError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // prices.json changes daily; revalidate with the CDN instead of trusting a
    // long-lived browser cache entry.
    fetch('/prices.json', { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: PricesFile) => {
        if (!cancelled) setPrices(data);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load market data', err);
        setPricesError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredBenchmarks = (prices ? buildBenchmarkRows(prices) : [])
    .filter(b => benchmarkRegion === 'all' || b.region === benchmarkRegion)
    .filter(b => benchmarkType === 'all' || b.type === benchmarkType)
    .sort((a, b) => b.price - a.price);

  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <div className="hero-section">
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
            <div className="toggle-group" role="group" aria-label="Region">
              {REGION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`toggle-btn ${benchmarkRegion === opt.value ? 'active' : ''}`}
                  aria-pressed={benchmarkRegion === opt.value}
                  onClick={() => setBenchmarkRegion(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="toggle-group" role="group" aria-label="Commodity">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`toggle-btn ${benchmarkType === opt.value ? 'active' : ''}`}
                  aria-pressed={benchmarkType === opt.value}
                  onClick={() => setBenchmarkType(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
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
                    <span className="badge badge-live" title={`Live market data — ${b.source}`}>LIVE</span>
                  ) : (
                    <span
                      className="badge badge-indicative"
                      title={`Indicative estimate: live ${b.base?.toUpperCase()} price ${(b.diff ?? 0) >= 0 ? '+' : '−'}$${Math.abs(b.diff ?? 0).toFixed(2)} typical differential`}
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
              <button
                key={r.id}
                type="button"
                className={`ranking-item ${selectedRanking.id === r.id ? 'active' : ''}`}
                aria-pressed={selectedRanking.id === r.id}
                onClick={() => setSelectedRanking(r)}
              >
                <span className="ranking-icon-container">{r.icon}</span>
                <span className="ranking-info">
                  <span className="ranking-title">{r.title}</span>
                  <span className="ranking-subtitle">{r.subtitle}</span>
                </span>
                <span className="ranking-number">
                  {r.rank}<span className="ranking-suffix">{r.suffix}</span>
                </span>
              </button>
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

      <SiteFooter />
    </div>
  );
}
