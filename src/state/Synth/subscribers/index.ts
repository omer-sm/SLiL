import subscribeEnv from './envelopeSub';
import subscribeSubsynthProps from './subsynthPropsSub';
import subscribeUnison from './unisonSub';
import subscribeEQ from './eqSub';

export const subscribeSynth = () => {
  subscribeEnv();
  subscribeSubsynthProps();
  subscribeUnison();
  subscribeEQ();
};
