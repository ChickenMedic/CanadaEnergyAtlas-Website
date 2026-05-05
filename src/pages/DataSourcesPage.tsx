import { Link } from 'react-router-dom';
import { Globe, Database, Download } from 'lucide-react';

export default function DataSourcesPage() {
  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <div className="hero-section" style={{ minHeight: '40vh', padding: '60px 20px', background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, var(--bg-dark) 70%)', justifyContent: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Data Sources</h1>
        <p className="hero-subtitle" style={{ marginBottom: '0' }}>
          Open, factual, and verified data powering the Canada Energy Atlas.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '-30px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10, width: '100%' }}>
        
        <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Database size={32} color="var(--accent-blue)" />
            <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-main)' }}>OpenStreetMap (OSM)</h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
            A significant portion of our infrastructure data, including high-voltage electrical grids, renewable energy generation sites (hydro, wind, solar), fossil fuel power plants, and active mining operations, is sourced from OpenStreetMap contributors worldwide. 
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} /> OSM License
            </a>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Database size={32} color="var(--accent-orange)" />
            <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-main)' }}>Canada Energy Regulator (CER)</h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
            Data regarding Canada's major pipeline infrastructure, export capacities, and facility locations (like refineries and major storage hubs) relies heavily on open data sets provided by the Canada Energy Regulator and provincial equivalents.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://open.canada.ca/" target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} /> Open Data Portal
            </a>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Database size={32} color="#14b8a6" />
            <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-main)' }}>U.S. Energy Information Administration (EIA)</h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
            North American cross-border integration, including major US trunk pipelines and petroleum infrastructure mapping, is informed by the EIA's authoritative shapefiles and geographic data sets.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://www.eia.gov/maps/layer_info-m.php" target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} /> EIA Mapping Data
            </a>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <Download size={32} color="#a855f7" />
            <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-main)' }}>Download Map Datasets</h2>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
            All map data rendered in the Canada Energy Atlas is compiled into standard GeoJSON format for the web. You can access the processed datasets used in this application directly from our repository.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a href="/pipelines.geojson" download className="tab-btn active" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
              <Download size={16} /> pipelines.geojson
            </a>
            <a href="/renewables.geojson" download className="tab-btn active" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
              <Download size={16} /> renewables.geojson
            </a>
            <a href="/facilities.geojson" download className="tab-btn active" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
              <Download size={16} /> facilities.geojson
            </a>
            <a href="/fossil_plants.geojson" download className="tab-btn active" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
              <Download size={16} /> fossil_plants.geojson
            </a>
            <a href="/minerals.geojson" download className="tab-btn active" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
              <Download size={16} /> minerals.geojson
            </a>
            <a href="/oil_gas_plays.geojson" download className="tab-btn active" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
              <Download size={16} /> oil_gas_plays.geojson
            </a>
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
