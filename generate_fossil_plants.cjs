const fs = require('fs');

const BBOX_US_CA = { minLng: -130, maxLng: -60, minLat: 25, maxLat: 60 };

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

const features = [];
let idCounter = 1;

function generatePlants(type, count, capacityRange, namePrefix) {
  for (let i = 0; i < count; i++) {
    // Bias towards certain regions for realism
    let lng, lat;
    if (type === 'coal') {
      // More coal in Midwest/Appalachia/Alberta
      lng = randRange(-115, -75);
      lat = randRange(35, 54);
    } else if (type === 'gas') {
      // Gas everywhere, especially Texas/South and NE
      lng = randRange(-125, -70);
      lat = randRange(28, 55);
    } else {
      // Oil - mostly coastal or islands
      lng = randRange(-80, -65);
      lat = randRange(30, 48);
    }

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
console.log("Generated synthetic fossil_plants.geojson");
