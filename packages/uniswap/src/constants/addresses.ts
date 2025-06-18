import { getChainInfo } from 'uniswap/src/features/chains/chainInfo'
import { UniverseChainId } from 'uniswap/src/features/chains/types'

export const NATIVE_TOKEN_PLACEHOLDER = 'NATIVE'

export const BRIDGED_BASE_ADDRESSES: string[] = []

export function getNativeAddress(chainId: UniverseChainId): string {
  return getChainInfo(chainId).nativeCurrency.address
}

export function getWrappedNativeAddress(chainId: UniverseChainId): string {
  return getChainInfo(chainId).wrappedNativeCurrency.address
}

// TODO: Load this from config or backend once we have it (WALL-6592)
export const UNISWAP_DELEGATION_ADDRESS = ''
