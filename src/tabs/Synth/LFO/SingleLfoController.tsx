import { Flex, List, Slider, Select, Form, Card, Input, Button } from 'antd';
import { useSnapshot } from 'valtio';
import { lfoState } from '../../../state/LFO/lfoState';
import { updateLfoConnection } from '../../../state/LFO/utils';
import CloseIcon from '@mui/icons-material/Close';

interface SingleLfoControllerProps {
  lfoKey: keyof typeof lfoState;
}

export default function SingleLfoController({ lfoKey }: SingleLfoControllerProps) {
  const lfoSnap = useSnapshot(lfoState[lfoKey]);

  return (
    <Flex justify="space-between" style={{ width: '100%' }}>
      <Flex vertical style={{ width: '29%' }}>
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
        style={{ height: '12rem', overflowY: 'auto', width: '69%' }}
        renderItem={(connection, index) => (
          <List.Item>
            <Card style={{ width: '100%' }}>
              <Flex align="center" justify="start" gap="1rem" wrap="wrap">
                <div>
                  Effect #{connection.effectId} ({connection.param})
                </div>
                <Form.Item label="min" style={{ margin: 0 }}>
                  <Input
                    type="number"
                    value={connection.min}
                    style={{ width: '8rem' }}
                    onChange={(event) => {
                      updateLfoConnection({ min: +event.target.value }, lfoKey, index);
                    }}
                  />
                </Form.Item>
                <Form.Item label="max" style={{ margin: 0 }}>
                  <Input
                    type="number"
                    value={connection.max}
                    style={{ width: '8rem' }}
                    onChange={(event) => {
                      updateLfoConnection({ max: +event.target.value }, lfoKey, index);
                    }}
                  />
                </Form.Item>
                <Form.Item label="amp." style={{ margin: 0 }}>
                  <Input
                    type="number"
                    min={0}
                    max={1}
                    value={connection.amplitude}
                    style={{ width: '8rem' }}
                    onChange={(event) => {
                      updateLfoConnection(
                        { amplitude: +event.target.value },
                        lfoKey,
                        index
                      );
                    }}
                  />
                </Form.Item>
                <Button
                  onClick={() => {
                    lfoState[lfoKey].connections.splice(index, 1);
                    lfoState[lfoKey].connections = [...lfoState[lfoKey].connections];
                  }}
                  variant="outlined"
                  color="danger"
                  size="small"
                  shape="circle"
                  style={{ opacity: 0.25 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.25')}
                >
                  <CloseIcon fontSize="small" />
                </Button>
              </Flex>
            </Card>
          </List.Item>
        )}
      />
    </Flex>
  );
}
