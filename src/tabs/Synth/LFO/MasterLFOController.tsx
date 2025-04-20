import { lfoState } from '../../../state/LFO/lfoState';
import { Button, Card, Divider, Flex, Form, Input, Tabs } from 'antd';
import { useState } from 'react';
import { isNumber } from 'tone';
import SingleLfoController from './SingleLfoController';

export default function MasterLFOController() {
  const [currentLfo, setCurrentLfo] = useState<1 | 2 | 3>(1);
  const [newConnection, setNewConnection] = useState({ effectId: '', param: '' });

  const addConnection = (lfoIndex: number) => {
    const { effectId, param } = newConnection;
    if (effectId !== 'input' && effectId !== 'output' && !isNumber(+effectId)) {
      setNewConnection({ effectId: '', param: '' });
      throw new Error('Effect ID must be a number, "input", or "output"');
    }

    if (effectId && param) {
      const lfoKey = `lfo${lfoIndex + 1}` as keyof typeof lfoState;
      lfoState[lfoKey].connections = [
        ...lfoState[lfoKey].connections,
        { effectId: +effectId, param, amplitude: 1, min: 0, max: 1 },
      ];
      setNewConnection({ effectId: '', param: '' });
    }
  };

  return (
    <Card
      title={`LFO ${currentLfo}`}
      style={{ height: '100%' }}
      styles={{ body: { padding: '0.5rem 1rem 1rem' } }}
    >
      <Tabs
      onChange={(key) => setCurrentLfo(+key as 1 | 2 | 3)}
        items={[
          { label: 'LFO 1', key: '1' },
          { label: 'LFO 2', key: '2' },
          { label: 'LFO 3', key: '3' },
        ].map((item, index) => ({
          ...item,
          children: (
            <Flex vertical>
              <SingleLfoController
                lfoKey={`lfo${item.key}` as keyof typeof lfoState}
              />
              <Divider />
              <Form layout="inline" style={{  }}>
                <Form.Item label="Effect ID">
                  <Input
                    value={newConnection.effectId}
                    onChange={(e) =>
                      setNewConnection({ ...newConnection, effectId: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Param">
                  <Input
                    value={newConnection.param}
                    onChange={(e) =>
                      setNewConnection({ ...newConnection, param: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={() => addConnection(index)}>
                    Add Connection
                  </Button>
                </Form.Item>
              </Form>
            </Flex>
          ),
        }))}
      />
    </Card>
  );
}
