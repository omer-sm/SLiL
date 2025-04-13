import { Decibels } from "tone/build/esm/core/type/Units"
import { proxy } from "valtio"
import { waveforms } from "../../utils/waveforms"
import { RecursivePartial } from "tone/build/esm/core/util/Interface";
import { EnvelopeOptions } from "tone";
import { subscribeSynth } from "./subscribers"

export interface subSynthOpts{
    waveform: typeof waveforms[number];
    volume: Decibels;
    semitoneShift: number;
}

interface SynthStateType {
    synth1Opts: subSynthOpts;
    synth2Opts: subSynthOpts;
    masterEnvelope: RecursivePartial<Omit<EnvelopeOptions, "context">>;
}

export const synthState: SynthStateType = proxy({
    synth1Opts: {
        waveform: 'sine',
        volume: -6,
        semitoneShift: 0
    },
    synth2Opts: {
        waveform: 'sine',
        volume: -6,
        semitoneShift: 0
    },
    masterEnvelope: {
        attack: 0.001,
        decay: 0,
        sustain: 1,
        release: 0.01
    }
});

subscribeSynth();