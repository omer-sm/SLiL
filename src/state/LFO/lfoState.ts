import { proxy } from 'valtio';
import { Frequency, NormalRange } from 'tone/build/esm/core/type/Units';
import { ToneOscillatorType } from 'tone'
import subscribeLfo from './subscribers/lfoSubscribers';

export interface LFOConnection {
  effectId: number | 'input' | 'output';
  param: string;
  amplitude: NormalRange;
  min: number;
  max: number;
}

interface LFOControllerState {
  shape: ToneOscillatorType;
  frequency: Frequency;
  connections: LFOConnection[];
}

interface LFOStateType {
  lfo1: LFOControllerState;
  lfo2: LFOControllerState;
  lfo3: LFOControllerState;
}

export const lfoState: LFOStateType = proxy({
  lfo1: {
    shape: 'sine',
    frequency: 1,
    connections: [],
  },
  lfo2: {
    shape: 'sine',
    frequency: 1,
    connections: [],
  },
  lfo3: {
    shape: 'sine',
    frequency: 1,
    connections: [],
  },
});

subscribeLfo();