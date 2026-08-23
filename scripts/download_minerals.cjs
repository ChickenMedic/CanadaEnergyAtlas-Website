const fs = require('fs');

// Real, factual Critical Mineral Sites in North America
const realMinerals = [
  // Uranium (Canada)
  { name: 'McArthur River Uranium Mine', lat: 57.766, lon: -105.050, type: 'mineral', subtype: 'uranium', operator: 'Cameco', status: 'Active' },
  { name: 'Cigar Lake Uranium Mine', lat: 58.066, lon: -104.533, type: 'mineral', subtype: 'uranium', operator: 'Cameco', status: 'Active' },
  { name: 'Key Lake Uranium Mill', lat: 57.200, lon: -105.633, type: 'mineral', subtype: 'uranium', operator: 'Cameco', status: 'Active' },
  { name: 'McClean Lake Uranium Mill', lat: 58.266, lon: -103.800, type: 'mineral', subtype: 'uranium', operator: 'Orano', status: 'Active' },
  
  // Uranium (US)
  { name: 'Smith Ranch-Highland', lat: 43.050, lon: -105.650, type: 'mineral', subtype: 'uranium', operator: 'Cameco', status: 'Active' },
  { name: 'Crow Butte', lat: 42.666, lon: -103.400, type: 'mineral', subtype: 'uranium', operator: 'Cameco', status: 'Active' },
  { name: 'White Mesa Mill', lat: 37.450, lon: -109.483, type: 'mineral', subtype: 'uranium', operator: 'Energy Fuels', status: 'Active' },

  // Nickel (Canada)
  { name: 'Sudbury Basin Nickel Mines', lat: 46.500, lon: -81.000, type: 'mineral', subtype: 'nickel', operator: 'Vale / Glencore', status: 'Active' },
  { name: 'Voisey\'s Bay Nickel Mine', lat: 56.333, lon: -62.100, type: 'mineral', subtype: 'nickel', operator: 'Vale', status: 'Active' },
  { name: 'Raglan Mine', lat: 61.683, lon: -73.666, type: 'mineral', subtype: 'nickel', operator: 'Glencore', status: 'Active' },
  { name: 'Thompson Nickel Mine', lat: 55.733, lon: -97.866, type: 'mineral', subtype: 'nickel', operator: 'Vale', status: 'Active' },

  // Nickel (US)
  { name: 'Eagle Mine', lat: 46.750, lon: -87.883, type: 'mineral', subtype: 'nickel', operator: 'Lundin Mining', status: 'Active' },

  // Copper (Canada)
  { name: 'Highland Valley Copper', lat: 50.483, lon: -120.983, type: 'mineral', subtype: 'copper', operator: 'Teck Resources', status: 'Active' },
  { name: 'Red Chris Mine', lat: 57.700, lon: -129.783, type: 'mineral', subtype: 'copper', operator: 'Newcrest / Imperial Metals', status: 'Active' },
  { name: 'Mount Milligan', lat: 55.066, lon: -123.866, type: 'mineral', subtype: 'copper', operator: 'Centerra Gold', status: 'Active' },

  // Copper (US)
  { name: 'Morenci Copper Mine', lat: 33.083, lon: -109.366, type: 'mineral', subtype: 'copper', operator: 'Freeport-McMoRan', status: 'Active' },
  { name: 'Bingham Canyon Mine', lat: 40.533, lon: -112.150, type: 'mineral', subtype: 'copper', operator: 'Rio Tinto', status: 'Active' },
  { name: 'Ray Mine', lat: 33.150, lon: -110.983, type: 'mineral', subtype: 'copper', operator: 'ASARCO', status: 'Active' },
  { name: 'Sierrita Mine', lat: 31.866, lon: -111.133, type: 'mineral', subtype: 'copper', operator: 'Freeport-McMoRan', status: 'Active' },
  { name: 'Resolution Copper (Project)', lat: 33.300, lon: -111.100, type: 'mineral', subtype: 'copper', operator: 'Rio Tinto / BHP', status: 'Development' },

  // Rare Earths (US/Canada)
  { name: 'Mountain Pass Rare Earth Mine', lat: 35.483, lon: -115.533, type: 'mineral', subtype: 'rare_earth', operator: 'MP Materials', status: 'Active' },
  { name: 'Nechalacho Rare Earth Project', lat: 62.100, lon: -112.950, type: 'mineral', subtype: 'rare_earth', operator: 'Vital Metals', status: 'Active' },

  // Lithium (Canada)
  { name: 'Tanco Mine', lat: 50.433, lon: -95.350, type: 'mineral', subtype: 'lithium', operator: 'Sinomine', status: 'Active' },
  { name: 'Whabouchi Lithium Project', lat: 51.683, lon: -75.866, type: 'mineral', subtype: 'lithium', operator: 'Nemaska Lithium', status: 'Development' },
  { name: 'Rose Lithium-Tantalum', lat: 52.033, lon: -76.816, type: 'mineral', subtype: 'lithium', operator: 'Critical Elements', status: 'Development' },
  
  // Lithium (US)
  { name: 'Silver Peak Lithium Facility', lat: 37.750, lon: -117.633, type: 'mineral', subtype: 'lithium', operator: 'Albemarle', status: 'Active' },
  { name: 'Thacker Pass Lithium', lat: 41.716, lon: -118.066, type: 'mineral', subtype: 'lithium', operator: 'Lithium Americas', status: 'Development' },
  { name: 'Salton Sea Lithium Project', lat: 33.200, lon: -115.600, type: 'mineral', subtype: 'lithium', operator: 'EnergySource', status: 'Development' },
  { name: 'Piedmont Lithium Project', lat: 35.383, lon: -81.250, type: 'mineral', subtype: 'lithium', operator: 'Piedmont Lithium', status: 'Development' }
];

const geojson = {
  type: 'FeatureCollection',
  features: realMinerals.map((m, index) => ({
    type: 'Feature',
    properties: {
      OBJECTID: 50000 + index,
      name: m.name,
      type: m.type,
      subtype: m.subtype,
      operator: m.operator,
      status: m.status
    },
    geometry: {
      type: 'Point',
      coordinates: [m.lon, m.lat]
    }
  }))
};

fs.writeFileSync('public/minerals.geojson', JSON.stringify(geojson, null, 2));
console.log('Successfully generated REAL minerals dataset (public/minerals.geojson)');
