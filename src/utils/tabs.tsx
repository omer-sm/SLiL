import { ReactNode } from "react"
import SynthComponent from "../tabs/Synth/SynthComponent"
import PreviewTab from "../tabs/Preview/PreviewTab";

interface Tab {
    component: ReactNode;
    key: number;
    label: string;
}

export const tabs: Tab[] = [
    {
        label: 'Synth',
        key: 1,
        component: <SynthComponent />
    },
    {
        label: 'Synth',
        key: 2,
        component: <SynthComponent />
    },
    {
        label: 'Preview',
        key: 3,
        component: <PreviewTab />
    }
];