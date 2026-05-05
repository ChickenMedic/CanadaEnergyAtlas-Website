const fs = require('fs');

const masterPath = 'public/pipelines.geojson';
const osmPath = 'public/us_osm_pipelines_simplified.geojson';

const masterGeo = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
const osmGeo = JSON.parse(fs.readFileSync(osmPath, 'utf8'));

// Filter out any previously added OSM pipelines just in case
masterGeo.features = masterGeo.features.filter(f => f.properties.Source !== 'OpenStreetMap');

// Append the newly simplified massive dataset
masterGeo.features.push(...osmGeo.features);

fs.writeFileSync(masterPath, JSON.stringify(masterGeo));
console.log(`Successfully merged ${osmGeo.features.length} real US pipelines into the master file! Total pipelines: ${masterGeo.features.length}`);
