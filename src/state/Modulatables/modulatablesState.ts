import { SynthEffect } from "../../driver/EffectChain"
import { proxy } from "valtio";

export interface ModulatableParam {
    effectId: SynthEffect['id'];
    param: string;
    isModulated?: boolean;
}

interface ModulatablesStateType {
    params: Record<SynthEffect['id'], Record<string, ModulatableParam>>;
}

export const modulatablesState: ModulatablesStateType = proxy({
    params: {} as Record<SynthEffect['id'], Record<string, ModulatableParam>>,
});