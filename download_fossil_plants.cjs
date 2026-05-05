const fs = require('fs');

// Real, factual Fossil Fuel Power Plants in North America
const realFossils = [
  // Canada Coal
  { name: 'Genesee Generating Station', lat: 53.342, lon: -114.303, type: 'fossil', subtype: 'coal', operator: 'Capital Power', capacity: 1376 },
  { name: 'Keephills Generating Station', lat: 53.447, lon: -114.450, type: 'fossil', subtype: 'coal', operator: 'TransAlta', capacity: 790 },
  { name: 'Sheerness Generating Station', lat: 51.463, lon: -111.966, type: 'fossil', subtype: 'coal', operator: 'Heartland Generation', capacity: 780 },
  { name: 'Poplar River Power Station', lat: 49.055, lon: -105.479, type: 'fossil', subtype: 'coal', operator: 'SaskPower', capacity: 582 },
  { name: 'Boundary Dam Power Station', lat: 49.096, lon: -103.031, type: 'fossil', subtype: 'coal', operator: 'SaskPower', capacity: 672 },
  { name: 'Shand Power Station', lat: 49.083, lon: -102.866, type: 'fossil', subtype: 'coal', operator: 'SaskPower', capacity: 276 },
  { name: 'Lingan Generating Station', lat: 46.233, lon: -60.033, type: 'fossil', subtype: 'coal', operator: 'Nova Scotia Power', capacity: 600 },
  { name: 'Belledune Generating Station', lat: 47.900, lon: -65.850, type: 'fossil', subtype: 'coal', operator: 'NB Power', capacity: 458 },

  // Canada Gas
  { name: 'Sundance Power Station', lat: 53.506, lon: -114.556, type: 'fossil', subtype: 'gas', operator: 'TransAlta', capacity: 852 },
  { name: 'Queen Elizabeth Power Station', lat: 52.122, lon: -106.699, type: 'fossil', subtype: 'gas', operator: 'SaskPower', capacity: 634 },
  { name: 'Goreway Power Station', lat: 43.753, lon: -79.664, type: 'fossil', subtype: 'gas', operator: 'Capital Power', capacity: 875 },
  { name: 'Halton Hills Generating Station', lat: 43.565, lon: -79.948, type: 'fossil', subtype: 'gas', operator: 'Atura Power', capacity: 683 },
  { name: 'Lennox Generating Station', lat: 44.148, lon: -76.849, type: 'fossil', subtype: 'gas', operator: 'OPG', capacity: 2100 },
  { name: 'Bécancour Cogeneration Plant', lat: 46.368, lon: -72.391, type: 'fossil', subtype: 'gas', operator: 'Cartier Énergie', capacity: 410 },
  { name: 'Coleson Cove Generating Station', lat: 45.148, lon: -66.208, type: 'fossil', subtype: 'oil', operator: 'NB Power', capacity: 978 }, // Mostly oil

  // US Coal
  { name: 'Scherer Power Plant', lat: 33.060, lon: -83.807, type: 'fossil', subtype: 'coal', operator: 'Georgia Power', capacity: 3520 },
  { name: 'James H. Miller Jr. Plant', lat: 33.631, lon: -87.060, type: 'fossil', subtype: 'coal', operator: 'Alabama Power', capacity: 2822 },
  { name: 'Gibson Generating Station', lat: 38.372, lon: -87.766, type: 'fossil', subtype: 'coal', operator: 'Duke Energy', capacity: 3145 },
  { name: 'Monroe Power Plant', lat: 41.889, lon: -83.346, type: 'fossil', subtype: 'coal', operator: 'DTE Energy', capacity: 3280 },
  { name: 'John E. Amos Power Plant', lat: 38.473, lon: -81.823, type: 'fossil', subtype: 'coal', operator: 'Appalachian Power', capacity: 2933 },
  { name: 'Navajo Generating Station (Historic)', lat: 36.904, lon: -111.388, type: 'fossil', subtype: 'coal', operator: 'SRP', capacity: 2250 },
  { name: 'Colstrip Power Plant', lat: 45.882, lon: -106.613, type: 'fossil', subtype: 'coal', operator: 'Talen Energy', capacity: 2094 },
  { name: 'Laramie River Station', lat: 42.083, lon: -104.888, type: 'fossil', subtype: 'coal', operator: 'Basin Electric', capacity: 1710 },

  // US Gas
  { name: 'West County Energy Center', lat: 26.697, lon: -80.373, type: 'fossil', subtype: 'gas', operator: 'FPL', capacity: 3658 },
  { name: 'Martin County Power Plant', lat: 27.054, lon: -80.564, type: 'fossil', subtype: 'gas', operator: 'FPL', capacity: 3605 },
  { name: 'Oswego Generating Station', lat: 43.456, lon: -76.529, type: 'fossil', subtype: 'gas', operator: 'NRG Energy', capacity: 1624 },
  { name: 'Mystic Generating Station', lat: 42.390, lon: -71.066, type: 'fossil', subtype: 'gas', operator: 'Constellation', capacity: 2001 },
  { name: 'Midlothian Energy Facility', lat: 32.428, lon: -97.027, type: 'fossil', subtype: 'gas', operator: 'Vistra Energy', capacity: 1650 },
  { name: 'Gila River Power Station', lat: 33.023, lon: -112.802, type: 'fossil', subtype: 'gas', operator: 'SRP', capacity: 2200 },
  { name: 'Moss Landing Power Plant', lat: 36.804, lon: -121.782, type: 'fossil', subtype: 'gas', operator: 'Vistra Energy', capacity: 1020 },
  { name: 'Sutter Energy Center', lat: 39.066, lon: -121.649, type: 'fossil', subtype: 'gas', operator: 'Calpine', capacity: 578 },
  { name: 'Waiau Power Plant', lat: 21.396, lon: -157.962, type: 'fossil', subtype: 'oil', operator: 'Hawaiian Electric', capacity: 500 }
];

const geojson = {
  type: 'FeatureCollection',
  features: realFossils.map((m, index) => ({
    type: 'Feature',
    properties: {
      OBJECTID: 60000 + index,
      name: m.name,
      type: m.type,
      subtype: m.subtype,
      operator: m.operator,
      capacity: m.capacity + ' MW',
      capacity_num: m.capacity
    },
    geometry: {
      type: 'Point',
      coordinates: [m.lon, m.lat]
    }
  }))
};

fs.writeFileSync('public/fossil_plants.geojson', JSON.stringify(geojson, null, 2));
console.log('Successfully generated REAL fossil plants dataset (public/fossil_plants.geojson)');
