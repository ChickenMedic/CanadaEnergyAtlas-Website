import { History, Leaf } from 'lucide-react';

export default function DeepDivesPage() {
  return (
    <div className="page-container" style={{ overflowY: 'auto' }}>
      
      <div className="content-header">
        <h1>Deep Dives</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Understanding Canada's energy history and our transition to renewables.
        </p>
      </div>

      <div className="content-section">
        <h2><History color="var(--accent-orange)" size={32} /> A History of Oil & Gas</h2>
        <p>
          Canada has a rich history in the oil and gas sector, serving as a foundational pillar of our economy for over a century. From the early discoveries in Turner Valley to the massive infrastructure of the modern oil sands, the development of pipelines has been critical to distributing these resources.
        </p>
        
        <div className="timeline-card">
          <h3>The Pipeline Network</h3>
          <p>
            With over 840,000 kilometers of transmission, gathering, and distribution pipelines, Canada possesses one of the most extensive energy transportation networks in the world. This infrastructure safely moves millions of barrels of crude oil and billions of cubic feet of natural gas every day.
          </p>
        </div>
        
        <div className="timeline-card">
          <h3>Economic Impact</h3>
          <p>
            The conventional energy sector has historically driven significant job creation, technological innovation, and provincial revenues, particularly in Alberta, Saskatchewan, and Newfoundland and Labrador.
          </p>
        </div>
      </div>

      <div className="content-section">
        <h2><Leaf color="var(--accent-green)" size={32} /> The Green Transition</h2>
        <p>
          As the global energy landscape evolves, Canada is making significant strides in renewable energy development. The integration of wind, solar, and advanced hydroelectric technologies is rapidly transforming how we power our nation.
        </p>
        
        <div className="timeline-card">
          <h3>Wind & Solar Expansion</h3>
          <p>
            Recent years have seen exponential growth in renewable capacities. Wind power has become a major contributor in provinces like Alberta and Ontario, while massive solar farms are coming online to provide clean, sustainable grid power.
          </p>
        </div>
      </div>

    </div>
  );
}
