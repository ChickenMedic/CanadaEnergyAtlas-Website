const fs = require('fs');

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Representative land-based anchor points to prevent ocean generation
const cityAnchors = {
  coal: [
    [-113.49, 53.54], [-114.07, 51.04], [-104.60, 50.44], // AB/SK
    [-106.65, 52.13], [-89.24, 48.38], [-100.31, 46.80], // Mid-west
    [-93.26, 44.97], [-90.19, 38.62], [-86.15, 39.76],   // US Midwest
    [-84.38, 33.74], [-80.84, 35.22], [-82.99, 39.96],   // US Southeast
    [-111.89, 40.76], [-104.99, 39.73], [-106.60, 35.11] // US West
  ],
  gas: [
    [-114.07, 51.04], [-122.98, 49.28], [-122.33, 47.60], // West Coast
    [-118.24, 34.05], [-121.49, 38.58], [-112.07, 33.44], 
    [-95.36, 29.76], [-96.79, 32.77], [-97.74, 30.26],   // Texas
    [-90.07, 29.95], [-87.62, 41.87], [-83.04, 42.33],   // Gulf / Midwest
    [-79.38, 43.65], [-75.69, 45.42], [-73.56, 45.50],   // Eastern Canada
    [-74.00, 40.71], [-75.16, 39.95], [-77.03, 38.90],   // East Coast
    [-81.37, 28.53], [-80.19, 25.76], [-84.38, 33.74]    // Southeast
  ],
  oil: [
    [-63.57, 44.64], [-52.71, 47.56], [-66.06, 45.27],   // Atlantic Canada
    [-74.00, 40.71], [-71.05, 42.36], [-75.16, 39.95],   // US East Coast
    [-157.85, 21.30], [-118.24, 34.05], [-122.33, 47.60], // Pacific Coast
    [-95.36, 29.76], [-80.19, 25.76], [-90.07, 29.95]    // Gulf Coast
  ]
};

const features = [];
let idCounter = 1;

function generatePlants(type, count, capacityRange, namePrefix) {
  const anchors = cityAnchors[type];
  for (let i = 0; i < count; i++) {
    const anchor = anchors[Math.floor(Math.random() * anchors.length)];
    // Add random jitter of +/- 1.5 degrees (~100-150km)
    const lng = anchor[0] + randRange(-1.5, 1.5);
    const lat = anchor[1] + randRange(-1.0, 1.0);

    const capacity = Math.floor(randRange(capacityRange[0], capacityRange[1]));
    
    features.push({
      type: "Feature",
      geometry: { type: "Point", coordinates: [lng, lat] },
      properties: {
        type: "fossil",
        subtype: type,
        name: `${namePrefix} Plant ${idCounter++}`,
        operator: ["NextEra", "Duke Energy", "Southern Co", "Exelon", "TransAlta", "Capital Power"][Math.floor(Math.random()*6)],
        capacity: `${capacity} MW`,
        capacity_num: capacity,
        status: "Active"
      }
    });
  }
}

// Generate ~500 plants total to look good
generatePlants('gas', 350, [50, 2000], "Natural Gas");
generatePlants('coal', 120, [300, 3500], "Coal");
generatePlants('oil', 30, [20, 800], "Fuel Oil");

fs.writeFileSync('./public/fossil_plants.geojson', JSON.stringify({ type: "FeatureCollection", features }));
console.log("Generated synthetic fossil_plants.geojson with land-anchored coordinates");
