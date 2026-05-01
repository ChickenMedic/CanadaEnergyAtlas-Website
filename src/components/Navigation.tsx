import { Link, useLocation } from 'react-router-dom';


export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="navbar glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg viewBox="0 0 512 512" width={28} height={28} xmlns="http://www.w3.org/2000/svg">
          <path d="M497.5,213.9l-25.2-9.6c-2.9-1.3-47.4-21.5-47.4-88.7l-0.01-34.9l-28,20.9c-10.3,7.7-38.9,26.1-61.8,30.5L255.9,0L176.6,132.1c-22.9-4.4-51.5-22.8-61.8-30.5L86.8,80.6v35c0,67.2-44.5,87.5-47.4,88.7l-25.2,9.6l23.5,14.6c6.1,3.8,20.3,12.7,31.7,35.4l10.9,21.5l-20.9,15.6c-18.4,13.7-44.2,33-44.2,74.5v34.9l27.9-20.9c10.3-7.7,38.9-26.1,61.8-30.5L255.9,512l79.3-132.1c22.9,4.4,51.5,22.8,61.8,30.5l27.9,20.9v-34.9c0-41.6-25.8-60.8-44.2-74.5l-20.9-15.6l10.9-21.5c11.4-22.7,25.6-31.6,31.7-35.4L497.5,213.9z" fill="#ef4444"/>
        </svg>
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
