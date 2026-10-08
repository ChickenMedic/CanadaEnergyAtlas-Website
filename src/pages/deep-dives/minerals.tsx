import { Gem } from 'lucide-react';
import { Callout, DataTable, Lead, MapLink } from '../../components/deepdives/ArticleBlocks';
import type { DeepDive } from './types';

export const minerals: DeepDive = {
  id: 'minerals',
  title: 'Critical Minerals',
  kicker: 'Critical minerals',
  headline: 'The New Resource Rush',
  dek:
    'Batteries, turbines, transmission lines and microchips all begin as rock. Canada has 34 minerals on its critical list, world-leading deposits of several, and a processing gap it is racing to close.',
  color: '#ec4899',
  icon: Gem,
  readingMinutes: 9,
  mapLayer: 'minerals',
  stats: [
    { value: '34', label: 'Minerals on Canada’s critical minerals list' },
    { value: '6', label: 'Priority minerals: lithium, graphite, nickel, cobalt, copper, rare earths' },
    { value: '#1', label: 'Canada’s rank among potash producers' },
    { value: '#2', label: 'Canada’s rank among uranium producers' },
  ],
  sections: [
    {
      id: 'what-is-critical',
      title: 'What makes a mineral critical',
      body: (
        <>
          <Lead>
            A critical mineral is one the economy cannot do without and cannot be sure of getting. Canada’s definition
            has two tests: the supply chain must be at risk, and Canada must have a reasonable prospect of producing
            the mineral itself.
          </Lead>
          <p>
            The first federal list, in 2021, named 31 minerals. The 2024 update added high-purity iron, phosphorus and
            silicon metal, for 34. Six are treated as priorities because they anchor the battery, grid and clean-energy
            supply chains: lithium, graphite, nickel, cobalt, copper and the rare earth elements. The United States
            keeps a parallel list of 50, and the two countries have coordinated through a joint action plan since
            2020.
          </p>
          <MapLink layer="minerals" title="See mines and deposits on the map">
            The Critical Minerals layer marks uranium, nickel, copper, lithium and rare-earth sites across the
            continent.
          </MapLink>
        </>
      ),
    },
    {
      id: 'leads',
      title: 'Where Canada already leads',
      body: (
        <>
          <DataTable
            title="Minerals where Canada is a top-tier producer"
            columns={[{ header: 'Mineral' }, { header: 'Where' }, { header: 'Why it matters' }]}
            rows={[
              ['Potash', 'Saskatchewan', 'World’s largest producer, roughly a third of global supply; fertiliser for global food security. BHP’s Jansen mine will add more'],
              ['Uranium', 'Athabasca Basin, Saskatchewan', 'Second-largest producer; the highest-grade mines on Earth at McArthur River and Cigar Lake'],
              ['Nickel', 'Sudbury ON, Voisey’s Bay NL, Raglan QC', 'Top-ten producer; the Sudbury basin has been mined since the 1880s and produces cobalt and platinum-group metals alongside'],
              ['Aluminium', 'Quebec and Kitimat, BC', 'Not mined but smelted: Canada is the fourth-largest producer, using hydro power that gives it one of the lowest carbon footprints in the industry'],
              ['Copper', 'British Columbia, Ontario, Quebec', 'Highland Valley in BC is Canada’s largest copper mine; demand is set to rise sharply with grid expansion'],
            ]}
          />
        </>
      ),
    },
    {
      id: 'battery-chain',
      title: 'The battery chain',
      body: (
        <>
          <p>
            A lithium-ion battery needs lithium, graphite, nickel, cobalt and manganese, plus copper and aluminium for
            its current collectors and casing. Canada has all of them in the ground. Turning them into cells is the
            hard part.
          </p>
          <ul>
            <li>
              <strong>Lithium.</strong> The North American Lithium mine in Quebec’s Abitibi region restarted in 2023
              and is the country’s only producing hard-rock lithium mine. In Alberta, companies are testing direct
              extraction from the lithium-rich brines that come up with oil from the Leduc formation.
            </li>
            <li>
              <strong>Graphite.</strong> Northern Graphite’s Lac des Îles mine in Quebec is the only operating graphite
              mine in North America. Graphite makes up the anode of almost every lithium-ion cell.
            </li>
            <li>
              <strong>Nickel and cobalt.</strong> Mined together in Sudbury and Labrador. Electra Battery Materials is
              building North America’s first battery-grade cobalt sulphate refinery at Temiskaming Shores, Ontario.
            </li>
            <li>
              <strong>Cells.</strong> Battery plants under construction or announced in Windsor and St. Thomas,
              Ontario, are meant to be the domestic customers for this material.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'rare-earths',
      title: 'Rare earths',
      body: (
        <>
          <p>
            The 17 rare earth elements make the permanent magnets in wind turbines, electric motors and hard drives.
            They are not rare in the Earth’s crust, but China mines about 60 per cent of them and processes about 90
            per cent, a concentration no other critical mineral matches.
          </p>
          <p>
            Canada’s response is small but real. The Nechalacho project in the Northwest Territories began
            demonstration mining in 2021, the first rare earth mine in the country. In Saskatoon, the Saskatchewan
            Research Council has built the first rare earth processing facility in North America, which is the step
            that has been missing: the ability to turn concentrate into separated oxides and metals without sending it
            to China.
          </p>
        </>
      ),
    },
    {
      id: 'processing-gap',
      title: 'The processing gap',
      body: (
        <>
          <Callout title="Mining is not a supply chain">
            A mine produces concentrate. Between the mine and the battery plant are smelting, refining, chemical
            conversion and component manufacturing, and for most critical minerals the majority of that mid-stream
            capacity is in China. A country can be a major miner and still be fully import-dependent for finished
            material.
          </Callout>
          <p>
            Closing that gap is the explicit goal of Canada’s 2022 Critical Minerals Strategy, backed by $3.8 billion
            over eight years. The main tools are a 30 per cent Critical Mineral Exploration Tax Credit for
            flow-through investors and a 30 per cent Clean Technology Manufacturing investment tax credit that covers
            extraction and processing equipment. The federal Strategic Innovation Fund has co-financed refineries,
            cathode plants and the Saskatoon rare earth facility.
          </p>
          <p>
            The United States has moved in parallel through the Defense Production Act and the Inflation Reduction
            Act, whose domestic-content rules treat Canadian-processed material as qualifying. Both governments frame
            the effort in security terms as much as industrial ones, which is why NATO allies feature prominently in
            Canadian critical-minerals diplomacy.
          </p>
        </>
      ),
    },
    {
      id: 'ring-of-fire',
      title: 'The Ring of Fire and the frontier',
      body: (
        <>
          <p>
            About 500 kilometres northeast of Thunder Bay, in the James Bay lowlands, lies the Ring of Fire: a cluster
            of chromite, nickel, copper and platinum-group deposits discovered in 2007. The Eagle’s Nest nickel
            deposit is the most advanced project. Nothing has been mined because nothing reaches the area by road.
          </p>
          <p>
            Ontario has committed to building all-season roads with the First Nations of the region, and the debate
            over how fast to proceed, and on whose terms, is the clearest example of a national pattern: most major
            critical-mineral deposits in Canada lie on or near Indigenous territory, and no project advances without
            community partnership.
          </p>
        </>
      ),
    },
    {
      id: 'priority-six',
      title: 'The six priority minerals at a glance',
      body: (
        <>
          <DataTable
            title="Canada’s six priority critical minerals"
            columns={[{ header: 'Mineral' }, { header: 'Main clean-energy use' }, { header: 'Canadian position' }]}
            rows={[
              ['Lithium', 'Battery cathodes and electrolyte', 'One producing hard-rock mine in Quebec; brine projects in Alberta'],
              ['Graphite', 'Battery anodes', 'The only operating graphite mine in North America'],
              ['Nickel', 'High-energy battery cathodes, stainless steel', 'Top-ten producer with century-old mining districts'],
              ['Cobalt', 'Battery cathodes, superalloys', 'By-product of nickel; first battery-grade refinery under construction'],
              ['Copper', 'Wiring, motors, transmission lines', 'Large producer in BC, Ontario and Quebec; demand rising fastest of the six'],
              ['Rare earths', 'Permanent magnets for turbines and motors', 'First mine and first processing plant now operating'],
            ]}
          />
          <p>
            Geology gave Canada an unusually complete set of ingredients. Whether it builds the kitchen to cook them,
            the refineries and plants that turn rock into components, will decide how much of the energy transition
            it supplies rather than merely feeds.
          </p>
        </>
      ),
    },
  ],
  sources: [
    { org: 'Natural Resources Canada', title: 'Canadian Critical Minerals Strategy; 2024 critical minerals list', url: 'https://www.canada.ca/en/campaign/critical-minerals-in-canada.html' },
    { org: 'U.S. Geological Survey', title: '2022 list of critical minerals; Mineral Commodity Summaries', url: 'https://www.usgs.gov/' },
    { org: 'International Energy Agency', title: 'Global Critical Minerals Outlook', url: 'https://www.iea.org/' },
    { org: 'Saskatchewan Research Council', title: 'Rare Earth Processing Facility', url: 'https://www.src.sk.ca/' },
    { org: 'Cameco and Nutrien', title: 'Annual reports and operations overviews' },
    { org: 'Government of Ontario', title: 'Ring of Fire community road agreements', url: 'https://www.ontario.ca/' },
  ],
};
