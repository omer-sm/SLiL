import EffectChain, { SynthEffect } from '../../driver/EffectChain';
import { ModulatableParam, modulatablesState } from './modulatablesState';

export const addModulatableParams = (params: ModulatableParam[]) => {
  const groupedParams = params.reduce(
    (acc: Record<SynthEffect['id'], Record<string, ModulatableParam>>, param) => {
      const { effectId } = param;

      if (!acc[effectId]) {
        acc[effectId] = {};
      }

      acc[effectId][param.param] = param;

      return acc;
    },
    {} as Record<SynthEffect['id'], Record<string, ModulatableParam>>
  );

  Object.entries(groupedParams).forEach(([effectIdString, params]) => {
    const effectId = EffectChain.parseId(effectIdString);

    if (!modulatablesState.params[effectId]) {
      modulatablesState.params[effectId] = {};
    }

    Object.entries(params).forEach(([paramName, param]) => {
      if (!modulatablesState.params[effectId][paramName]) {
        modulatablesState.params[effectId][paramName] = param;
      }
    });
  });
};

export const removeEffectFromModulatables = (effectId: SynthEffect['id']) => {
  if (modulatablesState.params[effectId]) {
    delete modulatablesState.params[effectId];
  }
}
