const fs = require('fs');
let content = fs.readFileSync('src/pages/DeepDivesContent.tsx', 'utf8');

const newSections = `  },
  {
    id: 'non-renewable',
    icon: <Flame size={20} />,
    title: "Non-Renewables",
    fullTitle: "Non-Renewable Energy & Nuclear",
    color: "#57534e",
    content: (
      <>
        <div className="timeline-card">
          <h3>Fossil Fuels Overview</h3>
          <p>This section covers traditional fossil fuels like coal, oil, and natural gas, as well as nuclear energy, which form the historical base of North American power generation.</p>
        </div>
        <div className="timeline-card">
          <h3>Interactive Map Layers</h3>
          <p>Toggle the Non-Renewable map layers to explore where coal, gas, oil, and nuclear plants are distributed across the continent.</p>
        </div>
      </>
    )
  },
  {
    id: 'minerals',
    icon: <Diamond size={20} />,
    title: "Critical Minerals",
    fullTitle: "Critical Minerals & Supply Chains",
    color: "#ec4899",
    content: (
      <>
        <div className="timeline-card">
          <h3>The New Resource Rush</h3>
          <p>Critical minerals like lithium, copper, nickel, and rare earths are essential for the energy transition. North America has massive reserves that are being unlocked for EV batteries and renewable infrastructure.</p>
        </div>
        <div className="timeline-card">
          <h3>Interactive Mineral Mapping</h3>
          <p>Explore the Critical Minerals layer on the map to see the locations of major extraction and processing facilities across the continent.</p>
        </div>
      </>
    )
  }
];
`;

if (!content.includes("id: 'non-renewable'")) {
  content = content.replace(/\}\s*\];\s*$/, newSections);
  fs.writeFileSync('src/pages/DeepDivesContent.tsx', content);
  console.log('Appended successfully.');
} else {
  console.log('Already appended.');
}
