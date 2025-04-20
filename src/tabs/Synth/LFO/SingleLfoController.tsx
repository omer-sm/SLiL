import { Flex, List, Slider, Select, Form } from 'antd';
import { useSnapshot } from 'valtio';
import { lfoState } from '../../../state/LFO/lfoState';

interface SingleLfoControllerProps {
  lfoKey: keyof typeof lfoState;
}

export default function SingleLfoController({ lfoKey }: SingleLfoControllerProps) {
  const lfoSnap = useSnapshot(lfoState[lfoKey]);

  return (
    <Flex justify='space-between' style={{ width: '100%' }}>
      <Flex vertical style={{ width: '47%' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Item label="Frequency">
            <Slider
              min={0.1}
              max={20}
              step={0.1}
              value={+lfoSnap.frequency}
              onChange={(value) => (lfoState[lfoKey].frequency = value)}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Wave">
            <Select
              value={lfoSnap.shape}
              onChange={(value) => (lfoState[lfoKey].shape = value)}
              options={['sine', 'square', 'triangle', 'sawtooth'].map((wave) => ({
                value: wave,
                label: wave,
              }))}
            />
          </Form.Item>
        </div>
      </Flex>
      <List
        header="Connections"
        bordered
        dataSource={[...lfoSnap.connections]}
        style={{ height: '12rem', overflowY: 'auto', width: '47%' }}
        renderItem={(connection) => (
          <List.Item>
            Effect ID: {connection.effectId}, Param: {connection.param}
          </List.Item>
        )}
      />
    </Flex>
  );
}
