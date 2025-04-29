import { subscribeKey } from 'valtio/utils';
import driverSynth from '../../../driver/driver';
import { synthState } from '../synthState';

export default () => {
  subscribeKey(synthState.masterEnvelope, 'attack', (newAttack) => {
    driverSynth.changeEnvelope({ attack: newAttack });
  });

  subscribeKey(synthState.masterEnvelope, 'decay', (newDecay) => {
    driverSynth.changeEnvelope({ decay: newDecay });
  });

  subscribeKey(synthState.masterEnvelope, 'sustain', (newSustain) => {
    driverSynth.changeEnvelope({ sustain: newSustain });
  });

  subscribeKey(synthState.masterEnvelope, 'release', (newRelease) => {
    driverSynth.changeEnvelope({ release: newRelease });
  });

  subscribeKey(synthState, 'masterEnvelope', (newEnvelope) => {
    driverSynth.changeEnvelope(newEnvelope);
  });
};
