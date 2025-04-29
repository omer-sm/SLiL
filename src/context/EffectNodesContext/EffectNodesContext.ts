import { createContext, Dispatch, SetStateAction } from 'react';
import { Connection, Edge, Node } from '@xyflow/react';
import { SynthEffect } from '../../driver/EffectChain';
import { PresetEffect } from '../../tabs/Presets/utils/presetTypes';

export interface EffectNodesContextType {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  addNode: (
    effectCtor: () => SynthEffect['node'],
    effectId?: SynthEffect['id'],
    effectOpts?: PresetEffect['options']
  ) => void;
  addEdge: (params: Edge | Connection) => void;
  removeNode: (nodeId: string) => void;
  removeEdge: (edgeId: string) => void;
}

export const EffectNodesContext = createContext<EffectNodesContextType | undefined>(
  undefined
);
