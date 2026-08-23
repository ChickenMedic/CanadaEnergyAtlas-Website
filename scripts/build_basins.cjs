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
  'Colville Basin and Foldbelt': { name: 'North Slope / Colville (Alaska)', color: '#38bdf8', resource: 'Traditional Oil' }
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

// Highly detailed WCSB tracing the Rockies (West) and Canadian Shield (East)
features.push({
  type: 'Feature',
  properties: { name: 'WCSB (Traditional Oil & Gas)', type: 'basin', color: '#6ee7b7', resource_type: 'Traditional' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-124.0, 60.0], [-123.0, 58.5], [-120.5, 56.5], [-119.0, 55.0], [-117.5, 53.5], [-115.0, 51.0], 
      [-114.0, 49.0], [-108.0, 49.0], [-102.0, 49.0], [-97.5, 49.0], [-97.0, 50.5], [-98.5, 52.0], 
      [-101.0, 54.0], [-104.5, 56.0], [-108.0, 58.0], [-111.0, 59.5], [-114.0, 60.5], [-120.0, 60.5],
      [-124.0, 60.0]
    ]]
  }
});

// Detailed Athabasca/Cold Lake/Peace River Oil Sands lobed geometry
features.push({
  type: 'Feature',
  properties: { name: 'Alberta Oil Sands', type: 'basin', color: '#fcd34d', resource_type: 'Oil Sands' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      // Peace River lobe
      [-117.5, 56.8], [-116.5, 57.5], [-115.5, 57.0], [-115.0, 56.2], 
      // Athabasca core
      [-114.0, 56.5], [-113.0, 58.2], [-111.5, 58.5], [-110.5, 57.8], [-110.0, 56.8], [-111.0, 55.5],
      // Cold Lake lobe
      [-110.5, 54.8], [-110.0, 54.2], [-111.5, 54.0], [-112.5, 54.8], 
      // Return
      [-113.5, 55.2], [-115.0, 55.0], [-116.5, 56.0], [-117.5, 56.8]
    ]]
  }
});

// Detailed Montney Play (Crescent shape)
features.push({
  type: 'Feature',
  properties: { name: 'Montney Play (Tight Gas/Oil)', type: 'basin', color: '#c084fc', resource_type: 'Tight Gas' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-122.5, 57.8], [-121.0, 57.0], [-119.5, 56.2], [-118.0, 55.0], [-116.5, 54.2],
      [-117.5, 54.0], [-119.0, 55.2], [-120.5, 56.2], [-122.0, 57.2], [-123.0, 57.8],
      [-122.5, 57.8]
    ]]
  }
});

// Detailed Duvernay Play
features.push({
  type: 'Feature',
  properties: { name: 'Duvernay Play (Tight Oil)', type: 'basin', color: '#c4b5fd', resource_type: 'Tight Oil' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-118.5, 55.2], [-117.0, 54.5], [-115.0, 53.0], [-113.5, 52.0], [-112.5, 51.5],
      [-113.0, 51.0], [-114.5, 52.2], [-116.5, 53.8], [-118.0, 54.8], [-119.0, 55.5],
      [-118.5, 55.2]
    ]]
  }
});

fs.writeFileSync('public/oil_gas_plays.geojson', JSON.stringify({ type: 'FeatureCollection', features }));
console.log('Built detailed basins and saved to public/oil_gas_plays.geojson');
