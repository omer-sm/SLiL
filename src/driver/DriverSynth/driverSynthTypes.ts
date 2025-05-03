import { EnvelopeOptions, EQ3, Limiter, PanVol, Synth } from "tone"
import { RecursivePartial } from "tone/build/esm/core/util/Interface"
import { InstrumentOptions } from "tone/build/esm/instrument/Instrument"

export interface AdditionalSubsynthOpts {
  currentSemitoneShift: number;
  unisonVoices: number;
  unisonDetune: number;
  panners: PanVol[];
}

export interface DriverSynthOptions extends InstrumentOptions {
  synth1: Synth[];
  synth2: Synth[];
  synth1Opts: AdditionalSubsynthOpts;
  synth2Opts: AdditionalSubsynthOpts;
  masterEnvelope: RecursivePartial<Omit<EnvelopeOptions, 'context'>>;
  limiter: Limiter;
  eq: EQ3;
}