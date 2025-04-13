import { applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, ReactFlow } from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { themeState } from '../../state/themeState'
import { useSnapshot } from 'valtio'
import { initialEdges, initialNodes } from './utils/nodesDriver'
import { useCallback, useState } from 'react'

export default function EffectsTab() {
    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)
    const { themeMode } = useSnapshot(themeState)

    const onNodesChange = useCallback(
        (changes) => setNodes((currNodes) => applyNodeChanges(changes, currNodes)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((currEdges) => applyEdgeChanges(changes, currEdges)),
        [],
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            colorMode={themeMode}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            proOptions={{ hideAttribution: true }}
        >
            <Background variant={BackgroundVariant.Dots} gap={12} size={0.75} />
        </ReactFlow>
    )
}