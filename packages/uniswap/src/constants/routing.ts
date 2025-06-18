import { Currency, Token } from '@uniswap/sdk-core'
import type { ImageSourcePropType } from 'react-native'
import { ETH_LOGO } from 'ui/src/assets'
import { WRAPPED_NATIVE_CURRENCY, USDC, nativeOnChain } from 'uniswap/src/constants/tokens'
import { ProtectionResult } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { CurrencyInfo, TokenList } from 'uniswap/src/features/dataApi/types'
import { buildCurrencyInfo } from 'uniswap/src/features/dataApi/utils'
import { isSameAddress } from 'utilities/src/addresses'

type ChainCurrencyList = {
  readonly [chainId: number]: CurrencyInfo[]
}

export const COMMON_BASES: ChainCurrencyList = {
  [UniverseChainId.Cypherium]: [
    nativeOnChain(UniverseChainId.Cypherium),
    WRAPPED_NATIVE_CURRENCY[UniverseChainId.Cypherium] as Token,
    USDC,
  ].map(buildPartialCurrencyInfo),
}

export function getCommonBase(chainId?: number, isNative?: boolean, address?: string): CurrencyInfo | undefined {
  if (!address || !chainId) {
    return undefined
  }
  return COMMON_BASES[chainId]?.find(
    (base) =>
      (base.currency.isNative && isNative) || (base.currency.isToken && isSameAddress(base.currency.address, address)),
  )
}

function getNativeLogoURI(_chainId: UniverseChainId = UniverseChainId.Cypherium): ImageSourcePropType {
  return ETH_LOGO as ImageSourcePropType
}

function getTokenLogoURI(chainId: UniverseChainId, address: string): ImageSourcePropType | string | undefined {
  const chainInfo = getChainInfo(chainId)
  const networkName = chainInfo?.assetRepoNetworkName

  return networkName
    ? `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
    : undefined
}

export function buildPartialCurrencyInfo(commonBase: Currency): CurrencyInfo {
  const logoUrl = commonBase.isNative
    ? getNativeLogoURI(commonBase.chainId)
    : getTokenLogoURI(commonBase.chainId, commonBase.address)

  return buildCurrencyInfo({
    currency: commonBase,
    logoUrl,
    safetyInfo: {
      tokenList: TokenList.Default,
      protectionResult: ProtectionResult.Benign,
    },
    isSpam: false,
  } as CurrencyInfo)
}

