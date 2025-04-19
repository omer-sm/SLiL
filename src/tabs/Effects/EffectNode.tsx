import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { SynthEffect } from '../../driver/EffectChain';
import { Card, Flex } from 'antd';
import { effectOptions } from './utils/effectOptions';
import { effectChain } from '../../driver/driver';
import { ToneWithContextOptions } from 'tone/build/esm/core/context/ToneWithContext';

type EffectNodeProps = {
  node: SynthEffect['node'];
  effectId: SynthEffect['id'];
};

export default function EffectNode({
  data: { node, effectId },
}: NodeProps<Node<EffectNodeProps, 'effect'>>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card title={`${node.name} (${effectId})`}>
        {effectOptions[node.name] &&
          effectOptions[node.name].map((option) => (
            <Flex vertical key={option.name}>
              <label htmlFor={option.name}>{option.displayName}</label>
              {option.element(
                {
                  className: 'nodrag',
                  defaultValue:
                    effectChain.effects.get(effectId)?.node.get()[
                      option.name as keyof ToneWithContextOptions
                    ] ?? 0,
                },
                (value) => {
                  effectChain.changeEffectOptions(effectId, { [option.name]: value });
                }
              )}
            </Flex>
          ))}
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
