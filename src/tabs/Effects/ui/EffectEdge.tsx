import { BaseEdge, getBezierPath } from '@xyflow/react';
import { useEffectNodes } from '../../../context/EffectNodesContext/useEffectNodes'

interface EffectEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export default function EffectEdge({ id, sourceX, sourceY, targetX, targetY }: EffectEdgeProps) {
  const { removeEdge } = useEffectNodes();
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} onDoubleClick={() => removeEdge(id)} />
    </>
  );
}
