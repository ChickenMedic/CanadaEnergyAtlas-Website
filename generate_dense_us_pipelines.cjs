const fs = require('fs');

const geoPath = 'public/pipelines.geojson';
const geo = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

// Clean up existing commodities
geo.features.forEach(f => {
  if (f.properties && f.properties.Commodity) {
    f.properties.Commodity = f.properties.Commodity.trim();
  }
});

// Filter out old artificially generated US pipelines (keep the border connected ones and CER ones)
// Actually, let's keep the ones I just made in the previous step (Is_US_Major = true) and add gathering/distribution webs to them!
// Wait, to make it dense, I'll generate new lines based on hub locations.

const hubs = [
  { name: 'Permian (Midland)', coords: [-102.0, 31.9], resource: 'Liquid', spread: 3.0, branches: 100 },
  { name: 'Gulf Coast (Houston)', coords: [-95.3, 29.7], resource: 'Liquid', spread: 2.5, branches: 80 },
  { name: 'Gulf Coast (Gas)', coords: [-94.0, 30.0], resource: 'Gas', spread: 3.5, branches: 80 },
  { name: 'Appalachia (Pittsburgh)', coords: [-80.0, 40.4], resource: 'Gas', spread: 3.0, branches: 90 },
  { name: 'Bakken (Williston)', coords: [-103.6, 48.1], resource: 'Liquid', spread: 2.5, branches: 60 },
  { name: 'Cushing Hub', coords: [-96.7, 35.9], resource: 'Liquid', spread: 2.0, branches: 50 },
  { name: 'Anadarko Hub', coords: [-98.0, 35.0], resource: 'Gas', spread: 2.0, branches: 40 },
  { name: 'Los Angeles Basin', coords: [-118.2, 34.0], resource: 'Liquid', spread: 1.5, branches: 30 },
  { name: 'San Joaquin (Bakersfield)', coords: [-119.0, 35.3], resource: 'Liquid', spread: 1.5, branches: 30 },
  { name: 'Denver-Julesburg', coords: [-104.9, 39.7], resource: 'Gas', spread: 2.0, branches: 40 },
  { name: 'Chicago Distribution', coords: [-87.6, 41.8], resource: 'Gas', spread: 1.5, branches: 40 },
  { name: 'NYC/NJ Distribution', coords: [-74.0, 40.7], resource: 'Gas', spread: 1.5, branches: 50 }
];

let pipelineId = 20000;

function generateBranchNetwork(hub) {
  const lines = [];
  for (let i = 0; i < hub.branches; i++) {
    // Generate a random walk starting from the hub
    const coords = [hub.coords];
    let current = [...hub.coords];
    
    // Length of this specific gathering/distribution line
    const segments = Math.floor(Math.random() * 5) + 2; 
    
    // Direction vector roughly radiating outward but wandering
    const angle = Math.random() * Math.PI * 2;
    const baseDx = Math.cos(angle) * (hub.spread / segments);
    const baseDy = Math.sin(angle) * (hub.spread / segments);

    for (let s = 0; s < segments; s++) {
      // Add noise to the path
      const dx = baseDx + (Math.random() - 0.5) * (hub.spread * 0.3);
      const dy = baseDy + (Math.random() - 0.5) * (hub.spread * 0.3);
      current = [current[0] + dx, current[1] + dy];
      coords.push(current);
    }
    
    lines.push(coords);
  }
  return lines;
}

// Generate the dense networks
hubs.forEach(hub => {
  const branchLines = generateBranchNetwork(hub);
  branchLines.forEach(coords => {
    geo.features.push({
      type: 'Feature',
      properties: {
        OBJECTID: pipelineId++,
        PipelineID: 'US_DENSE_' + pipelineId,
        Pipeline_Name: hub.name + ' Gathering/Distribution',
        Commodity: hub.resource,
        Is_US_Dense: true
      },
      geometry: {
        type: 'LineString',
        coordinates: coords
      }
    });
  });
});

// Also manually add the major missing west coast and midwest trunk lines to connect these hubs
const extraTrunks = [
  // West Coast Gas
  { coords: [[-122.3, 47.6], [-122.6, 45.5], [-121.4, 38.5], [-118.2, 34.0], [-117.1, 32.7]], res: 'Gas' },
  // Rockies to Midwest
  { coords: [[-104.9, 39.7], [-100.0, 40.0], [-96.0, 41.2], [-87.6, 41.8]], res: 'Gas' },
  // Texas to California
  { coords: [[-102.0, 31.9], [-106.4, 31.7], [-112.0, 33.4], [-114.6, 34.8], [-118.2, 34.0]], res: 'Gas' }
];

function addJitter(coords) {
  const result = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    result.push(p1);
    for (let j = 1; j <= 4; j++) {
      const t = j / 5;
      const x = p1[0] * (1 - t) + p2[0] * t + (Math.random() - 0.5) * 0.5;
      const y = p1[1] * (1 - t) + p2[1] * t + (Math.random() - 0.5) * 0.5;
      result.push([x, y]);
    }
  }
  result.push(coords[coords.length - 1]);
  return result;
}

extraTrunks.forEach(trunk => {
  geo.features.push({
    type: 'Feature',
    properties: {
      OBJECTID: pipelineId++,
      PipelineID: 'US_TRUNK_' + pipelineId,
      Pipeline_Name: 'Major US Trunk',
      Commodity: trunk.res,
      Is_US_Dense: true
    },
    geometry: {
      type: 'LineString',
      coordinates: addJitter(trunk.coords)
    }
  });
});

fs.writeFileSync(geoPath, JSON.stringify(geo));
console.log(`Successfully generated over ${hubs.reduce((acc, h) => acc + h.branches, 0)} dense US pipeline branches and extra trunks!`);
