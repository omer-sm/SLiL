import { subscribeKey } from "valtio/utils"
import { synthState } from "../synthState"
import driverSynth from "../../../driver/driver"

export default () => {
    subscribeKey(synthState.eq, 'lowLevel', (newLevel) => {
        driverSynth.eq.low.value = newLevel;
    });

    subscribeKey(synthState.eq, 'midLevel', (newLevel) => {
        driverSynth.eq.mid.value = newLevel;
    });

    subscribeKey(synthState.eq, 'highLevel', (newLevel) => {
        driverSynth.eq.high.value = newLevel;
    });

    subscribeKey(synthState.eq, 'lowFrequency', (newFrequency) => {
        driverSynth.eq.lowFrequency.value = newFrequency;
    });

    subscribeKey(synthState.eq, 'highFrequency', (newFrequency) => {
        driverSynth.eq.highFrequency.value = newFrequency;
    });
}