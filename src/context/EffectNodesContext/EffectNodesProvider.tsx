import { useState } from "react";
import { Edge, Node } from "@xyflow/react";
import { EffectNodesContext } from "./EffectNodesContext"
import { initialEdges, initialNodes } from "../../tabs/Effects/utils/nodesDriver"



export const EffectNodesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    return (
        <EffectNodesContext.Provider value={{ nodes, setNodes, edges, setEdges }}>
            {children}
        </EffectNodesContext.Provider>
    );
};

