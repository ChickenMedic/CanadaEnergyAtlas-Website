const fs = require('fs');

let content = fs.readFileSync('src/pages/DeepDivesContent.tsx', 'utf8');

// First replace the lucide-react import
content = content.replace(
  /import \{ Database, Route, Factory, Box, Zap, Leaf \} from 'lucide-react';/,
  "import { Database, Route, Factory, Box, Zap, Leaf, Flame, Diamond } from 'lucide-react';"
);

// We'll leave the original content alone and just use a trick in DeepDivesPage.tsx
// to split it into tabs dynamically based on headers!
// Let's just append the new sections to the end of the array.

const newSections = `  },
  {
    id: 'non-renewable',
    icon: <Flame size={20} />,
    title: "Non-Renewable",
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

if (!content.includes('id: \'non-renewable\'')) {
  content = content.replace(/  \}\n\];\n?$/, newSections);
  fs.writeFileSync('src/pages/DeepDivesContent.tsx', content);
  console.log('Appended new sections successfully.');
} else {
  console.log('Sections already appended.');
}
