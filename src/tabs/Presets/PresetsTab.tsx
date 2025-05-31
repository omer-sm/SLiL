import { Button, Card, Divider, Form, Input, List, Modal } from 'antd';
import { presets } from './utils/presets';
import { usePreset } from './utils/usePreset';
import { useState } from 'react';
import { decompressFromBase64 } from 'lz-string';
import { useSnapshot } from 'valtio';
import { synthState } from '../../state/Synth/synthState';

export default function PresetsTab() {
  const { loadPreset, saveAsPreset } = usePreset();
  const synthSnap = useSnapshot(synthState);
  const [presetString, setPresetString] = useState<string>('');
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
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
            <Button type="primary" onClick={() => setSaveModalOpen(true)}>
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
              <Button
                type="primary"
                onClick={() => {
                  setPresetString('');
                  loadPreset(preset);
                }}
              >
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
            const preset = JSON.parse(decompressFromBase64(presetToLoad));
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
      <Modal
        title="Save Preset"
        open={saveModalOpen}
        onOk={() => {
          setSaveModalOpen(false);
          setPresetString(saveAsPreset(synthSnap.name));
        }}
        onCancel={() => setSaveModalOpen(false)}
      >
        <Form.Item label="Preset Name">
          <Input
            value={synthSnap.name}
            onChange={(event) => (synthState.name = event.target.value)}
          />
        </Form.Item>
      </Modal>
    </>
  );
}
