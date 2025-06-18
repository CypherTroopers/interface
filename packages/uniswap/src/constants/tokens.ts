import { Token } from '@uniswap/sdk-core'
import { UniverseChainId } from 'uniswap/src/features/chains/types'

export const USDC = new Token(UniverseChainId.Cypherium, '', 6, 'USDC', 'USD Coin')

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token } = {
  [UniverseChainId.Cypherium]: new Token(UniverseChainId.Cypherium, '', 18, 'WCPH', 'Wrapped Cypherium'),
}

export function nativeOnChain(chainId: number): Token {
  return WRAPPED_NATIVE_CURRENCY[chainId]
}
