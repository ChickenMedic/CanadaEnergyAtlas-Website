import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Map as MapIcon, BarChart2 } from 'lucide-react';
import { deepDiveSections as sections } from './DeepDivesContent';

// A simple interactive placeholder for charts/maps requested by the user
const InteractiveVisualizer = ({ type }: { type: 'map' | 'chart' }) => (
  <div style={{ 
    margin: '24px 0', 
    padding: '40px 20px', 
    background: 'rgba(0,0,0,0.3)', 
    borderRadius: '12px', 
    border: '1px dashed var(--border-light)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    color: 'var(--text-muted)'
  }}>
    {type === 'map' ? <MapIcon size={48} color="var(--accent-blue)" /> : <BarChart2 size={48} color="var(--accent-green)" />}
    <h4 style={{ margin: 0, color: '#fff' }}>Interactive {type === 'map' ? 'Map Layer' : 'Data Visualization'}</h4>
    <p style={{ margin: 0, textAlign: 'center', maxWidth: '400px', fontSize: '0.9rem' }}>
      (Interactive component placeholder. In a full production build, live Mapbox/deck.gl layers or Recharts graphs would be mounted here based on the active dataset.)
    </p>
    <Link to="/map" className="secondary-btn" style={{ marginTop: '12px', fontSize: '0.85rem', padding: '6px 12px' }}>
      Open Full Map Dashboard
    </Link>
  </div>
);

const SubTabRenderer = ({ content }: { content: React.ReactNode }) => {
  const [activeSubTab, setActiveSubTab] = useState(0);
  
  if (!content || !React.isValidElement(content) || !(content as any).props.children) return <>{content}</>;
  
  const childrenArray = React.Children.toArray((content as any).props.children);
  const tabs: { title: string, items: any[] }[] = [];
  let currentTab = { title: "Overview", items: [] as any[] };
  
  childrenArray.forEach((child: any) => {
    let title = "";
    try {
      if (child.props && child.props.children) {
        const childrenList = React.Children.toArray(child.props.children);
        const h3 = childrenList.find((c: any) => c.type === 'h3');
        if (h3 && typeof (h3 as any).props.children === 'string') {
          title = (h3 as any).props.children;
        }
      }
    } catch(e) {}
    
    // Enhanced regex to match sections logically
    if (title.match(/^[1-9]\.|Part \d|Conclusion|The Future|Visual |📚 Sources|Strategic Implications|Emerging Demand|Future Horizons/i) || title.includes("Interactive")) {
      if (currentTab.items.length > 0) {
        tabs.push(currentTab);
      }
      // Clean up title for the tab button
      let cleanTitle = title.split(':')[0].replace(/📚\s*/, '').trim();
      if (cleanTitle.length > 25) cleanTitle = cleanTitle.substring(0, 25) + '...';
      currentTab = { title: cleanTitle, items: [child] };
    } else {
      currentTab.items.push(child);
    }
  });
  
  if (currentTab.items.length > 0) {
    tabs.push(currentTab);
  }
  
  if (tabs.length <= 1) return <>{content}</>;
  
  const hasVisual = tabs[activeSubTab].title.includes('Visual') || tabs[activeSubTab].title.includes('Interactive');
  
  return (
    <div className="subtabs-container" style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)', justifyContent: 'center' }}>
        {tabs.map((tab, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveSubTab(idx)}
            style={{
              padding: '8px 16px',
              background: activeSubTab === idx ? 'var(--accent-blue)' : 'rgba(255,255,255,0.03)',
              color: activeSubTab === idx ? '#fff' : 'var(--text-muted)',
              border: activeSubTab === idx ? '1px solid var(--accent-blue)' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontWeight: activeSubTab === idx ? 600 : 400,
              transition: 'all 0.2s',
              fontSize: '0.9rem'
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="subtab-content animation-fade-in" key={activeSubTab}>
        {tabs[activeSubTab].items}
        {hasVisual && <InteractiveVisualizer type={tabs[activeSubTab].title.includes('Interactive') ? 'map' : 'chart'} />}
      </div>
    </div>
  );
};

export default function DeepDivesPage() {
  const [activeTab, setActiveTab] = useState(sections[0].id);
  const activeSection = sections.find(s => s.id === activeTab);

  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <div className="hero-section" style={{ minHeight: '35vh', padding: '60px 20px', background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, var(--bg-dark) 70%)', justifyContent: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Deep Dives</h1>
        <p className="hero-subtitle" style={{ marginBottom: '0' }}>
          Comprehensive insights into energy history, critical infrastructure, and the economic drivers of North American energy.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '-30px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="tabs-container" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          {sections.map(section => (
            <button 
              key={section.id} 
              className={`tab-btn ${activeTab === section.id ? 'active' : ''}`}
              onClick={() => setActiveTab(section.id)}
              style={{ flex: '0 1 auto', minWidth: '150px', justifyContent: 'center' }}
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
            <div className="glass-panel" style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ color: activeSection.color, display: 'flex', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <div style={{ transform: 'scale(1.5)' }}>
                    {activeSection.icon}
                  </div>
                </div>
                <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-main)' }}>{activeSection.fullTitle}</h2>
              </div>
              
              <div style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                <SubTabRenderer content={activeSection.content} />
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
