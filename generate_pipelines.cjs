const fs = require('fs');

const features = [
  {
    type: "Feature",
    properties: { name: "Trans Mountain (TMX)", type: "pipeline", commodity: "crude" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-113.4909, 53.5444], // Edmonton
        [-117.0210, 53.1111], // Hinton
        [-120.3273, 50.6745], // Kamloops
        [-121.9422, 49.1632], // Chilliwack
        [-122.9805, 49.2488]  // Burnaby
      ]
    }
  },
  {
    type: "Feature",
    properties: { name: "Enbridge Mainline", type: "pipeline", commodity: "crude" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-113.4909, 53.5444], // Edmonton
        [-111.3036, 52.6666], // Hardisty
        [-109.0000, 51.5000], // Border
        [-104.6189, 50.4452], // Regina
        [-101.2333, 49.7667], // Cromer
        [-97.1384, 49.0000],  // Border
        [-92.1005, 46.7208],  // Superior
        [-84.5000, 45.0000],  // Michigan traverse
        [-82.4066, 42.9745],  // Sarnia
        [-79.3832, 43.6532],  // Toronto area
        [-73.5673, 45.5017]   // Montreal
      ]
    }
  },
  {
    type: "Feature",
    properties: { name: "Keystone Pipeline", type: "pipeline", commodity: "crude" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-111.3036, 52.6666], // Hardisty
        [-104.6189, 50.4452], // Regina
        [-97.9000, 49.0000],  // Border
        [-97.0205, 40.0336],  // Steele City
        [-96.7667, 35.9833],  // Cushing
        [-93.9399, 29.8850]   // Port Arthur
      ]
    }
  },
  {
    type: "Feature",
    properties: { name: "Coastal GasLink", type: "pipeline", commodity: "gas" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-120.2377, 55.7606], // Dawson Creek
        [-122.0000, 55.0000], // Pine Pass
        [-125.0000, 54.5000], // Central BC
        [-128.6596, 54.0531]  // Kitimat
      ]
    }
  },
  {
    type: "Feature",
    properties: { name: "Alliance Pipeline", type: "pipeline", commodity: "gas" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-120.2377, 55.7606], // Dawson Creek
        [-118.0000, 55.0000], // Peace River
        [-113.4909, 53.5444], // Edmonton
        [-104.6189, 50.4452], // Regina
        [-97.0000, 49.0000],  // Border
        [-92.0000, 45.0000],  // MN
        [-87.6298, 41.8781]   // Chicago
      ]
    }
  },
  {
    type: "Feature",
    properties: { name: "NGTL Gathering Main", type: "pipeline", commodity: "gas" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-113.4909, 53.5444], // Edmonton
        [-114.0719, 51.0447], // Calgary
        [-112.8218, 49.6942]  // Pincher Creek
      ]
    }
  }
];

const geojson = {
  type: "FeatureCollection",
  features: features
};

fs.writeFileSync('public/pipelines.geojson', JSON.stringify(geojson, null, 2));
console.log("Generated major pipelines geojson!");
