import { useCallback } from 'react';
import { synthState, SynthStateType } from '../../../state/Synth/synthState';
import { Preset } from './presetTypes';
import { effectChain } from '../../../driver/driver';
import { effectButtons } from '../../Effects/utils/effectButtons';
import { useEffectNodes } from '../../../context/EffectNodesContext/useEffectNodes';
import { lfoState, LFOStateType } from '../../../state/LFO/lfoState';
import { setSubsynthOpts } from '../../../state/Synth/subscribers/setters';
import { eqState, EQStateType } from '../../../state/EQ/eqState';
import { useSnapshot } from 'valtio';
import { compressToBase64 } from 'lz-string'

export const usePreset = () => {
  const { addNode, addEdge, setEdges } = useEffectNodes();
  const synthSnap = useSnapshot(synthState);
  const lfoSnap = useSnapshot(lfoState);
  const eqSnap = useSnapshot(eqState);

  const saveAsPreset = useCallback(
    () => {
      const preset: Preset = {
        synthOpts: synthSnap as SynthStateType,
        effects: [...effectChain.effects.values()].map((effect) => ({
          id: effect.id,
          effectName: effect.node.name,
          options: effect.node.get() as unknown as Record<string, string | number>,
          inputs: effect.inputs,
          outputs: effect.outputs,
        })),
        lfos: lfoSnap as LFOStateType,
        eq: eqSnap as EQStateType,
      };

      return compressToBase64(JSON.stringify(preset));
    },
    [synthSnap, lfoSnap, eqSnap]
  );

  const loadPreset = useCallback(
    (preset: Preset) => {
      // Load synth options
      Object.assign(synthState.masterEnvelope, preset.synthOpts.masterEnvelope);
      setSubsynthOpts(1, preset.synthOpts.synth1Opts);
      setSubsynthOpts(2, preset.synthOpts.synth2Opts);
      synthState.name = preset.synthOpts.name;

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

  return { loadPreset, saveAsPreset };
};
