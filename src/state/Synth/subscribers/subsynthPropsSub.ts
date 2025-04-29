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
        oscillator: {
          volume: newVolume,
        },
      })
    );
  });

  subscribeKey(synthState.synth2Opts, 'volume', (newVolume) => {
    driverSynth.synth2.forEach((voice) =>
      voice.set({
        oscillator: {
          volume: newVolume,
        },
      })
    );
  });

  subscribeKey(synthState.synth1Opts, 'semitoneShift', (newShift) => {
    driverSynth.setSemitoneShift(1, newShift);
  });

  subscribeKey(synthState.synth2Opts, 'semitoneShift', (newShift) => {
    driverSynth.setSemitoneShift(2, newShift);
  });

  subscribeKey(synthState, 'synth1Opts', (newOpts) => {
    driverSynth.setSemitoneShift(1, newOpts.semitoneShift);
    driverSynth.synth1.forEach((voice) =>
      voice.set({
        oscillator: {
          type: newOpts.waveform,
          volume: newOpts.volume,
        },
      })
    );
    driverSynth.setUnisonVoices(1, newOpts.unisonOpts.voices, newOpts.unisonOpts.detune);
  });

  subscribeKey(synthState, 'synth2Opts', (newOpts) => {
    driverSynth.setSemitoneShift(2, newOpts.semitoneShift);
    driverSynth.synth2.forEach((voice) =>
      voice.set({
        oscillator: {
          type: newOpts.waveform,
          volume: newOpts.volume,
        },
      })
    );
    driverSynth.setUnisonVoices(2, newOpts.unisonOpts.voices, newOpts.unisonOpts.detune);
  });
};
