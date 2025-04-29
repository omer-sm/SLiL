import { SynthEffect } from "../../../driver/EffectChain"
import { SynthStateType } from "../../../state/Synth/synthState"

export interface PresetEffect {
    id: SynthEffect['id'];
    effectName: string;
    options: Record<string, string | number>;
    inputs: SynthEffect['id'][];
    outputs: SynthEffect['id'][];
}

export interface Preset {
    name: string;
    synthOpts: SynthStateType;
    effects: PresetEffect[];
}