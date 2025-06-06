import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  List,
  Modal,
  notification,
  Tooltip,
} from 'antd';
import { presets } from './utils/presets';
import { usePreset } from './utils/usePreset';
import { useCallback, useEffect, useState } from 'react';
import { decompressFromBase64 } from 'lz-string';
import { useSnapshot } from 'valtio';
import { synthState } from '../../state/Synth/synthState';
import { Preset } from './utils/presetTypes';
// @ts-expect-error no declaration file for 'react-clipboard-animation'
import Clipboard from 'react-clipboard-animation';

export default function PresetsTab() {
  const { loadPreset, saveAsPreset } = usePreset();
  const [api, contextHolder] = notification.useNotification();
  const synthSnap = useSnapshot(synthState);
  const [presetString, setPresetString] = useState<string>('');
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [loadModalOpen, setLoadModalOpen] = useState<boolean>(false);
  const [presetToLoad, setPresetToLoad] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const loadPresetWithNotification = useCallback(
    (preset: Preset) => {
      loadPreset(preset);
      api.success({
        message: 'Preset Loaded!',
        placement: 'bottomRight',
        showProgress: true,
        duration: 2,
      });
    },
    [loadPreset, api]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <>
      {contextHolder}
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
              <Flex>
                <Tooltip
                  placement="topLeft"
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  <Flex style={{ scale: 1.3 }} justify="end" align="center">
                    <Clipboard
                      text={presetString}
                      color="white"
                      {...{ copied, setCopied }}
                    />
                  </Flex>
                </Tooltip>
                <Divider type="vertical" style={{ margin: '0 1rem', height: '2rem' }} />
                <Input readOnly style={{ marginBottom: '0.3rem' }} value={presetString} />
              </Flex>
            </Form.Item>
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
                  loadPresetWithNotification(preset);
                }}
              >
                {preset.synthOpts.name}
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
            loadPresetWithNotification(preset);
            setLoadModalOpen(false);
          } catch (error) {
            console.error('Failed to load preset:', error);
            api.error({
              message: 'Error',
              description: 'Failed to load preset. Please check the preset format.',
              placement: 'bottomRight',
              showProgress: true,
              duration: 2,
            });
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
          setPresetString(saveAsPreset());
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
