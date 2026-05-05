const fs = require('fs');

const geoPath = 'public/pipelines.geojson';
const geo = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

// Filter out old US pipelines
geo.features = geo.features.filter(f => !f.properties.Is_US_Major);

// Extract the exact Canadian border termination points from the CER data
let keystoneStart = [-97.959, 49.0];
let enbridgeStart = [-97.532, 49.0];
let allianceStart = [-101.588, 49.0];
let expressStart = [-110.247, 49.0];
let vectorStart = [-82.227, 42.719];

geo.features.forEach(f => {
  if (f.properties.Pipeline_Name === 'Keystone Pipeline') {
    let coords = f.geometry.type === 'LineString' ? f.geometry.coordinates : f.geometry.coordinates.flat();
    keystoneStart = coords.reduce((min, p) => p[1] < min[1] ? p : min, [0, 90]);
  }
  if (f.properties.Pipeline_Name === 'Enbridge Canadian Mainline') {
    let coords = f.geometry.type === 'LineString' ? f.geometry.coordinates : f.geometry.coordinates.flat();
    enbridgeStart = coords.reduce((min, p) => p[1] < min[1] ? p : min, [0, 90]);
  }
  if (f.properties.Pipeline_Name === 'Alliance Pipeline') {
    let coords = f.geometry.type === 'LineString' ? f.geometry.coordinates : f.geometry.coordinates.flat();
    allianceStart = coords.reduce((min, p) => p[1] < min[1] ? p : min, [0, 90]);
  }
  if (f.properties.Pipeline_Name === 'Express Pipeline') {
    let coords = f.geometry.type === 'LineString' ? f.geometry.coordinates : f.geometry.coordinates.flat();
    expressStart = coords.reduce((min, p) => p[1] < min[1] ? p : min, [0, 90]);
  }
  if (f.properties.Pipeline_Name === 'Vector Pipeline') {
    let coords = f.geometry.type === 'LineString' ? f.geometry.coordinates : f.geometry.coordinates.flat();
    vectorStart = coords.reduce((min, p) => p[1] < min[1] ? p : min, [0, 90]);
  }
});

const usPipelines = [
  // SEAMLESS BORDER CONNECTIONS
  {
    name: 'Keystone Pipeline System (US Section)', commodity: 'Liquid',
    coords: [keystoneStart, [-97.0, 40.0], [-96.7, 35.9], [-93.9, 29.8]]
  },
  {
    name: 'Enbridge Mainline (US Section)', commodity: 'Liquid',
    coords: [enbridgeStart, [-95.4, 47.7], [-92.0, 46.7], [-84.7, 45.8], vectorStart]
  },
  {
    name: 'Alliance Pipeline (US Section)', commodity: 'Gas',
    coords: [allianceStart, [-97.0, 46.0], [-93.0, 43.0], [-88.1, 41.5]]
  },
  {
    name: 'Express Pipeline (US Section)', commodity: 'Liquid',
    coords: [expressStart, [-108.5, 46.0], [-106.3, 42.8]]
  },
  {
    name: 'Vector Pipeline (US Section)', commodity: 'Gas',
    coords: [vectorStart, [-84.5, 42.0], [-88.1, 41.5]]
  },
  
  // MAJOR INTERNAL US TRUNK LINES
  {
    name: 'Colonial Pipeline', commodity: 'Liquid',
    coords: [[-95.3, 29.7], [-91.1, 30.4], [-84.3, 33.7], [-80.8, 35.2], [-77.4, 37.5], [-74.2, 40.6]]
  },
  {
    name: 'Transcontinental Gas Pipe Line (Transco)', commodity: 'Gas',
    coords: [[-97.3, 27.8], [-95.3, 29.7], [-88.0, 30.6], [-84.3, 33.7], [-77.0, 38.9], [-74.0, 40.7]]
  },
  {
    name: 'Dakota Access Pipeline (DAPL)', commodity: 'Liquid',
    coords: [[-102.3, 48.3], [-98.5, 44.8], [-89.0, 38.7]]
  },
  {
    name: 'Texas Eastern Transmission (TETCO)', commodity: 'Gas',
    coords: [[-94.1, 30.0], [-92.2, 34.7], [-82.9, 39.9], [-77.0, 41.0], [-74.0, 40.7]]
  },
  {
    name: 'Trans-Alaska Pipeline System (TAPS)', commodity: 'Liquid',
    coords: [[-148.3, 70.2], [-147.7, 64.8], [-146.3, 61.1]]
  }
];

function addPipelineJitter(coords) {
  const result = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    result.push(p1);
    for (let j = 1; j <= 3; j++) {
      const t = j / 4;
      const x = p1[0] * (1 - t) + p2[0] * t + (Math.random() - 0.5) * 0.4;
      const y = p1[1] * (1 - t) + p2[1] * t + (Math.random() - 0.5) * 0.4;
      result.push([x, y]);
    }
  }
  result.push(coords[coords.length - 1]);
  return result;
}

usPipelines.forEach((pipe, i) => {
  geo.features.push({
    type: 'Feature',
    properties: {
      OBJECTID: 9000 + i,
      PipelineID: 'US_' + i,
      Pipeline_Name: pipe.name,
      Commodity: pipe.commodity,
      Is_US_Major: true
    },
    geometry: {
      type: 'LineString',
      coordinates: addPipelineJitter(pipe.coords)
    }
  });
});

fs.writeFileSync(geoPath, JSON.stringify(geo));
console.log('Successfully welded US pipelines perfectly to the Canadian borders!');
