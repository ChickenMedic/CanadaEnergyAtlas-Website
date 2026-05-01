import { useState } from 'react';
import { Database, Route, Factory, Box, Zap, Leaf, ChevronDown, ChevronUp } from 'lucide-react';

export default function DeepDivesPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    if (openSection === id) {
      setOpenSection(null);
    } else {
      setOpenSection(id);
    }
  };

  const sections = [
    {
      id: 'geology',
      icon: <Database color="var(--accent-orange)" size={32} />,
      title: "Geological Foundations",
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
      icon: <Route color="var(--accent-blue)" size={32} />,
      title: "The Transcontinental Pipeline Network",
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
      icon: <Factory color="#a855f7" size={32} />,
      title: "Refining and Processing",
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
      icon: <Box color="#eab308" size={32} />,
      title: "Storage Hubs",
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
      icon: <Zap color="#38bdf8" size={32} />,
      title: "The Electrical Grid",
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
      icon: <Leaf color="var(--accent-green)" size={32} />,
      title: "Green Energy Initiatives",
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

  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      <div className="content-header">
        <h1>Deep Dives</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Understanding Canada's energy history, infrastructure, and our transition to renewables.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        {sections.map(section => (
          <div 
            key={section.id} 
            style={{ 
              marginBottom: '16px', 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid var(--border-light)', 
              borderRadius: '16px', 
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            <div 
              style={{ 
                padding: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                cursor: 'pointer', 
                background: openSection === section.id ? 'rgba(255,255,255,0.05)' : 'transparent' 
              }}
              onClick={() => toggleSection(section.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {section.icon}
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)' }}>{section.title}</h2>
              </div>
              {openSection === section.id ? <ChevronUp size={24} color="var(--text-muted)" /> : <ChevronDown size={24} color="var(--text-muted)" />}
            </div>
            
            {openSection === section.id && (
              <div style={{ padding: '24px', borderTop: '1px solid var(--border-light)' }}>
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
