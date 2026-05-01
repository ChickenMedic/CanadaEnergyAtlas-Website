import { Link, useLocation } from 'react-router-dom';
import { Layers } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="navbar glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Layers color="var(--accent-blue)" size={28} />
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>
          Canada Energy Atlas
        </Link>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link to="/map" className={`nav-link ${location.pathname === '/map' ? 'active' : ''}`}>
          Interactive Map
        </Link>
        <Link to="/deep-dives" className={`nav-link ${location.pathname === '/deep-dives' ? 'active' : ''}`}>
          Deep Dives
        </Link>
        
        {/* Button linking out to the AR project */}
        <a 
          href="https://ar.canadaenergyatlas.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="ar-btn"
        >
          Launch AR Experience
        </a>
      </div>
    </nav>
  );
}
