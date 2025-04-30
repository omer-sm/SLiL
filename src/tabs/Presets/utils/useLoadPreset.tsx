import { useCallback } from 'react';
import { synthState } from '../../../state/Synth/synthState';
import { Preset } from './presetTypes';
import { effectChain } from '../../../driver/driver';
import { effectButtons } from '../../Effects/utils/effectButtons';
import { useEffectNodes } from '../../../context/EffectNodesContext/useEffectNodes';

export const useLoadPreset = () => {
  const { addNode, addEdge, setEdges } = useEffectNodes();

  const loadPreset = useCallback((preset: Preset) => {
    synthState.masterEnvelope = preset.synthOpts.masterEnvelope;
    synthState.synth1Opts = preset.synthOpts.synth1Opts;
    synthState.synth2Opts = preset.synthOpts.synth2Opts;
    
    try {
      effectChain.removeConnection('input', 'output');
    } catch {
      // If the connection does not exist, do nothing
      (() => {})();
    }

    setEdges([]);
    effectChain.clearEffects();

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
        effectChain.effectIdCounter = Math.max(effect.id + 1, effectChain.effectIdCounter);
      }
    });

    preset.effects.forEach((effect) => {
        effect.inputs.forEach((input) => {
            addEdge({
                source: `${input}`,
                target: `${effect.id}`,
                sourceHandle: null,
                targetHandle: null
            })
        })
    });
  }, [addNode, addEdge, setEdges]);

  return loadPreset;
};
