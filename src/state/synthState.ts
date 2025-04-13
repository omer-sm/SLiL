import { Decibels } from "tone/build/esm/core/type/Units"
import { proxy } from "valtio"
import { subscribeKey } from "valtio/utils"
import driverSynth from "../driver/driver"
import { waveforms } from "../utils/waveforms"

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

subscribeKey(synthState.synth1Opts, 'semitoneShift', (newShift) => {
    driverSynth.setSemitoneShift(1, newShift);
});

subscribeKey(synthState.synth2Opts, 'semitoneShift', (newShift) => {
    driverSynth.setSemitoneShift(2, newShift);
});

subscribeKey(synthState.synth1Opts, 'waveform', (newWaveform) => {
    driverSynth.synth1.set({
        oscillator: {
            type: newWaveform
        }
    });
});

subscribeKey(synthState.synth2Opts, 'waveform', (newWaveform) => {
    driverSynth.synth2.set({
        oscillator: {
            type: newWaveform
        }
    });
});

subscribeKey(synthState.synth1Opts, 'volume', (newVolume) => {
    driverSynth.synth1.set({
        oscillator: {
            volume: newVolume
        }
    });
});

subscribeKey(synthState.synth2Opts, 'volume', (newVolume) => {
    driverSynth.synth2.set({
        oscillator: {
            volume: newVolume
        }
    });
});