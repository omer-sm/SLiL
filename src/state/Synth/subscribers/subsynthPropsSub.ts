import { subscribeKey } from 'valtio/utils';
import driverSynth from '../../../driver/driver';
import { synthState } from '../synthState';

export default () => {
  subscribeKey(synthState.synth1Opts, 'waveform', (newWaveform) => {
    driverSynth.synth1.forEach((voice) =>
      voice.set({
        oscillator: {
          type: newWaveform,
        },
      })
    );
  });

  subscribeKey(synthState.synth2Opts, 'waveform', (newWaveform) => {
    driverSynth.synth2.forEach((voice) =>
      voice.set({
        oscillator: {
          type: newWaveform,
        },
      })
    );
  });

  subscribeKey(synthState.synth1Opts, 'volume', (newVolume) => {
    driverSynth.synth1.forEach((voice) =>
      voice.set({
        volume: newVolume,
      })
    );
  });

  subscribeKey(synthState.synth2Opts, 'volume', (newVolume) => {
    driverSynth.synth2.forEach((voice) =>
      voice.set({
        volume: newVolume,
      })
    );
  });

  subscribeKey(synthState.synth1Opts, 'semitoneShift', (newShift) => {
    driverSynth.setSemitoneShift(1, newShift);
  });

  subscribeKey(synthState.synth2Opts, 'semitoneShift', (newShift) => {
    driverSynth.setSemitoneShift(2, newShift);
  });
};
