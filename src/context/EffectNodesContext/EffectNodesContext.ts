import { createContext, Dispatch, SetStateAction } from 'react';
import { Connection, Edge, Node } from '@xyflow/react';

export interface EffectNodesContextType {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  addNode: () => void;
  addEdge: (params: Edge | Connection) => void;
  removeNode: (nodeId: string) => void;
  removeEdge: (sourceId: string, targetId: string) => void;
}

export const EffectNodesContext = createContext<EffectNodesContextType | undefined>(undefined);
