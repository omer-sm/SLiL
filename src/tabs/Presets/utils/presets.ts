import { Preset } from './presetTypes';

export const presets: Preset[] = [
  {
    name: 'Demo Supersaw',
    synthOpts: {
      synth1Opts: {
        waveform: 'sawtooth',
        volume: -12,
        semitoneShift: 0,
        unisonOpts: {
          detune: 40,
          voices: 9,
        },
      },
      synth2Opts: {
        waveform: 'sawtooth',
        volume: -18,
        semitoneShift: 12,
        unisonOpts: {
          detune: 40,
          voices: 3,
        },
      },
      masterEnvelope: {
        attack: 0.001,
        decay: 0,
        sustain: 1,
        release: 0.001,
      },
    },
    effects: [
      {
        id: 'input',
        effectName: 'Gain',
        options: {
          gain: 0,
        },
        inputs: [],
        outputs: [0],
      },
      {
        id: 'output',
        effectName: 'Gain',
        options: {
          gain: 0,
        },
        inputs: [0],
        outputs: [],
      },
      {
        id: 0,
        effectName: 'Reverb',
        options: {
          decay: 1,
          preDelay: 0.01,
          wet: 0.4,
        },
        inputs: [1],
        outputs: ['output'],
      },
      {
        id: 1,
        effectName: 'Gain',
        options: {
          gain: 0.5,
        },
        inputs: ['input'],
        outputs: [0],
      },
    ],
    lfos: {
      lfo1: {
        shape: 'sawtooth',
        frequency: '4n',
        isSyncedToBPM: true,
        connections: [
          {
            effectId: 1,
            param: 'gain',
            amplitude: 1,
            min: 0,
            max: 1,
          },
        ],
      },
      lfo2: {
        shape: 'sine',
        frequency: '1m',
        isSyncedToBPM: true,
        connections: [],
      },
      lfo3: {
        shape: 'sine',
        frequency: '1m',
        isSyncedToBPM: true,
        connections: [],
      },
    },
  },
];
