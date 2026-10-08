import { Layers } from 'lucide-react';
import { BarList, Callout, DataTable, Lead, MapLink, Timeline } from '../../components/deepdives/ArticleBlocks';
import type { DeepDive } from './types';

export const geology: DeepDive = {
  id: 'geology',
  title: 'Geology',
  kicker: 'Geology',
  headline: 'The Subterranean Engine',
  dek:
    'North America’s oil and gas were made by ancient seas, buried for hundreds of millions of years and unlocked only in the last 160. This is how the rock beneath the Prairies and the Atlantic shelf came to hold so much energy.',
  color: 'var(--accent-orange)',
  icon: Layers,
  readingMinutes: 11,
  mapLayer: 'basins',
  stats: [
    { value: '1.4M km²', label: 'Area of the Western Canada Sedimentary Basin' },
    { value: '6,000 m', label: 'Sediment thickness at the Rocky Mountain foothills' },
    { value: '449 Tcf', label: 'Marketable gas in the Montney, per the CER' },
    { value: '1858', label: 'First commercial oil well in North America, Oil Springs, Ontario' },
  ],
  sections: [
    {
      id: 'basins',
      title: 'How a basin makes oil',
      body: (
        <>
          <Lead>
            Everything visible in the energy landscape, from the upgraders of Fort McMurray to the refineries of the
            Gulf Coast, sits on top of the real engine. That engine was built hundreds of millions of years ago, and
            it runs on one geological structure: the sedimentary basin.
          </Lead>
          <p>
            A basin is a vast depression in the Earth’s crust. For tens of millions of years at a time, these bowls
            filled with warm, shallow inland seas teeming with plankton. When the organisms died they sank into
            oxygen-starved mud, where they could not fully decompose. Rivers buried them under sand, silt and clay,
            and the organic matter slowly turned into a waxy, hydrocarbon-rich substance called kerogen.
          </p>
          <p>
            Burial then did the cooking. The weight of overlying rock and heat from the mantle raised the kerogen’s
            temperature over millions of years, a process geologists call thermal maturation. What came out depended
            on how deep and how hot the rock got.
          </p>
          <Callout title="The two windows">
            <p>
              <strong>Oil window.</strong> Roughly 1.5 to 4 kilometres down, at about 60 to 120 °C, kerogen breaks down
              into liquid crude oil.
            </p>
            <p>
              <strong>Gas window.</strong> Deeper and hotter, the oil molecules themselves crack apart into natural gas.
              Go deep enough and only dry methane survives.
            </p>
          </Callout>
          <p>
            Canada’s petroleum sits in seven major sedimentary basins, including large offshore regions in the
            Atlantic. None of them stops at the border. The formations that produce oil and gas in Texas,
            Pennsylvania and North Dakota are the same systems that run north into Alberta, Saskatchewan and
            Newfoundland.
          </p>
          <MapLink layer="basins" title="See the basins on the map">
            Toggle the Basins layer to trace the Western Canada, Williston, Michigan and Appalachian basins across the
            continent.
          </MapLink>
        </>
      ),
    },
    {
      id: 'birthplace',
      title: 'Where the industry was born',
      body: (
        <>
          <p>
            The North American oil industry started in the east, in the shallow rock of the Michigan and Appalachian
            basins. In 1858 James Miller Williams dug what is generally considered the continent’s first commercial
            oil well at Oil Springs, Ontario, tapping oil that seeped to the surface. A year later Edwin Drake
            drilled his famous well at Titusville, Pennsylvania.
          </p>
          <p>
            Both countries have been drawing from these shared formations ever since, moving from hand-dug pits to
            kilometre-long horizontal wells. The geology never changed. The technology did.
          </p>
        </>
      ),
    },
    {
      id: 'wcsb',
      title: 'The Western Canada Sedimentary Basin',
      body: (
        <>
          <p>
            If the continent’s oil and gas sector is an engine, the Western Canada Sedimentary Basin (WCSB) is its
            block. It covers about 1.4 million square kilometres across southwestern Manitoba, southern
            Saskatchewan, almost all of Alberta, northeastern British Columbia and a corner of the Northwest
            Territories.
          </p>
          <h3>A wedge, not a bowl</h3>
          <p>
            Sliced from east to west, the WCSB is a colossal, lopsided wedge. On its eastern edge, where it meets the
            Precambrian rock of the Canadian Shield, the sediment thins to nothing. Travelling west toward the
            Rockies it deepens dramatically. When the mountains were thrust up 60 to 80 million years ago their weight
            pushed the crust downward, and the resulting trench filled with debris eroded off the new peaks. At the
            foothills the sedimentary pile is more than 6,000 metres thick.
          </p>
          <p>
            That taper is why one basin produces every kind of hydrocarbon. Depth sets temperature and pressure, and
            temperature and pressure set the product.
          </p>
          <DataTable
            title="What the wedge holds at each depth"
            columns={[{ header: 'Position in the basin' }, { header: 'Conditions' }, { header: 'Resource' }]}
            rows={[
              ['Deep foreland, near the Rockies', 'Hottest, highest pressure', 'Dry natural gas'],
              ['Mid-basin', 'Cooler', 'Light oil and liquids-rich gas'],
              [
                'Shallow eastern edge',
                'Oil migrated upward and was degraded by bacteria and groundwater',
                'Heavy bitumen: the Athabasca oil sands',
              ],
            ]}
          />
          <h3>A century of discovery</h3>
          <p>
            Wet gas and light oil at Turner Valley, southwest of Calgary, set off the region’s first boom in 1914. The
            modern era began in 1947 with Leduc No. 1, which drilled into a buried Devonian coral reef. These ancient
            reefs had acted as underground sponges, trapping oil that migrated into them over millions of years, and
            Leduc proved the WCSB held world-class conventional reserves.
          </p>
          <h3>The Williston connection</h3>
          <p>
            The southern WCSB merges into the Williston Basin, which straddles Saskatchewan, Manitoba, North Dakota
            and Montana. Conventional oil has flowed from it since the early 1950s, but the Bakken Formation made it
            famous in the 2000s. The same rock layers that drove the US shale oil boom in North Dakota are drilled a
            few kilometres north of the border using identical techniques.
          </p>
        </>
      ),
    },
    {
      id: 'atlantic',
      title: 'The Atlantic frontier',
      body: (
        <>
          <p>
            Canada’s offshore basins are a different geological story. The Jeanne d’Arc Basin off Newfoundland and
            Labrador and the Scotian Shelf off Nova Scotia formed about 200 million years ago, when the
            supercontinent Pangea tore apart. The rift valleys left behind filled with organic-rich marine sediment
            as the Atlantic opened. They share their origin with the deepwater basins of the US Gulf of Mexico and
            Eastern Seaboard.
          </p>
          <p>
            Exploration drilling began in the 1960s and paid off in 1979 with the discovery of the giant Hibernia
            field. Bringing it online took almost two decades, because the Grand Banks sit in Iceberg Alley. Where
            Gulf of Mexico platforms are engineered for hurricanes, Hibernia is a gravity-based structure of hundreds
            of thousands of tonnes of concrete, built to sit on the seabed and take a direct hit from drifting ice.
            Production started in 1997. The light, sweet crude it yields is shipped largely to refineries on the US
            East Coast.
          </p>
        </>
      ),
    },
    {
      id: 'shale',
      title: 'The shale revolution: drilling the kitchen',
      body: (
        <>
          <p>
            For most of the twentieth century, oil companies were hunters. They looked for traps, such as the Leduc
            reefs or domes in the rock, where oil and gas had migrated and pooled in porous reservoirs that were easy
            to tap.
          </p>
          <p>
            In the early 2000s the hunt changed. Horizontal drilling lets a rig steer a bit down several kilometres,
            turn, and run sideways through a thin rock layer for kilometres more. Hydraulic fracturing pumps
            high-pressure water and sand into that rock to open micro-cracks. Together they let operators skip the
            traps and drill straight into the source rock itself: the dense, low-permeability layer where the kerogen
            was originally cooked. They went to the kitchen.
          </p>
          <p>Two WCSB source rocks have since become continental heavyweights.</p>
        </>
      ),
    },
    {
      id: 'montney-duvernay',
      title: 'Montney and Duvernay',
      body: (
        <>
          <DataTable
            title="Two unconventional giants"
            columns={[{ header: '' }, { header: 'Montney' }, { header: 'Duvernay' }]}
            rows={[
              [<strong>Location</strong>, 'Alberta–British Columbia border', 'Alberta'],
              [<strong>Age</strong>, 'Lower Triassic, about 250 million years', 'Late Devonian, about 370 million years'],
              [<strong>Rock</strong>, 'Siltstone, up to 300 m thick', 'Pressurised, organic-rich shale'],
              [<strong>Area</strong>, 'About 130,000 km²', 'Central and west-central Alberta'],
              [<strong>Main output</strong>, 'Gas and condensate', 'Light oil and liquids-rich gas'],
              [<strong>Horizontal boom began</strong>, 'Around 2005', '2011'],
              [<strong>US analogue</strong>, 'Marcellus Shale, Pennsylvania', 'Eagle Ford Shale, Texas'],
            ]}
          />
          <h3>The siltstone giant</h3>
          <p>
            The Montney is not a true shale. Its grains are slightly coarser, which gives it a porosity that holds
            enormous volumes of gas, and it is thick enough that companies stack several horizontal wells on top of
            one another from a single pad. Vertical wells picked at its edges in the 1950s; the real boom began
            around 2005. The Canada Energy Regulator estimates it holds roughly 449 trillion cubic feet of
            marketable natural gas.
          </p>
          <Callout title="Why condensate matters">
            The Montney is liquids-rich, producing large volumes of condensate: an ultra-light oil that is a gas
            underground and a liquid at the surface. Oil sands bitumen is too thick to flow through a pipeline on its
            own, so it is diluted with condensate. Without Montney liquids, Canadian heavy crude could not reach the
            Gulf Coast refineries built to process it.
          </Callout>
          <h3>Back to the kitchen</h3>
          <p>
            Geologists knew for sixty years that the Duvernay was the source rock that fed the Leduc reefs discovered
            in 1947. Oil cooked in the Duvernay, migrated upward and pooled in the reefs. Not until 2011 could
            companies drill horizontally into the Duvernay itself. Highly pressurised, it yields premium light oil
            and liquids-rich gas, and is often compared with the Eagle Ford of south Texas.
          </p>
        </>
      ),
    },
    {
      id: 'timeline',
      title: 'A timeline of discovery',
      body: (
        <Timeline
          items={[
            { marker: '1858', title: 'Oil Springs, Ontario', text: 'James Miller Williams digs North America’s first commercial oil well.' },
            { marker: '1859', title: 'Titusville, Pennsylvania', text: 'Edwin Drake’s well launches the US oil industry.' },
            { marker: '1914', title: 'Turner Valley, Alberta', text: 'Wet gas and light oil trigger the WCSB’s first boom.' },
            { marker: '1947', title: 'Leduc No. 1', text: 'A Devonian reef trap proves Alberta holds world-class conventional oil.' },
            { marker: '1979', title: 'Hibernia discovered', text: 'The Jeanne d’Arc Basin opens the Atlantic frontier.' },
            { marker: '1997', title: 'Hibernia produces', text: 'An iceberg-proof concrete platform brings offshore oil online after 18 years.' },
            { marker: '2005', title: 'Montney goes horizontal', text: 'Modern drilling turns a siltstone into one of the world’s largest gas resources.' },
            { marker: '2011', title: 'Duvernay unlocked', text: 'Operators drill directly into the source rock that fed Leduc.' },
          ]}
        />
      ),
    },
    {
      id: 'future',
      title: 'What the basins do next',
      body: (
        <>
          <p>
            The same structures that held hydrocarbons for millions of years are now being engineered for a
            lower-carbon system.
          </p>
          <ul>
            <li>
              <strong>Carbon storage.</strong> The deep saline aquifers and depleted gas reservoirs of the WCSB and
              Williston basins are capped by the same impermeable seal rocks that trapped oil and gas. Carbon
              dioxide injected beneath them is held the same way. Alberta already hosts some of the world’s largest
              operating projects.
            </li>
            <li>
              <strong>Lithium from brine.</strong> Ancient saltwater brought up with oil from formations such as the
              Leduc and Duvernay is rich in lithium. New extraction technologies pull the metal from that water before
              it is reinjected, creating a domestic battery-mineral supply from existing oilfield infrastructure.
            </li>
          </ul>
          <BarList
            title="How thick is the sediment?"
            unit="metres"
            items={[
              { label: 'Rocky Mountain foothills', value: 6000, display: '6,000+' },
              { label: 'Central Alberta (Leduc reef depth)', value: 1600, display: '~1,600', note: 'Approximate' },
              { label: 'Canadian Shield margin', value: 0, display: '0' },
            ]}
            note="The WCSB thins from more than six kilometres of rock at the mountains to bare Precambrian shield in Manitoba."
          />
          <p>
            Geology dictates everything downstream of it. The pipelines, refineries and trade ties between Canada
            and the United States are surface infrastructure built to harvest a geological legacy that is hundreds of
            millions of years old.
          </p>
        </>
      ),
    },
  ],
  sources: [
    { org: 'Natural Resources Canada', title: 'Sedimentary basins of Canada', url: 'https://natural-resources.canada.ca/' },
    {
      org: 'Alberta Energy Regulator and Geological Survey of Canada',
      title: 'Geological Atlas of the Western Canada Sedimentary Basin',
      url: 'https://ags.aer.ca/publication/atlas',
    },
    { org: 'Canada Energy Regulator', title: 'Provincial and territorial energy profiles; Montney resource assessment', url: 'https://www.cer-rec.gc.ca/' },
    { org: 'U.S. Energy Information Administration', title: 'Technically recoverable shale oil and gas resources; Canada energy profile', url: 'https://www.eia.gov/' },
    { org: 'Canada-Newfoundland and Labrador Offshore Petroleum Board', title: 'Hibernia project overview', url: 'https://www.cnlopb.ca/' },
    { org: 'Oil Museum of Canada', title: 'History of Canada’s first commercial oil well', url: 'https://www.lambtonmuseums.ca/oil-museum-of-canada/' },
  ],
};
