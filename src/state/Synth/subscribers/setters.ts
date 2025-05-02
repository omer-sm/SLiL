import { SubSynthOpts, synthState } from '../synthState';

const deepMerge = (target: Record<string, unknown>, source: typeof target) => {
  Object.entries(source).forEach(([key, val]) => {
    if (key in target) {
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        target[key] = target[key] || {};
        deepMerge(target[key] as Record<string, unknown>, val as Record<string, unknown>);
      } else {
        target[key] = val;
      }
    }
  });
};

export const setSubsynthOpts = (subsynthNumber: 1 | 2, newOpts: SubSynthOpts) => {
  const subsynthOpts =
    subsynthNumber === 1
      ? synthState.synth1Opts
      : (synthState.synth2Opts as Partial<SubSynthOpts>);

  deepMerge(subsynthOpts, newOpts as unknown as Record<string, unknown>);
};
