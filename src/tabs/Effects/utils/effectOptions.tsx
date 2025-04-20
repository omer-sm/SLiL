import { Select, Slider } from 'antd';
import { ReactNode } from 'react';

interface EffectOption {
  name: string;
  displayName: string;
  isModulatable?: boolean;
  element: (
    props: Record<string, unknown>,
    changeHandler: (newValue: string | number) => void
  ) => ReactNode;
}

const wetInput: EffectOption = {
  name: 'wet',
  displayName: 'Wet',
  isModulatable: true,
  element: (props, changeHandler) => (
    <Slider min={0} max={1} step={0.01} onChangeComplete={changeHandler} {...props} />
  ),
};

export const effectOptions: Record<string, EffectOption[]> = {
  Reverb: [
    {
      name: 'decay',
      displayName: 'Decay (s)',
      element: (props, changeHandler) => (
        <Slider
          min={0.001}
          max={10}
          step={0.1}
          onChangeComplete={changeHandler}
          {...props}
        />
      ),
    },
    {
      name: 'preDelay',
      displayName: 'Pre Delay (s)',
      element: (props, changeHandler) => (
        <Slider
          min={0}
          max={1}
          step={0.001}
          onChangeComplete={changeHandler}
          {...props}
        />
      ),
    },
    wetInput,
  ],
  Distortion: [
    {
      name: 'distortion',
      displayName: 'Distortion',
      element: (props, changeHandler) => (
        <Slider min={0} max={1} step={0.01} onChangeComplete={changeHandler} {...props} />
      ),
    },
    {
      name: 'oversample',
      displayName: 'Oversample',
      element: (props, changeHandler) => (
        <Select
          onSelect={changeHandler}
          options={[
            {
              label: 'none',
              value: 'none',
            },
            {
              label: '2x',
              value: '2x',
            },
            {
              label: '4x',
              value: '4x',
            },
          ]}
          {...props}
        />
      ),
    },
    wetInput,
  ],
  BitCrusher: [
    {
      name: 'bits',
      displayName: 'Bits',
      element: (props, changeHandler) => (
        <Slider min={1} max={16} step={0.1} onChangeComplete={changeHandler} {...props} />
      ),
    },
    wetInput,
  ],
  Filter: [
    {
      name: 'type',
      displayName: 'Type',
      element: (props, changeHandler) => (
        <Select
          onSelect={changeHandler}
          options={[
            { label: 'allpass', value: 'allpass' },
            { label: 'bandpass', value: 'bandpass' },
            { label: 'highpass', value: 'highpass' },
            { label: 'highshelf', value: 'highshelf' },
            { label: 'lowpass', value: 'lowpass' },
            { label: 'lowshelf', value: 'lowshelf' },
            { label: 'notch', value: 'notch' },
            { label: 'peaking', value: 'peaking' },
          ]}
          {...props}
        />
      ),
    },
    {
      name: 'frequency',
      displayName: 'Frequency (Hz)',
      isModulatable: true,
      element: (props, changeHandler) => (
        <Slider
          min={20}
          max={3000} // TODO: change to 20000 and make fine-tuned
          step={1}
          onChangeComplete={changeHandler}
          {...props}
        />
      ),
    },
    {
      name: 'Q',
      displayName: 'Resonance (Q)',
      isModulatable: true,
      element: (props, changeHandler) => (
        <Slider
          min={0.01}
          max={4}
          step={0.01}
          onChangeComplete={changeHandler}
          {...props}
        />
      ),
    },
    {
      name: 'rolloff',
      displayName: 'Rolloff (dB/oct)',
      element: (props, changeHandler) => (
        <Select
          onSelect={changeHandler}
          options={[
            { label: '-12', value: -12 },
            { label: '-24', value: -24 },
            { label: '-48', value: -48 },
            { label: '-96', value: -96 },
          ]}
          {...props}
        />
      ),
    },
  ],
  Limiter: [
    {
      name: 'threshold',
      displayName: 'Threshold (dB)',
      isModulatable: true,
      element: (props, changeHandler) => (
        <Slider min={-100} max={0} step={1} onChangeComplete={changeHandler} {...props} />
      ),
    },
  ],
  Gain: [
    {
      name: 'gain',
      displayName: 'Gain (dB)',
      isModulatable: true,
      element: (props, changeHandler) => (
        <Slider
          min={-24}
          max={12}
          step={0.1}
          onChangeComplete={changeHandler}
          {...props}
        />
      ),
    },
  ],
};
