import { SynthEffect } from "../../../driver/EffectChain"
import { EQStateType } from "../../../state/EQ/eqState"
import { LFOStateType } from "../../../state/LFO/lfoState"
import { SynthStateType } from "../../../state/Synth/synthState"

export interface PresetEffect {
    id: SynthEffect['id'];
    effectName: string;
    options: Record<string, string | number>;
    inputs: SynthEffect['id'][];
    outputs: SynthEffect['id'][];
}

export interface Preset {
    synthOpts: SynthStateType;
    effects: PresetEffect[];
    lfos: LFOStateType;
    eq: EQStateType;
}