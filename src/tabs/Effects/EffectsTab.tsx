import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionState,
  Edge,
  EdgeChange,
  HandleType,
  Node,
  NodeChange,
  ReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { themeState } from '../../state/themeState';
import { useSnapshot } from 'valtio';
import { useCallback } from 'react';
import { Card, Flex } from 'antd';
import { useEffectNodes } from '../../context/EffectNodesContext/useEffectNodes';
import { effectButtons } from './utils/effects';
import AddEffectButton from './AddEffectButton';

export default function EffectsTab() {
  const { nodes, setNodes, edges, setEdges, addNode, addEdge, removeEdge } = useEffectNodes();
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

  const onReconnect = useCallback(
    (oldEdge: Edge, newEdge: Connection) => {
      addEdge(newEdge);
      removeEdge(oldEdge.id);
    },
    [addEdge, removeEdge]
  );

  const onReconnectEnd = useCallback(
    (
      _event: MouseEvent | TouchEvent,
      edge: Edge,
      _handleType: HandleType,
      connectionState: ConnectionState
    ) => {
      if (!connectionState.isValid) {
        removeEdge(edge.id);
      }
    },
    [removeEdge]
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Card>
        <Flex justify="center">
          {effectButtons.map(({ name, color, createEffect }, index) => (
            <AddEffectButton
              {...{ name, color }}
              createEffect={() => addNode(createEffect)}
              key={index}
            />
          ))}
        </Flex>
      </Card>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={addEdge}
        colorMode={themeMode}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={{ hideAttribution: true }}
        onReconnect={onReconnect}
        //@ts-expect-error onReconnectEnd is missing the fourth parameter in the typedef
        onReconnectEnd={onReconnectEnd}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={0.75} />
      </ReactFlow>
    </div>
  );
}
