import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { SynthEffect } from '../../driver/EffectChain';
import { Card } from 'antd';

type EffectNodeProps = {
  node: SynthEffect['node'];
  effectId: SynthEffect['id'];
};

export default function EffectNode({
  data: { node, effectId }
}: NodeProps<Node<EffectNodeProps, 'effect'>>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card title={`${node.name} (${effectId})`}></Card>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
