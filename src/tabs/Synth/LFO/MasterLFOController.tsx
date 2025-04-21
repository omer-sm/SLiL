import { lfoState } from '../../../state/LFO/lfoState';
import { Button, Card, Divider, Flex, Form, Tabs, Select } from 'antd';
import { useState } from 'react';
import SingleLfoController from './SingleLfoController';
import { modulatablesState } from '../../../state/Modulatables/modulatablesState';
import EffectChain from '../../../driver/EffectChain';
import { useSnapshot } from 'valtio';

export default function MasterLFOController() {
  const [currentLfo, setCurrentLfo] = useState<1 | 2 | 3>(1);
  const [newConnection, setNewConnection] = useState({ effectId: '', param: '' });
  const modulatablesSnap = useSnapshot(modulatablesState);

  const addConnection = (lfoIndex: number) => {
    const { effectId, param } = newConnection;
    if (effectId && param) {
      const lfoKey = `lfo${lfoIndex + 1}` as keyof typeof lfoState;
      lfoState[lfoKey].connections = [
        ...lfoState[lfoKey].connections,
        { effectId: EffectChain.parseId(effectId), param, amplitude: 1, min: 0, max: 1 },
      ];
      setNewConnection({ effectId: '', param: '' });

      modulatablesState.params[EffectChain.parseId(effectId)][param].isModulated = true;
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
              <SingleLfoController lfoKey={`lfo${item.key}` as keyof typeof lfoState} />
              <Divider />
              <Form layout="inline" style={{}}>
                <Form.Item label="Effect and Param">
                  <Select
                    style={{ minWidth: '10rem' }}
                    showSearch
                    value={
                      newConnection.effectId && newConnection.param
                        ? `${newConnection.effectId}.${newConnection.param}`
                        : ''
                    }
                    onChange={(value) => {
                      const [effectId, param] = value.split('.');
                      setNewConnection({ effectId, param });
                    }}
                    options={Object.keys(modulatablesSnap.params).map((effectId) => ({
                      label: `Effect #${effectId}`,
                      options: Object.values(
                        modulatablesSnap.params[EffectChain.parseId(effectId)] || {}
                      ).map((param) => ({
                        value: `${effectId}.${param.param}`,
                        label: param.param,
                        disabled: param.isModulated
                      })),
                    }))}
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
