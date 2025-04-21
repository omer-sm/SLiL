import { subscribeKey } from 'valtio/utils';
import { synthState } from '../synthState';
import driverSynth from '../../../driver/driver';

export default () => {
  subscribeKey(synthState.synth1Opts.unisonOpts, 'voices', (newVoices) => {
    driverSynth.setUnisonVoices(1, newVoices);
  });

  subscribeKey(synthState.synth2Opts.unisonOpts, 'voices', (newVoices) => {
    driverSynth.setUnisonVoices(2, newVoices);
  });

  subscribeKey(synthState.synth1Opts.unisonOpts, 'detune', (newDetune) => {
    driverSynth.setUnisonDetune(1, newDetune);
  });

  subscribeKey(synthState.synth2Opts.unisonOpts, 'detune', (newDetune) => {
    driverSynth.setUnisonDetune(2, newDetune);
  });
};
