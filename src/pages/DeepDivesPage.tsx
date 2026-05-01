import { useState } from 'react';
import { Database, Route, Factory, Box, Zap, Leaf } from 'lucide-react';

export default function DeepDivesPage() {
  const sections = [
    {
      id: 'geology',
      icon: <Database size={20} />,
      title: "Geology",
      fullTitle: "Geological Foundations",
      color: "var(--accent-orange)",
      content: (
        <>
          <p>
            The energy trajectory of North America is fundamentally dictated by its subterranean geology, specifically the vast sedimentary basins that host the continent's hydrocarbon and mineral wealth. The Western Canada Sedimentary Basin (WCSB) serves as the primary engine for the Canadian energy sector, covering approximately 1.4 million square kilometers.
          </p>
          <div className="timeline-card">
            <h3>The WCSB Architecture</h3>
            <p>Characterized by a massive wedge of sedimentary rocks that thickens from a zero-edge at the Canadian Shield to over 6,000 meters in the Rocky Mountains. It contains vast resources ranging from shallow natural gas to deep, liquids-rich formations like the Montney and Duvernay.</p>
          </div>
        </>
      )
    },
    {
      id: 'pipelines',
      icon: <Route size={20} />,
      title: "Pipelines",
      fullTitle: "The Transcontinental Pipeline Network",
      color: "var(--accent-blue)",
      content: (
        <>
          <p>
            Canadian liquids pipeline systems are dominated by a few massive networks that serve as the primary conduits for export. Because the WCSB produces more oil than domestic refineries can process, export capacity is critical.
          </p>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pipeline System</th>
                  <th>Capacity (bpd)</th>
                  <th>Product Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Enbridge Mainline</td><td>~3,100,000</td><td>Heavy/Light Crude, NGLs</td></tr>
                <tr><td>Trans Mountain (TMX)</td><td>890,000</td><td>Crude Oil</td></tr>
                <tr><td>Keystone Pipeline</td><td>590,000</td><td>Crude Oil</td></tr>
              </tbody>
            </table>
          </div>
          
          <div className="timeline-card">
            <h3>Natural Gas Flows</h3>
            <p>The NGTL System is the most significant gathering network, with a capacity of 11.2 Bcf/d. The recent Coastal GasLink pipeline supplies the LNG Canada facility, representing Canada's entry into the global LNG export market.</p>
          </div>
        </>
      )
    },
    {
      id: 'refining',
      icon: <Factory size={20} />,
      title: "Refining",
      fullTitle: "Refining and Processing",
      color: "#a855f7",
      content: (
        <>
          <p>
            Canada’s refining industry is the 11th largest in the world by capacity, with 16 operating refineries. These facilities are clustered in Western Canada, Ontario, and Quebec/Atlantic Canada.
          </p>
          <div className="timeline-card">
            <h3>Major Refineries</h3>
            <p>The Saint John Refinery is the largest at 320,000 bpd. In the West, the Strathcona refinery processes up to 191,000 bpd. Currently, there is a major trend of transitioning existing infrastructure to renewable fuels.</p>
          </div>
        </>
      )
    },
    {
      id: 'storage',
      icon: <Box size={20} />,
      title: "Storage",
      fullTitle: "Storage Hubs",
      color: "#eab308",
      content: (
        <>
          <p>
            Storage facilities act as critical buffers for the energy system. Hardisty, Alberta is the central collection and distribution point for WCSB crude oil, housing over 20 million barrels of capacity.
          </p>
          <p>
            For natural gas, Canada has 949 billion cubic feet of underground storage. The Dawn Hub in Ontario (267 Bcf) is one of the most significant hubs in North America, vital for winter heating reliability in the East.
          </p>
        </>
      )
    },
    {
      id: 'grid',
      icon: <Zap size={20} />,
      title: "The Grid",
      fullTitle: "The Electrical Grid",
      color: "#38bdf8",
      content: (
        <>
          <p>
            Canada's grid extends over 160,000 kilometers of transmission lines. While provinces manage internal grids, there are 86 international power lines connecting to the US, allowing Canada to export ~36 million MWh of electricity (largely hydro and nuclear).
          </p>
          <div className="timeline-card">
            <h3>Inter-Provincial Challenges</h3>
            <p>East-West transfer capability sits at only 17 GW, making it a significant bottleneck. Expanding this capacity is a primary focus for the net-zero transition to move renewable energy between provinces.</p>
          </div>
        </>
      )
    },
    {
      id: 'green',
      icon: <Leaf size={20} />,
      title: "Green Energy",
      fullTitle: "Green Energy Initiatives",
      color: "var(--accent-green)",
      content: (
        <>
          <p>
            One-sixth of Canada's end-use demand now comes from renewable energy. Wind capacity has reached 19 GW, and Solar has expanded to 5 GW. 
          </p>
          <div className="timeline-card">
            <h3>Carbon Capture & Indigenous Ownership</h3>
            <p>Projects like the Quest CCS and Polaris are capturing millions of tonnes of CO2. Furthermore, 118 Indigenous-owned green energy projects are currently in operation, reflecting a shift toward inclusive transition infrastructure.</p>
          </div>
        </>
      )
    }
  ];

  const [activeTab, setActiveTab] = useState(sections[0].id);
  const activeSection = sections.find(s => s.id === activeTab);

  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <div className="hero-section" style={{ minHeight: '40vh', padding: '60px 20px', background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, var(--bg-dark) 70%)', justifyContent: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Deep Dives</h1>
        <p className="hero-subtitle" style={{ marginBottom: '0' }}>
          Comprehensive insights into energy history, critical infrastructure, and the transition to a net-zero future.
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
    </div>
  );
}
