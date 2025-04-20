import { getContext } from 'tone';
import DriverSynth from './DriverSynth';
import EffectChain from './EffectChain';
import LFOController from './LFOController'

const driverSynth = new DriverSynth();
export const effectChain = new EffectChain({ context: getContext() });
driverSynth.connect(effectChain.input);
effectChain.toDestination();

export const lfos = [
    new LFOController(1, 'sine', effectChain),
    new LFOController(1, 'sine', effectChain),
    new LFOController(1, 'sine', effectChain),
];

export default driverSynth;
