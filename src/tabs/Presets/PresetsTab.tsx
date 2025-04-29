import { Button, List } from "antd";
import { Preset } from "./utils/presetTypes";
import { synthState } from "../../state/Synth/synthState";
import { presets } from "./utils/presets";

export default function PresetsTab() {
  const loadPreset = (preset: Preset) => {
    synthState.masterEnvelope = preset.synthOpts.masterEnvelope;
    synthState.synth1Opts = preset.synthOpts.synth1Opts;
    synthState.synth2Opts = preset.synthOpts.synth2Opts;
  };

  return (
    <List
      bordered
      dataSource={presets}
      renderItem={(preset) => (
        <List.Item>
          <Button type="primary" onClick={() => loadPreset(preset)}>
            {preset.name}
          </Button>
        </List.Item>
      )}
    />
  );
}