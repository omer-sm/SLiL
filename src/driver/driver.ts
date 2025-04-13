import { getContext } from "tone"
import DriverSynth from "./DriverSynth"
import EffectChain from "./EffectChain"

const driverSynth = new DriverSynth();
export const effectChain = new EffectChain({context: getContext()});
driverSynth.connect(effectChain.input);
effectChain.toDestination();

export default driverSynth;