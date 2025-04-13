import { ReactNode } from "react"
import SynthTab from "../tabs/Synth/SynthTab"
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
        component: <SynthTab />
    },
    {
        label: 'Preview',
        key: 2,
        component: <PreviewTab />
    }
];