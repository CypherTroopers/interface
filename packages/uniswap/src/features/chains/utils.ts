import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { Chain } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { GQL_MAINNET_CHAINS, getChainInfo } from 'uniswap/src/features/chains/chainInfo'
import {
  ALL_CHAIN_IDS,
  EnabledChainsInfo,
  GqlChainId,
  SUPPORTED_CHAIN_IDS,
  UniverseChainId,
} from 'uniswap/src/features/chains/types'

export function toSupportedChainId(chainId?: BigNumberish): UniverseChainId | null {
  if (!chainId || chainId.toString() !== UniverseChainId.Cypherium.toString()) {
    return null
  }
  return UniverseChainId.Cypherium
}

export function chainSupportsGasEstimates(chainId: UniverseChainId): boolean {
  return getChainInfo(chainId).supportsGasEstimates
}

export function getChainLabel(chainId: UniverseChainId): string {
  return getChainInfo(chainId).label
}

export function isTestnetChain(chainId: UniverseChainId): boolean {
  return Boolean(getChainInfo(chainId)?.testnet)
}

export function chainIdToHexadecimalString(chainId: UniverseChainId): string {
  return BigNumber.from(chainId).toHexString()
}

export function hexadecimalStringToInt(hex: string): number {
  return parseInt(hex, 16)
}

export function isL2ChainId(_chainId?: UniverseChainId): boolean {
  return false
}

export function isMainnetChainId(chainId?: UniverseChainId): boolean {
  return chainId === UniverseChainId.Cypherium
}

export function toGraphQLChain(chainId: UniverseChainId): GqlChainId {
  return getChainInfo(chainId).backendChain.chain
}

export function fromGraphQLChain(chain: Chain | string | undefined): UniverseChainId | null {
  return chain === Chain.Cypherium ? UniverseChainId.Cypherium : null
}

export function fromUniswapWebAppLink(network: string | null): UniverseChainId | null {
  return network === Chain.Cypherium.toLowerCase() ? UniverseChainId.Cypherium : null
}

export function toUniswapWebAppLink(chainId: UniverseChainId): string | null {
  return chainId === UniverseChainId.Cypherium ? Chain.Cypherium.toLowerCase() : null
}

export function filterChainIdsByFeatureFlag(featureFlaggedChainIds: { [key in UniverseChainId]?: boolean }): UniverseChainId[] {
  return ALL_CHAIN_IDS.filter((chainId) => featureFlaggedChainIds[chainId] ?? true)
}

export function getEnabledChains({
  isTestnetModeEnabled,
  featureFlaggedChainIds,
  connectedWalletChainIds,
}: {
  isTestnetModeEnabled: boolean
  featureFlaggedChainIds: UniverseChainId[]
  connectedWalletChainIds?: UniverseChainId[]
}): EnabledChainsInfo {
  const chains = SUPPORTED_CHAIN_IDS.filter((chainId) => featureFlaggedChainIds.includes(chainId))
  return {
    chains,
    gqlChains: GQL_MAINNET_CHAINS,
    defaultChainId: UniverseChainId.Cypherium,
    isTestnetModeEnabled,
  }
}
