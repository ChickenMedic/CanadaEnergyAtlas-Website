const fs = require('fs');

const features = [
  // Trans Mountain (TMX)
  {
    type: "Feature",
    properties: { name: "Trans Mountain Pipeline (TMX)", type: "pipeline", commodity: "crude", status: "active" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-113.3, 53.5], // Edmonton Terminal
        [-114.9, 53.6], // Pembina
        [-117.0, 53.1], // Hinton
        [-118.0, 52.8], // Jasper
        [-119.3, 52.3], // Blue River
        [-120.3, 50.7], // Kamloops
        [-121.0, 50.1], // Merritt
        [-121.5, 49.4], // Hope
        [-122.0, 49.2], // Chilliwack
        [-122.9, 49.3]  // Burnaby Terminal
      ]
    }
  },
  // Enbridge Mainline (Line 1, 2, 3, 4, 67, etc.)
  {
    type: "Feature",
    properties: { name: "Enbridge Mainline", type: "pipeline", commodity: "crude", status: "active" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-113.3, 53.5], // Edmonton
        [-111.3, 52.7], // Hardisty Hub
        [-109.1, 51.7], // Kerrobert
        [-106.6, 51.1], // Saskatoon Area
        [-104.6, 50.4], // Regina
        [-101.2, 49.8], // Cromer
        [-97.8, 49.0],  // Gretna (Border crossing)
        [-95.0, 47.9],  // Clearbrook MN
        [-92.1, 46.7],  // Superior WI
        [-86.0, 46.0],  // Straits of Mackinac (Line 5 route)
        [-82.4, 43.0],  // Sarnia ON
        [-79.9, 43.2],  // Westover
        [-73.6, 45.5]   // Montreal
      ]
    }
  },
  // Keystone Pipeline System
  {
    type: "Feature",
    properties: { name: "Keystone Pipeline System", type: "pipeline", commodity: "crude", status: "active" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-111.3, 52.7], // Hardisty Hub
        [-108.0, 51.5], // Oyen area
        [-104.6, 50.4], // Regina
        [-98.0, 49.0],  // Haskett (Border crossing)
        [-97.5, 45.0],  // SD
        [-97.0, 40.0],  // Steele City NE
        [-96.8, 36.0],  // Cushing OK
        [-93.9, 29.9]   // Port Arthur TX
      ]
    }
  },
  // Coastal GasLink
  {
    type: "Feature",
    properties: { name: "Coastal GasLink", type: "pipeline", commodity: "gas", status: "active" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-120.2, 55.8], // Dawson Creek (Groundbirch)
        [-121.5, 55.6], // Chetwynd
        [-122.5, 55.0], // Pine Pass
        [-124.0, 54.5], // Stuart River
        [-126.0, 54.3], // Houston
        [-128.0, 54.1], // Kitimat Ranges
        [-128.7, 54.0]  // Kitimat LNG Facility
      ]
    }
  },
  // Alliance Pipeline
  {
    type: "Feature",
    properties: { name: "Alliance Pipeline", type: "pipeline", commodity: "gas", status: "active" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-120.2, 55.8], // Dawson Creek
        [-118.8, 55.2], // Grande Prairie
        [-115.6, 54.1], // Whitecourt
        [-113.3, 53.5], // Edmonton area
        [-111.3, 52.7], // Hardisty
        [-104.6, 50.4], // Regina
        [-101.5, 49.3], // Estevan
        [-100.0, 49.0], // Border
        [-97.0, 46.0],  // ND/MN
        [-92.0, 43.0],  // IA
        [-88.1, 41.4]   // Aux Sable (Chicago)
      ]
    }
  },
  // TransCanada Mainline (Gas)
  {
    type: "Feature",
    properties: { name: "TC Energy Mainline", type: "pipeline", commodity: "gas", status: "active" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-110.0, 50.0], // Empress (Alberta border)
        [-105.5, 50.4], // Moose Jaw
        [-104.6, 50.4], // Regina
        [-97.1, 49.8],  // Winnipeg
        [-94.5, 49.8],  // Kenora
        [-89.2, 48.4],  // Thunder Bay
        [-84.0, 46.5],  // Sault Ste Marie
        [-79.4, 43.6],  // Toronto
        [-75.7, 45.4],  // Ottawa
        [-73.6, 45.5],  // Montreal
        [-71.2, 46.8]   // Quebec City
      ]
    }
  },
  // NGTL System (Dense network abstraction)
  {
    type: "Feature",
    properties: { name: "NGTL System Backbone", type: "pipeline", commodity: "gas", status: "active" },
    geometry: {
      type: "MultiLineString",
      coordinates: [
        [
          [-118.8, 55.2], // Grande Prairie
          [-113.3, 53.5], // Edmonton
          [-114.1, 51.0], // Calgary
          [-112.8, 49.7]  // Pincher Creek
        ],
        [
          [-113.3, 53.5], // Edmonton
          [-111.3, 52.7], // Hardisty
          [-110.0, 50.0]  // Empress
        ]
      ]
    }
  },
  // Express Pipeline
  {
    type: "Feature",
    properties: { name: "Express Pipeline", type: "pipeline", commodity: "crude", status: "active" },
    geometry: {
      type: "LineString",
      coordinates: [
        [-111.3, 52.7], // Hardisty
        [-111.0, 49.0], // Border
        [-106.3, 42.8]  // Casper, WY
      ]
    }
  }
];

const geojson = {
  type: "FeatureCollection",
  features: features
};

fs.writeFileSync('public/pipelines.geojson', JSON.stringify(geojson, null, 2));
console.log("Generated comprehensive major pipelines geojson!");
