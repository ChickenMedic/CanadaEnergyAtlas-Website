import type { DeepDive } from './types';
import { geology } from './geology';
import { pipelines } from './pipelines';
import { refining } from './refining';
import { storage } from './storage';
import { grid } from './grid';
import { renewables } from './renewables';
import { nonRenewables } from './nonRenewables';
import { minerals } from './minerals';

/** Every deep dive, in reading order. */
export const deepDives: DeepDive[] = [
  geology,
  pipelines,
  refining,
  storage,
  grid,
  renewables,
  nonRenewables,
  minerals,
];

export const findDeepDive = (id: string | null | undefined): DeepDive | undefined =>
  id ? deepDives.find((d) => d.id === id) : undefined;

export type { DeepDive, DeepDiveSection, DeepDiveSource, DeepDiveStat } from './types';
