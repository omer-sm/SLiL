import { SynthStateType } from "../../../state/Synth/synthState"

export interface Preset {
    name: string;
    synthOpts: SynthStateType;
}