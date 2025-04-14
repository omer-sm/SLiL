import { ButtonColorType } from 'antd/es/button';
import { BitCrusher, Distortion, Reverb } from 'tone';
import { Effect, EffectOptions } from 'tone/build/esm/effect/Effect'

interface EffectButtonType {
  name: string;
  color: ButtonColorType;
  createEffect: () => Effect<EffectOptions>;
}

export const effectButtons: EffectButtonType[] = [
  { name: 'Reverb', color: 'blue', createEffect: () => new Reverb(1) },
  { name: 'Distortion', color: 'red', createEffect: () => new Distortion(0.5) },
  { name: 'Bit Crusher', color: 'lime', createEffect: () => new BitCrusher(6) },
];
