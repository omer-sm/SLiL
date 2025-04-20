import { subscribeKey } from 'valtio/utils';
import { lfoState } from '../lfoState';
import { lfos } from '../../../driver/driver';

export default () => {
  // Subscribe to LFO 1
  subscribeKey(lfoState.lfo1, 'shape', (newShape) => {
    lfos[0].setShape(newShape);
  });

  subscribeKey(lfoState.lfo1, 'frequency', (newFrequency) => {
    lfos[0].setFrequency(newFrequency);
  });

  subscribeKey(lfoState.lfo1, 'connections', (newConnections) => {
    lfos[0].connections.forEach(({ targetEffectId, param }) => {
      lfos[0].removeConnection(targetEffectId, param);
    });

    newConnections.forEach(({ effectId, param, ...options }) => {
      lfos[0].addConnection(effectId, param, options);
    });
  });

  // Subscribe to LFO 2
  subscribeKey(lfoState.lfo2, 'shape', (newShape) => {
    lfos[1].setShape(newShape);
  });

  subscribeKey(lfoState.lfo2, 'frequency', (newFrequency) => {
    lfos[1].setFrequency(newFrequency);
  });

  subscribeKey(lfoState.lfo2, 'connections', (newConnections) => {
    lfos[1].connections.forEach(({ targetEffectId, param }) => {
      lfos[1].removeConnection(targetEffectId, param);
    });

    newConnections.forEach(({ effectId, param, ...options }) => {
      lfos[1].addConnection(effectId, param, options);
    });
  });

  // Subscribe to LFO 3
  subscribeKey(lfoState.lfo3, 'shape', (newShape) => {
    lfos[2].setShape(newShape);
  });

  subscribeKey(lfoState.lfo3, 'frequency', (newFrequency) => {
    lfos[2].setFrequency(newFrequency);
  });

  subscribeKey(lfoState.lfo3, 'connections', (newConnections) => {
    lfos[2].connections.forEach(({ targetEffectId, param }) => {
      lfos[2].removeConnection(targetEffectId, param);
    });

    newConnections.forEach(({ effectId, param, ...options }) => {
      lfos[2].addConnection(effectId, param, options);
    });
  });
};