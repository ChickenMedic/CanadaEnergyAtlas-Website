const fs = require('fs');

const usgsRaw = JSON.parse(fs.readFileSync('public/usgs_basins.geojson', 'utf8'));

// Chaikin's Corner Cutting Algorithm to generate smooth, organic geological shapes
// This guarantees NO self-intersections, unlike splines, and creates beautiful smooth blobs.
function chaikinSmooth(points, iterations) {
  let currentPoints = [...points];
  // Ensure polygon is closed for smoothing
  if (currentPoints[0][0] !== currentPoints[currentPoints.length-1][0] || 
      currentPoints[0][1] !== currentPoints[currentPoints.length-1][1]) {
    currentPoints.push([...currentPoints[0]]);
  }

  for (let iter = 0; iter < iterations; iter++) {
    const newPoints = [];
    for (let i = 0; i < currentPoints.length - 1; i++) {
      const p0 = currentPoints[i];
      const p1 = currentPoints[i + 1];
      
      const q = [0.75 * p0[0] + 0.25 * p1[0], 0.75 * p0[1] + 0.25 * p1[1]];
      const r = [0.25 * p0[0] + 0.75 * p1[0], 0.25 * p0[1] + 0.75 * p1[1]];
      
      newPoints.push(q, r);
    }
    // Close it
    newPoints.push([...newPoints[0]]);
    currentPoints = newPoints;
  }
  return currentPoints;
}

const targetUsBasins = {
  'Permian Basin': { name: 'Permian Basin [Tight Oil]', color: '#6d28d9', resource: 'Tight Oil' },
  'Appalachian Basin': { name: 'Appalachian Basin [Tight Gas]', color: '#4c1d95', resource: 'Tight Gas' },
  'Williston Basin': { name: 'Williston Basin [Tight Oil]', color: '#a78bfa', resource: 'Tight Oil' },
  'Anadarko Basin': { name: 'Anadarko Basin [Tight Oil]', color: '#8b5cf6', resource: 'Tight Oil' },
  'Gulf of Mexico Basin': { name: 'Gulf Coast Basin [Traditional Oil]', color: '#5b21b6', resource: 'Traditional Oil' },
  'Denver Basin': { name: 'Denver Basin [Tight Oil]', color: '#7c3aed', resource: 'Tight Oil' },
  'Cook Inlet Basin': { name: 'Cook Inlet Basin [Traditional Oil]', color: '#0ea5e9', resource: 'Traditional Oil' },
  'Colville Basin and Foldbelt': { name: 'North Slope / Colville [Traditional Oil]', color: '#38bdf8', resource: 'Traditional Oil' },
  'Michigan Basin': { name: 'Michigan Basin [Traditional Oil]', color: '#10b981', resource: 'Traditional Oil' },
  'Powder River Basin': { name: 'Powder River Basin [Tight Oil]', color: '#f43f5e', resource: 'Tight Oil' },
  'Forest City Basin': { name: 'Forest City Basin [Traditional Oil]', color: '#f59e0b', resource: 'Traditional Oil' },
  'San Joaquin Basin': { name: 'San Joaquin Basin [Tight Oil]', color: '#fbbf24', resource: 'Tight Oil' }
};

const features = usgsRaw.features.filter(f => targetUsBasins[f.properties.Name]).map(f => {
  const conf = targetUsBasins[f.properties.Name];
  return {
    type: 'Feature',
    properties: {
      name: conf.name,
      type: 'basin',
      color: conf.color,
      resource_type: conf.resource
    },
    geometry: f.geometry
  };
});

