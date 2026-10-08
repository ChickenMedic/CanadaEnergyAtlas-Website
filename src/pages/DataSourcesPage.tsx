import { Globe, Database, Download } from 'lucide-react';
import PageHero from '../components/PageHero';
import SiteFooter from '../components/SiteFooter';

const SOURCES = [
  {
    id: 'osm',
    title: 'OpenStreetMap (OSM)',
    color: 'var(--accent-blue)',
    description:
      'A significant portion of our infrastructure data, including high-voltage electrical grids, renewable energy generation sites (hydro, wind, solar), fossil fuel power plants, and active mining operations, is sourced from OpenStreetMap contributors worldwide.',
    linkLabel: 'OSM License',
    href: 'https://www.openstreetmap.org/copyright',
  },
  {
    id: 'cer',
    title: 'Canada Energy Regulator (CER)',
    color: 'var(--accent-orange)',
    description:
      "Data regarding Canada's major pipeline infrastructure, export capacities, and facility locations (like refineries and major storage hubs) relies heavily on open data sets provided by the Canada Energy Regulator and provincial equivalents.",
    linkLabel: 'Open Data Portal',
    href: 'https://open.canada.ca/',
  },
  {
    id: 'eia',
    title: 'U.S. Energy Information Administration (EIA)',
    color: '#14b8a6',
    description:
      "North American cross-border integration, including major US trunk pipelines and petroleum infrastructure mapping, is informed by the EIA's authoritative shapefiles and geographic data sets.",
    linkLabel: 'EIA Mapping Data',
    href: 'https://www.eia.gov/maps/layer_info-m.php',
  },
];

// Full-fidelity originals in public/ (the map itself loads slimmed *.display copies).
const DOWNLOADS = [
  'pipelines.geojson',
  'renewables.geojson',
  'facilities.geojson',
  'non_renewable.geojson',
  'minerals.geojson',
  'oil_gas_plays.geojson',
];

export default function DataSourcesPage() {
  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <PageHero title="Data Sources" subtitle="Open, factual, and verified data powering the Canada Energy Atlas." />

      <div style={{ maxWidth: '1000px', margin: '-30px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10, width: '100%' }}>
        {SOURCES.map((source) => (
          <section key={source.id} className="glass-panel source-card">
            <div className="source-card-header">
              <Database size={32} color={source.color} />
              <h2>{source.title}</h2>
            </div>
            <p>{source.description}</p>
            <a href={source.href} target="_blank" rel="noopener noreferrer" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} /> {source.linkLabel}
            </a>
          </section>
        ))}

        <section className="glass-panel source-card" style={{ marginBottom: 0 }}>
          <div className="source-card-header">
            <Download size={32} color="#a855f7" />
            <h2>Download Map Datasets</h2>
          </div>
          <p>
            All map data rendered in the Canada Energy Atlas is compiled into standard GeoJSON format for the web. You can access the processed datasets used in this application directly from our repository.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {DOWNLOADS.map((file) => (
              <a key={file} href={`/${file}`} download className="tab-btn active" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
                <Download size={16} /> {file}
              </a>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
