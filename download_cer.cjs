const fs = require('fs');
const https = require('https');

const url = 'https://services5.arcgis.com/vNzamREXvX2WcX6d/ArcGIS/rest/services/CER_Pipeline_Systems_WGS84_view/FeatureServer/3/query?where=1=1&outFields=*&f=geojson';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const geojson = JSON.parse(data);
      console.log(`Downloaded ${geojson.features.length} pipelines from CER server.`);
      fs.writeFileSync('public/pipelines.geojson', JSON.stringify(geojson, null, 2));
      console.log('Saved to public/pipelines.geojson');
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      console.error('Data received:', data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.error('Error fetching data:', err);
});
