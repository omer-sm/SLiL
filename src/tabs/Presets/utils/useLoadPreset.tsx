import { useCallback } from 'react';
import { synthState } from '../../../state/Synth/synthState';
import { Preset } from './presetTypes';
import { effectChain } from '../../../driver/driver';
import { effectButtons } from '../../Effects/utils/effectButtons';
import { useEffectNodes } from '../../../context/EffectNodesContext/useEffectNodes';
import { lfoState, LFOStateType } from '../../../state/LFO/lfoState';
import { setSubsynthOpts } from '../../../state/Synth/subscribers/setters'
import { eqState } from '../../../state/EQ/eqState'

export const useLoadPreset = () => {
  const { addNode, addEdge, setEdges } = useEffectNodes();

  const loadPreset = useCallback(
    (preset: Preset) => {
      // Load synth options
      Object.assign(synthState.masterEnvelope, preset.synthOpts.masterEnvelope);
      setSubsynthOpts(1, preset.synthOpts.synth1Opts);
      setSubsynthOpts(2, preset.synthOpts.synth2Opts);

      // Load effects
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
          effectChain.effectIdCounter = Math.max(
            effect.id + 1,
            effectChain.effectIdCounter
          );
        }
      });

      preset.effects.forEach((effect) => {
        effect.inputs.forEach((input) => {
          addEdge({
            source: `${input}`,
            target: `${effect.id}`,
            sourceHandle: null,
            targetHandle: null,
          });
        });
      });

      // Load LFOs
      [1, 2, 3].forEach((lfoNum) => {
        const lfoKey = `lfo${lfoNum}` as keyof LFOStateType;
        lfoState[lfoKey].connections = [...preset.lfos[lfoKey].connections];
        lfoState[lfoKey].isSyncedToBPM = preset.lfos[lfoKey].isSyncedToBPM;
        lfoState[lfoKey].frequency = preset.lfos[lfoKey].frequency;
        lfoState[lfoKey].shape = preset.lfos[lfoKey].shape;
      });

      // Load EQ
      eqState.bands.forEach((band, index) => {
        band.frequency = preset.eq.bands[index].frequency;
        band.gain = preset.eq.bands[index].gain;
        band.Q = preset.eq.bands[index].Q;
      });
    },
    [addNode, addEdge, setEdges]
  );

  return loadPreset;
};
