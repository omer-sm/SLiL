import subscribeEnv from './envelopeSub';
import subscribeSubsynthProps from './subsynthPropsSub';
import subscribeUnison from './unisonSub';

export const subscribeSynth = () => {
  subscribeEnv();
  subscribeSubsynthProps();
  subscribeUnison();
};
