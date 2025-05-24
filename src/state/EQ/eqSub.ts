import { subscribeKey } from 'valtio/utils';
import { eqState } from './eqState';
import { eq } from '../../driver/driver';

export const subscribeEQ = () => {
  for (let bandIndex = 0; bandIndex < eqState.bands.length; bandIndex++) {
    subscribeKey(eqState.bands[bandIndex], 'frequency', (newFrequency) => {
      eq.filters[bandIndex].frequency.value = newFrequency;
    });

    subscribeKey(eqState.bands[bandIndex], 'gain', (newGain) => {
      eq.filters[bandIndex].gain.value = newGain;
    });

    subscribeKey(eqState.bands[bandIndex], 'Q', (newQ) => {
      eq.filters[bandIndex].Q.value = newQ;
    });
  }
};
