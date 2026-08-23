// Generates slimmed *.display.geojson copies of the heavy map layers in public/.
// The originals are kept untouched because DataSourcesPage links them for download;
// the map itself loads the display copies (see src/components/MapContainer.tsx).
// Douglas-Peucker with a 100m tolerance stays sub-pixel at the map's zoom range
// (~2.5-8); precision=0.001 (~110m) truncates coordinate noise for most of the win.
// Run: npm run geodata:simplify

const mapshaper = require('mapshaper');
const { statSync } = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
// Source originals that are NOT download-linked on the site live in data/
// so they don't ship with every deploy.
const DATA = path.join(ROOT, 'data');

const JOBS = [
  {
    in: 'pipelines.geojson',
    out: 'pipelines.display.geojson',
    // Keep only fields the map reads (Commodity filters, popup name/company),
    // then merge the 67k segments into one multipart feature per pipeline —
    // most of the original size is per-feature JSON overhead, not geometry.
    commands: '-filter-fields Pipeline_Name,Commodity,Company -dissolve fields=Pipeline_Name,Commodity,Company multipart -simplify dp interval=100 keep-shapes -o format=geojson precision=0.001',
  },
  {
    in: 'canada_grid.geojson',
    srcDir: 'data',
    out: 'canada_grid.display.geojson',
    // The map only reads `voltage`; merging 41k segments by voltage leaves ~27 features.
    commands: '-filter-fields voltage -dissolve fields=voltage multipart -simplify dp interval=100 keep-shapes -o format=geojson precision=0.001',
  },
  {
    in: 'renewables.geojson',
    out: 'renewables.display.geojson',
    // Point data: nothing to simplify, just drop excess coordinate precision (~11m).
    commands: '-o format=geojson precision=0.0001',
  },
];

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(2) + 'MB';

(async () => {
  for (const job of JOBS) {
    const inPath = path.join(job.srcDir === 'data' ? DATA : PUBLIC, job.in);
    const outPath = path.join(PUBLIC, job.out);
    await mapshaper.runCommands(`-i "${inPath}" ${job.commands.replace('-o ', `-o "${outPath}" `)}`);
    console.log(`${job.in} ${mb(inPath)} -> ${job.out} ${mb(outPath)}`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
