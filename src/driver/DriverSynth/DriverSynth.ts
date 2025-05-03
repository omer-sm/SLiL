import {
  EnvelopeOptions,
  EQ3,
  Limiter,
  optionsFromArguments,
  PanVol,
  PolySynth,
  Synth,
} from 'tone';
import { NormalRange, Time, Frequency } from 'tone/build/esm/core/type/Units';
import { Instrument } from 'tone/build/esm/instrument/Instrument';
import { semitonesToCents } from '../../utils/noteUtils';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import {
  AdditionalSubsynthOpts,
  DriverSynthOptions,
} from './driverSynthTypes';

export default class DriverSynth extends Instrument<DriverSynthOptions> {
  readonly name = 'DriverSynth';
  readonly synth1;
  readonly synth2;
  synth1Opts: AdditionalSubsynthOpts;
  synth2Opts: AdditionalSubsynthOpts;
  masterEnvelope: RecursivePartial<Omit<EnvelopeOptions, 'context'>>;
  readonly limiter: Limiter;
  readonly eq: EQ3;

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

    this.synth1Opts = {
      currentSemitoneShift: 0,
      unisonVoices: 1,
      unisonDetune: 0,
      panners: [new PanVol(undefined, -7.1)],
    };
    this.synth2Opts = {
      currentSemitoneShift: 0,
      unisonVoices: 1,
      unisonDetune: 0,
      panners: [new PanVol(undefined, -7.1)],
    };

    this.synth1 = [
      new PolySynth(Synth, {
        oscillator: { type: 'sine' },
        envelope: this.masterEnvelope,
        volume: -12,
      }),
    ];
    this.synth2 = [
      new PolySynth(Synth, {
        oscillator: { type: 'sine' },
        envelope: this.masterEnvelope,
        volume: -12,
      }),
    ];

