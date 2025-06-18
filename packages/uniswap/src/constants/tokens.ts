import { Currency, NativeCurrency, Token, UNI_ADDRESSES } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'
import { UniverseChainId } from 'uniswap/src/features/chains/types'

export const USDC = new Token(
  UniverseChainId.Cypherium,
  '0x0000000000000000000000000000000000000000',
  6,
  'USDC',
  'USD Coin',
)

export const USDT = new Token(
  UniverseChainId.Cypherium,
  '0x0000000000000000000000000000000000000000',
  6,
  'USDT',
  'Tether USD',
)

export const WBTC = new Token(
  UniverseChainId.Cypherium,
  '0x0000000000000000000000000000000000000000',
  8,
  'WBTC',
  'Wrapped BTC',
)

export const UNI = {
  [UniverseChainId.Cypherium]: new Token(
    UniverseChainId.Cypherium,
    UNI_ADDRESSES[UniverseChainId.Cypherium] as string,
    18,
    'UNI',
    'Uniswap',
  ),
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token } = {
  [UniverseChainId.Cypherium]: new Token(
    UniverseChainId.Cypherium,
    '0x0000000000000000000000000000000000000000',
    18,
    'WCPH',
    'Wrapped Cypherium',
  ),
}

class ExtendedEther extends NativeCurrency {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped)
    return wrapped
  }

  protected constructor(chainId: number) {
    super(chainId, 18, 'CPH', 'Cypherium')
  }

  private static _cached: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return (this._cached[chainId] ??= new ExtendedEther(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}

export function nativeOnChain(chainId: number): NativeCurrency | Token {
  return ExtendedEther.onChain(chainId)
}
