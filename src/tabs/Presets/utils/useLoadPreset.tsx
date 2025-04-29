import { useCallback } from 'react';
import { synthState } from '../../../state/Synth/synthState';
import { Preset } from './presetTypes';
import { effectChain } from '../../../driver/driver';
import { effectButtons } from '../../Effects/utils/effectButtons';
import { useEffectNodes } from '../../../context/EffectNodesContext/useEffectNodes';

export const useLoadPreset = () => {
  const { addNode } = useEffectNodes();

  const loadPreset = useCallback((preset: Preset) => {
    synthState.masterEnvelope = preset.synthOpts.masterEnvelope;
    synthState.synth1Opts = preset.synthOpts.synth1Opts;
    synthState.synth2Opts = preset.synthOpts.synth2Opts;

    effectChain.effects.clear();
    effectChain.effectIdCounter = 0;
    effectChain.addEffect(effectChain.input, 'input');
    effectChain.addEffect(effectChain.output, 'output');

    preset.effects.forEach((effect) => {
      if (effect.id === 'input' || effect.id === 'output') {
        effectChain.changeEffectOptions(effect.id, effect.options);
      } else {
        const effectCtor = effectButtons.find(
          ({ name }) => name === effect.effectName
        )?.createEffect;

        if (effectCtor === undefined) {
          console.error('Invalid effect name in preset', effect.effectName);

          return;
        }

        addNode(effectCtor, effect.id, effect.options);
        effectChain.effectIdCounter = Math.max(effect.id, effectChain.effectIdCounter);
      }
    });
  }, [addNode]);

  return loadPreset;
};
