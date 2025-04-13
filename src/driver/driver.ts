import { getContext } from "tone"
import DriverSynth from "./DriverSynth"
import EffectChain from "./effectChain"

const driverSynth = new DriverSynth();
const effectChain = new EffectChain({context: getContext()});
driverSynth.connect(effectChain.input);
effectChain.toDestination();

export default driverSynth;