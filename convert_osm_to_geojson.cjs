const fs = require('fs');

const osmFile = 'osm_test_output.json';
const osmData = JSON.parse(fs.readFileSync(osmFile, 'utf8'));

const geojson = {
  type: 'FeatureCollection',
  features: []
};

osmData.elements.forEach((el, index) => {
  if (el.type === 'way' && el.geometry && el.geometry.length > 1) {
    const coords = el.geometry.map(g => [g.lon, g.lat]);
    
    // Determine Commodity
    let commodity = 'Unknown';
    if (el.tags) {
      const substance = (el.tags.substance || '').toLowerCase();
      if (substance.includes('gas')) {
        commodity = 'Gas';
      } else if (substance.includes('oil') || substance.includes('petroleum') || substance.includes('crude') || substance.includes('liquid') || substance.includes('ngl')) {
        commodity = 'Liquid';
      } else {
        // If substance is missing but it's a pipeline, default to Gas or Liquid based on common usage, let's default to Liquid
        commodity = 'Liquid'; 
      }
    }

    geojson.features.push({
      type: 'Feature',
      properties: {
        OBJECTID: 100000 + index,
        PipelineID: 'OSM_' + el.id,
        Pipeline_Name: el.tags && el.tags.name ? el.tags.name : 'Unknown Pipeline',
        Commodity: commodity,
        Source: 'OpenStreetMap'
      },
      geometry: {
        type: 'LineString',
        coordinates: coords
      }
    });
  }
});

fs.writeFileSync('public/us_osm_pipelines.geojson', JSON.stringify(geojson));
console.log(`Converted ${geojson.features.length} features to GeoJSON.`);
