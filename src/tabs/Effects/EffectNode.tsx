import { useMemo } from 'react';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { SynthEffect } from '../../driver/EffectChain';
import { Button, Card, Flex } from 'antd';
import { effectOptions } from './utils/effectOptions';
import { effectChain } from '../../driver/driver';
import { ToneWithContextOptions } from 'tone/build/esm/core/context/ToneWithContext';
import { useEffectNodes } from '../../context/EffectNodesContext/useEffectNodes';
import CloseIcon from '@mui/icons-material/Close';

type EffectNodeProps = {
  node: SynthEffect['node'];
  effectId: SynthEffect['id'];
};

export default function EffectNode({
  data: { node, effectId },
}: NodeProps<Node<EffectNodeProps, 'effect'>>) {
  const { removeNode } = useEffectNodes();

  const effectControlCard = useMemo(
    () => (
      <Card
        title={`${node.name} (${effectId})`}
        extra={
          effectId !== 'input' &&
          effectId !== 'output' && (
            <Button
              onClick={() => removeNode(`${effectId}`)}
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
          )
        }
        style={{ minWidth: 200 }}
      >
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
    ),
    [node.name, effectId, removeNode]
  );

  return (
    <>
      <Handle type="target" position={Position.Top} />
      {effectControlCard}
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
