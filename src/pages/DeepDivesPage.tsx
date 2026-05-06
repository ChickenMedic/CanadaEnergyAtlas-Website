import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { deepDiveSections as sections } from './DeepDivesContent';

export default function DeepDivesPage() {
  const [activeTab, setActiveTab] = useState(sections[0].id);
  const activeSection = sections.find(s => s.id === activeTab);

  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <div className="hero-section" style={{ minHeight: '40vh', padding: '60px 20px', background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, var(--bg-dark) 70%)', justifyContent: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Deep Dives</h1>
        <p className="hero-subtitle" style={{ marginBottom: '0' }}>
          Comprehensive insights into energy history, critical infrastructure, and the economic drivers of North American energy.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '-30px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="tabs-container">
          {sections.map(section => (
            <button 
              key={section.id} 
              className={`tab-btn ${activeTab === section.id ? 'active' : ''}`}
              onClick={() => setActiveTab(section.id)}
            >
              <div style={{ color: activeTab === section.id ? section.color : 'inherit', display: 'flex', alignItems: 'center' }}>
                {section.icon}
              </div>
              {section.title}
            </button>
          ))}
        </div>

        <div className="tab-content" key={activeTab}>
          {activeSection && (
            <div className="glass-panel" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ color: activeSection.color, display: 'flex', alignItems: 'center' }}>
                  <div style={{ transform: 'scale(1.5)' }}>
                    {activeSection.icon}
                  </div>
                </div>
                <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-main)' }}>{activeSection.fullTitle}</h2>
              </div>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {activeSection.content}
              </div>
            </div>
          )}
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
