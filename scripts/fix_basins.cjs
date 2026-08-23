const fs = require('fs');

const usgsRaw = JSON.parse(fs.readFileSync('public/usgs_basins.geojson', 'utf8'));

// Only use USGS for these
const targetUsBasins = {
  'Permian Basin': { name: 'Permian Basin (Tight Oil)', color: '#6d28d9' },
  'Appalachian Basin': { name: 'Appalachian Basin (Tight Gas)', color: '#4c1d95' },
  'Anadarko Basin': { name: 'Anadarko Basin (Tight Oil)', color: '#8b5cf6' },
  'Gulf of Mexico Basin': { name: 'Gulf Coast Basin (Traditional Oil)', color: '#5b21b6' },
  'Denver Basin': { name: 'Denver Basin (Tight Oil)', color: '#7c3aed' },
  'Cook Inlet Basin': { name: 'Cook Inlet Basin (Traditional Oil)', color: '#0ea5e9' },
  'Colville Basin and Foldbelt': { name: 'North Slope / Colville (Traditional Oil)', color: '#38bdf8' },
  'Michigan Basin': { name: 'Michigan Basin (Traditional Oil)', color: '#10b981' },
  'Powder River Basin': { name: 'Powder River Basin (Tight Oil)', color: '#f43f5e' },
  'Forest City Basin': { name: 'Forest City Basin (Traditional Oil)', color: '#f59e0b' },
  'San Joaquin Basin': { name: 'San Joaquin Basin (Tight Oil)', color: '#fbbf24' }
};

const features = usgsRaw.features.filter(f => targetUsBasins[f.properties.Name]).map(f => {
  const conf = targetUsBasins[f.properties.Name];
  return {
    type: 'Feature',
    properties: {
      name: conf.name,
      type: 'basin',
      color: conf.color
    },
    geometry: f.geometry
  };
});

const manualBasins = [
  {
    name: 'Western Canada Sedimentary Basin (Traditional Oil & Gas)', color: '#6ee7b7',
    coords: [
      [-123.5, 59.5], [-120.0, 58.5], [-116.0, 54.0], [-114.5, 49.2], 
      [-109.0, 49.2], [-103.0, 49.5], [-98.0, 50.0], [-100.0, 53.0], 
      [-105.0, 56.0], [-110.0, 58.0], [-115.0, 60.0], [-120.0, 60.5], [-123.5, 59.5]
    ]
  },
  {
    name: 'Athabasca Oil Sands', color: '#fcd34d',
    coords: [
      [-114.0, 57.0], [-112.0, 58.0], [-110.5, 57.5], [-110.0, 56.0], 
      [-111.0, 55.0], [-112.5, 55.0], [-113.5, 56.0], [-114.0, 57.0]
    ]
  },
  {
    name: 'Montney Play (Tight Gas/Oil)', color: '#c084fc',
    coords: [
      [-123.5, 58.5], [-121.5, 58.5], [-119.5, 57.5], [-117.5, 56.0], 
      [-116.0, 54.5], [-116.0, 54.0], [-118.0, 54.0], [-119.5, 55.0], 
      [-121.5, 56.5], [-123.5, 57.5], [-124.0, 58.0], [-123.5, 58.5]
    ]
  },
  {
    name: 'Duvernay Play (Tight Oil)', color: '#c4b5fd',
    coords: [
      [-118.5, 55.5], [-116.5, 55.5], [-114.5, 54.0], [-113.0, 52.5], 
      [-112.0, 51.5], [-112.0, 51.0], [-114.0, 51.0], [-115.5, 52.0], 
      [-117.5, 54.0], [-119.0, 55.0], [-118.5, 55.5]
    ]
  },
  {
    name: 'Williston Basin (Tight Oil)', color: '#a78bfa',
    coords: [
      [-105.0, 46.0], [-101.0, 46.0], [-99.0, 48.0], [-100.0, 51.0], 
      [-104.0, 52.0], [-106.0, 50.0], [-107.0, 48.0], [-105.0, 46.0]
    ]
  },
  {
    name: 'Haynesville Shale (Tight Gas)', color: '#f472b6',
    coords: [
      [-94.5, 33.0], [-93.5, 32.5], [-93.2, 31.8], [-94.0, 31.5], [-94.8, 32.2], [-94.5, 33.0]
    ]
  },
  {
    name: 'Eagle Ford Play (Tight Oil)', color: '#f97316',
    coords: [
      [-100.0, 29.5], [-99.0, 28.5], [-97.5, 28.5], [-96.0, 29.5], [-97.5, 29.5], [-99.0, 29.5], [-100.0, 29.5]
    ]
  },
  {
    name: "Jeanne d'Arc Basin", color: '#38bdf8',
    coords: [
      [-49.0, 47.0], [-47.5, 47.5], [-46.5, 46.5], [-47.5, 45.8], [-48.5, 46.5], [-49.0, 47.0]
    ]
  },
  {
    name: 'Beaufort-Mackenzie Basin', color: '#2dd4bf',
    coords: [
      [-138.0, 70.0], [-134.0, 71.0], [-131.0, 70.5], [-133.0, 69.5], [-137.0, 69.5], [-138.0, 70.0]
    ]
  },
  {
    name: 'Sverdrup Basin', color: '#818cf8',
    coords: [
      [-105.0, 79.5], [-95.0, 80.5], [-85.0, 79.5], [-87.0, 77.5], [-95.0, 78.0], [-102.0, 78.5], [-105.0, 79.5]
    ]
  },
  {
    name: 'Los Angeles Basin (Traditional Oil)', color: '#f59e0b',
    coords: [
      [-118.5, 34.0], [-117.8, 33.8], [-117.5, 33.5], [-118.2, 33.5], [-118.5, 34.0]
    ]
  },
  {
    name: 'Ventura Basin (Traditional Oil)', color: '#fcd34d',
    coords: [
      [-119.5, 34.5], [-118.8, 34.3], [-118.5, 34.3], [-119.0, 34.6], [-119.5, 34.5]
    ]
  }
];

manualBasins.forEach(mb => {
  features.push({
    type: 'Feature',
    properties: { name: mb.name, type: 'basin', color: mb.color },
    geometry: {
      type: 'Polygon',
      coordinates: [mb.coords]
    }
  });
});

fs.writeFileSync('public/oil_gas_plays.geojson', JSON.stringify({ type: 'FeatureCollection', features }));
console.log('Successfully fixed formats and replaced broken geometries!');
