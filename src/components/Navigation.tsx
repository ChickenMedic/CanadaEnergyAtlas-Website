import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/maple-leaf.svg" alt="Canada Energy Atlas" width={28} height={28} style={{ display: 'block' }} />
          <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem', fontWeight: 600 }}>
            Canada Energy Atlas
          </Link>
        </div>
        <button className="mobile-menu-btn" onClick={toggleMenu} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/map" className={`nav-link ${location.pathname === '/map' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
          Interactive Map
        </Link>
        <Link to="/deep-dives" className={`nav-link ${location.pathname === '/deep-dives' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
          Deep Dives
        </Link>
        
        {/* Button linking out to the AR project */}
        <a 
          href="https://ar.canadaenergyatlas.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="ar-btn"
          onClick={() => setIsOpen(false)}
        >
          Launch AR Map
        </a>
      </div>
    </nav>
  );
}
