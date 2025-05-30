import { Button, Card, Divider, Form, Input, List } from 'antd';
import { presets } from './utils/presets';
import { usePreset } from './utils/usePreset';
import { useState } from 'react';

export default function PresetsTab() {
  const { loadPreset, saveAsPreset } = usePreset();
  const [presetString, setPresetString] = useState<string>('');

  return (
    <Card
      title="Presets"
      style={{ height: '100%' }}
      extra={
        <Button
          type="primary"
          onClick={() => setPresetString(saveAsPreset('preset name'))}
        >
          Save Preset
        </Button>
      }
      styles={{
        body: {
          padding: '1rem',
        },
      }}
    >
      {presetString !== '' && (
        <Card inert>
          <Form.Item
            layout="vertical"
            label={<h2 style={{ margin: 0 }}>Your preset is ready to be copied!</h2>}
            help="Copy the text above and share it with others to load your preset."
            style={{ marginBottom: 0 }}
          >
            <Input style={{ marginBottom: '0.3rem' }} value={presetString} />
          </Form.Item>
          <Divider />
        </Card>
      )}
      <List
        dataSource={presets}
        renderItem={(preset) => (
          <List.Item>
            <Button type="primary" onClick={() => loadPreset(preset)}>
              {preset.name}
            </Button>
          </List.Item>
        )}
      />
    </Card>
  );
}
