import { Leaf } from 'lucide-react';
import { BarList, Callout, DataTable, Lead, MapLink, Timeline } from '../../components/deepdives/ArticleBlocks';
import type { DeepDive } from './types';

export const renewables: DeepDive = {
  id: 'renewables',
  title: 'Renewables',
  kicker: 'Renewable energy',
  headline: 'Two-Thirds Clean, and Changing Fast',
  dek:
    'Renewables already produce about two-thirds of Canada’s electricity and one-sixth of all the energy it uses. The next chapter is wind, solar, batteries, carbon capture and a new generation of Indigenous owners.',
  color: 'var(--accent-green)',
  icon: Leaf,
  readingMinutes: 13,
  mapLayer: 'renewables',
  stats: [
    { value: '66%', label: 'Share of Canadian electricity from renewables, 2023' },
    { value: '411 TWh', label: 'Renewable generation in 2023' },
    { value: '+364%', label: 'Growth in wind generation, 2010 to 2023' },
    { value: '~200', label: 'Energy projects with Indigenous ownership' },
  ],
  sections: [
    {
      id: 'standing',
      title: 'Where Canada stands',
      body: (
        <>
          <Lead>
            Canada is the world’s fourth-largest producer of renewable electricity, a position earned almost entirely
            by water. Hydro supplied 58 per cent of national generation in 2023. The growth, though, is coming from
            the wind and the sun.
          </Lead>
          <p>
            Between 2010 and 2023 wind generation rose 364 per cent to 40.1 terawatt-hours, and solar output grew more
            than fortyfold to 4.9 TWh. Total renewable generation reached 411 TWh, or 66 per cent of the mix. The same
            year also showed the system’s weak point: renewable output fell 9 per cent from 2022 because drought cut
            hydro production.
          </p>
          <Callout title="Electricity is not energy">
            Two-thirds of electricity is renewable, but electricity is only part of what Canada burns. Renewables meet
            about 17 per cent of total energy supply; natural gas supplies 39 per cent and oil 33 per cent, mostly for
            heating, transport and industry. Net zero requires electricity to grow from a sixth of the energy system
            to perhaps 35 per cent of it by 2050.
          </Callout>
          <MapLink layer="renewables" title="See hydro, wind and solar on the map">
            The Renewables layer marks generating sites by type across Canada and the United States.
          </MapLink>
        </>
      ),
    },
    {
      id: 'growth',
      title: 'Where the growth is going',
      body: (
        <>
          <p>
            The Canada Energy Regulator’s scenarios bracket the future. Under current policies, electricity demand
            grows almost 50 per cent by 2050. In a net-zero scenario it doubles as transport, buildings and industry
            electrify. Either way, installed capacity must rise from about 160 gigawatts in 2023 to more than 310 GW.
          </p>
          <BarList
            title="Share of renewable capacity added, 2010 to 2023"
            unit="per cent"
            items={[
              { label: 'Ontario', value: 30, display: '30%', note: 'Solar and wind' },
              { label: 'Quebec', value: 23, display: '23%', note: 'Large hydro and wind' },
              { label: 'Alberta', value: 18, display: '18%', note: 'Wind and solar' },
              { label: 'British Columbia', value: 10, display: '10%', note: 'Hydro, including Site C' },
              { label: 'Rest of Canada', value: 19, display: '19%' },
            ]}
          />
        </>
      ),
    },
    {
      id: 'us-buildout',
      title: 'The American build-out',
      body: (
        <>
          <p>
            South of the border, 2026 is on track to be the largest year for new generating capacity on record, with
            developers planning 86 GW of additions. Solar makes up half of it, batteries more than a quarter.
          </p>
          <DataTable
            title="Planned US capacity additions, 2026"
            columns={[
              { header: 'Source' },
              { header: 'Planned (GW)', align: 'right' },
              { header: 'Share of additions', align: 'right' },
              { header: '2025 generation share', align: 'right' },
            ]}
            rows={[
              ['Utility-scale solar', '43.4', '51%', '9.0% incl. rooftop'],
              ['Battery storage', '24.0', '28%', '—'],
              ['Wind', '11.8', '14%', '10.3%'],
              ['Natural gas', '6.3', '7%', '40.0%'],
              ['Nuclear', '<0.1', '<1%', '18.0%'],
            ]}
            note="EIA preliminary planned additions. Battery storage shifts energy rather than generating it."
          />
          <p>
            The 43.4 GW of solar is 60 per cent more than 2025, concentrated in Texas, Arizona, California and
            Michigan. Wind generated a record 10.3 per cent of US electricity in 2025, and the 11.8 GW planned for 2026
            includes the 3,650 MW SunZia project in New Mexico and the long-delayed Vineyard Wind 1 and Revolution
            Wind offshore farms. Together wind and solar reached 19 per cent of generation in 2025, passing both coal
            and nuclear.
          </p>
          <p>
            Batteries are what make that penetration workable. The US added 40 GW of storage in five years and plans
            24 GW more in 2026, over half of it in Texas. Storage flattens the “duck curve,” banking midday solar for
            the evening ramp when the sun sets and demand peaks.
          </p>
        </>
      ),
    },
    {
      id: 'ccs-how',
      title: 'Carbon capture: three ways to catch CO₂',
      body: (
        <>
          <p>
            Carbon capture and storage has moved from theory to industrial policy. For oil sands, cement and
            chemicals, it offers a way to keep operating while putting emissions back underground. Alberta and the
            United States lead the world in operating capacity.
          </p>
          <Timeline
            items={[
              { marker: '1', title: 'Post-combustion capture', text: 'CO₂ is scrubbed from flue gas after burning, usually with amine solvents in absorption towers. The standard retrofit.' },
              { marker: '2', title: 'Pre-combustion capture', text: 'Fuel is partly oxidised into hydrogen and CO₂; the CO₂ is removed and the hydrogen burned clean. Common in hydrogen and ammonia plants.' },
              { marker: '3', title: 'Oxy-fuel combustion', text: 'Fuel burns in pure oxygen, so the exhaust is almost entirely CO₂ and steam, which separate by condensation.' },
            ]}
          />
          <p>
            Captured CO₂ is compressed into a supercritical fluid, as dense as a liquid but as mobile as a gas, and
            piped to a storage site. In Alberta it is injected more than two kilometres down into formations such as
            the Basal Cambrian Sands, beneath the same impermeable caprock that held oil and gas for millions of
            years.
          </p>
        </>
      ),
    },
    {
      id: 'alberta-ccs',
      title: 'Alberta’s carbon hubs',
      body: (
        <>
          <DataTable
            title="Major Canadian capture and storage projects"
            columns={[{ header: 'Project' }, { header: 'Location' }, { header: 'Capacity (Mt/yr)', align: 'right' }, { header: 'CO₂ source' }, { header: 'Status' }]}
            rows={[
              ['Quest', 'Scotford, AB', '1.1', 'Hydrogen units', 'Operating since 2015'],
              ['Polaris', 'Scotford, AB', '0.65', 'Refinery and chemicals', 'Under construction; start 2028'],
              ['Alberta Carbon Trunk Line', 'Central Alberta', '14.6 (pipeline)', 'Refinery and fertiliser', 'Operating'],
              ['Pathways Alliance', 'Oil sands', '40 by 2050', 'Multiple oil sands sites', 'In development'],
              ['Weyburn-Midale', 'Southeast Saskatchewan', '2.0', 'Coal and gas plants', 'Operating, enhanced oil recovery'],
            ]}
          />
          <p>
            Shell’s Quest project has stored more than nine million tonnes since 2015 and proved the model. Its
            successor, Polaris, has a final investment decision and will feed the Atlas Carbon Storage Hub, a Shell–ATCO
            partnership open to third-party emitters. The Alberta Carbon Trunk Line is one of the largest CO₂ pipelines
            in the world.
          </p>
          <p>
            The most ambitious plan is the Pathways Alliance, a consortium of the six largest oil sands producers
            proposing a $16.5 billion system: a 400-kilometre trunk line linking capture units at individual plants to
            a central storage hub, with a target of 40 million tonnes a year by 2050. That is roughly forty Quests.
          </p>
        </>
      ),
    },
    {
      id: 'us-ccs',
      title: 'The United States: from oil recovery to permanent storage',
      body: (
        <>
          <p>
            The US holds almost half of the world’s operating capture capacity, about 22 million tonnes a year. Most
            of it grew out of enhanced oil recovery, where CO₂ is pumped into ageing fields to push out more oil. Shute
            Creek in Wyoming recovers seven million tonnes a year, and the Terrell plant in Texas is the oldest
            industrial capture project anywhere.
          </p>
          <p>
            The direction is now toward permanent storage. The CarbonSAFE programme has awarded more than US$595
            million to develop large saline storage sites, and the Department of Energy is funding direct air capture
            hubs; 1PointFive plans up to 70 plants of a million tonnes each by 2035. The economics remain fragile: in
            2025 the department cancelled several capture demonstrations at power plants, underlining how much the
            sector depends on the 45Q tax credit.
          </p>
        </>
      ),
    },
    {
      id: 'indigenous',
      title: 'Indigenous energy sovereignty',
      body: (
        <>
          <p>
            The old model of energy development was decide, announce, defend. The new one has Indigenous nations as
            owners. About 200 Canadian energy and infrastructure projects now have partial or full Indigenous
            ownership, and 30 per cent of them were announced between 2024 and 2026, after federal and provincial loan
            guarantees opened access to capital.
          </p>
          <DataTable
            title="Indigenous equity projects by region, 2024–26"
            columns={[{ header: 'Region' }, { header: 'Share of projects', align: 'right' }, { header: 'Pattern' }]}
            rows={[
              ['Ontario', '32%', '50/50 partnerships with utilities'],
              ['British Columbia', '25%', 'Large transmission and gas-pipeline equity'],
              ['Saskatchewan', '15%', 'Solar for grid reliability'],
              ['Maritimes and Quebec', '10%', 'Wind and battery storage'],
              ['Alberta', '7%', 'Slowed by the 2023–24 renewables pause'],
            ]}
          />
          <p>
            Ontario’s system operator recently awarded 20-year contracts to 14 renewable proposals, every one with at
            least 50 per cent Indigenous equity. BC Hydro’s 2024 call for power produced a wave of Indigenous-led wind
            and solar. The landmark deal came in July 2025, when 38 communities bought a 12.5 per cent stake in the
            Westcoast gas pipeline for $738 million, backed by a federal loan guarantee.
          </p>
          <p>
            Stakes are getting larger. Forty-three per cent of current Indigenous energy projects are majority-owned
            and 10 per cent are wholly owned, which lets communities set the terms on environmental stewardship as
            well as revenue.
          </p>
        </>
      ),
    },
    {
      id: 'tribal',
      title: 'Tribal energy in the United States',
      body: (
        <>
          <p>
            The US Department of Energy’s Office of Indian Energy runs a US$50 million programme to de-risk Tribal
            projects, from community-scale builds to planning that unlocks larger financing. The Moapa Southern Paiute
            solar project in Nevada, the first utility-scale solar plant on Tribal land, produces 250 MW, enough for
            111,000 homes, and pays lease revenue to the Moapa Band of Paiutes. The Navajo Nation’s Kayenta solar
            plants fund the Light Up Navajo initiative that is connecting off-grid families, and 85 per cent of
            Kayenta’s construction crew was Navajo.
          </p>
        </>
      ),
    },
    {
      id: 'demand-politics',
      title: 'New demand, new politics',
      body: (
        <>
          <p>
            Artificial intelligence is now a central variable in grid planning. CER modelling puts data-centre growth
            at up to 100 TWh in high-growth scenarios, roughly a sixth of today’s Canadian generation. Indigenous-led
            AI data centres were announced in British Columbia and Alberta in 2025 and 2026, extending the equity
            model into digital infrastructure.
          </p>
          <p>
            Policy is moving in opposite directions on either side of the border. The US One Big Beautiful Bill Act of
            2025 accelerated the wind-down of the production and investment tax credits for wind and solar, with
            projects needing to start construction by mid-2026 to keep full eligibility, and tightened “foreign entity
            of concern” rules that complicate supply chains. Analysts expect wind and storage to feel it most, with
            utility-scale solar better placed because of its developers’ balance sheets.
          </p>
          <p>
            Canada has gone the other way, with a suite of clean-technology investment tax credits worth an estimated
            $90 billion over the decade, and a critical-minerals push that depends heavily on Indigenous partners,
            since most major deposits lie on or near Indigenous lands.
          </p>
          <p>
            The direction is clear even if the pace is not: a system that is more electrified, more decentralised and
            more dependent on carbon management, built increasingly by the communities it crosses. Its vulnerabilities
            are equally clear, from a dry year in the reservoirs to a change of policy in Washington.
          </p>
        </>
      ),
    },
  ],
  sources: [
    { org: 'Canada Energy Regulator', title: 'Canada’s Energy Future 2023; renewable generation statistics', url: 'https://www.cer-rec.gc.ca/' },
    { org: 'U.S. Energy Information Administration', title: 'Preliminary planned capacity additions for 2026; Electric Power Monthly', url: 'https://www.eia.gov/' },
    { org: 'Shell Canada and ATCO', title: 'Quest, Polaris and the Atlas Carbon Storage Hub', url: 'https://www.shell.ca/' },
    { org: 'Pathways Alliance', title: 'Oil sands carbon capture network proposal', url: 'https://pathwaysalliance.ca/' },
    { org: 'U.S. Department of Energy', title: 'CarbonSAFE; Office of Indian Energy funding programmes', url: 'https://www.energy.gov/' },
    { org: 'Independent Electricity System Operator', title: '2024–25 procurement results', url: 'https://www.ieso.ca/' },
    { org: 'Government of Canada', title: 'Indigenous Loan Guarantee Program; clean technology investment tax credits', url: 'https://www.canada.ca/' },
  ],
};
