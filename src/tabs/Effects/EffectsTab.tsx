import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
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
  const { nodes, setNodes, edges, setEdges } = useEffectNodes();
  const { themeMode } = useSnapshot(themeState);

  const addNode = () => {
    const newNode = {
      id: `${nodes.length}`,
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      data: { label: `Node ${nodes.length}` },
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((currNodes) => applyNodeChanges(changes, currNodes)),
    [setNodes]
  );

  const onConnect = useCallback(
    (params) => {
      console.log('connect', params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      console.log('edge change', changes);
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
        onConnect={onConnect}
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
