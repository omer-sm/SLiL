import { createContext, Dispatch, SetStateAction } from 'react';
import { Connection, Edge, Node } from '@xyflow/react';
import { SynthEffect } from '../../driver/EffectChain'

export interface EffectNodesContextType {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  addNode: (effectCtor: () => SynthEffect['node']) => void;
  addEdge: (params: Edge | Connection) => void;
  removeNode: (nodeId: string) => void;
  removeEdge: (edgeId: string) => void;
}

export const EffectNodesContext = createContext<EffectNodesContextType | undefined>(undefined);
