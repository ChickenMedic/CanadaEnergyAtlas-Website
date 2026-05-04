const fs = require('fs');
const https = require('https');

const OVERPASS_URL = 'https://lz4.overpass-api.de/api/interpreter';

// North America BBox (excluding Cuba/Caribbean)
const BBOX = "24.5,-170.0,75.0,-50.0";

const query = `
  [out:json][timeout:900];
  (
    node["power"="plant"]["plant:source"~"coal|gas|oil"](${BBOX});
    way["power"="plant"]["plant:source"~"coal|gas|oil"](${BBOX});
    relation["power"="plant"]["plant:source"~"coal|gas|oil"](${BBOX});
    node["power"="generator"]["generator:source"~"coal|gas|oil"](${BBOX});
    way["power"="generator"]["generator:source"~"coal|gas|oil"](${BBOX});
    relation["power"="generator"]["generator:source"~"coal|gas|oil"](${BBOX});
  );
  out center;
`;

console.log("Fetching Fossil Fuel Power Plants from OSM...");

const req = https.request(OVERPASS_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const features = [];
      const seen = new Set();

      for (const el of parsed.elements) {
        let lat = el.lat || (el.center && el.center.lat);
        let lon = el.lon || (el.center && el.center.lon);
        
        if (!lat || !lon) continue;
        
        // Basic deduplication using coordinates
        const coordKey = `${lat.toFixed(3)},${lon.toFixed(3)}`;
        if (seen.has(coordKey)) continue;
        
        let source = el.tags['plant:source'] || el.tags['generator:source'] || '';
        let capacityStr = el.tags['plant:output:electricity'] || el.tags['generator:output:electricity'] || el.tags['rating'] || '';
        let name = el.tags.name || el.tags['name:en'] || 'Unknown Plant';
        
        // Clean capacity
        let capacity = 0;
        if (capacityStr) {
          capacityStr = capacityStr.toLowerCase().replace(/,/g, '');
          let num = parseFloat(capacityStr);
          if (!isNaN(num)) {
            if (capacityStr.includes('mw')) capacity = num;
            else if (capacityStr.includes('gw')) capacity = num * 1000;
            else if (capacityStr.includes('kw')) capacity = num / 1000;
            else if (num > 10000) capacity = num / 1000000; // assume watts if very large
          }
        }
        
        // Default small capacity if unknown so it shows up
        if (capacity === 0) capacity = 50; 
        
        let type = 'gas';
        if (source.includes('coal')) type = 'coal';
        else if (source.includes('oil')) type = 'oil';
        
        seen.add(coordKey);
        
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [lon, lat] },
          properties: {
            type: "fossil",
            subtype: type,
            name: name,
            operator: el.tags.operator || "Unknown",
            capacity: capacity ? `${Math.round(capacity)} MW` : "Unknown",
            capacity_num: capacity,
            status: "Active"
          }
        });
      }

      const geojson = {
        type: "FeatureCollection",
        features: features
      };

      fs.writeFileSync('./public/fossil_plants.geojson', JSON.stringify(geojson));
      console.log(`Saved ${features.length} fossil fuel plants.`);
      
    } catch (e) {
      console.error("Error parsing response", e);
    }
  });
});

req.on('error', e => console.error(e));
req.write(`data=${encodeURIComponent(query)}`);
req.end();
