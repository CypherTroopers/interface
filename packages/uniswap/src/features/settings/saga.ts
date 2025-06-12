import { call, select } from 'typed-redux-saga'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { filterChainIdsByFeatureFlag, getEnabledChains } from 'uniswap/src/features/chains/utils'
import { FeatureFlags } from 'uniswap/src/features/gating/flags'
import { getFeatureFlag } from 'uniswap/src/features/gating/hooks'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { selectIsTestnetModeEnabled } from 'uniswap/src/features/settings/selectors'

export function* getEnabledChainIdsSaga() {
  const isTestnetModeEnabled = yield* select(selectIsTestnetModeEnabled)

  const soneiumEnabled = getFeatureFlag(FeatureFlags.Soneium)
  const cypheriumEnabled = getFeatureFlag(FeatureFlags.Cypherium)

  const featureFlaggedChainIds = filterChainIdsByFeatureFlag({
    [UniverseChainId.Soneium]: soneiumEnabled,
    [UniverseChainId.Cypherium]: cypheriumEnabled,
  })

  return yield* call(getEnabledChains, {
    isTestnetModeEnabled,
    featureFlaggedChainIds,
  })
}
