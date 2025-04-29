import { Button, List } from "antd";
import { presets } from "./utils/presets";
import { useLoadPreset } from "./utils/useLoadPreset"

export default function PresetsTab() {
  const loadPreset = useLoadPreset();

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