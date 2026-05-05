const fs = require('fs');
const { execSync } = require('child_process');

const geoPath = 'public/pipelines.geojson';
const tempGasPath = 'public/pipelines_temp/gas_temp.geojson';
const tempLiquidPath = 'public/pipelines_temp/liquid_temp.geojson';

console.log('--- EIA Pipeline Processing Script ---');

// 1. Process Gas Shapefile (if exists)
if (fs.existsSync('public/pipelines_temp/Natural_Gas_Pipelines.shp')) {
  console.log('Found Natural Gas shapefile. Simplifying and converting...');
  // Simplify by 15% to preserve more geometry
  execSync(`npx mapshaper public/pipelines_temp/Natural_Gas_Pipelines.shp -simplify dp 15% -each "Commodity='Gas'" -filter-fields Commodity,Opername -rename-fields Pipeline_Name=Opername -o format=geojson ${tempGasPath}`);
}

// 2. Process Liquids Shapefile (if exists)
if (fs.existsSync('public/pipelines_temp/Petroleum_Pipelines.shp')) {
  console.log('Found Petroleum/Liquids shapefile. Simplifying and converting...');
  execSync(`npx mapshaper public/pipelines_temp/Petroleum_Pipelines.shp -simplify dp 15% -each "Commodity='Liquid'" -filter-fields Commodity,Opername -rename-fields Pipeline_Name=Opername -o format=geojson ${tempLiquidPath}`);
}

// 3. Merge with existing Canadian GeoJSON
console.log('Merging with existing Canada Energy Regulator data...');
const masterGeo = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

if (fs.existsSync(tempGasPath)) {
  const gasGeo = JSON.parse(fs.readFileSync(tempGasPath, 'utf8'));
  masterGeo.features.push(...gasGeo.features);
  console.log(`Added ${gasGeo.features.length} gas pipelines.`);
}

if (fs.existsSync(tempLiquidPath)) {
  const liquidGeo = JSON.parse(fs.readFileSync(tempLiquidPath, 'utf8'));
  masterGeo.features.push(...liquidGeo.features);
  console.log(`Added ${liquidGeo.features.length} liquid pipelines.`);
}

// Write the massive merged dataset
fs.writeFileSync(geoPath, JSON.stringify(masterGeo));
console.log('Merge complete! Re-run your web server. 🚀');
