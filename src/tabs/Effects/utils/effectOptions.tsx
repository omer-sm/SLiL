import { Slider } from "antd"
import { ReactNode } from "react"

interface EffectOption {
    name: string;
    displayName: string;
    element: (props: Record<string, unknown>) => ReactNode;
}

export const effectOptions: Record<string, EffectOption[]> = {
    'Reverb': [
        {
            name: 'decay',
            displayName: 'Decay (s)',
            element: (props) => <Slider min={0.001} max={10} step={0.1} {...props} />,
        },
        {
            name: 'preDelay',
            displayName: 'Pre Delay (s)',
            element: (props) => <Slider min={0} max={1} step={0.001} {...props} />,
        },
        {
            name: 'wet',
            displayName: 'Wet',
            element: (props) => <Slider min={0} max={1} step={0.01} {...props} />,
        },
    ]
}

