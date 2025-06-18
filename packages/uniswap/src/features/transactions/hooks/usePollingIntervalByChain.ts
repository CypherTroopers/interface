import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { DynamicConfigs, SwapConfigKey } from 'uniswap/src/features/gating/configs'
import { useDynamicConfigValue } from 'uniswap/src/features/gating/hooks'
import { ONE_SECOND_MS } from 'utilities/src/time/time'

export const AVERAGE_L1_BLOCK_TIME_MS = 12 * ONE_SECOND_MS

export function usePollingIntervalByChain(_chainId?: UniverseChainId): number {
  return useDynamicConfigValue(
    DynamicConfigs.Swap,
    SwapConfigKey.AverageL1BlockTimeMs,
    AVERAGE_L1_BLOCK_TIME_MS,
  )
}
