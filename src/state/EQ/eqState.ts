import { Frequency } from 'tone/build/esm/core/type/Units';
import { proxy } from 'valtio';
import { eq } from '../../driver/driver';
import { subscribeEQ } from './eqSub';

export interface EQBandOpts {
  frequency: Frequency;
  gain: number;
  Q: number;
}

export interface EQStateType {
  bands: EQBandOpts[];
}

export const eqState: EQStateType = proxy({
  bands: eq.filters.map((filter) => ({
    frequency: filter.frequency.value,
    gain: filter.gain.value,
    Q: filter.Q.value,
  })),
});

subscribeEQ();
