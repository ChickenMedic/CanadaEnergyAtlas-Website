import { Factory } from 'lucide-react';
import { BarList, Callout, DataTable, Lead, MapLink, Timeline } from '../../components/deepdives/ArticleBlocks';
import type { DeepDive } from './types';

export const refining: DeepDive = {
  id: 'refining',
  title: 'Refining',
  kicker: 'Refining and processing',
  headline: 'From Crude to Combustion',
  dek:
    'Sixteen Canadian refineries and about 130 American ones turn 20 million barrels of crude a day into fuel. The two systems were built to need each other, and 2025 showed both the strength and the strain of that bond.',
  color: '#a855f7',
  icon: Factory,
  readingMinutes: 14,
  mapLayer: 'refining',
  stats: [
    { value: '1.9M b/d', label: 'Canadian crude distillation capacity, 16 refineries' },
    { value: '18.4M b/d', label: 'US operable capacity, January 2025' },
    { value: '62%', label: 'Share of US crude imports that come from Canada' },
    { value: '$151B', label: 'Bilateral energy trade in 2024' },
  ],
  sections: [
    {
      id: 'footprint',
      title: 'Canada’s refining footprint',
      body: (
        <>
          <Lead>
            Canada is better known for producing crude than for processing it, but its refining industry ranks about
            eleventh in the world by capacity. Sixteen refineries, including two that make mainly asphalt, can distil
            roughly 1.9 million barrels a day. Where they sit is no accident.
          </Lead>
          <p>Refineries cluster where they can reach either cheap feedstock or large markets. Canada has three clusters.</p>
          <h3>Western Canada</h3>
          <p>
            Seven refineries sit close to the oil sands and Saskatchewan’s heavy-oil fields, processing a mix of
            heavy crude, synthetic crude from upgraders and light conventional oil. The centre is Alberta’s Industrial
            Heartland around Edmonton and Fort Saskatchewan, where plants such as Imperial’s Strathcona refinery were
            engineered for the chemistry of bitumen-derived feedstock.
          </p>
          <h3>Ontario</h3>
          <p>
            Sarnia’s Chemical Valley has refined oil since the late nineteenth century. Its refineries and
            petrochemical plants are tied by pipeline to Western Canadian supply and to the US Midwest, and they feed
            the Greater Toronto Area and the manufacturing belt of southwestern Ontario.
          </p>
          <h3>Quebec and Atlantic Canada</h3>
          <p>
            The eastern cluster is defined by salt water. Irving Oil’s Saint John refinery, the largest in the
            country, has no pipeline to the West and imports most of its crude by tanker, much of it from the US Gulf
            Coast. Quebec’s two refineries, Valero’s Jean Gaulin plant at Lévis and Suncor’s Montreal plant, shifted
            to Western Canadian and US shale crude after Enbridge reversed Line 9B in 2015 to flow oil east from
            Ontario.
          </p>
          <MapLink layer="refining" title="Find the refineries on the map">
            The Refineries layer marks oil refineries and gas-processing plants across both countries.
          </MapLink>
        </>
      ),
    },
    {
      id: 'capacity',
      title: 'The refineries, by capacity',
      body: (
        <BarList
          title="Operating Canadian refineries"
          unit="barrels per day"
          items={[
            { label: 'Irving Oil, Saint John NB', value: 320000, display: '320,000', note: 'Largest in Canada; export-oriented, marine-fed' },
            { label: 'Valero Jean Gaulin, Lévis QC', value: 265000, display: '265,000', note: 'Supplies Quebec and Ontario' },
            { label: 'Imperial Strathcona, AB', value: 191000, display: '191,000', note: 'Largest in the West; specialty lubricants' },
            { label: 'Suncor Edmonton, AB', value: 147000, display: '147,000', note: 'Integrated with oil sands supply' },
            { label: 'Suncor Montreal, QC', value: 137000, display: '137,000', note: 'Petrochemical hub' },
            { label: 'Co-op Regina, SK', value: 130000, display: '130,000', note: 'Integrated upgrader and refinery' },
            { label: 'Imperial Sarnia, ON', value: 121000, display: '121,000', note: 'Major chemical producer' },
            { label: 'Imperial Nanticoke, ON', value: 112000, display: '112,000', note: 'Serves the GTA' },
            { label: 'Shell Scotford, AB', value: 100000, display: '100,000', note: 'Paired with the Quest carbon-capture project' },
            { label: 'Suncor Sarnia, ON', value: 85000, display: '85,000' },
            { label: 'Shell Corunna, ON', value: 75000, display: '75,000' },
            { label: 'Parkland Burnaby, BC', value: 55000, display: '55,000', note: 'Only refinery on the BC coast; co-processes bio-feedstock' },
            { label: 'Cenovus Lloydminster, SK', value: 30000, display: '30,000', note: 'Asphalt' },
            { label: 'Tidewater Prince George, BC', value: 12000, display: '12,000', note: 'Regional supply; renewable diesel' },
          ]}
          note="Nameplate capacities, 2024–25. The former Come By Chance refinery in Newfoundland (115,000 b/d) now produces renewable diesel as Braya Renewable Fuels and is excluded."
        />
      ),
    },
    {
      id: 'us-system',
      title: 'The American system and the PADDs',
      body: (
        <>
          <p>
            The United States runs the largest and most sophisticated refining system in the world. On 1 January 2025
            its operable atmospheric distillation capacity stood at 18.4 million barrels per calendar day, essentially
            flat on 2024 despite several closures. It is the destination for most Canadian heavy crude and the supplier
            of light oil and finished products to Eastern Canada.
          </p>
          <Callout title="Calendar day versus stream day">
            Calendar-day capacity is what a unit processes over a year allowing for planned and unplanned downtime.
            Stream-day capacity is the maximum throughput at full load with an ideal crude slate and no outages. Stream
            day figures run about 6 per cent higher. Rankings change depending on which is used: in 2025 Marathon’s
            Galveston Bay refinery was the largest on a stream-day basis at 665,000 barrels a day, while Motiva’s Port
            Arthur plant led on calendar-day capacity.
          </Callout>
          <p>
            US refining is organised into five Petroleum Administration for Defense Districts, or PADDs. Over half of
            all capacity sits on the Gulf Coast. For Canada, the Midwest matters most: its refineries were built to
            run heavy, sour Canadian crude and cannot easily switch to anything else.
          </p>
          <DataTable
            title="US refining capacity and reliance on Canadian crude"
            columns={[{ header: 'District' }, { header: 'Capacity (b/cd)', align: 'right' }, { header: 'Canadian crude' }]}
            rows={[
              ['PADD 1, East Coast', '877,800', 'Low to moderate, mostly waterborne'],
              ['PADD 2, Midwest', '3,948,885', 'Very high: effectively all imports are Canadian'],
              ['PADD 3, Gulf Coast', '9,676,729', 'High and rising with new pipeline capacity'],
              ['PADD 4, Rocky Mountain', '650,164', 'Extreme: about 44% of net refinery input'],
              ['PADD 5, West Coast', '2,694,571', 'Rising since the Trans Mountain expansion'],
            ]}
            note="Operable capacity as of 1 January 2025, EIA."
          />
          <p>
            Three companies dominate: Marathon Petroleum, Valero and ExxonMobil.
          </p>
        </>
      ),
    },
    {
      id: 'process',
      title: 'Inside the fence: how refining works',
      body: (
        <>
          <p>
            A refinery does not make one product from one input. It separates crude into fractions, reshapes the
            fractions the market does not want into the ones it does, and then cleans everything up.
          </p>
          <Timeline
            items={[
              {
                marker: '1',
                title: 'Separation',
                text: (
                  <>
                    Crude is heated to about 400 °C and fed into a distillation tower. Hydrocarbons boil at
                    temperatures set by the length of their carbon chains, so they separate as they rise: light gases
                    at the top, then naphtha for gasoline, kerosene for jet fuel, and diesel. The heavy bottoms that
                    will not vaporise go to a vacuum unit, where lower pressure lets them boil without cracking and
                    fouling the equipment.
                  </>
                ),
              },
              {
                marker: '2',
                title: 'Conversion',
                text: (
                  <>
                    <strong>Fluid catalytic cracking</strong> uses heat and a powdered catalyst to break heavy gas oils
                    into high-octane gasoline components. <strong>Hydrocracking</strong> does the same in a
                    high-pressure hydrogen environment and yields clean diesel and jet fuel. <strong>Reforming</strong>{' '}
                    rearranges low-octane naphtha into high-octane aromatics. <strong>Coking</strong> heats the heaviest
                    residue until it cracks, leaving petroleum coke for steel and aluminium smelting. Cokers are what
                    let a refinery run Canadian bitumen.
                  </>
                ),
              },
              {
                marker: '3',
                title: 'Treating',
                text: (
                  <>
                    Hydrotreating passes unfinished products over a catalyst with hydrogen to strip out sulphur,
                    nitrogen and oxygen. This is the step that produces ultra-low-sulphur diesel and keeps tailpipe
                    emissions within regulation.
                  </>
                ),
              },
            ]}
          />
        </>
      ),
    },
    {
      id: 'integration',
      title: 'Two systems, one market',
      body: (
        <>
          <p>
            Bilateral energy trade reached an estimated US$151 billion in 2024. Canada supplies about 62 per cent of
            all crude the United States imports, and the dependence runs both ways.
          </p>
          <p>
            Many Midwest refineries have cokers and hydrotreaters sized for heavy, sour crude. Switching them to light
            shale oil would mean rebuilding them. On the Canadian side, Ontario and Quebec carry transit risk: about
            half the natural gas they burn is American, and Ontario’s crude arrives entirely via the Enbridge
            Mainline, which runs through Michigan.
          </p>
          <p>
            The Trans Mountain expansion changed the map in 2024. Westridge terminal has shipped more than 350,000
            barrels a day since June of that year, most of it to the US West Coast and Asia, giving Alberta a second
            outlet for the first time.
          </p>
          <Callout title="The tariff threat of 2025">
            Early in 2025 the United States proposed a 10 per cent tariff on Canadian energy. On Western Canadian
            Select that worked out to roughly US$6.30 a barrel. Because most Canadian heavy crude still has nowhere
            else to go, producers rather than American refiners would have absorbed most of that cost. The episode
            made the economic case for tidewater access unusually concrete.
          </Callout>
        </>
      ),
    },
    {
      id: 'record-year',
      title: '2025: a record year',
      body: (
        <>
          <p>
            Despite the long-run shift toward electrification, 2025 was a record year for Canadian refined-product
            output. Production of finished products rose 1.4 per cent to 117.1 million cubic metres.
          </p>
          <DataTable
            title="Canadian refined-product output"
            columns={[
              { header: 'Product' },
              { header: '2024 (million m³)', align: 'right' },
              { header: '2025 (million m³)', align: 'right' },
              { header: '2025 consumption growth', align: 'right' },
            ]}
            rows={[
              ['Motor gasoline', '42.6', '44.4', '+2.7%'],
              ['Distillate fuel oil', '41.6', '42.3', '+2.2%'],
              ['Jet fuel', '6.4', '6.6', '+8.0%'],
              ['Other (asphalt, coke)', '24.9', '23.9', '−0.5%'],
            ]}
          />
          <p>
            The surge came from a rebound in travel and lower prices: motor gasoline fell 8.6 per cent on average over
            the year. Imports of refined products were 31.5 per cent below their 2019 level, and Canada ran a trade
            surplus in refined products of 10.9 million cubic metres. The country is becoming more self-sufficient in
            fuel even as production climbs.
          </p>
        </>
      ),
    },
    {
      id: 'renewable-fuels',
      title: 'Renewable fuels and the refinery of the future',
      body: (
        <>
          <p>
            The most visible trend of 2024 and 2025 was petroleum assets being rebuilt as renewable-fuel plants,
            pushed by Canada’s Clean Fuel Regulations and the US Renewable Fuel Standard.
          </p>
          <ul>
            <li>
              <strong>Braya Renewable Fuels, Newfoundland.</strong> The former Come By Chance refinery now produces
              renewable diesel and sustainable aviation fuel.
            </li>
            <li>
              <strong>Phillips 66 Rodeo, California.</strong> Stopped processing crude in 2024 and runs entirely on
              bio-feedstock.
            </li>
            <li>
              <strong>Parkland Burnaby, British Columbia.</strong> A pioneer of co-processing, running canola oil and
              tallow through the same units as crude to cut the carbon intensity of the finished fuel.
            </li>
            <li>
              <strong>Electra Battery Materials, Ontario.</strong> Not a petroleum refinery at all, but a sign of
              where refining skills are going: the plant at Temiskaming Shores is being expanded into North America’s
              first battery-grade cobalt sulphate refinery, with $20 million in federal support announced in 2026.
            </li>
          </ul>
          <p>
            Beyond the oil companies, groups such as Ecostrat and the BMI Group are converting idle pulp and paper
            mills into biorefineries that turn Canadian forest fibre into next-generation fuels, bringing industrial
            jobs back to rural Ontario and the Maritimes.
          </p>
        </>
      ),
    },
    {
      id: 'carbon-capture',
      title: 'Carbon capture',
      body: (
        <>
          <p>
            Canadian projects account for about 11.5 per cent of planned global carbon capture, utilisation and
            storage capacity, and Western Canada has an unusual advantage: an estimated 389 billion tonnes of
            potential storage in deep saline formations and depleted reservoirs.
          </p>
          <DataTable
            title="Flagship Canadian capture projects"
            columns={[{ header: 'Project' }, { header: 'Location' }, { header: 'CO₂ source' }, { header: 'Scale' }]}
            rows={[
              ['Quest', 'Alberta', 'Scotford upgrader hydrogen units', 'Captures about 1.1 Mt a year; more than 9 Mt stored since 2015'],
              ['Alberta Carbon Trunk Line', 'Alberta', 'Sturgeon refinery and fertiliser plant', '14.6 Mt a year pipeline capacity; CO₂ used for enhanced oil recovery'],
              ['Glacier', 'Alberta', 'Gas processing', 'Over 90% capture rates at commercial scale'],
              ['Boundary Dam', 'Saskatchewan', 'Coal power', 'World’s first commercial coal-power capture project, 2014'],
            ]}
          />
          <p>
            The industry’s stated ambition is to scale storage fivefold by 2030, with new hubs such as Shell and
            ATCO’s Atlas Carbon Storage Hub and the Wolf Lamont hub in construction or development.
          </p>
        </>
      ),
    },
    {
      id: 'economy',
      title: 'Jobs, GDP and royalties',
      body: (
        <>
          <p>
            Refining is a high-wage, high-productivity business with a long supply chain behind it. In the United
            States it employs 64,500 people directly and supports about three million jobs in total, a multiplier of
            roughly 45 to one.
          </p>
          <DataTable
            title="Economic weight of the sector"
            columns={[{ header: 'Metric' }, { header: 'Canada (petroleum sector)', align: 'right' }, { header: 'United States (refining)', align: 'right' }]}
            rows={[
              ['Direct jobs', '181,100', '64,500'],
              ['Total jobs, including indirect', '~450,000', '2,967,400'],
              ['Direct GDP contribution', '$166 billion', '$169 billion'],
              ['Total value added', '$208 billion', '$688 billion'],
              ['Average labour income', 'About 2× the national average', '$334,000 including benefits'],
            ]}
            note="Canadian figures cover extraction, pipelines and refining (2023, CAD). US figures cover refining only (2024, USD)."
          />
          <p>
            In 2024 and 2025 the Canadian oil and gas sector was expected to pay more than $20 billion a year in
            provincial royalties and close to $8 billion in federal and provincial corporate income tax.
          </p>
        </>
      ),
    },
    {
      id: 'headwinds',
      title: 'Headwinds on the West Coast',
      body: (
        <>
          <p>
            Record output did not mean an easy year everywhere. Phillips 66 closed its Wilmington refinery in Los
            Angeles in late 2025 and Valero planned to idle its Benicia refinery in April 2026. Together they remove
            about 17.5 per cent of California’s refining capacity.
          </p>
          <p>
            Demand for gasoline and diesel has not fallen. The closures reflect regional regulation and economics
            that make importing finished fuel cheaper than refining crude on the coast. Federal data suggest
            inventories could drop to levels last seen in the early 2000s, which would raise price premiums for
            consumers in the Pacific Northwest and, by a similar logic, in Atlantic Canada.
          </p>
          <p>
            The sector is more integrated than ever and more divided about its direction. In the near term, refiners
            are squeezing record volumes from existing plants through “capacity creep.” Over the long term, the
            industry is reinventing itself around carbon management and renewable fuels, from Alberta’s Industrial
            Heartland to Newfoundland’s aviation-fuel plant.
          </p>
        </>
      ),
    },
  ],
  sources: [
    { org: 'Canada Energy Regulator', title: 'Canadian refinery overview and market snapshots', url: 'https://www.cer-rec.gc.ca/' },
    { org: 'Canadian Fuels Association', title: 'Refinery capacity and product statistics', url: 'https://www.canadianfuels.ca/' },
    { org: 'U.S. Energy Information Administration', title: 'Refinery Capacity Report, 2025', url: 'https://www.eia.gov/petroleum/refinerycapacity/' },
    { org: 'Statistics Canada', title: 'Refined petroleum products supply and disposition', url: 'https://www.statcan.gc.ca/' },
    { org: 'Natural Resources Canada', title: 'Energy and the economy', url: 'https://natural-resources.canada.ca/' },
    { org: 'Trans Mountain Corporation', title: 'Westridge Marine Terminal throughput', url: 'https://www.transmountain.com/' },
    { org: 'American Fuel & Petrochemical Manufacturers', title: 'Economic contribution of US refining', url: 'https://www.afpm.org/' },
  ],
};
