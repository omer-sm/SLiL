import { useCallback, useState } from 'react';
import { addEdge as addEdgeToState, Connection, Edge, Node } from '@xyflow/react';
import { EffectNodesContext } from './EffectNodesContext';
import { initialEdges, initialNodes } from './initialValues';
import { effectChain } from '../../driver/driver';
import EffectChain, { SynthEffect } from '../../driver/EffectChain';

export const EffectNodesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const addNode = useCallback((effectCtor: () => SynthEffect['node']) => {
    const effect = effectCtor();
    const effectId = effectChain.addEffect(effect);

    const newNode = {
      id: `${effectId}`,
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      data: { label: `${effect.name} (${effectId})` },
    };
    setNodes((prev) => [...prev, newNode]);
  }, [setNodes]);

  const addEdge = useCallback(
    (params: Edge | Connection) => {
      effectChain.addConnection(
        EffectChain.parseId(params.source),
        EffectChain.parseId(params.target)
      );
      setEdges((eds) => addEdgeToState(params, eds));
    },
    [setEdges]
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      effectChain.removeEffect(EffectChain.parseId(nodeId));
      setNodes((prev) => prev.filter((node) => node.id !== nodeId));
      setEdges((prev) =>
        prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes]
  );

  const removeEdge = useCallback(
    (edgeId: string) => {
      const edgeIndex = edges.findIndex((edge) => edge.id === edgeId);
      const { source, target } = edges[edgeIndex];

      effectChain.removeConnection(EffectChain.parseId(source), EffectChain.parseId(target));

      setEdges((prev) => prev.filter((_, index) => index !== edgeIndex));
    },
    [edges, setEdges]
  );

  return (
    <EffectNodesContext.Provider
      value={{ nodes, setNodes, edges, setEdges, addEdge, addNode, removeEdge, removeNode }}
    >
      {children}
    </EffectNodesContext.Provider>
  );
};
