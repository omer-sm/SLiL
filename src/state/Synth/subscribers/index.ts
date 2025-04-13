import subscribeEnv from './envelopeSub';
import subscribeSubsynthProps from './subsynthPropsSub';

export const subscribeSynth = () => {
    subscribeEnv();
    subscribeSubsynthProps();
}