    this.limiter = new Limiter(-12);
    this.eq = new EQ3();
    this.synth1[0].connect(this.synth1Opts.panners[0]);
    this.synth2[0].connect(this.synth2Opts.panners[0]);
    this.synth1Opts.panners[0].connect(this.eq);
    this.synth2Opts.panners[0].connect(this.eq);
    this.eq.connect(this.limiter);
    this.limiter.connect(this.output);
  }

  changeEnvelope(newEnvelope: typeof this.masterEnvelope) {
    this.masterEnvelope = { ...this.masterEnvelope, ...newEnvelope };
    this.synth1.forEach((voice) => voice.set({ envelope: this.masterEnvelope }));
    this.synth2.forEach((voice) => voice.set({ envelope: this.masterEnvelope }));
  }

  setSemitoneShift(
    subsynthNumber: 1 | 2,
    newShift: AdditionalSubsynthOpts['currentSemitoneShift']
  ) {
    const subsynth = subsynthNumber === 1 ? this.synth1 : this.synth2;
    const subsynthOpts = subsynthNumber === 1 ? this.synth1Opts : this.synth2Opts;

    const diff = newShift - subsynthOpts.currentSemitoneShift;
    subsynth.forEach((voice) =>
      voice.set({
        detune: voice.get().detune + semitonesToCents(diff),
      })
    );
    subsynthOpts.currentSemitoneShift = newShift;
  }

  setUnisonDetune(
    subsynthNumber: 1 | 2,
    newDetune: AdditionalSubsynthOpts['unisonDetune']
  ) {
    const subsynth = subsynthNumber === 1 ? this.synth1 : this.synth2;
    const subsynthOpts = subsynthNumber === 1 ? this.synth1Opts : this.synth2Opts;
    subsynth[0].set({
      detune: semitonesToCents(subsynthOpts.currentSemitoneShift),
      oscillator: { phase: 0 },
    });
    subsynthOpts.panners[0].set({
      pan: 0,
      volume: -6 - subsynthOpts.unisonVoices * 1.1,
    });

    for (
      let voiceIndex = subsynthOpts.unisonVoices % 2;
      voiceIndex < subsynth.length;
      voiceIndex += 2
    ) {
      const multiplier = (voiceIndex + 2) / subsynthOpts.unisonVoices;

      subsynth[voiceIndex].set({
        detune: semitonesToCents(subsynthOpts.currentSemitoneShift) + newDetune * multiplier,
        oscillator: { phase: ((multiplier * 360) / 2) * Math.random() },
      });
      subsynthOpts.panners[voiceIndex].set({
        pan: multiplier,
        volume: -6 - subsynthOpts.unisonVoices * 1.1,
      });
      subsynth[voiceIndex + 1].set({
        detune: semitonesToCents(subsynthOpts.currentSemitoneShift) - newDetune * multiplier,
        oscillator: { phase: ((multiplier * 360) / 2) * Math.random() + 180 },
      });
      subsynthOpts.panners[voiceIndex + 1].set({
        pan: -multiplier,
        volume: -6 - subsynthOpts.unisonVoices * 1.1,
      });
    }

    subsynthOpts.unisonDetune = newDetune;
  }

  setUnisonVoices(
    subsynthNumber: 1 | 2,
    newVoices: AdditionalSubsynthOpts['unisonVoices'],
    newDetune?: AdditionalSubsynthOpts['unisonDetune']
  ) {
    const subsynth = subsynthNumber === 1 ? this.synth1 : this.synth2;
    const subsynthOpts = subsynthNumber === 1 ? this.synth1Opts : this.synth2Opts;

    if (newVoices > subsynthOpts.unisonVoices) {
      for (
        let voiceIndex = subsynthOpts.unisonVoices;
        voiceIndex < newVoices;
        voiceIndex++
      ) {
        subsynth[voiceIndex] = new PolySynth(Synth, {
          oscillator: { type: 'sine' },
          envelope: this.masterEnvelope,
          volume: -12
        });
        subsynth[voiceIndex].set(subsynth[0].get());
        subsynthOpts.panners.push(new PanVol().connect(this.eq));
        subsynth[voiceIndex].connect(subsynthOpts.panners[voiceIndex]);
      }
    } else {
      for (
        let voiceIndex = newVoices;
        voiceIndex < subsynthOpts.unisonVoices - 1;
        voiceIndex++
      ) {
        subsynth[voiceIndex].disconnect().dispose();
        subsynthOpts.panners[voiceIndex].disconnect().dispose();
      }

      subsynth.splice(newVoices);
      subsynthOpts.panners.splice(newVoices);
    }

    subsynthOpts.unisonVoices = newVoices;
    // rebalance the voices
    this.setUnisonDetune(subsynthNumber, newDetune ?? subsynthOpts.unisonDetune);
  }

  static getDefaults() {
    return Object.assign(Instrument.getDefaults(), {});
  }

  triggerAttack(
    notes: Frequency | Frequency[],
    time?: Time,
    velocity?: NormalRange
  ): this {
    this.synth1.forEach((voice) => voice.triggerAttack(notes, time, velocity));
    this.synth2.forEach((voice) => voice.triggerAttack(notes, time, velocity));

    return this;
  }

  triggerRelease(notes: Frequency | Frequency[], time?: Time): this {
    this.synth1.forEach((voice) => voice.triggerRelease(notes, time));
    this.synth2.forEach((voice) => voice.triggerRelease(notes, time));

    return this;
  }

  triggerAttackRelease(
    notes: Frequency | Frequency[],
    duration: Time,
    time?: Time,
    velocity?: NormalRange
  ): this {
    this.synth1.forEach((voice) =>
      voice.triggerAttackRelease(notes, duration, time, velocity)
    );
    this.synth2.forEach((voice) =>
      voice.triggerAttackRelease(notes, duration, time, velocity)
    );

    return this;
  }

  dispose(): this {
    super.dispose();
    this.synth1.forEach((voice) => voice.dispose());
    this.synth2.forEach((voice) => voice.dispose());

    return this;
  }
}
