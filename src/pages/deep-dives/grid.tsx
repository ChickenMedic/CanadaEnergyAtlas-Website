import { Zap } from 'lucide-react';
import { BarList, Callout, DataTable, Lead, MapLink } from '../../components/deepdives/ArticleBlocks';
import type { DeepDive } from './types';

export const grid: DeepDive = {
  id: 'grid',
  title: 'The Grid',
  kicker: 'The electrical grid',
  headline: 'The Continental Circuit',
  dek:
    'Canada’s grid was built to run north to south, carrying hydro from remote reservoirs to southern cities and American markets. Net zero, data centres and electric cars now require it to run east to west as well.',
  color: '#38bdf8',
  icon: Zap,
  readingMinutes: 15,
  mapLayer: 'grid',
  stats: [
    { value: '160,000 km', label: 'High-voltage transmission lines in Canada' },
    { value: '86', label: 'International power lines crossing the border' },
    { value: '35.6 TWh', label: 'Electricity exported to the US in 2024' },
    { value: '17 GW', label: 'Transfer capacity between provinces, versus 28 GW to the US' },
  ],
  sections: [
    {
      id: 'machine',
      title: 'A machine the size of a continent',
      body: (
        <>
          <Lead>
            The North American grid is a single synchronised machine. Every generator from Labrador to Louisiana
            spins in step at 60 hertz, and a fault in one place is felt instantly hundreds of kilometres away.
            Canada’s share of that machine is defined by distance, water and its relationship with the United
            States.
          </Lead>
          <p>
            The continent is divided into a handful of synchronous interconnections. The Eastern Interconnection
            covers everything from the Prairies to the Atlantic; the Western Interconnection runs from British
            Columbia and Alberta to the Mexican border; Quebec operates its own grid, tied to its neighbours only
            through direct-current converters; and Texas runs separately. Inside each one, provinces and states
            balance supply and demand second by second.
          </p>
          <p>
            In Canada electricity is a provincial responsibility. Each province has its own system operator or Crown
            utility, such as Hydro-Québec, BC Hydro, Hydro One and the Alberta Electric System Operator, which is why
            the national grid looks like a patchwork of strong regional networks with thin seams between them.
          </p>
          <MapLink layer="grid" title="See the transmission network on the map">
            The Grid layer colours lines by voltage class so the extra-high-voltage corridors stand out.
          </MapLink>
        </>
      ),
    },
    {
      id: 'voltage',
      title: 'Voltage and distance',
      body: (
        <>
          <p>
            About 160,000 kilometres of high-voltage lines bridge the gap between generation in the north and load in
            the south. The physics of that distance is simple: resistive losses rise with the square of the current,
            so raising the voltage lets a line move the same power with far less current and far less loss.
          </p>
          <DataTable
            title="Voltage classes and what they do"
            columns={[{ header: 'Class' }, { header: 'Voltage (kV)' }, { header: 'Role' }]}
            rows={[
              ['Sub-transmission', '66 to 138', 'Regional networks; the interface with local distribution'],
              ['High voltage AC', '230 and 345', 'The workhorse for inter-regional and inter-provincial transfer'],
              ['Extra-high voltage AC', '500 and 735', 'Bulk power over very long distances; Hydro-Québec’s 735 kV lines carry James Bay power 1,000 km south'],
              ['High-voltage DC', '±250 to ±500', 'Links unsynchronised grids and moves large blocks of power with minimal loss; Manitoba’s Nelson River bipoles and the Quebec–New England line'],
            ]}
          />
        </>
      ),
    },
    {
      id: 'provinces',
      title: 'Province by province',
      body: (
        <>
          <DataTable
            title="The largest provincial transmission systems"
            columns={[{ header: 'Province' }, { header: 'Transmission (km)', align: 'right' }, { header: 'Character' }, { header: 'Operator' }]}
            rows={[
              ['Quebec', '~30,700', 'Separate synchronous grid; trades through HVDC ties', 'Hydro-Québec'],
              ['Ontario', '~30,000', 'Deeply tied to Michigan and New York; mostly nuclear and hydro', 'Hydro One / IESO'],
              ['Alberta', '~25,300', 'Competitive wholesale market; rapid wind and solar growth', 'AltaLink / AESO'],
              ['British Columbia', '~20,000', 'Flexible hydro storage; key to the Western Interconnection', 'BC Hydro'],
              ['New Brunswick', '~6,850', 'Atlantic hub with ties to Maine and Quebec', 'NB Power'],
            ]}
          />
          <p>
            The territories are a different world. The Yukon Integrated System spans about 1,100 kilometres but has
            no connection to the continental grid at all. Isolation forces extreme redundancy: in many remote
            communities installed capacity must be more than double the winter peak so a single failure does not
            become a life-threatening outage.
          </p>
        </>
      ),
    },
    {
      id: 'trade',
      title: 'The Canada–US trade',
      body: (
        <>
          <p>
            Eighty-six international power lines cross the border between the Pacific Northwest and New England, 23 of
            them at 230 kV or above. They are regulated by the Canada Energy Regulator, which licenses exports and
            ensures they do not compromise domestic supply.
          </p>
          <DataTable
            title="Main cross-border corridors"
            columns={[{ header: 'Corridor' }, { header: 'Lines ≥ 230 kV', align: 'right' }, { header: 'US market' }, { header: 'Voltage' }]}
            rows={[
              ['Ontario to Michigan and New York', '8', 'MISO, NYISO', '230 and 345 kV'],
              ['Manitoba to Minnesota and North Dakota', '5', 'MISO', '230 and 500 kV'],
              ['British Columbia to Washington', '4', 'Bonneville Power Administration', '230 and 500 kV'],
              ['Quebec to New York and New England', '2', 'NYISO, ISO New England', '±450 kV DC and 765 kV'],
              ['New Brunswick to Maine', '2', 'ISO New England', '345 kV'],
            ]}
          />
          <p>
            Canada is normally a large net exporter, and what it sells is overwhelmingly clean: hydro and nuclear
            power that helps New York, Massachusetts and Minnesota meet their own decarbonisation targets. In 2024
            exports averaged C$81.42 per megawatt-hour. The US West paid a premium of C$125.40, driven by heat waves
            and data-centre growth in California and the Pacific Northwest, while the East paid C$58.87 as cheap gas
            and local renewables held prices down.
          </p>
        </>
      ),
    },
    {
      id: 'drought',
      title: '2024: when the water ran low',
      body: (
        <>
          <p>
            The reliable-exporter model wobbled in 2024. Exports fell 28 per cent from 2023 to their lowest level since
            2004, while imports rose 8 per cent as utilities bought American power to keep water behind their dams.
          </p>
          <BarList
            title="Canada–US electricity trade, 2024"
            unit="terawatt-hours"
            items={[
              { label: 'Exports', value: 35.64, display: '35.6', note: '−28% versus 2023' },
              { label: 'Imports', value: 23.21, display: '23.2', note: '+8% versus 2023' },
              { label: 'Net exports', value: 12.43, display: '12.4', note: '−55% versus 2023' },
            ]}
            note="Export value fell 30% to C$3.13 billion; import value fell 35% to C$1.34 billion."
          />
          <p>
            The cause was drought across the Canadian Shield and the western cordillera. Hydro supplies more than 85
            per cent of generation in British Columbia, Manitoba and Quebec, so low reservoirs translate directly into
            lower exports. It was a reminder that a weather-dependent system can be hit at both ends: less water to
            sell, and more heat-wave demand to serve.
          </p>
        </>
      ),
    },
    {
      id: 'battery',
      title: 'Canada as America’s battery',
      body: (
        <>
          <p>
            Beyond the commodity trade, Canadian reservoirs act as storage for the American grid. A hydro station can
            change output in seconds, which is exactly what a system full of wind and solar needs.
          </p>
          <p>
            Minnesota Power, for example, sells surplus overnight wind to Manitoba Hydro, which “stores” it by
            throttling its own turbines and holding water back. When the wind drops, Manitoba ramps up and sends firm
            power south. The arrangement makes both grids more reliable.
          </p>
          <p>
            Two frameworks formalise this cooperation in the West. The modernised Columbia River Treaty, agreed in
            principle in July 2024, coordinates 15.5 million acre-feet of storage behind Canadian dams for both power
            and flood control. The Western Resource Adequacy Program, run by the Western Power Pool, pools reserves
            across British Columbia, Alberta and 11 US states and becomes binding on participants between 2027 and
            2029.
          </p>
        </>
      ),
    },
    {
      id: 'bottleneck',
      title: 'The 17 GW bottleneck',
      body: (
        <>
          <p>
            Canada can move far more power across the US border than between its own provinces. That asymmetry is the
            grid’s central strategic weakness.
          </p>
          <BarList
            title="Transfer capability"
            unit="gigawatts"
            items={[
              { label: 'Canada to the United States', value: 28, display: '28', note: 'Average utilisation 78%' },
              { label: 'Between Canadian provinces', value: 17, display: '17', note: 'Average utilisation 72%' },
            ]}
          />
          <p>
            Provinces built their grids as self-sufficient islands, so the east–west seams are thin. Alberta,
            Saskatchewan and Nova Scotia, which still burn fossil fuels, cannot easily draw on the surplus hydro of
            British Columbia, Manitoba and Quebec next door. Utilisation above 70 per cent means the ties are often
            at their limit precisely when a cold snap or heat wave makes them most valuable.
          </p>
          <Callout title="What the CER’s modelling says">
            Reaching net zero requires at least a 27 per cent increase in inter-provincial transfer capacity by 2035.
            Without it, Alberta and Saskatchewan alone would need an extra 2,000 MW of hydrogen-fired generation and
            680 MW of gas plants with carbon capture just to keep the same level of reliability.
          </Callout>
          <p>
            The federal government’s One Canadian Economy Act, passed in June 2025, is meant to attack the regulatory
            side of the problem by creating a single approval path for projects that cross provincial or international
            borders and treating clean-energy corridors as matters of national interest.
          </p>
        </>
      ),
    },
    {
      id: 'atlantic',
      title: 'Atlantic Canada: getting off coal',
      body: (
        <>
          <p>
            Nova Scotia still generated about 55 per cent of its electricity from coal and coke in 2021 and faces a
            federal deadline to stop by 2030. The original fix, the Atlantic Loop, would have carried Quebec and
            Labrador hydro through New Brunswick to Nova Scotia. In late 2023 the provinces judged it too expensive and
            pivoted to a smaller plan.
          </p>
          <DataTable
            title="From the Atlantic Loop to the Modified Loop"
            columns={[{ header: 'Phase' }, { header: 'Cost', align: 'right' }, { header: 'Scope' }, { header: 'Status' }]}
            rows={[
              ['Original Atlantic Loop', '$6.8–9.0 billion', 'Full Quebec–NB–NS–NL link', 'Shelved on cost'],
              ['Modified Loop, phase 1', '$1.0–2.0 billion', 'NB–NS reliability intertie', 'Approved November 2025'],
              ['Wasoqonatl Reliability Intertie', '$684.7 million', '345 kV, 160 km, 500 MW', 'Construction 2025–26'],
            ]}
          />
          <p>
            The Wasoqonatl intertie is the centrepiece. It is a partnership between the utilities and all 13 Mi’kmaw
            First Nations in Nova Scotia, and it provides the 500 megawatts of firm import capacity the province needs
            to shut its coal units while staying connected to its neighbours.
          </p>
        </>
      ),
    },
    {
      id: 'new-loads',
      title: 'New loads: data centres and EVs',
      body: (
        <>
          <p>
            The grid is being reshaped from the demand side as much as the supply side. Data centres, AI training
            clusters and crypto mines already use between 1 and 1.4 per cent of the world’s electricity, and the figure
            is climbing fast. In Canada they gravitate to Quebec and Ontario for clean power and cool air, but their
            load is lumpy: in a summer heat wave, server cooling and household air conditioning peak together.
          </p>
          <DataTable
            title="Managing data-centre load"
            columns={[{ header: 'Approach' }, { header: 'Goal' }, { header: 'How' }]}
            rows={[
              ['Peak shaving', 'Ease stress at system peak', 'On-site batteries or backup generation'],
              ['Waste-heat recovery', 'Raise total efficiency', 'Pipe server heat into district heating'],
              ['Mandatory reporting', 'Better planning', 'Standards introduced in 2024 for facilities of 500 kW and up'],
            ]}
          />
          <p>
            Electric vehicles are the other wave. Canada is projected to need 679,000 public charging ports by 2040,
            and the power each one draws is rising: a typical fast charger is expected to go from 125 kW in 2025 to
            300 kW by 2040. A highway rest stop with a few dozen of them draws as much as a small factory, which is
            why utilities are investing in smart charging that throttles speeds at peak to protect local transformers.
          </p>
        </>
      ),
    },
    {
      id: 'reliability',
      title: 'Keeping the lights on: NERC and the CER',
      body: (
        <>
          <p>
            Continental reliability is governed by the North American Electric Reliability Corporation, which sets
            more than 80 mandatory standards, and enforced in Canada by provincial regulators and the CER. NERC frames
            reliability around three ideas:
          </p>
          <ol>
            <li>
              <strong>Resource adequacy.</strong> Enough generation to meet demand at all times, including when plants
              fail unexpectedly.
            </li>
            <li>
              <strong>Operational reliability.</strong> The ability to survive a short circuit or the loss of a major
              line without a cascading blackout.
            </li>
            <li>
              <strong>Resilience.</strong> Anticipating, absorbing and recovering from extreme events, from ice storms
              to cyber-attacks.
            </li>
          </ol>
          <p>
            The standards range from remedial action schemes that automatically shed load to the unglamorous business
            of vegetation management. They became mandatory and enforceable after the August 2003 blackout, which
            began with a tree branch touching a line in Ohio and left 50 million people in the dark across Ontario and
            eight US states.
          </p>
        </>
      ),
    },
    {
      id: 'indigenous',
      title: 'Indigenous ownership',
      body: (
        <>
          <p>
            A defining feature of the modern Canadian grid is who owns it. Large projects were once built across
            Indigenous lands without consent or benefit. Today Indigenous participation is a condition of regulatory
            approval and, increasingly, of financing. The federal Canada Indigenous Loan Guarantee Corporation backs
            equity stakes for First Nations, Inuit and Métis communities.
          </p>
          <DataTable
            title="Indigenous-led grid projects"
            columns={[{ header: 'Project' }, { header: 'Where' }, { header: 'What it does' }]}
            rows={[
              ['Wataynikaneyap Power', 'Northwestern Ontario', 'Connects 17 remote First Nations to the grid, ending diesel dependence'],
              ['Oneida Energy Storage', 'Ontario', '250 MW / 1,000 MWh battery, 50% owned by Six Nations of the Grand River'],
              ['Burchill Wind', 'New Brunswick', '42 MW wind farm with utility-scale battery storage'],
              ['Haeckel Hill Wind', 'Yukon', 'Northern Canada’s first wholly Indigenous-owned wind project'],
            ]}
          />
          <p>
            Ownership turns a one-time impact payment into a revenue stream that lasts as long as the asset does.
            Communities describe it as energy sovereignty: controlling the power that lights their homes and sharing
            in the profit from it.
          </p>
        </>
      ),
    },
    {
      id: 'paying',
      title: 'Paying for it',
      body: (
        <>
          <p>
            Estimates of the capital needed to modernise and expand the Canadian grid run as high as $1.7 trillion by
            2050, which would mean doubling or tripling annual investment. To attract it, Ottawa introduced a 15 per
            cent refundable Clean Electricity Investment Tax Credit covering low-emitting generation, storage and
            inter-provincial transmission, a direct answer to the incentives in the US Inflation Reduction Act.
          </p>
          <p>
            A clean grid is becoming an industrial asset in its own right. With the European Union phasing in carbon
            border tariffs, producers of steel, aluminium and batteries increasingly locate where they can prove their
            power is zero-emission. Provinces with surplus hydro and nuclear have something to sell beyond electrons.
          </p>
          <p>
            The grid’s history of north–south trade gave Canada a sound foundation. Its future depends on east–west
            links, on managing new kinds of load, and on treating the network as one continental system shared by
            400 million people rather than a collection of provincial islands.
          </p>
        </>
      ),
    },
  ],
  sources: [
    { org: 'Canada Energy Regulator', title: 'Canada’s Energy Future 2023; electricity trade summaries; international power line regulation', url: 'https://www.cer-rec.gc.ca/' },
    { org: 'North American Electric Reliability Corporation', title: 'Reliability standards and the 2003 blackout report', url: 'https://www.nerc.com/' },
    { org: 'Hydro-Québec', title: 'Transmission system overview', url: 'https://www.hydroquebec.com/transenergie/' },
    { org: 'Independent Electricity System Operator', title: 'Ontario transmission and interties', url: 'https://www.ieso.ca/' },
    { org: 'Nova Scotia Power and NB Power', title: 'Wasoqonatl Reliability Intertie' },
    { org: 'Western Power Pool', title: 'Western Resource Adequacy Program', url: 'https://www.westernpowerpool.org/' },
    { org: 'Government of Canada', title: 'Clean Electricity Investment Tax Credit; One Canadian Economy Act', url: 'https://www.canada.ca/' },
    { org: 'Natural Resources Canada', title: 'Electric vehicle charging infrastructure needs to 2040', url: 'https://natural-resources.canada.ca/' },
  ],
};
