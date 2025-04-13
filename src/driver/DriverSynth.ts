import { optionsFromArguments, PolySynth, Synth } from "tone"
import { NormalRange, Time, Frequency } from "tone/build/esm/core/type/Units"
import { Instrument, InstrumentOptions } from "tone/build/esm/instrument/Instrument"
import { semitonesToCents } from "../utils/noteUtils"

export interface AdditionalSubsynthOpts {
    currentSemitoneShift: number;    
}

interface DriverSynthOptions extends InstrumentOptions {
    synth1: Synth;
    synth2: Synth;
    synth1Opts: AdditionalSubsynthOpts;
    synth2Opts: AdditionalSubsynthOpts;
}

export default class DriverSynth extends Instrument<DriverSynthOptions> {
    readonly name = 'DriverSynth';
    readonly synth1;
    readonly synth2;
    synth1Opts: AdditionalSubsynthOpts;
    synth2Opts: AdditionalSubsynthOpts;

    constructor() {
        // eslint-disable-next-line prefer-rest-params
        const options = optionsFromArguments(DriverSynth.getDefaults(), arguments);
        super(options);

        this.synth1 = new PolySynth(Synth, {
            oscillator: {type: 'sine'},
            volume: -6
        }).toDestination();
        this.synth2 = new PolySynth(Synth, {
            oscillator: {type: 'sine'},
            volume: -6
        }).toDestination();

        this.synth1Opts = {
            currentSemitoneShift: 0
        };
        this.synth2Opts = {
            currentSemitoneShift: 0
        };
    }

    setSemitoneShift(
        subsynthNumber: 1 | 2, 
        newShift: AdditionalSubsynthOpts['currentSemitoneShift']
    ) {
        const subsynth = subsynthNumber === 1 ? this.synth1 : this.synth2;
        const subsynthOpts = subsynthNumber === 1 ? this.synth1Opts : this.synth2Opts;

        const diff = newShift - subsynthOpts.currentSemitoneShift;
        subsynth.set({
            detune: subsynth.get().detune + semitonesToCents(diff)
        });
        subsynthOpts.currentSemitoneShift = newShift;
    }

    static getDefaults() {
        return Object.assign(Instrument.getDefaults(), {});
    }

    triggerAttack(notes: Frequency | Frequency[], time?: Time, velocity?: NormalRange): this {
        this.synth1.triggerAttack(notes, time, velocity);
        this.synth2.triggerAttack(notes, time, velocity);

        return this;
    }

    triggerRelease(notes: Frequency | Frequency[], time?: Time): this {
        this.synth1.triggerRelease(notes, time);
        this.synth2.triggerRelease(notes, time);

        return this;
    }

    triggerAttackRelease(notes: Frequency | Frequency[], duration: Time, time?: Time, velocity?: NormalRange): this {
        this.synth1.triggerAttackRelease(notes, duration, time, velocity);
        this.synth2.triggerAttackRelease(notes, duration, time, velocity);

        return this;
    }

    dispose(): this {
        super.dispose();
        this.synth1.dispose();
        this.synth2.dispose();

        return this;
    }
}