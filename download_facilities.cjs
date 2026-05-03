const fs = require('fs');

async function downloadFacilities() {
  const query = `
    [out:json][timeout:120];
    (
      nwr["man_made"="petroleum_refinery"](20.0,-170.0,75.0,-50.0);
      nwr["industrial"="oil_refinery"](20.0,-170.0,75.0,-50.0);
      nwr["industrial"="gas_treatment"](20.0,-170.0,75.0,-50.0);
      nwr["industrial"="oil_storage"](20.0,-170.0,75.0,-50.0);
      nwr["industrial"="gas_storage"](20.0,-170.0,75.0,-50.0);
      nwr["industrial"="tank_farm"](20.0,-170.0,75.0,-50.0);
    );
    out center tags;
  `;
  
  console.log('Fetching North American Refineries & Storage Facilities...');
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
    console.log(`Found ${data.elements.length} facilities.`);

    const features = [];
    
    for (const el of data.elements) {
      if (!el.tags) continue;
      
      const lon = el.lon || (el.center && el.center.lon);
      const lat = el.lat || (el.center && el.center.lat);
      
      if (!lon || !lat) continue;

      let type = 'unknown';
      let subtype = 'unknown';

      if (el.tags['man_made'] === 'petroleum_refinery' || el.tags['industrial'] === 'oil_refinery') {
        type = 'refinery';
        subtype = 'oil';
      } else if (el.tags['industrial'] === 'gas_treatment') {
        type = 'refinery'; // We classify processing plants as refineries
        subtype = 'gas';
      } else if (el.tags['industrial'] === 'oil_storage' || el.tags['industrial'] === 'tank_farm') {
        type = 'storage';
        subtype = 'oil';
      } else if (el.tags['industrial'] === 'gas_storage') {
        type = 'storage';
        subtype = 'gas';
      }

      if (type === 'unknown') continue;

      const name = el.tags.name || el.tags.operator || `${subtype.toUpperCase()} ${type.charAt(0).toUpperCase() + type.slice(1)}`;

      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lon, lat]
        },
        properties: {
          type: type,
          subtype: subtype,
          name: name,
          operator: el.tags.operator || 'Unknown',
          capacity: el.tags.capacity || 'Unknown'
        }
      });
    }

    const geojson = {
      type: 'FeatureCollection',
      features: features
    };

    fs.writeFileSync('public/facilities.geojson', JSON.stringify(geojson, null, 2));
    console.log(`Wrote ${features.length} features to public/facilities.geojson`);
  } catch (e) {
    console.log('Error parsing JSON. Raw text starts with:', text.substring(0, 500));
  }
}

downloadFacilities();
