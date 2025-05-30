import { Button, Card, Divider, Form, Input, List, Modal } from 'antd';
import { presets } from './utils/presets';
import { usePreset } from './utils/usePreset';
import { useState } from 'react';
import { decompressFromBase64 } from 'lz-string';

export default function PresetsTab() {
  const { loadPreset, saveAsPreset } = usePreset();
  const [presetString, setPresetString] = useState<string>('');
  const [loadModalOpen, setLoadModalOpen] = useState<boolean>(false);
  const [presetToLoad, setPresetToLoad] = useState<string>('');

  return (
    <>
      <Card
        title="Presets"
        style={{ height: '100%' }}
        extra={
          <>
            <Button
              style={{ marginRight: '0.5rem' }}
              type="primary"
              onClick={() => setLoadModalOpen(true)}
            >
              Load Preset
            </Button>
            <Button
              type="primary"
              onClick={() => setPresetString(saveAsPreset('preset name'))}
            >
              Save Preset
            </Button>
          </>
        }
        styles={{
          body: {
            padding: '1rem',
          },
        }}
      >
        {presetString !== '' && (
          <Card type="inner">
            <Form.Item
              layout="vertical"
              label={<h2 style={{ margin: 0 }}>Your preset is ready to be shared!</h2>}
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
      <Modal
        title="Load Preset"
        open={loadModalOpen}
        onOk={() => {
          try {
            const preset = JSON.parse(decompressFromBase64(presetString));
            loadPreset(preset);
            setLoadModalOpen(false);
          } catch (error) {
            console.error('Failed to load preset:', error);
          }
          setPresetString('');
          setPresetToLoad('');
        }}
        onCancel={() => setLoadModalOpen(false)}
      >
        <Input
          value={presetToLoad}
          onChange={(event) => setPresetToLoad(event.target.value)}
          placeholder="Paste the preset here..."
        />
      </Modal>
    </>
  );
}
