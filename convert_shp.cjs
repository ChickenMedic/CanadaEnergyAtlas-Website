const shapefile = require('shapefile');
const fs = require('fs');

async function convert() {
  const geojson = { type: 'FeatureCollection', features: [] };
  const source = await shapefile.open('public/pipelines_temp/Pipelines_SHP/Pipelines_GCS_NAD83.shp');
  
  let i = 0;
  while (true) {
    const result = await source.read();
    if (result.done) break;
    
    // To make the file extremely lightweight, we sample the data
    // keeping only 1 out of 20 features
    if (i % 20 === 0) {
      geojson.features.push(result.value);
    }
    i++;
  }
  
  fs.writeFileSync('public/pipelines.geojson', JSON.stringify(geojson));
  console.log(`Saved ${geojson.features.length} features.`);
}

convert().catch(console.error);
