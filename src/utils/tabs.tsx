import { ReactNode } from 'react';
import SynthTab from '../tabs/Synth/SynthTab';
import PreviewTab from '../tabs/Preview/PreviewTab';
import EffectsTab from '../tabs/Effects/EffectsTab';
import PresetsTab from '../tabs/Presets/PresetsTab'

interface Tab {
  component: ReactNode;
  key: number;
  label: string;
}

export const tabs: Tab[] = [
  {
    label: 'Synth',
    key: 1,
    component: <SynthTab />,
  },
  {
    label: 'Effects',
    key: 2,
    component: <EffectsTab />,
  },
  {
    label: 'Preview',
    key: 3,
    component: <PreviewTab />,
  },
  {
    label: 'Presets',
    key: 4,
    component: <PresetsTab />,
  },
];
