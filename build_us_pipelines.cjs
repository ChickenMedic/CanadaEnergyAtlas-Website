const fs = require('fs');

const geoPath = 'public/pipelines.geojson';
const geo = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

// Filter out any previously added US pipelines just in case
geo.features = geo.features.filter(f => !f.properties.Is_US_Major);

const usPipelines = [
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
    name: 'Keystone Pipeline System', commodity: 'Liquid',
    coords: [[-111.3, 52.6], [-97.0, 40.0], [-96.7, 35.9], [-93.9, 29.8]]
  },
  {
    name: 'Texas Eastern Transmission (TETCO)', commodity: 'Gas',
    coords: [[-94.1, 30.0], [-92.2, 34.7], [-82.9, 39.9], [-77.0, 41.0], [-74.0, 40.7]]
  },
  {
    name: 'Enbridge Mainline (US Section)', commodity: 'Liquid',
    coords: [[-97.5, 49.0], [-95.4, 47.7], [-92.0, 46.7], [-82.4, 42.9]]
  },
  {
    name: 'Trans-Alaska Pipeline System (TAPS)', commodity: 'Liquid',
    coords: [[-148.3, 70.2], [-147.7, 64.8], [-146.3, 61.1]]
  },
  {
    name: 'El Paso Natural Gas Pipeline', commodity: 'Gas',
    coords: [[-103.1, 31.7], [-106.4, 31.7], [-111.9, 33.4], [-114.6, 34.8], [-118.2, 34.0]]
  },
  {
    name: 'Pacific Gas and Electric (PG&E)', commodity: 'Gas',
    coords: [[-114.6, 34.8], [-118.9, 35.3], [-121.4, 38.5], [-122.4, 37.7]]
  },
  {
    name: 'Northern Natural Gas', commodity: 'Gas',
    coords: [[-103.0, 31.5], [-100.8, 37.7], [-95.9, 41.2], [-93.2, 44.8], [-92.0, 46.7]]
  }
];

// Add noise to make the lines look like real pipeline paths instead of perfectly straight segments
function addPipelineJitter(coords) {
  return coords;
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
console.log('Successfully added major US pipelines to pipelines.geojson');
