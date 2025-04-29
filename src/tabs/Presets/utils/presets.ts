import { Preset } from "./presetTypes"

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
                    voices: 9
                }
            },
            synth2Opts: {
                waveform: 'sawtooth',
                volume: -18,
                semitoneShift: 12,
                unisonOpts: {
                    detune: 40,
                    voices: 3
                }
            },
            masterEnvelope: {
                attack: 0.001,
                decay: 0,
                sustain: 1,
                release: 0.001
            }
        },
        effects: [
            {
                id: 'input',
                effectName: 'Gain',
                options: {
                    gain: 0
                },
                inputs: [],
                outputs: [0]
            },
            {
                id: 'output',
                effectName: 'Gain',
                options: {
                    gain: 0
                },
                inputs: [0],
                outputs: []
            },
            {
                id: 0,
                effectName: 'Reverb',
                options: {
                    decay: 1,
                    preDelay: 0.01,
                    wet: 1
                },
                inputs: ['input'],
                outputs: ['output']
            }
        ]
    }
];