import { useCallback, useState } from 'react';
import { addEdge as addEdgeToState, Connection, Edge, Node } from '@xyflow/react';
import { EffectNodesContext } from './EffectNodesContext';
import { initialEdges, initialNodes } from '../../tabs/Effects/utils/nodesDriver';

export const EffectNodesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const addNode = useCallback(() => {
    const newNode = {
      id: `${nodes.length}`,
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      data: { label: `Node ${nodes.length}` },
    };
    setNodes((prev) => [...prev, newNode]);
  }, [nodes, setNodes]);

  const addEdge = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdgeToState(params, eds));
    },
    [setEdges]
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      setNodes((prev) => prev.filter((node) => node.id !== nodeId));
    },
    [setNodes]
  );

  const removeEdge = useCallback(
    (sourceId: string, targetId: string) => {
      setEdges((prev) =>
        prev.filter((edge) => edge.source !== sourceId || edge.target !== targetId)
      );
    },
    [setEdges]
  );

  return (
    <EffectNodesContext.Provider
      value={{ nodes, setNodes, edges, setEdges, addEdge, addNode, removeEdge, removeNode }}
    >
      {children}
    </EffectNodesContext.Provider>
  );
};
