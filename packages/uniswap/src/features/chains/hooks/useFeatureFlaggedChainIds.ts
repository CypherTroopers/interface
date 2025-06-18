import { UniverseChainId } from 'uniswap/src/features/chains/types'

// Used to feature flag chains. If a chain is not included in the object, it is considered enabled by default.
export function useFeatureFlaggedChainIds(): UniverseChainId[] {
  return [UniverseChainId.Cypherium]
}
