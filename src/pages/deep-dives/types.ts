import type { ComponentType, ReactNode } from 'react';
import type { LucideProps } from 'lucide-react';
import type { SidebarLayerKey } from '../../components/map/mapLayers';

export interface DeepDiveSection {
  /** Anchor id, used by the table of contents. */
  id: string;
  title: string;
  body: ReactNode;
}

export interface DeepDiveStat {
  value: string;
  label: string;
}

export interface DeepDiveSource {
  org: string;
  title: string;
  url?: string;
}

export interface DeepDive {
  /** URL slug: /deep-dives?topic=<id> */
  id: string;
  /** Short name for cards, chips and prev/next links. */
  title: string;
  /** Small label above the headline. */
  kicker: string;
  headline: string;
  /** One or two sentence standfirst. */
  dek: string;
  /** Any CSS colour, including var(--accent-*) tokens. */
  color: string;
  icon: ComponentType<LucideProps>;
  readingMinutes: number;
  /** Which sidebar layer to open when the reader jumps to the map. */
  mapLayer: SidebarLayerKey;
  stats: DeepDiveStat[];
  sections: DeepDiveSection[];
  sources: DeepDiveSource[];
}
