import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import { LFOConnection, lfoState } from './lfoState';
import { SynthEffect } from '../../driver/EffectChain'

export const updateLfoConnection = (
  newParams: RecursivePartial<LFOConnection>,
  lfoKey: keyof typeof lfoState,
  connectionIndex: number
) => {
  const lfo = lfoState[lfoKey];
  
  if (connectionIndex !== -1) {
    lfo.connections[connectionIndex] = {
      ...lfo.connections[connectionIndex],
      ...newParams,
    };

    lfo.connections = [...lfo.connections];
  } else {
    console.error('Connection not found');
  }
};

export const removeEffectModulations = (effectId: SynthEffect['id']) => {
  Object.keys(lfoState).forEach((lfoKey) => {
    const lfo = lfoState[lfoKey as keyof typeof lfoState];
    lfo.connections = lfo.connections.filter(
      (connection) => connection.effectId !== effectId
    );
  });
}