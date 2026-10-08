import { Route } from 'lucide-react';
import { BarList, Callout, DataTable, Lead, MapLink, Timeline } from '../../components/deepdives/ArticleBlocks';
import type { DeepDive } from './types';

export const pipelines: DeepDive = {
  id: 'pipelines',
  title: 'Pipelines',
  kicker: 'Pipelines',
  headline: 'Arteries of a Continent',
  dek:
    'Canada holds the world’s third-largest oil reserves, and almost all of them are landlocked. The pipelines that carry crude and gas south, east and now west decide what that oil is worth.',
  color: 'var(--accent-blue)',
  icon: Route,
  readingMinutes: 8,
  mapLayer: 'pipelines',
  stats: [
    { value: '~3M b/d', label: 'Enbridge Mainline, the largest crude system in the world' },
    { value: '890,000 b/d', label: 'Trans Mountain capacity after the 2024 expansion' },
    { value: '11.2 Bcf/d', label: 'NGTL gas-gathering capacity in the WCSB' },
    { value: '670 km', label: 'Coastal GasLink, from the Montney to Kitimat' },
  ],
  sections: [
    {
      id: 'takeaway',
      title: 'Why takeaway capacity matters',
      body: (
        <>
          <Lead>
            The Western Canada Sedimentary Basin sits more than a thousand kilometres from the nearest ocean. Every
            barrel and every cubic foot it produces has to leave by pipe or by rail, and the amount of pipe available
            is one of the most important numbers in the Canadian economy.
          </Lead>
          <p>
            When pipelines have spare room, Western Canadian Select trades at a discount to West Texas Intermediate
            that mostly reflects quality and freight. When they are full, producers bid against each other for space,
            resort to rail, or store oil, and the discount balloons. In late 2018 the spread passed US$40 a barrel. The
            story of Canadian pipelines is the story of trying to keep that gap closed.
          </p>
          <MapLink layer="pipelines" title="Trace the network on the map">
            The Pipelines layer shows liquids lines in orange and gas lines in blue across Canada and the United
            States.
          </MapLink>
        </>
      ),
    },
    {
      id: 'liquids',
      title: 'The liquids network',
      body: (
        <>
          <p>Four systems carry nearly all of Western Canada’s crude exports.</p>
          <BarList
            title="Major crude export systems"
            unit="thousand barrels per day"
            items={[
              { label: 'Enbridge Mainline', value: 3000, display: '~3,000', note: 'Edmonton and Hardisty to the US Midwest and Ontario' },
              { label: 'Trans Mountain', value: 890, display: '890', note: 'Edmonton to Burnaby, BC' },
              { label: 'Keystone', value: 590, display: '590', note: 'Hardisty to Cushing and the Gulf Coast' },
              { label: 'Express', value: 310, display: '310', note: 'Hardisty to Casper, Wyoming' },
            ]}
            note="Nameplate capacities. Keystone is now owned by South Bow, spun out of TC Energy in 2024."
          />
          <h3>Enbridge Mainline: the heavy lifter</h3>
          <p>
            The Mainline is not one pipe but a bundle of lines carrying light and heavy crude and natural gas liquids.
            It starts in Edmonton and Hardisty, crosses the Prairies and enters the United States at Gretna,
            Manitoba, where it becomes the Lakehead System running to Superior, Wisconsin, Chicago and on to Sarnia,
            Ontario. It is the main feedstock supply for the refineries of the US Midwest (PADD 2) and Ontario. Much
            of the gasoline, diesel and jet fuel sold between Minneapolis and Toronto began as Mainline crude.
          </p>
          <h3>Keystone: the north–south bond</h3>
          <p>
            Keystone, not to be confused with the cancelled Keystone XL, runs from Hardisty through Steele City,
            Nebraska, to Cushing, Oklahoma, and the Gulf Coast at Port Arthur and Houston. The Gulf Coast (PADD 3)
            has the most sophisticated heavy-oil refineries in the world, built to turn high-sulphur, high-viscosity
            feedstock into clean products. That makes it a natural match for Alberta bitumen.
          </p>
        </>
      ),
    },
    {
      id: 'tmx',
      title: 'Trans Mountain and the turn to tidewater',
      body: (
        <>
          <p>
            For decades, Canada sold its oil to one customer. The Trans Mountain Expansion, completed in May 2024,
            changed that. Twinning the original line lifted capacity from 300,000 to 890,000 barrels a day and ended
            at the Westridge Marine Terminal in Burnaby, where tankers load for California, China, India, Japan and
            South Korea.
          </p>
          <p>
            Since mid-2024 Westridge has shipped an average of more than 350,000 barrels a day. Tidewater access gives
            Alberta producers a second bidder for every barrel, which narrows the discount on Canadian heavy oil and
            removes some of the leverage that a single export market had held.
          </p>
        </>
      ),
    },
    {
      id: 'never-built',
      title: 'The lines that were never built',
      body: (
        <>
          <p>
            The network looks the way it does partly because of what was cancelled. Three projects would have added
            close to three million barrels a day of export capacity.
          </p>
          <DataTable
            title="Cancelled crude pipelines"
            columns={[{ header: 'Project' }, { header: 'Route' }, { header: 'Capacity', align: 'right' }, { header: 'Outcome' }]}
            rows={[
              ['Northern Gateway (Enbridge)', 'Bruderheim, AB to Kitimat, BC', '525,000 b/d', 'Federal approval overturned in court; rejected 2016'],
              ['Energy East (TransCanada)', 'Hardisty, AB to Saint John, NB', '1.1M b/d', 'Withdrawn by the proponent in 2017'],
              ['Keystone XL (TC Energy)', 'Hardisty, AB to Steele City, NE', '830,000 b/d', 'US presidential permit revoked; cancelled 2021'],
            ]}
          />
          <p>
            Each cancellation pushed more barrels onto rail or into storage and widened the price gap. Trans Mountain
            became the only new export route in a generation.
          </p>
        </>
      ),
    },
    {
      id: 'gas',
      title: 'Natural gas: NGTL, AECO and the Mainline',
      body: (
        <>
          <p>
            Oil gets the headlines, but the gas system is at least as intricate. The Nova Gas Transmission (NGTL)
            system, owned by TC Energy, gathers gas from thousands of wells across the WCSB with a capacity of about
            11.2 billion cubic feet a day. Its receipt points form the basis of the AECO hub, the price benchmark for
            Western Canadian gas and the reference for the Alberta figures on this site’s home page.
          </p>
          <p>
            From NGTL, gas moves east on the TC Canadian Mainline to Ontario and Quebec, south on the Alliance
            Pipeline to Chicago, and west through Enbridge’s Westcoast system in British Columbia. Until 2025 every
            molecule stayed on the continent.
          </p>
        </>
      ),
    },
    {
      id: 'lng',
      title: 'Coastal GasLink and LNG Canada',
      body: (
        <>
          <p>
            Coastal GasLink runs 670 kilometres from the Montney fields near Dawson Creek to the LNG Canada terminal
            at Kitimat, on the north coast of British Columbia. At the terminal, gas is chilled to −162 °C, which
            shrinks its volume roughly 600-fold and lets it be loaded onto tankers as liquefied natural gas.
          </p>
          <p>
            LNG Canada’s first cargo sailed on 30 June 2025, bound for South Korea. Its two trains can export about
            14 million tonnes a year, and a second phase that would double that is under consideration. For the first
            time, Western Canadian gas is priced against Asian markets rather than only against Henry Hub.
          </p>
          <Callout title="The climate case, with caveats">
            Canadian LNG is marketed as a lower-carbon substitute for coal in Asian power generation. The benefit
            depends on how much methane leaks along the chain and on what the gas actually displaces, so the net effect
            is debated. What is not debated is that it gives Canadian gas a second market.
          </Callout>
        </>
      ),
    },
    {
      id: 'barrel',
      title: 'Follow a barrel',
      body: (
        <>
          <p>A typical heavy barrel takes about a month to get from the oil sands to a fuel tank in the Midwest.</p>
          <Timeline
            items={[
              { marker: '1', title: 'Fort McMurray, Alberta', text: 'Bitumen is extracted by mining or steam-assisted wells and diluted with condensate so it can flow.' },
              { marker: '2', title: 'Hardisty, Alberta', text: 'The blend is stored, tested and mixed to the Western Canadian Select specification at the Hardisty tank farms.' },
              { marker: '3', title: 'Gretna, Manitoba', text: 'It crosses the border on the Enbridge Mainline and becomes a Lakehead System barrel.' },
              { marker: '4', title: 'Superior, Wisconsin', text: 'The Lakehead terminal sorts batches and sends heavy crude on toward Chicago.' },
              { marker: '5', title: 'Whiting, Indiana', text: 'BP’s Whiting refinery, the largest in the Midwest, cokes and cracks the heavy oil into gasoline and diesel.' },
              { marker: '6', title: 'A pump in Chicago', text: 'Roughly 42 US gallons of crude become about 19 to 20 gallons of gasoline plus diesel, jet fuel and petrochemical feedstock.' },
            ]}
          />
        </>
      ),
    },
  ],
  sources: [
    { org: 'Canada Energy Regulator', title: 'Pipeline profiles; Canada’s Energy Future', url: 'https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/pipeline-profiles/' },
    { org: 'U.S. Energy Information Administration', title: 'Canada country analysis brief', url: 'https://www.eia.gov/international/analysis/country/CAN' },
    { org: 'Trans Mountain Corporation', title: 'Expansion project overview and Westridge throughput', url: 'https://www.transmountain.com/' },
    { org: 'TC Energy', title: 'NGTL System and Coastal GasLink project information', url: 'https://www.tcenergy.com/' },
    { org: 'Enbridge Inc.', title: 'Mainline system operations', url: 'https://www.enbridge.com/' },
    { org: 'LNG Canada', title: 'First cargo announcement, June 2025', url: 'https://www.lngcanada.ca/' },
  ],
};
