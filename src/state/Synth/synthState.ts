import { Decibels } from "tone/build/esm/core/type/Units"
import { proxy } from "valtio"
import { waveforms } from "../../utils/waveforms"

export interface subSynthOpts{
    waveform: typeof waveforms[number];
    volume: Decibels;
    semitoneShift: number;
}

interface SynthStateType {
    synth1Opts: subSynthOpts;
    synth2Opts: subSynthOpts;
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
    }
});