const fs = require('fs');
const path = require('path');

const minerals = [
  // Original
  { type: "mineral", subtype: "uranium", name: "McArthur River Mine", operator: "Cameco", description: "World's largest high-grade uranium mine.", status: "Active", coords: [-105.155, 59.553] },
  { type: "mineral", subtype: "uranium", name: "Cigar Lake Mine", operator: "Cameco", description: "Highest-grade uranium mine in the world.", status: "Active", coords: [-104.148, 58.261] },
  { type: "mineral", subtype: "nickel", name: "Sudbury Basin", operator: "Vale / Glencore", description: "Massive nickel/copper/cobalt mining district.", status: "Active", coords: [-81.016, 46.486] },
  { type: "mineral", subtype: "nickel", name: "Raglan Mine", operator: "Glencore", description: "Major nickel-copper mine in Nunavik.", status: "Active", coords: [-77.778, 61.688] },
  { type: "mineral", subtype: "nickel", name: "Thompson Nickel Belt", operator: "Vale", description: "Major nickel production hub in Manitoba.", status: "Active", coords: [-98.115, 55.748] },
  { type: "mineral", subtype: "copper", name: "Highland Valley Copper", operator: "Teck Resources", description: "Largest open-pit copper mine in Canada.", status: "Active", coords: [-118.067, 50.490] },
  { type: "mineral", subtype: "copper", name: "Bingham Canyon Mine", operator: "Rio Tinto", description: "Largest open-pit copper mine in the US.", status: "Active", coords: [-112.062, 41.012] },
  { type: "mineral", subtype: "copper", name: "Morenci Mine", operator: "Freeport-McMoRan", description: "Largest copper producer in North America.", status: "Active", coords: [-110.871, 33.315] },
  { type: "mineral", subtype: "rare_earth", name: "Mountain Pass Mine", operator: "MP Materials", description: "Only active rare earth elements mine in the US.", status: "Active", coords: [-115.539, 35.474] },
  { type: "mineral", subtype: "rare_earth", name: "Nechalacho Rare Earth Project", operator: "Cheetah Resources", description: "Major rare earth elements project in NWT.", status: "Active / Developing", coords: [-113.882, 63.585] },
  { type: "mineral", subtype: "lithium", name: "North American Lithium (NAL)", operator: "Sayona Mining", description: "Major hard-rock lithium operation in Quebec.", status: "Active", coords: [-77.712, 48.375] },
  { type: "mineral", subtype: "lithium", name: "Tanco Mine", operator: "Sinomine", description: "Lithium, tantalum, and cesium producer in Manitoba.", status: "Active", coords: [-94.945, 50.413] },
  { type: "mineral", subtype: "lithium", name: "Silver Peak Mine", operator: "Albemarle", description: "Only active lithium brine operation in the US.", status: "Active", coords: [-117.818, 37.766] },
  { type: "mineral", subtype: "lithium", name: "Thacker Pass Lithium Project", operator: "Lithium Americas", description: "Largest known lithium deposit in the US.", status: "Developing", coords: [-118.064, 41.696] },
  { type: "mineral", subtype: "cobalt", name: "Idaho Cobalt Operations", operator: "Jervois", description: "Primary cobalt mine in the United States.", status: "Active / Commissioning", coords: [-114.398, 45.093] },
  { type: "mineral", subtype: "graphite", name: "Matawinie Graphite Project", operator: "Nouveau Monde Graphite", description: "World-class graphite development in Quebec.", status: "Developing", coords: [-75.836, 45.143] },
  { type: "mineral", subtype: "potash", name: "Allan Potash Mine", operator: "Nutrien", description: "Massive potash fertilizer operation.", status: "Active", coords: [-106.128, 51.688] },
  { type: "mineral", subtype: "potash", name: "Bethune Potash Mine", operator: "K+S", description: "Major solution potash mine in Saskatchewan.", status: "Active", coords: [-104.981, 50.510] }
];

const generated = [...minerals];

const randomInRange = (min, max) => Math.random() * (max - min) + min;

// Add generic synthetic ones so map looks less sparse
const syntheticSpecs = [
  { subtype: "uranium", count: 8, bounds: { minLon: -110, maxLon: -100, minLat: 50, maxLat: 60 } },
  { subtype: "uranium", count: 4, bounds: { minLon: -115, maxLon: -105, minLat: 35, maxLat: 45 } },
  { subtype: "nickel", count: 10, bounds: { minLon: -90, maxLon: -70, minLat: 45, maxLat: 55 } },
  { subtype: "nickel", count: 5, bounds: { minLon: -100, maxLon: -90, minLat: 45, maxLat: 50 } },
  { subtype: "copper", count: 12, bounds: { minLon: -125, maxLon: -110, minLat: 30, maxLat: 55 } },
  { subtype: "copper", count: 6, bounds: { minLon: -90, maxLon: -80, minLat: 45, maxLat: 50 } },
  { subtype: "rare_earth", count: 7, bounds: { minLon: -120, maxLon: -110, minLat: 35, maxLat: 50 } },
  { subtype: "rare_earth", count: 5, bounds: { minLon: -115, maxLon: -100, minLat: 55, maxLat: 65 } },
  { subtype: "lithium", count: 12, bounds: { minLon: -120, maxLon: -110, minLat: 35, maxLat: 45 } },
  { subtype: "lithium", count: 8, bounds: { minLon: -80, maxLon: -70, minLat: 45, maxLat: 55 } }
];

syntheticSpecs.forEach(spec => {
  for (let i = 0; i < spec.count; i++) {
    generated.push({
      type: "mineral",
      subtype: spec.subtype,
      name: `Synthetic ${spec.subtype.charAt(0).toUpperCase() + spec.subtype.slice(1)} Project ${Math.floor(Math.random() * 1000)}`,
      operator: "Unknown",
      description: "Exploration or developing phase resource.",
      status: "Exploration",
      coords: [
        randomInRange(spec.bounds.minLon, spec.bounds.maxLon),
        randomInRange(spec.bounds.minLat, spec.bounds.maxLat)
      ]
    });
  }
});

const featureCollection = {
  type: "FeatureCollection",
  features: generated.map(item => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: item.coords },
    properties: {
      type: item.type,
      subtype: item.subtype,
      name: item.name,
      operator: item.operator,
      description: item.description,
      status: item.status
    }
  }))
};

fs.writeFileSync(path.join(__dirname, 'public', 'minerals.geojson'), JSON.stringify(featureCollection, null, 2));
console.log('minerals.geojson updated with ' + generated.length + ' points');
