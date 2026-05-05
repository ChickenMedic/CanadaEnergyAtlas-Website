const fs = require('fs');

const data = JSON.parse(fs.readFileSync('extracted_jsx.json', 'utf8'));

const fileContent = `import { Database, Route, Factory, Box, Zap, Leaf } from 'lucide-react';

export const deepDiveSections = [
  {
    id: 'geology',
    icon: <Database size={20} />,
    title: "Geology",
    fullTitle: "Geological Foundations",
    color: "var(--accent-orange)",
    content: (
${data['geology']}
    )
  },
  {
    id: 'pipelines',
    icon: <Route size={20} />,
    title: "Pipelines",
    fullTitle: "The Transcontinental Pipeline Network",
    color: "var(--accent-blue)",
    content: (
${data['pipelines']}
    )
  },
  {
    id: 'refining',
    icon: <Factory size={20} />,
    title: "Refining",
    fullTitle: "Refining and Processing",
    color: "#a855f7",
    content: (
${data['refining']}
    )
  },
  {
    id: 'storage',
    icon: <Box size={20} />,
    title: "Storage",
    fullTitle: "Storage Hubs",
    color: "#eab308",
    content: (
${data['storage']}
    )
  },
  {
    id: 'grid',
    icon: <Zap size={20} />,
    title: "The Grid",
    fullTitle: "The Electrical Grid",
    color: "#38bdf8",
    content: (
${data['electrical grid']}
    )
  },
  {
    id: 'green',
    icon: <Leaf size={20} />,
    title: "Green Energy",
    fullTitle: "Green Energy Initiatives",
    color: "var(--accent-green)",
    content: (
${data['green energy']}
    )
  }
];
`;

fs.writeFileSync('src/pages/DeepDivesContent.tsx', fileContent);
console.log('Successfully built DeepDivesContent.tsx');
