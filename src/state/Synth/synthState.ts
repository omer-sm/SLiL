import { Decibels } from 'tone/build/esm/core/type/Units';
import { proxy } from 'valtio';
import { waveforms } from '../../utils/waveforms';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import { EnvelopeOptions } from 'tone';
import { subscribeSynth } from './subscribers';

export interface SubSynthOpts {
  waveform: (typeof waveforms)[number];
  volume: Decibels;
  semitoneShift: number;
  unisonOpts: {
    detune: number;
    voices: number;
  };
}

export interface SynthStateType {
  synth1Opts: SubSynthOpts;
  synth2Opts: SubSynthOpts;
  masterEnvelope: RecursivePartial<Omit<EnvelopeOptions, 'context'>>;
}

export const synthState: SynthStateType = proxy({
  synth1Opts: {
    waveform: 'sine',
    volume: -12,
    semitoneShift: 0,
    unisonOpts: {
      detune: 0,
      voices: 1,
    },
  },
  synth2Opts: {
    waveform: 'sine',
    volume: -12,
    semitoneShift: 0,
    unisonOpts: {
      detune: 0,
      voices: 1,
    },
  },
  masterEnvelope: {
    attack: 0.001,
    decay: 0,
    sustain: 1,
    release: 0.01,
  },
});

subscribeSynth();
