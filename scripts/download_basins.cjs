const fs = require('fs');
const https = require('https');

// Layer 11 is WCSB
const url = 'https://gsitservices.nrcan.gc.ca/arcgis/rest/services/GSCA/basin_e/MapServer/11/query?where=1=1&outFields=*&f=geojson';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const geojson = JSON.parse(data);
      console.log(`Downloaded ${geojson.features ? geojson.features.length : 0} basins from NRCan server.`);
      
      // If the above fails or is empty, we'll write a mock one for testing
      if (!geojson.features || geojson.features.length === 0) {
        console.log("No features returned, checking full basin layer...");
        // Fallback to layer 0 or mock
      }
      
      fs.writeFileSync('public/basins.geojson', JSON.stringify(geojson, null, 2));
      console.log('Saved to public/basins.geojson');
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      console.error('Data received:', data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.error('Error fetching data:', err);
});
