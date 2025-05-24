import { getContext } from 'tone';
import DriverSynth from './DriverSynth/DriverSynth';
import EffectChain from './EffectChain';
import LFOController from './LFOController'
import ParamEQ from './ParamEQ'

const driverSynth = new DriverSynth();
export const effectChain = new EffectChain({ context: getContext() });
driverSynth.connect(effectChain.input);
export const eq = new ParamEQ({numFilters: 7, context: getContext()});
effectChain.connect(eq.input);
eq.toDestination();

export const lfos = [
    new LFOController(1, 'sine', effectChain),
    new LFOController(1, 'sine', effectChain),
    new LFOController(1, 'sine', effectChain),
];

export default driverSynth;
