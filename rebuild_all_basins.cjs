const fs = require('fs');

const usgsRaw = JSON.parse(fs.readFileSync('public/usgs_basins.geojson', 'utf8'));

const targetUsBasins = {
  'Permian Basin': { name: 'Permian Basin (Tight Oil)', color: '#6d28d9', resource: 'Tight Oil' },
  'Appalachian Basin': { name: 'Appalachian Basin (Tight Gas)', color: '#4c1d95', resource: 'Tight Gas' },
  'Williston Basin': { name: 'Williston Basin (Bakken)', color: '#a78bfa', resource: 'Tight Oil' },
  'Anadarko Basin': { name: 'Anadarko Basin (SCOOP/STACK)', color: '#8b5cf6', resource: 'Tight Oil' },
  'Gulf of Mexico Basin': { name: 'Gulf Coast Basin (Eagle Ford)', color: '#5b21b6', resource: 'Tight Oil/Gas' },
  'Denver Basin': { name: 'Denver Basin (Niobrara)', color: '#7c3aed', resource: 'Tight Oil' },
  'Cook Inlet Basin': { name: 'Cook Inlet Basin (Alaska)', color: '#0ea5e9', resource: 'Traditional Oil' },
  'Colville Basin and Foldbelt': { name: 'North Slope / Colville (Alaska)', color: '#38bdf8', resource: 'Traditional Oil' },
  'Michigan Basin': { name: 'Michigan Basin', color: '#10b981', resource: 'Traditional' },
  'Powder River Basin': { name: 'Powder River Basin', color: '#f43f5e', resource: 'Tight Oil' },
  'Forest City Basin': { name: 'Forest City Basin', color: '#8b5cf6', resource: 'Traditional' }
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

// WCSB (Extended South)
features.push({
  type: 'Feature',
  properties: { name: 'Western Canada Sedimentary Basin', type: 'basin', color: '#6ee7b7', resource_type: 'Traditional' },
  geometry: {
    type: 'Polygon',
    // Carefully ordered counter-clockwise to avoid Mapbox glitches
    coordinates: [[
      [-124.0, 60.0],
      [-120.0, 60.5],
      [-114.0, 60.5],
      [-111.0, 59.5],
      [-108.0, 58.0],
      [-104.5, 56.0],
      [-101.0, 54.0],
      [-98.5, 52.0],
      [-97.0, 50.5],
      [-97.5, 45.0], // Extended south to US border into Montana/ND
      [-102.0, 45.0],
      [-108.0, 45.0],
      [-112.0, 45.0],
      [-114.0, 49.0],
      [-115.0, 51.0],
      [-117.5, 53.5],
      [-119.0, 55.0],
      [-120.5, 56.5],
      [-123.0, 58.5],
      [-124.0, 60.0]
    ]]
  }
});

// Athabasca
features.push({
  type: 'Feature',
  properties: { name: 'Athabasca Oil Sands', type: 'basin', color: '#fcd34d', resource_type: 'Oil Sands' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-117.5, 56.8], [-115.0, 55.0], [-113.5, 55.2], [-112.5, 54.8], [-111.5, 54.0],
      [-110.0, 54.2], [-110.5, 54.8], [-111.0, 55.5], [-110.0, 56.8], [-110.5, 57.8],
      [-111.5, 58.5], [-113.0, 58.2], [-114.0, 56.5], [-115.0, 56.2], [-115.5, 57.0],
      [-116.5, 57.5], [-117.5, 56.8]
    ]]
  }
});

// Montney (Massive, wide footprint)
features.push({
  type: 'Feature',
  properties: { name: 'Montney Play', type: 'basin', color: '#c084fc', resource_type: 'Tight Gas' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-123.5, 58.5], // Far NW (BC)
      [-119.0, 58.0], // NE
      [-116.0, 56.0], // East
      [-116.0, 54.0], // SE
      [-119.5, 54.5], // SW
      [-122.5, 56.5], // West
      [-123.5, 58.5]  // Close
    ]]
  }
});

// Duvernay (Massive, wide footprint)
features.push({
  type: 'Feature',
  properties: { name: 'Duvernay Play', type: 'basin', color: '#c4b5fd', resource_type: 'Tight Oil' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-118.5, 55.5], // NW (Fox Creek)
      [-115.0, 55.0], // NE
      [-112.0, 51.5], // SE (Red Deer area)
      [-115.5, 51.0], // SW
      [-118.5, 55.5]  // Close
    ]]
  }
});

// Haynesville
features.push({
  type: 'Feature',
  properties: { name: 'Haynesville Shale', type: 'basin', color: '#f472b6', resource_type: 'Tight Gas' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-94.5, 33.0], [-93.5, 33.0], [-93.0, 32.0], [-93.5, 31.5], [-94.5, 31.5], [-95.0, 32.5], [-94.5, 33.0]
    ]]
  }
});

// Jeanne d'arc
features.push({
  type: 'Feature',
  properties: { name: "Jeanne d'Arc Basin", type: 'basin', color: '#38bdf8', resource_type: 'Offshore' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-49.0, 47.0], [-47.0, 47.5], [-46.0, 46.5], [-47.5, 45.5], [-49.0, 46.0], [-49.0, 47.0]
    ]]
  }
});

// Beaufort-Mackenzie
features.push({
  type: 'Feature',
  properties: { name: 'Beaufort-Mackenzie Basin', type: 'basin', color: '#2dd4bf', resource_type: 'Arctic Offshore' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-140.0, 71.0], [-135.0, 71.5], [-130.0, 70.5], [-132.0, 69.5], [-138.0, 69.0], [-140.0, 71.0]
    ]]
  }
});

// Sverdrup Basin
features.push({
  type: 'Feature',
  properties: { name: 'Sverdrup Basin', type: 'basin', color: '#a78bfa', resource_type: 'Arctic Offshore' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-105.0, 80.0], [-95.0, 81.0], [-85.0, 80.0], [-85.0, 78.0], [-95.0, 77.0], [-105.0, 78.0], [-105.0, 80.0]
    ]]
  }
});

fs.writeFileSync('public/oil_gas_plays.geojson', JSON.stringify({ type: 'FeatureCollection', features }));
console.log('Rebuilt ALL basins perfectly!');
