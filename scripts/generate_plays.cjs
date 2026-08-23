const fs = require('fs');

const plays = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Western Canada Sedimentary Basin', type: 'basin', color: '#7c3aed' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-123.5, 61.5], [-121.0, 58.0], [-118.0, 54.0], [-114.5, 51.0], [-114.0, 49.0],
            [-104.0, 49.0], [-97.0, 49.0], [-98.5, 51.5], [-102.0, 54.0], [-106.0, 56.5],
            [-111.0, 59.0], [-116.0, 61.5], [-123.5, 61.5]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Montney Play', type: 'basin', color: '#8b5cf6' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-122.5, 57.5], [-119.0, 55.0], [-117.0, 54.5], [-118.5, 56.5], [-122.5, 57.5]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Duvernay Play', type: 'basin', color: '#8b5cf6' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-118.0, 55.0], [-114.0, 52.5], [-115.5, 54.5], [-118.0, 55.0]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Williston Basin (Bakken)', type: 'basin', color: '#a78bfa' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-106.0, 49.0], [-100.0, 49.0], [-98.5, 47.0], [-99.5, 45.0], [-103.0, 44.5],
            [-105.5, 45.5], [-107.0, 47.5], [-106.0, 49.0]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Permian Basin', type: 'basin', color: '#6d28d9' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-104.5, 33.5], [-100.5, 33.5], [-100.0, 31.0], [-102.5, 30.0], [-104.5, 31.5], [-104.5, 33.5]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Appalachian Basin (Marcellus)', type: 'basin', color: '#4c1d95' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.0, 42.5], [-76.0, 40.5], [-79.0, 38.5], [-82.0, 37.5], [-83.0, 39.5],
            [-81.0, 41.5], [-78.0, 42.5], [-75.0, 42.5]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Eagle Ford', type: 'basin', color: '#5b21b6' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-100.5, 29.5], [-97.5, 29.5], [-96.5, 28.5], [-98.5, 27.5], [-100.5, 29.5]
          ]
        ]
      }
    }
  ]
};

fs.writeFileSync('public/oil_gas_plays.geojson', JSON.stringify(plays, null, 2));
console.log('Saved 7 major North American plays to public/oil_gas_plays.geojson');
