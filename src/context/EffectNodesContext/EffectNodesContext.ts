import { createContext } from "react"
import { Edge, Node } from "@xyflow/react";

export interface EffectNodesContextType {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export const EffectNodesContext = createContext<EffectNodesContextType | undefined>(undefined);