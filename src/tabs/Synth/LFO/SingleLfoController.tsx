import { Flex, List, Slider, Select, Form, Card, Input, Button, Switch } from 'antd';
import { useSnapshot } from 'valtio';
import { lfoState } from '../../../state/LFO/lfoState';
import { updateLfoConnection } from '../../../state/LFO/utils';
import CloseIcon from '@mui/icons-material/Close';
import { modulatablesState } from '../../../state/Modulatables/modulatablesState';
import { Frequency } from 'tone'

interface SingleLfoControllerProps {
  lfoKey: keyof typeof lfoState;
}

export default function SingleLfoController({ lfoKey }: SingleLfoControllerProps) {
  const lfoSnap = useSnapshot(lfoState[lfoKey]);

  return (
    <Flex justify="space-between" style={{ width: '100%' }}>
      <Flex vertical style={{ width: '29%' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Form.Item label="Sync to BPM">
            <Switch
              checked={lfoSnap.isSyncedToBPM}
              onChange={(checked) => {
                lfoState[lfoKey].isSyncedToBPM = checked;
                lfoState[lfoKey].frequency = checked ? '1m' : Frequency(lfoState[lfoKey].frequency).toFrequency();
              }}
            />
          </Form.Item>
          <Form.Item label="Frequency">
            {lfoSnap.isSyncedToBPM ? (
              <Select
                value={lfoSnap.frequency}
                onChange={(value) => (lfoState[lfoKey].frequency = value)}
                options={['1m', '2n', '4n', '8n', '16n'].map((value) => ({
                  value,
                  label: value,
                }))}
              />
            ) : (
              <Slider
                min={0.1}
                max={20}
                step={0.1}
                value={+lfoSnap.frequency}
                onChange={(value) => (lfoState[lfoKey].frequency = value)}
              />
            )}
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
      <Card
        type="inner"
        size="small"
        title="Modulations"
        style={{ width: '69%', height: '12rem' }}
        styles={{ body: { overflowY: 'hidden' } }}
      >
        <List
          style={{
            height: '8rem',
            overflowY: lfoSnap.connections.length > 0 ? 'auto' : 'hidden',
          }}
          dataSource={[...lfoSnap.connections]}
          renderItem={(connection, index) => (
            <List.Item>
              <Card style={{ width: '100%' }}>
                <Flex align="center" justify="space-between">
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
                          updateLfoConnection(
                            { min: +event.target.value },
                            lfoKey,
                            index
                          );
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="max" style={{ margin: 0 }}>
                      <Input
                        type="number"
                        value={connection.max}
                        style={{ width: '8rem' }}
                        onChange={(event) => {
                          updateLfoConnection(
                            { max: +event.target.value },
                            lfoKey,
                            index
                          );
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
                  </Flex>
                  <Button
                    onClick={() => {
                      lfoState[lfoKey].connections.splice(index, 1);
                      lfoState[lfoKey].connections = [...lfoState[lfoKey].connections];
                      modulatablesState.params[connection.effectId][
                        connection.param
                      ].isModulated = false;
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
      </Card>
    </Flex>
  );
}
