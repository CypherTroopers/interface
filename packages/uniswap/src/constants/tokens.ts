import { Currency, NativeCurrency, Token } from '@uniswap/sdk-core'
import { DEFAULT_NATIVE_ADDRESS } from 'uniswap/src/features/chains/chainInfo'
import { UniverseChainId } from 'uniswap/src/features/chains/types'

export const USDC = new Token(
  UniverseChainId.Cypherium,
  '0x0000000000000000000000000000000000000001',
  6,
  'USDC',
  'USD Coin',
)

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token } = {
  [UniverseChainId.Cypherium]: new Token(
    UniverseChainId.Cypherium,
    DEFAULT_NATIVE_ADDRESS,
    18,
    'WCPH',
    'Wrapped Cypherium',
  ),
}

class ExtendedEther extends NativeCurrency {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) {
      return wrapped
    }
    throw new Error(`Unsupported chain ID: ${this.chainId}`)
  }

  protected constructor(chainId: number) {
    super(chainId, 18, 'CPH', 'Cypherium')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}
export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) {
    return cachedNativeCurrency[chainId]
  }
  const nativeCurrency = ExtendedEther.onChain(chainId)
  return (cachedNativeCurrency[chainId] = nativeCurrency)
}
