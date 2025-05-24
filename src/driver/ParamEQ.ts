import { BiquadFilter, Gain, ToneAudioNode, ToneAudioNodeOptions } from 'tone';
import { ToneWithContextOptions } from 'tone/build/esm/core/context/ToneWithContext';

interface ParamEQOptions extends ToneAudioNodeOptions {
  numFilters: number;
}

export default class ParamEQ extends ToneAudioNode<ParamEQOptions> {
  readonly name = 'ParamEQ';
  filters: BiquadFilter[];
  readonly input: ToneAudioNode<ToneWithContextOptions>;
  readonly output: ToneAudioNode<ToneWithContextOptions>;

  constructor(options: ParamEQOptions) {
    super(options);
    this.filters = [];
    this.input = new Gain(0, 'decibels');
    this.output = new Gain(0, 'decibels');

    for (
      let currFilterIndex = 0;
      currFilterIndex < options.numFilters;
      currFilterIndex++
    ) {
      const filter = new BiquadFilter(
        (10_000 / (options.numFilters + 1)) * (currFilterIndex + 1),
        'peaking'
      );
      filter.gain.value = 0;
      this.filters.push(filter);

      if (currFilterIndex > 0) {
        this.filters[currFilterIndex - 1].connect(filter);
      }
    }

    this.input.connect(this.filters[0]);
    this.filters[this.filters.length - 1].connect(this.output);
  }

  dispose(): this {
    this.filters.forEach((filter) => {
      filter.dispose();
    });
    this.filters = [];
    this.input.dispose();
    this.output.dispose();

    return super.dispose();
  }
}
