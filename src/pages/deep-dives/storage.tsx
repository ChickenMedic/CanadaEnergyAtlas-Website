import { Cylinder } from 'lucide-react';
import { BarList, Callout, DataTable, Lead, MapLink } from '../../components/deepdives/ArticleBlocks';
import type { DeepDive } from './types';

export const storage: DeepDive = {
  id: 'storage',
  title: 'Storage',
  kicker: 'Storage hubs',
  headline: 'Where the Continent Keeps Its Energy',
  dek:
    'Four hubs set the prices, absorb the shocks and quietly decide whether furnaces stay lit in January: Hardisty and Cushing for oil, Dawn and Henry Hub for gas.',
  color: '#eab308',
  icon: Cylinder,
  readingMinutes: 13,
  mapLayer: 'storage',
  stats: [
    { value: '~36M bbl', label: 'Crude storage at Hardisty, Alberta' },
    { value: '76.6M bbl', label: 'Working crude storage at Cushing, Oklahoma' },
    { value: '285.8 Bcf', label: 'Working gas capacity at the Dawn Hub, Ontario' },
    { value: '70%', label: 'Share of US hydrocarbon imports that came from Canada in 2024' },
  ],
  sections: [
    {
      id: 'why-storage',
      title: 'Why storage sets the price',
      body: (
        <>
          <Lead>
            Oil wells and gas plants run around the clock. Refineries, furnaces and power plants do not. Storage
            hubs sit between the two, soaking up production when demand is slack and releasing it when demand spikes.
            Because they are where supply and demand physically meet, they are also where prices are set.
          </Lead>
          <p>
            A disruption at a single node in Alberta or Oklahoma ripples into fuel prices across the continent. As
            the system takes on hydrogen and carbon storage, the same hubs are becoming multi-commodity energy
            complexes.
          </p>
          <Callout title="Contango and backwardation">
            When tanks are nearly full, oil for immediate delivery trades below oil for later delivery. That is{' '}
            <strong>contango</strong>, and it pays traders to buy, store and sell later. When tanks run low, spot
            prices jump above futures, a state called <strong>backwardation</strong>. Inventory levels at the big hubs
            are therefore a live reading of market stress.
          </Callout>
          <MapLink layer="storage" title="See tank farms and caverns on the map">
            The Storage layer marks oil and gas storage facilities on both sides of the border.
          </MapLink>
        </>
      ),
    },
    {
      id: 'hardisty',
      title: 'Hardisty: where Canadian crude becomes a benchmark',
      body: (
        <>
          <p>
            Hardisty, a town of about 500 people in east-central Alberta, is the most important inland crude hub in
            North America. It sits where production from the oil sands meets the export pipelines heading to the
            United States and Eastern Canada, and it is the pricing point for Western Canadian Select. The complex
            covers more than 1,000 acres of tanks and underground caverns operated by several midstream companies.
          </p>
          <BarList
            title="Hardisty terminal storage by operator"
            unit="million barrels"
            items={[
              { label: 'Enbridge', value: 16, display: '~16', note: '38 tanks and 4 caverns; origin of the Mainline' },
              { label: 'Gibson Energy', value: 14, display: '~14', note: '43 tanks; largest independent; unit-train rail loading' },
              { label: 'Cenovus (Husky Midstream)', value: 4.9, display: '~4.9', note: '19 tanks; the WCS blending terminal' },
              { label: 'Lloydminster satellite', value: 1, display: '~1', note: '9 tanks; gathering hub' },
            ]}
          />
          <p>
            The Cenovus terminal alone moves more than 750,000 barrels a day, takes in 14 inbound pipelines and
            handles more than 30 crude grades, with land for another 8.5 million barrels of tanks. Enbridge’s
            terminal is the starting point of the Mainline, which carries roughly 3 million barrels a day.
          </p>
        </>
      ),
    },
    {
      id: 'wcs',
      title: 'Blending Western Canadian Select',
      body: (
        <>
          <p>
            Raw bitumen will not flow through a pipeline. At Hardisty it is blended with condensate or synthetic crude
            from upgraders to a precise density and sulphur specification, and the result is Western Canadian Select.
            WCS is heavy, with a low API gravity of about 20 to 22 degrees, and sour, with sulphur around 3.5 per cent.
            Both qualities make it harder to refine than light, sweet West Texas Intermediate, so it trades at a
            discount.
          </p>
          <p>Three things set the size of that discount, known as the WCS–WTI differential:</p>
          <ul>
            <li>
              <strong>Quality.</strong> The extra processing a refinery needs accounts for roughly US$6.92 a barrel.
            </li>
            <li>
              <strong>Transport.</strong> The cost of moving a barrel from Alberta to the Gulf Coast or Midwest.
            </li>
            <li>
              <strong>Pipeline space.</strong> When production exceeds takeaway capacity, producers pay up for rail or
              store oil, and the gap can blow out. Between 2011 and 2014, and again in late 2018, it exceeded US$40 a
              barrel.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'export-lines',
      title: 'Outbound: the export lines',
      body: (
        <>
          <p>
            The Canada Energy Regulator oversees about 19,000 kilometres of cross-border pipelines. Nearly every
            exported barrel passes through Hardisty or Edmonton on its way to one of these systems.
          </p>
          <DataTable
            title="Major crude export pipelines"
            columns={[{ header: 'System' }, { header: 'Capacity (kb/d)', align: 'right' }, { header: 'Destinations' }, { header: 'Owner' }]}
            rows={[
              ['Enbridge Mainline', '2,890', 'Superior WI, Chicago IL, Sarnia ON', 'Enbridge'],
              ['Keystone', '591', 'Cushing OK, Port Arthur and Houston TX', 'South Bow'],
              ['Express', '310', 'Casper WY, Wood River IL', 'Enbridge'],
              ['Trans Mountain (original)', '300', 'Burnaby BC, Washington State', 'Trans Mountain Corp.'],
              ['Trans Mountain expansion', '+590', 'Westridge export terminal', 'Trans Mountain Corp.'],
            ]}
            note="Trans Mountain originates in Edmonton rather than Hardisty. Keystone was spun out of TC Energy into South Bow in 2024."
          />
          <p>
            The Mainline is the most complex, batching dozens of commodities between 13 receipt and delivery points.
            Keystone is the second-largest export line and the one that offers uncommitted capacity from Hardisty to
            the Gulf Coast.
          </p>
        </>
      ),
    },
    {
      id: 'cushing',
      title: 'Cushing: the pipeline crossroads',
      body: (
        <>
          <p>
            If Hardisty is where Canadian oil is made into a product, Cushing, Oklahoma, is where the world prices
            oil. It is the physical delivery point for the NYMEX West Texas Intermediate futures contract, which makes
            its tank levels the single most watched inventory figure on Earth.
          </p>
          <DataTable
            title="Cushing by the numbers"
            columns={[{ header: 'Metric' }, { header: 'Value', align: 'right' }]}
            rows={[
              ['Total working storage capacity', '76.6 million barrels'],
              ['Share of US commercial crude working storage', '14%'],
              ['Typical utilisation', '25% to 75%'],
              ['Operational floor, or “tank bottoms”', 'About 20 million barrels'],
              ['Daily pipeline throughput', 'More than 6.5 million barrels'],
            ]}
            note="EIA. Working storage excludes the volume below which pumps cannot draw and the headspace above the safe fill line."
          />
          <p>
            About two dozen pipelines and 15 terminals meet at Cushing. Inbound lines include Keystone from Alberta;
            outbound lines run to Memphis, the Gulf Coast and the Midwest. Because so much oil is simply passing
            through, roughly 2.5 million barrels in a typical week sit in pipes or in transit and are excluded from
            the weekly inventory report.
          </p>
          <p>
            When inventories approach the 20-million-barrel floor, physical delivery against futures contracts is in
            doubt and prices swing violently. When they near capacity, the market flips into deep contango. In April
            2020, with storage filling during the pandemic, the WTI contract settled below zero for the first time in
            history.
          </p>
        </>
      ),
    },
    {
      id: 'dawn',
      title: 'Dawn: Ontario’s winter insurance',
      body: (
        <>
          <p>
            Natural gas is stored in rock, not tanks, and measured in billions of cubic feet. The Dawn Hub in
            southwestern Ontario is Canada’s most important gas storage complex and the reason the populous East can
            heat itself through a January cold snap.
          </p>
          <DataTable
            title="Three ways to store gas underground"
            columns={[{ header: 'Type' }, { header: 'What it is' }, { header: 'Where' }, { header: 'Cycles per year', align: 'right' }]}
            rows={[
              ['Depleted reservoir', 'Porous rock that once held oil or gas', 'Ontario (Dawn), US Midwest', '1–2'],
              ['Salt cavern', 'Chamber dissolved out of a salt dome or bed', 'US Gulf Coast and Southwest', '6–12'],
              ['Aquifer', 'Water-bearing rock under a caprock seal', 'US Midwest', '1'],
            ]}
          />
          <p>
            Dawn uses depleted reservoirs. Enbridge Gas operates 36 storage fields there with a net working capacity
            of 285.8 billion cubic feet, regulated by the Ontario Energy Board. Because the fields once held gas, they
            already have proven caprock and wellbores. In summer, compressors such as those at the Corunna station
            inject gas into the pores; in winter it is withdrawn to meet demand that pipelines alone could not carry.
            Dawn connects Western Canadian supply arriving on the TC Mainline with Appalachian gas from the Marcellus
            and Utica shales.
          </p>
          <p>
            Storage shows up on household bills as a load-balancing charge, the price of holding gas so it is there
            when needed. The Ontario Energy Board reviews those rates quarterly.
          </p>
        </>
      ),
    },
    {
      id: 'henry-hub',
      title: 'Henry Hub: the gas benchmark',
      body: (
        <>
          <p>
            Henry Hub, at Erath, Louisiana, is the gas market’s Cushing: the delivery point for NYMEX natural gas
            futures and the reference price for North American gas and, increasingly, for the world’s LNG. It
            connects to eight interstate and three intrastate pipelines, with the Haynesville shale and offshore Gulf
            production close by.
          </p>
          <p>
            Unlike Dawn, the Henry Hub region leans on salt caverns such as Jefferson Island, Acadian and Sorrento.
            Salt is self-sealing and impermeable, so caverns can be filled and emptied many times a year to chase
            weather and price swings.
          </p>
          <p>
            As the United States became the world’s largest LNG exporter, Henry Hub became global. Many LNG contracts
            are now priced at about 115 per cent of Henry Hub plus a fixed liquefaction fee, replacing the older
            practice of indexing to oil. The spot price averaged a historically low US$2.21 per million Btu in 2024
            after a mild winter. The EIA has forecast a rise toward US$4.60 by 2027 as new export plants such as Golden
            Pass and Plaquemines draw more feed gas.
          </p>
        </>
      ),
    },
    {
      id: 'interdependence',
      title: 'A continent that leans on itself',
      body: (
        <>
          <p>
            Two-way energy trade between Canada and the United States reached C$216.8 billion in 2024. Canada supplied
            70.2 per cent of the hydrocarbons the US imported by volume, including 61.7 per cent of its crude and
            nearly all of its natural gas imports.
          </p>
          <DataTable
            title="Canada–US energy trade, 2024"
            columns={[{ header: 'Product' }, { header: 'Exports to US (C$)', align: 'right' }, { header: 'Imports from US (C$)', align: 'right' }]}
            rows={[
              ['Crude oil', '115.3 billion', '10.4 billion'],
              ['Natural gas', '39.7 billion', '9.4 billion'],
              ['Refined petroleum products', '9.8 billion', '10.8 billion'],
              ['Electricity', '3.1 billion', '1.2 billion'],
              [<strong>Total</strong>, <strong>169.8 billion</strong>, <strong>33.4 billion</strong>],
            ]}
          />
          <p>
            The flow is two-way by design. Gulf Coast and Midwest refineries were configured for heavy bitumen the US
            does not produce; Ontario and Quebec refineries import light crude and gas from the US because moving
            Western supply east is constrained. Eighty-six international power lines and dozens of pipelines hold the
            system together. Thirteen US states get at least 30 per cent of their gas from Canada, and Montana and
            Vermont get essentially all of it.
          </p>
          <Callout title="Stress test: Winter Storm Fern, January 2026">
            Freeze-offs cut roughly 17 per cent of US natural gas production at the storm’s peak. Storage withdrawals
            from hubs such as Dawn and the Gulf Coast caverns, together with Canadian imports, filled the gap, with
            storage supplying as much as a third of national gas demand on the coldest days.
          </Callout>
        </>
      ),
    },
    {
      id: 'hydrogen',
      title: 'Storing hydrogen',
      body: (
        <>
          <p>
            As the system moves toward net zero, the hubs are being asked to hold a new molecule. Hydrogen is far
            harder to store than methane because it is smaller, lighter and more mobile.
          </p>
          <DataTable
            title="Hydrogen versus methane"
            columns={[{ header: 'Property' }, { header: 'Hydrogen (H₂)', align: 'right' }, { header: 'Methane (CH₄)', align: 'right' }]}
            rows={[
              ['Molecular weight', '2.016 g/mol', '16.043 g/mol'],
              ['Viscosity at 20 °C', '8.8 μPa·s', '11.0 μPa·s'],
              ['Diffusion coefficient in air', '0.61 cm²/s', '0.16 cm²/s'],
            ]}
          />
          <p>
            Hydrogen slips into micro-fractures in salt and causes embrittlement in steel well casings. In porous
            reservoirs, sulphate-reducing bacteria eat it and produce hydrogen sulphide; field studies have recorded
            losses of 10 to 61 per cent. Salt caverns remain the best option because salt is inert and nearly
            impermeable. The Edmonton Region Hydrogen Hub, anchored by Air Products’ net-zero hydrogen complex, is
            Canada’s leading effort.
          </p>
        </>
      ),
    },
    {
      id: 'batteries',
      title: 'Batteries join the system',
      body: (
        <>
          <p>
            Electricity storage is the newest member of the family. Ontario’s 250-megawatt, 1,000-megawatt-hour
            battery facility in Haldimand County roughly doubled the province’s storage capacity, and Canada’s
            energy-storage market is projected to reach $3.1 billion by 2033. Batteries do for the grid what Dawn does
            for gas: hold surplus wind and solar for the hours when the weather stops cooperating.
          </p>
          <p>
            Hardisty, Cushing, Dawn and Henry Hub are the shock absorbers of the North American economy. The 2024
            trade figures and the 2026 storm show the same thing: their integration across the border is not a
            convenience but a necessity, and the next generation of hubs will need to hold electrons, hydrogen and
            carbon dioxide as well as oil and gas.
          </p>
        </>
      ),
    },
  ],
  sources: [
    { org: 'U.S. Energy Information Administration', title: 'Working and net available shell storage capacity; Henry Hub spot price; Short-Term Energy Outlook', url: 'https://www.eia.gov/' },
    { org: 'Canada Energy Regulator', title: 'Market snapshots on the WCS–WTI differential and cross-border pipelines', url: 'https://www.cer-rec.gc.ca/' },
    { org: 'Gibson Energy, Enbridge and Cenovus', title: 'Hardisty terminal fact sheets' },
    { org: 'Enbridge Gas and the Ontario Energy Board', title: 'Dawn Hub storage operations and rate decisions', url: 'https://www.oeb.ca/' },
    { org: 'Statistics Canada and Global Affairs Canada', title: 'Canada–US energy trade, 2024', url: 'https://www.statcan.gc.ca/' },
    { org: 'Natural Resources Canada', title: 'Hydrogen storage and the Edmonton Region Hydrogen Hub', url: 'https://natural-resources.canada.ca/' },
  ],
};
