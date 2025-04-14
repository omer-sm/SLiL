import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { themeState } from '../../state/themeState';
import { useSnapshot } from 'valtio';
import { useCallback } from 'react';
import { Button, Card } from 'antd';
import EffectEdge from './ui/EffectEdge';
import { useEffectNodes } from '../../context/EffectNodesContext/useEffectNodes';

export default function EffectsTab() {
  const { nodes, setNodes, edges, setEdges, addNode, addEdge } = useEffectNodes();
  const { themeMode } = useSnapshot(themeState);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((currNodes) => applyNodeChanges(changes, currNodes)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      setEdges((currEdges) => applyEdgeChanges(changes, currEdges));
    },
    [setEdges]
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Card>
        <Button type="primary" onClick={addNode}>
          +
        </Button>
      </Card>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={addEdge}
        colorMode={themeMode}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={{ default: EffectEdge }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={0.75} />
      </ReactFlow>
    </div>
  );
}
