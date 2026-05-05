const fs = require('fs');

const geoPath = 'public/pipelines.geojson';
const geo = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

// Filter out all fake/generated US pipelines to restore the file to the pure CER dataset
geo.features = geo.features.filter(f => !f.properties.Is_US_Dense && !f.properties.Is_US_Major);

fs.writeFileSync(geoPath, JSON.stringify(geo));
console.log('Restored pipelines.geojson to pure real CER data. Fake web removed.');
