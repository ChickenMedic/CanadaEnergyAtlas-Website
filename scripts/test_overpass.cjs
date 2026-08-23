const fs = require('fs');

async function testOverpass() {
  const query = `
    [out:json][timeout:90];
    (
      way["man_made"="pipeline"]["substance"~"gas|oil|petroleum|crude|natural_gas|ngl"](24.396308,-125.000000,49.384358,-66.934570);
    );
    out geom;
  `;
  
  console.log('Fetching all US oil/gas pipelines...');
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
    console.log(`Found ${data.elements.length} pipelines in the US.`);
    fs.writeFileSync('osm_test_output.json', JSON.stringify(data));
  } catch (e) {
    console.log('Error parsing JSON. Raw text starts with:', text.substring(0, 500));
  }
}

testOverpass();
