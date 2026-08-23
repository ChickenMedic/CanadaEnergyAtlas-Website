const fs = require('fs');

// 1. Clean canada.geojson
let geoStr = fs.readFileSync('public/canada.geojson', 'utf8');
if (geoStr.charCodeAt(0) === 0xFEFF) {
  geoStr = geoStr.slice(1);
  fs.writeFileSync('public/canada.geojson', geoStr);
  console.log('Stripped BOM from canada.geojson');
}

// 2. Convert canada_grid.json to GeoJSON
const gridRaw = JSON.parse(fs.readFileSync('public/canada_grid.json', 'utf8'));

const gridGeoJSON = {
  type: 'FeatureCollection',
  features: gridRaw.map(item => {
    // route is array of [lat, lon], we need [lon, lat]
    const coordinates = item.route.map(pt => [pt[1], pt[0]]);
    return {
      type: 'Feature',
      properties: {
        name: item.name || 'Power Line',
        type: item.type || 'Unknown',
        voltage: item.voltage || 'Unknown'
      },
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    };
  })
};

fs.writeFileSync('public/canada_grid.geojson', JSON.stringify(gridGeoJSON));
console.log('Converted canada_grid.json to canada_grid.geojson with', gridGeoJSON.features.length, 'features');
