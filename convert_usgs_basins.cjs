const shapefile = require('shapefile');
const fs = require('fs');

async function convert() {
  const geojson = { type: 'FeatureCollection', features: [] };
  const source = await shapefile.open('public/basins_temp/Sedimentary_Basins_of_the_United_States.shp');
  
  while (true) {
    const result = await source.read();
    if (result.done) break;
    
    // Add color property for styling
    if (result.value && result.value.properties) {
      result.value.properties.color = '#7c3aed';
      result.value.properties.type = 'basin';
    }
    geojson.features.push(result.value);
  }
  
  fs.writeFileSync('public/usgs_basins.geojson', JSON.stringify(geojson));
  console.log(`Saved ${geojson.features.length} basin features to public/usgs_basins.geojson`);
}

convert().catch(console.error);
