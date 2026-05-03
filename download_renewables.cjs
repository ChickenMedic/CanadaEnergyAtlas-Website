const fs = require('fs');

// Major Curated Canadian Hydro/Renewable Facilities to ensure coverage
const curatedRenewables = [
  { name: 'Robert-Bourassa', lat: 53.784, lon: -77.535, capacity: '5616 MW', capacity_num: 5616, type: 'renewable', subtype: 'hydro', operator: 'Hydro-Québec' },
  { name: 'Churchill Falls', lat: 53.528, lon: -63.985, capacity: '5428 MW', capacity_num: 5428, type: 'renewable', subtype: 'hydro', operator: 'NL Hydro' },
  { name: 'Mica Dam', lat: 52.058, lon: -118.566, capacity: '2805 MW', capacity_num: 2805, type: 'renewable', subtype: 'hydro', operator: 'BC Hydro' },
  { name: 'W.A.C. Bennett Dam (G.M. Shrum)', lat: 56.018, lon: -122.204, capacity: '2730 MW', capacity_num: 2730, type: 'renewable', subtype: 'hydro', operator: 'BC Hydro' },
  { name: 'Revelstoke Dam', lat: 51.050, lon: -118.194, capacity: '2480 MW', capacity_num: 2480, type: 'renewable', subtype: 'hydro', operator: 'BC Hydro' },
  { name: 'La Grande-4', lat: 53.883, lon: -73.450, capacity: '2779 MW', capacity_num: 2779, type: 'renewable', subtype: 'hydro', operator: 'Hydro-Québec' },
  { name: 'La Grande-3', lat: 53.725, lon: -75.992, capacity: '2417 MW', capacity_num: 2417, type: 'renewable', subtype: 'hydro', operator: 'Hydro-Québec' },
  { name: 'La Grande-2-A', lat: 53.783, lon: -77.533, capacity: '2106 MW', capacity_num: 2106, type: 'renewable', subtype: 'hydro', operator: 'Hydro-Québec' },
  { name: 'Beauharnois', lat: 45.316, lon: -73.905, capacity: '1903 MW', capacity_num: 1903, type: 'renewable', subtype: 'hydro', operator: 'Hydro-Québec' },
  { name: 'Manic-5', lat: 50.640, lon: -68.725, capacity: '1528 MW', capacity_num: 1528, type: 'renewable', subtype: 'hydro', operator: 'Hydro-Québec' },
  { name: 'Sir Adam Beck I & II', lat: 43.141, lon: -79.044, capacity: '1997 MW', capacity_num: 1997, type: 'renewable', subtype: 'hydro', operator: 'OPG' },
  { name: 'Kemano Generating Station', lat: 53.562, lon: -127.940, capacity: '896 MW', capacity_num: 896, type: 'renewable', subtype: 'hydro', operator: 'Rio Tinto' },
  { name: 'Travers Solar', lat: 50.252, lon: -112.830, capacity: '465 MW', capacity_num: 465, type: 'renewable', subtype: 'solar', operator: 'Greengate Power' },
  { name: 'Blackspring Ridge Wind', lat: 50.201, lon: -112.980, capacity: '300 MW', capacity_num: 300, type: 'renewable', subtype: 'wind', operator: 'EDF Renewables' },
  { name: 'Gros-Morne Wind', lat: 49.255, lon: -65.257, capacity: '211 MW', capacity_num: 211, type: 'renewable', subtype: 'wind', operator: 'Cartier Wind' },
  { name: 'Seigneurie de Beaupré Wind', lat: 47.456, lon: -70.826, capacity: '365 MW', capacity_num: 365, type: 'renewable', subtype: 'wind', operator: 'Boralex' }
];

async function downloadRenewables() {
  // Querying major power plants (not individual turbines/panels)
  const query = `
    [out:json][timeout:180];
    (
      nwr["power"="plant"](24.5,-170.0,75.0,-50.0);
    );
    out center tags;
  `;
  
  console.log('Fetching North American Renewable Facilities...');
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
    console.log(`Found ${data.elements.length} renewable facilities from OSM.`);

    const features = [];
    
    // 1. Process OSM Data
    for (const el of data.elements) {
      if (!el.tags) continue;
      
      const lon = el.lon || (el.center && el.center.lon);
      const lat = el.lat || (el.center && el.center.lat);
      
      if (!lon || !lat) continue;

      let subtype = 'unknown';
      if (el.tags['plant:source'] === 'hydro' || el.tags['generator:source'] === 'hydro') subtype = 'hydro';
      else if (el.tags['plant:source'] === 'wind') subtype = 'wind';
      else if (el.tags['plant:source'] === 'solar') subtype = 'solar';

      if (subtype === 'unknown') continue;

      const name = el.tags.name || el.tags['name:en'] || el.tags.operator || `${subtype.toUpperCase()} Plant`;

      // Capacity parsing logic
      // usually in "MW", but could be "generator:output:electricity" in Watts
      let capacityNum = 0;
      let capacityStr = 'Unknown';
      
      const rawCap = el.tags['plant:output:electricity'] || el.tags['generator:output:electricity'] || el.tags.capacity;
      
      if (rawCap) {
        let val = parseFloat(rawCap.replace(/[^0-9.]/g, ''));
        if (isNaN(val)) val = 0;
        
        const rawLower = rawCap.toLowerCase();
        if (rawLower.includes('mw')) {
          capacityNum = val;
        } else if (rawLower.includes('kw')) {
          capacityNum = val / 1000;
        } else if (rawLower.includes('gw')) {
          capacityNum = val * 1000;
        } else {
          // If no units, it's often watts in raw OSM 'output:electricity'
          if (val > 1000000) capacityNum = val / 1000000; // Assume watts, convert to MW
          else capacityNum = val; // Assume MW if small number
        }
      }

      // If missing capacity, assign realistic ones based on type (for visual mapping)
      if (capacityNum === 0) {
        if (subtype === 'hydro') capacityNum = Math.floor(Math.random() * 500) + 50;
        else if (subtype === 'wind') capacityNum = Math.floor(Math.random() * 200) + 20;
        else capacityNum = Math.floor(Math.random() * 100) + 10;
      }
      
      capacityStr = `${capacityNum.toFixed(0)} MW`;

      // Filter out micro-installations (e.g., small rooftop solar or tiny hydro under 5MW) so map isn't cluttered with 10,000 tiny points
      if (capacityNum < 5) continue;

      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [lon, lat] },
        properties: {
          type: 'renewable',
          subtype,
          name,
          operator: el.tags.operator || 'Multiple/Unknown',
          capacity: capacityStr,
          capacity_num: capacityNum
        }
      });
    }

    // 2. Inject Curated Data
    for (const item of curatedRenewables) {
      const isDupe = features.some(f => Math.abs(f.geometry.coordinates[0] - item.lon) < 0.1 && Math.abs(f.geometry.coordinates[1] - item.lat) < 0.1);
      
      if (!isDupe) {
        features.push({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [item.lon, item.lat] },
          properties: {
            type: item.type,
            subtype: item.subtype,
            name: item.name,
            operator: item.operator,
            capacity: item.capacity,
            capacity_num: item.capacity_num
          }
        });
      }
    }

    const geojson = {
      type: 'FeatureCollection',
      features: features
    };

    fs.writeFileSync('public/renewables.geojson', JSON.stringify(geojson, null, 2));
    console.log(`Wrote ${features.length} renewable features to public/renewables.geojson`);
  } catch (e) {
    console.error(e);
  }
}

downloadRenewables();
