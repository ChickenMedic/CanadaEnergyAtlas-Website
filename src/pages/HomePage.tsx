import { Link } from 'react-router-dom';
import { Globe, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title">Visualizing the Future of Canadian Energy</h1>
        <p className="hero-subtitle">
          Explore our nation's expansive energy infrastructure through stunning interactive 3D maps, historical deep dives, and augmented reality experiences.
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
  );
}
