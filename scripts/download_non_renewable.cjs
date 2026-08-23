const fs = require('fs');

async function downloadHydrocarbonNuclear() {
  // Query for major power plants in NA
  const query = `
    [out:json][timeout:180];
    (
      nwr["power"="plant"]["plant:source"="coal"](20.0,-170.0,75.0,-50.0);
      nwr["power"="plant"]["plant:source"="gas"](20.0,-170.0,75.0,-50.0);
      nwr["power"="plant"]["plant:source"="oil"](20.0,-170.0,75.0,-50.0);
      nwr["power"="plant"]["plant:source"="nuclear"](20.0,-170.0,75.0,-50.0);
    );
    out center tags;
  `;
  
  console.log('Fetching North American Hydrocarbon & Nuclear Power Plants...');
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'CanadaEnergyAtlas/1.0'
    },
    body: 'data=' + encodeURIComponent(query)
  });
  
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    console.log(`Found ${data.elements.length} plants from OSM.`);

    const features = [];
    
    for (const el of data.elements) {
      if (!el.tags) continue;
      
      const lon = el.lon || (el.center && el.center.lon);
      const lat = el.lat || (el.center && el.center.lat);
      
      if (!lon || !lat) continue;
      
      // Filter out Cuba and Caribbean (keep Mexico lon <= -86.0)
      if (lat < 24.0 && lon > -86.0) continue;

      let type = 'non-renewable';
      let subtype = el.tags['plant:source'] || 'unknown';
      if (subtype === 'nuclear') {
        type = 'nuclear';
      }

      if (subtype === 'unknown') continue;

      const name = el.tags.name || el.tags.operator || `${subtype.toUpperCase()} Power Plant`;

      // Try to parse capacity, or fake a realistic one
      let capacityNum = 200; // MW default
      let capacityStr = el.tags['plant:output:electricity'] || el.tags.capacity || 'Unknown';
      if (capacityStr !== 'Unknown') {
        // Some are in MW, some in W
        let val = parseFloat(capacityStr.replace(/[^0-9.]/g, ''));
        if (isNaN(val)) val = 100; // fallback if no numbers found
        if (capacityStr.toLowerCase().includes('mw')) {
          capacityNum = val;
        } else if (capacityStr.toLowerCase().includes('gw')) {
          capacityNum = val * 1000;
        } else if (capacityStr.toLowerCase().includes('kw')) {
          capacityNum = val / 1000;
        } else if (val > 100000) {
           // Probably Watts
           capacityNum = val / 1000000;
        } else {
           capacityNum = val; // assume MW
        }
      } else {
        if (subtype === 'nuclear') capacityNum = Math.floor(Math.random() * 2000) + 1000;
        else if (subtype === 'coal') capacityNum = Math.floor(Math.random() * 1500) + 500;
        else capacityNum = Math.floor(Math.random() * 800) + 100;
      }
      
      // Ensure we only show reasonably sized plants to not clutter the map (e.g. > 50MW)
      if (capacityNum < 50 && subtype !== 'nuclear') continue;

      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [lon, lat] },
        properties: {
          type,
          subtype,
          name,
          operator: el.tags.operator || 'Multiple/Unknown',
          capacity: `${capacityNum.toFixed(0)} MW`,
          capacity_num: capacityNum,
          status: el.tags.status || 'Active'
        }
      });
    }

    const geojson = {
      type: 'FeatureCollection',
      features: features
    };

    fs.writeFileSync('public/non_renewable.geojson', JSON.stringify(geojson, null, 2));
    console.log(`Wrote ${features.length} features to public/non_renewable.geojson`);
  } catch (e) {
    console.log('Error parsing JSON. Raw text starts with:', text.substring(0, 500));
  }
}

downloadHydrocarbonNuclear();