const manualBasins = [
  {
    name: 'Western Canada Sedimentary Basin [Traditional Oil/Gas]', color: '#6ee7b7', resource: 'Traditional Oil/Gas',
    coords: [
      [-123.5, 59.5], [-120.0, 58.5], [-116.0, 54.0], [-114.5, 49.2], 
      [-109.0, 49.2], [-103.0, 49.5], [-98.0, 50.0], [-100.0, 53.0], 
      [-105.0, 56.0], [-110.0, 58.0], [-115.0, 60.0], [-120.0, 60.5]
    ]
  },
  {
    name: 'Athabasca Oil Sands [Oil Sands]', color: '#fcd34d', resource: 'Oil Sands',
    coords: [
      [-114.0, 57.0], [-112.0, 58.0], [-110.5, 57.5], [-110.0, 56.0], 
      [-111.0, 55.0], [-112.5, 55.0], [-113.5, 56.0]
    ]
  },
  {
    name: 'Montney Play [Tight Gas/Oil]', color: '#c084fc', resource: 'Tight Gas/Oil',
    coords: [
      [-123.0, 58.0], [-120.0, 56.5], [-118.0, 55.0], [-116.5, 54.5], 
      [-119.0, 55.5], [-121.5, 57.0]
    ]
  },
  {
    name: 'Duvernay Play [Tight Oil]', color: '#c4b5fd', resource: 'Tight Oil',
    coords: [
      [-118.0, 55.0], [-116.0, 54.5], [-114.0, 52.5], [-112.5, 51.5], 
      [-115.0, 52.0], [-117.0, 54.0]
    ]
  },
  {
    name: 'Haynesville Shale [Tight Gas]', color: '#f472b6', resource: 'Tight Gas',
    coords: [
      [-94.5, 33.0], [-93.5, 32.5], [-93.2, 31.8], [-94.0, 31.5], [-94.8, 32.2]
    ]
  },
  {
    name: 'Eagle Ford Play [Tight Oil]', color: '#f97316', resource: 'Tight Oil',
    coords: [
      [-100.0, 29.5], [-99.0, 28.5], [-97.5, 28.5], [-96.0, 29.5], [-97.5, 29.5], [-99.0, 29.5]
    ]
  },
  {
    name: 'Williston Basin Extension (Canada) [Tight Oil]', color: '#a78bfa', resource: 'Tight Oil',
    coords: [
      [-105.0, 49.0], [-101.0, 49.0], [-100.0, 50.0], [-102.0, 51.5], 
      [-104.5, 51.0], [-105.5, 50.0], [-105.0, 49.0]
    ]
  },
  {
    name: "Jeanne d'Arc Basin [Offshore]", color: '#38bdf8', resource: 'Offshore',
    coords: [
      [-49.0, 47.0], [-47.5, 47.5], [-46.5, 46.5], [-47.5, 45.8], [-48.5, 46.5]
    ]
  },
  {
    name: 'Beaufort-Mackenzie Basin [Arctic Offshore]', color: '#2dd4bf', resource: 'Arctic Offshore',
    coords: [
      [-138.0, 70.0], [-134.0, 71.0], [-131.0, 70.5], [-133.0, 69.5], [-137.0, 69.5]
    ]
  },
  {
    name: 'Sverdrup Basin [Arctic Offshore]', color: '#818cf8', resource: 'Arctic Offshore',
    coords: [
      [-105.0, 79.5], [-95.0, 80.5], [-85.0, 79.5], [-87.0, 77.5], [-95.0, 78.0], [-102.0, 78.5]
    ]
  },
  {
    name: 'Los Angeles Basin [Traditional Oil]', color: '#f59e0b', resource: 'Traditional Oil',
    coords: [
      [-118.5, 34.0], [-117.8, 33.8], [-117.5, 33.5], [-118.2, 33.5]
    ]
  },
  {
    name: 'Ventura Basin [Traditional Oil]', color: '#fcd34d', resource: 'Traditional Oil',
    coords: [
      [-119.5, 34.5], [-118.8, 34.3], [-118.5, 34.3], [-119.0, 34.6]
    ]
  }
];

manualBasins.forEach(mb => {
  features.push({
    type: 'Feature',
    properties: { name: mb.name, type: 'basin', color: mb.color, resource_type: mb.resource },
    geometry: {
      type: 'Polygon',
      // Apply Chaikin smoothing 4 times to produce incredibly smooth, natural curves!
      coordinates: [chaikinSmooth(mb.coords, 4)]
    }
  });
});

fs.writeFileSync('public/oil_gas_plays.geojson', JSON.stringify({ type: 'FeatureCollection', features }));
console.log('Successfully generated organic, smooth polygons and consolidated naming!');
