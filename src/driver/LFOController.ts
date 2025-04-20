import { LFO, LFOOptions, ToneOscillatorType } from 'tone';
import EffectChain, { SynthEffect } from './EffectChain';
import { Frequency } from 'tone/build/esm/core/type/Units';
import { RecursivePartial } from 'tone/build/esm/core/util/Interface';

interface LFOConnection {
  targetEffectId: SynthEffect['id'];
  param: string;
  lfo: LFO;
}

export default class LFOController {
  private frequency: Frequency;
  private shape: ToneOscillatorType;
  connections: LFOConnection[];
  private effectChain: EffectChain;

  constructor(frequency: Frequency, shape: ToneOscillatorType, effectChain: EffectChain) {
    this.frequency = frequency;
    this.shape = shape;
    this.connections = [];
    this.effectChain = effectChain;
  }

  setFrequency(frequency: Frequency): void {
    this.frequency = frequency;
    this.updateConnections();
  }

  setShape(shape: ToneOscillatorType): void {
    this.shape = shape;
    this.updateConnections();
  }

  addConnection(
    targetEffectId: SynthEffect['id'],
    param: string,
    options?: RecursivePartial<LFOOptions>
  ): void {
    const lfo = new LFO(this.frequency, 0, 1);
    lfo.type = this.shape as ToneOscillatorType;
    lfo.set(options ?? {});
    const targetEffect = this.effectChain.effects.get(
      EffectChain.parseId(`${targetEffectId}`)
    );

    if (targetEffect) {
      //@ts-expect-error param is string
      lfo.connect(targetEffect.node[param]);
      lfo.start();
      this.connections.push({ targetEffectId, param, lfo });
    }
  }

  removeConnection(targetEffectId: SynthEffect['id'], param: string): void {
    const index = this.connections.findIndex(
      (conn) => conn.targetEffectId === targetEffectId && conn.param === param
    );

    if (index !== -1) {
      this.connections[index].lfo.dispose();
      this.connections.splice(index, 1);
    }
  }

  getConnection(
    targetEffectId: SynthEffect['id'],
    param: string
  ): LFOConnection | undefined {
    return this.connections.find(
      (conn) => conn.targetEffectId === targetEffectId && conn.param === param
    );
  }

  private updateConnections(): void {
    this.connections.forEach((connection) => {
      connection.lfo.frequency.value = this.frequency;
      connection.lfo.type = this.shape as ToneOscillatorType;
    });
  }
}
