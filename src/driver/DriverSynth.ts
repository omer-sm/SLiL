import { EnvelopeOptions, Limiter, optionsFromArguments, PolySynth, Synth } from 'tone';
import { NormalRange, Time, Frequency } from 'tone/build/esm/core/type/Units';
import { Instrument, InstrumentOptions } from 'tone/build/esm/instrument/Instrument';
import { semitonesToCents } from '../utils/noteUtils';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';

export interface AdditionalSubsynthOpts {
  currentSemitoneShift: number;
}

interface DriverSynthOptions extends InstrumentOptions {
  synth1: Synth;
  synth2: Synth;
  synth1Opts: AdditionalSubsynthOpts;
  synth2Opts: AdditionalSubsynthOpts;
  masterEnvelope: RecursivePartial<Omit<EnvelopeOptions, 'context'>>;
  limiter: Limiter;
}

export default class DriverSynth extends Instrument<DriverSynthOptions> {
  readonly name = 'DriverSynth';
  readonly synth1;
  readonly synth2;
  synth1Opts: AdditionalSubsynthOpts;
  synth2Opts: AdditionalSubsynthOpts;
  masterEnvelope: RecursivePartial<Omit<EnvelopeOptions, 'context'>>;
  readonly limiter: Limiter;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    const options = optionsFromArguments(DriverSynth.getDefaults(), arguments);
    super(options);

    this.masterEnvelope = {
      attack: 0.001,
      decay: 0,
      sustain: 1,
      release: 0.01,
    };

    this.synth1 = new PolySynth(Synth, {
      oscillator: { type: 'sine' },
      envelope: this.masterEnvelope,
      volume: -12,
    });
    this.synth2 = new PolySynth(Synth, {
      oscillator: { type: 'sine' },
      envelope: this.masterEnvelope,
      volume: -12,
    });

    this.limiter = new Limiter(-12);
    this.synth1.connect(this.limiter);
    this.synth2.connect(this.limiter);
    this.limiter.connect(this.output);

    this.synth1Opts = {
      currentSemitoneShift: 0,
    };
    this.synth2Opts = {
      currentSemitoneShift: 0,
    };
  }

  changeEnvelope(newEnvelope: typeof this.masterEnvelope) {
    this.masterEnvelope = { ...this.masterEnvelope, ...newEnvelope };
    this.synth1.set({ envelope: this.masterEnvelope });
    this.synth2.set({ envelope: this.masterEnvelope });
  }

  setSemitoneShift(
    subsynthNumber: 1 | 2,
    newShift: AdditionalSubsynthOpts['currentSemitoneShift']
  ) {
    const subsynth = subsynthNumber === 1 ? this.synth1 : this.synth2;
    const subsynthOpts = subsynthNumber === 1 ? this.synth1Opts : this.synth2Opts;

    const diff = newShift - subsynthOpts.currentSemitoneShift;
    subsynth.set({
      detune: subsynth.get().detune + semitonesToCents(diff),
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

  triggerAttackRelease(
    notes: Frequency | Frequency[],
    duration: Time,
    time?: Time,
    velocity?: NormalRange
  ): this {
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
