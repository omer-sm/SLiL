import { useSnapshot } from 'valtio';
import { lfoState } from '../../state/LFO/lfoState';
import { Card, Form, Input, Button, List } from 'antd';
import { useState } from 'react';
import { isNumber } from 'tone'

export default function LfoController() {
  const lfoSnap = useSnapshot(lfoState);
  const [newConnection, setNewConnection] = useState({ effectId: '', param: '' });

  const addConnection = (lfoIndex: number) => {
    const { effectId, param } = newConnection;
    if (effectId !== 'input' && effectId !== 'output' && !isNumber(effectId)) {
        setNewConnection({ effectId: '', param: '' });
        throw new Error('Effect ID must be a number, "input", or "output"');
    }

    if (effectId && param) {
      const lfoKey = `lfo${lfoIndex + 1}` as keyof typeof lfoState;
      lfoState[lfoKey].connections = [
        ...lfoState[lfoKey].connections,
        { effectId, param, amplitude: 1, min: 0, max: 1 },
      ];
      setNewConnection({ effectId: '', param: '' });
    }
  };

  return (
    <div>
      {[lfoSnap.lfo1, lfoSnap.lfo2, lfoSnap.lfo3].map((lfo, index) => (
        <Card key={index} title={`LFO ${index + 1}`} style={{ marginBottom: '1rem' }}>
          <List
            header={<div>Connections</div>}
            bordered
            dataSource={[...lfo.connections]}
            renderItem={(connection) => (
              <List.Item>
                Effect ID: {connection.effectId}, Param: {connection.param}
              </List.Item>
            )}
          />
          <Form layout="inline" style={{ marginTop: '1rem' }}>
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
        </Card>
      ))}
    </div>
  );
}
