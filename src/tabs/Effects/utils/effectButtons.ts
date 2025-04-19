import { ButtonColorType } from 'antd/es/button';
import { BitCrusher, Distortion, Filter, Reverb } from 'tone';
import { SynthEffect } from '../../../driver/EffectChain';

interface EffectButtonType {
  name: string;
  color: ButtonColorType;
  createEffect: () => SynthEffect['node'];
}

export const effectButtons: EffectButtonType[] = [
  { name: 'Reverb', color: 'blue', createEffect: () => new Reverb(1) },
  { name: 'Distortion', color: 'red', createEffect: () => new Distortion(0.5) },
  { name: 'Bit Crusher', color: 'lime', createEffect: () => new BitCrusher(6) },
  { name: 'filter', color: 'purple', createEffect: () => new Filter(200, 'lowpass', -48) },
];
