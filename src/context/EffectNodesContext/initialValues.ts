import { effectChain } from '../../driver/driver';

export const initialNodes = [...effectChain.effects.values()].map((effect, index) => ({
  id: `${effect.id}`,
  position: { x: 0, y: index * 300 },
  data: { effectId: effect.id, node: effect.node },
  type: 'effectNode'
}));

export const initialEdges = [...effectChain.effects.values()].flatMap((effect) =>
  effect.outputs.map((outputId) => ({
    id: `${effect.id}-${outputId}`,
    source: `${effect.id}`,
    target: `${outputId}`,
  }))
);
