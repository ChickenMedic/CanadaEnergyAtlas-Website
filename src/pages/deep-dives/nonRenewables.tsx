import { Flame } from 'lucide-react';
import { BarList, Callout, DataTable, Lead, MapLink, Timeline } from '../../components/deepdives/ArticleBlocks';
import type { DeepDive } from './types';

export const nonRenewables: DeepDive = {
  id: 'non-renewable',
  title: 'Non-Renewables',
  kicker: 'Fossil fuels and nuclear',
  headline: 'The Firm Half of the System',
  dek:
    'Hydro and wind get the headlines, but gas plants, a dwindling coal fleet and a world-class nuclear industry still keep the grid steady when the wind drops and the rivers run low.',
  color: '#f97316',
  icon: Flame,
  readingMinutes: 9,
  mapLayer: 'nonRenewable',
  stats: [
    { value: '17', label: 'CANDU reactors in commercial operation' },
    { value: '~5M b/d', label: 'Canadian crude oil production, 2024' },
    { value: '~18 Bcf/d', label: 'Marketable natural gas production' },
    { value: '2030', label: 'Federal deadline for the end of conventional coal power' },
  ],
  sections: [
    {
      id: 'firm-power',
      title: 'What “firm” power means',
      body: (
        <>
          <Lead>
            A grid needs two kinds of generation: the kind that is cheap and clean when the weather allows, and the
            kind that can be switched on whenever it is needed. Hydro covers both roles in much of Canada. Everywhere
            else, firm power still means natural gas, a little coal and, in Ontario and New Brunswick, nuclear.
          </Lead>
          <BarList
            title="Canada’s electricity generation by source, 2023"
            unit="approximate share"
            items={[
              { label: 'Hydro', value: 58, display: '58%' },
              { label: 'Nuclear', value: 14, display: '~14%' },
              { label: 'Natural gas', value: 13, display: '~13%' },
              { label: 'Wind', value: 6, display: '~6%' },
              { label: 'Coal', value: 5, display: '~5%' },
              { label: 'Solar and other', value: 2, display: '~2%' },
            ]}
            note="Roughly four-fifths of Canadian electricity is non-emitting. The remaining fifth is concentrated in Alberta, Saskatchewan, Nova Scotia and New Brunswick."
          />
          <p>
            The national average hides sharp regional contrasts. Alberta and Saskatchewan generate most of their
            power from gas; Nova Scotia still leans on coal; Ontario runs on nuclear and hydro with gas filling peaks;
            Quebec, British Columbia and Manitoba are almost entirely hydro.
          </p>
          <MapLink layer="nonRenewable" title="See coal, gas, oil and nuclear plants on the map">
            The Non-Renewables layer marks thermal and nuclear stations across the continent by fuel.
          </MapLink>
        </>
      ),
    },
    {
      id: 'coal',
      title: 'Coal’s long exit',
      body: (
        <>
          <p>
            In 2001 coal generated as much as 80 per cent of Alberta’s electricity. On 16 June 2024, Capital Power’s
            Genesee 2 unit burned its last coal, five years ahead of the provincial deadline, and the province’s coal
            era ended. The Genesee units were repowered with high-efficiency gas turbines rather than demolished.
          </p>
          <Timeline
            items={[
              { marker: '2014', title: 'Ontario', text: 'Thunder Bay Generating Station burns its last coal; Ontario becomes the first North American jurisdiction to eliminate coal power.' },
              { marker: '2014', title: 'Boundary Dam, Saskatchewan', text: 'SaskPower commissions the world’s first commercial-scale carbon capture retrofit on a coal unit.' },
              { marker: '2024', title: 'Alberta', text: 'Genesee 2 shuts down; Alberta’s grid is coal-free.' },
              { marker: '2030', title: 'National deadline', text: 'Federal regulations require all conventional coal-fired generation to close or capture its emissions.' },
            ]}
          />
          <p>
            Saskatchewan, Nova Scotia and New Brunswick still operate coal units and face the hardest path to 2030.
            Nova Scotia’s answer is the new Wasoqonatl intertie with New Brunswick, described in the grid deep dive,
            which gives it firm imports to replace its coal plants.
          </p>
        </>
      ),
    },
    {
      id: 'gas',
      title: 'Natural gas: the bridge that keeps getting longer',
      body: (
        <>
          <p>
            Canada produces roughly 18 billion cubic feet of marketable gas a day, most of it from the Montney and
            other Western Canada Sedimentary Basin plays. Gas heats most Canadian homes outside Quebec, feeds
            petrochemical and fertiliser plants, and since 2025 leaves Kitimat as LNG. On the grid, it is the fuel
            that took over from coal.
          </p>
          <p>
            A modern combined-cycle plant converts about 60 per cent of the gas it burns into electricity and emits
            roughly half the carbon dioxide of a coal plant per unit of power. Single-cycle peaking turbines are less
            efficient but can start in minutes, which is what a grid full of wind and solar needs for the hours when
            output drops.
          </p>
          <Callout title="The Clean Electricity Regulations">
            Finalised in December 2024, the federal rules set an emissions performance standard for fossil-fired
            generation beginning in 2035. In practice they push new gas plants toward carbon capture or limited running
            hours, and they are the main point of friction between Ottawa and the gas-dependent Prairie provinces.
          </Callout>
        </>
      ),
    },
    {
      id: 'oil',
      title: 'Oil and the oil sands',
      body: (
        <>
          <p>
            Canada is the world’s fourth-largest oil producer at about five million barrels a day in 2024, and the
            third-largest holder of proven reserves. Roughly two-thirds of production is bitumen from the Athabasca,
            Cold Lake and Peace River oil sands.
          </p>
          <DataTable
            title="Two ways to produce bitumen"
            columns={[{ header: 'Method' }, { header: 'Where' }, { header: 'How it works' }]}
            rows={[
              ['Surface mining', 'Deposits within about 75 m of the surface, north of Fort McMurray', 'Oil sand is dug with shovels and trucks, then washed with hot water to separate the bitumen'],
              ['In situ (SAGD)', 'Deeper deposits, the majority of the resource', 'Steam is injected through a horizontal well to soften the bitumen, which drains to a second well below'],
            ]}
          />
          <p>
            Bitumen is either upgraded into synthetic crude at plants in the Fort McMurray and Edmonton regions or
            blended with condensate and shipped as heavy crude. About four million barrels a day are exported, nearly
            all to the United States, through the systems described in the pipelines deep dive. Oil is almost absent
            from electricity generation except in remote diesel communities and a handful of peaking plants.
          </p>
        </>
      ),
    },
    {
      id: 'nuclear',
      title: 'Nuclear: the CANDU fleet',
      body: (
        <>
          <p>
            Canada designed its own reactor. The CANDU, for Canada Deuterium Uranium, uses heavy water as a moderator
            and runs on natural uranium, so it needs no enrichment plant, and it can be refuelled while running.
            Seventeen CANDU units are in commercial operation at four stations.
          </p>
          <DataTable
            title="Canada’s operating nuclear stations"
            columns={[{ header: 'Station' }, { header: 'Province' }, { header: 'Units', align: 'right' }, { header: 'Notes' }]}
            rows={[
              ['Bruce', 'Ontario', '8', 'About 6.5 GW; the largest operating nuclear station in the world. Refurbishment of six units runs to 2033'],
              ['Darlington', 'Ontario', '4', 'Refurbishment of all four units completed in 2025, extending life to the 2050s'],
              ['Pickering B', 'Ontario', '4', 'Licensed to the end of 2026, then to be refurbished through the mid-2030s. Pickering A units 1 and 4 closed in 2024'],
              ['Point Lepreau', 'New Brunswick', '1', 'Atlantic Canada’s only reactor, refurbished in 2012'],
            ]}
          />
          <p>
            Nuclear supplies about half of Ontario’s electricity and is the reason the province could abandon coal
            without a large gas build. Ontario Power Generation and Bruce Power are in the middle of the largest
            clean-energy construction programme in the country, rebuilding reactors one at a time to run another 30
            years or more.
          </p>
        </>
      ),
    },
    {
      id: 'smr',
      title: 'Small modular reactors',
      body: (
        <>
          <p>
            Darlington is also the site of the first small modular reactor in the G7. The Canadian Nuclear Safety
            Commission issued a construction licence for a GE Hitachi BWRX-300 in April 2025, and the first of four
            planned units is scheduled to connect to the grid around the end of the decade. Together they would add
            about 1,200 MW. SaskPower is studying the same design for the mid-2030s as its own coal plants close.
          </p>
          <p>
            SMRs are smaller, factory-built and intended to be cheaper per project if not per megawatt. Whether they
            deliver on cost is the open question of the decade for Canadian nuclear.
          </p>
        </>
      ),
    },
    {
      id: 'uranium',
      title: 'Uranium',
      body: (
        <>
          <p>
            Canada is the world’s second-largest uranium producer, behind Kazakhstan. Cameco’s McArthur River and Cigar
            Lake mines in northern Saskatchewan’s Athabasca Basin have the highest ore grades on Earth, more than a
            hundred times the global average. Most of the output is exported to fuel reactors in the United States,
            Europe and Asia; a smaller share goes to Canada’s own fleet.
          </p>
        </>
      ),
    },
    {
      id: 'diesel',
      title: 'The diesel communities',
      body: (
        <>
          <p>
            Roughly 200 remote communities, most of them Indigenous and most in the North, still run on diesel
            generators fed by truck, barge or aircraft. Power there can cost many times the southern rate and depends
            on a fuel delivery that may happen only a few times a year. Transmission projects such as Wataynikaneyap
            Power in Ontario, which is connecting 17 First Nations to the grid, and hybrid wind, solar and battery
            systems in the territories are the slow work of retiring those generators.
          </p>
        </>
      ),
    },
  ],
  sources: [
    { org: 'Canada Energy Regulator', title: 'Provincial and territorial energy profiles; crude oil and natural gas production statistics', url: 'https://www.cer-rec.gc.ca/' },
    { org: 'Statistics Canada', title: 'Electric power generation, monthly', url: 'https://www.statcan.gc.ca/' },
    { org: 'Canadian Nuclear Safety Commission', title: 'Licensing decisions: Pickering, Darlington New Nuclear Project', url: 'https://www.cnsc-ccsn.gc.ca/' },
    { org: 'Ontario Power Generation and Bruce Power', title: 'Refurbishment programme updates', url: 'https://www.opg.com/' },
    { org: 'Capital Power', title: 'Genesee repowering completion, June 2024', url: 'https://www.capitalpower.com/' },
    { org: 'Environment and Climate Change Canada', title: 'Clean Electricity Regulations; coal-fired electricity regulations', url: 'https://www.canada.ca/' },
    { org: 'Cameco', title: 'McArthur River and Cigar Lake operations', url: 'https://www.cameco.com/' },
    { org: 'Natural Resources Canada', title: 'Remote communities energy database', url: 'https://natural-resources.canada.ca/' },
  ],
};
