import { useContext } from "react"
import { EffectNodesContext, EffectNodesContextType } from "./EffectNodesContext"

export const useEffectNodes = (): EffectNodesContextType => {
    const context = useContext(EffectNodesContext);
    
    if (!context) {
        throw new Error("useEffectNodes must be used within an EffectNodesProvider");
    }

    return context;
};