/* eslint-disable max-lines */
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { CurrencyAmount, ChainId as UniswapSDKChainId } from '@uniswap/sdk-core'
import { CYPHERIUM_LOGO } from 'ui/src/assets'
import { config } from 'uniswap/src/config'
import { USDC } from 'uniswap/src/constants/tokens'
import { Chain as BackendChainId } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import {
  GqlChainId,
  NetworkLayer,
  RPCType,
  RetryOptions,
  UniverseChainId,
  UniverseChainInfo,
} from 'uniswap/src/features/chains/types'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { isPlaywrightEnv } from 'utilities/src/environment/env'
import { isInterface } from 'utilities/src/platform'
import { ONE_MINUTE_MS } from 'utilities/src/time/time'
// No wagmi chain imports needed since only Cypherium info is included

const LOCAL_MAINNET_PLAYWRIGHT_RPC_URL = 'http://127.0.0.1:8545'
const LOCAL_BASE_PLAYWRIGHT_RPC_URL = 'http://127.0.0.1:8546'

/** Address that represents native currencies on ETH, Arbitrum, etc. */
export const DEFAULT_NATIVE_ADDRESS_LEGACY = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
export const DEFAULT_NATIVE_ADDRESS = '0x0000000000000000000000000000000000000000'
export const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 10, minWait: 250, maxWait: 1000 }

export const DEFAULT_MS_BEFORE_WARNING = ONE_MINUTE_MS * 10

export function getChainInfo(chainId: UniverseChainId): UniverseChainInfo {
  return UNIVERSE_CHAIN_INFO[chainId]
}

// Source: https://marketplace.quicknode.com/chains_and_networks
export function getQuicknodeChainId(chainId: UniverseChainId): string {
  switch (chainId) {
    case UniverseChainId.Cypherium:
      return ''
    default:
      throw new Error(`Chain ${chainId} does not have a corresponding QuickNode chain ID`)
  }
}

// If chain requires a path suffix
export function getQuicknodeChainIdPathSuffix(_chainId: UniverseChainId): string {
  return ''
}

export function getQuicknodeEndpointUrl(chainId: UniverseChainId): string {
  const quicknodeChainId = getQuicknodeChainId(chainId)

  return `https://${config.quicknodeEndpointName}${quicknodeChainId ? `.${quicknodeChainId}` : ''}.quiknode.pro/${config.quicknodeEndpointToken}${getQuicknodeChainIdPathSuffix(chainId)}`
}

function getPlaywrightRpcUrls(url: string): { [key in RPCType]: { http: string[] } } {
  return {
    [RPCType.Public]: { http: [url] },
    [RPCType.Default]: { http: [url] },
    [RPCType.Fallback]: { http: [url] },
    [RPCType.Interface]: { http: [url] },
    [RPCType.Private]: { http: [url] },
    [RPCType.PublicAlt]: { http: [url] },
  }
}

export const UNIVERSE_CHAIN_INFO = {
  [UniverseChainId.Cypherium]: {
    name: 'Cypherium',
    id: UniverseChainId.Cypherium,
    sdkId: UniverseChainId.Cypherium as unknown as UniswapSDKChainId,
    assetRepoNetworkName: 'cypherium',
    backendChain: {
      chain: BackendChainId.Ethereum as GqlChainId,
      backendSupported: false,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 1,
    blockWaitMsBeforeWarning: 600000,
    bridge: undefined,
    docs: 'https://docs.cypherium.io/',
    elementName: ElementName.ChainCypherium,
    explorer: {
      name: 'Cypherium Explorer',
      url: 'https://cypherium.tryethernal.com/overview',
    },
    helpCenterUrl: undefined,
    infoLink: 'https://cypherium.io/',
    infuraPrefix: undefined,
    interfaceName: 'cypherium',
    label: 'Cypherium',
    logo: CYPHERIUM_LOGO,
    nativeCurrency: {
      name: 'Cypherium',
      symbol: 'CPH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS_LEGACY,
      logo: CYPHERIUM_LOGO,
    },
    networkLayer: NetworkLayer.L1,
    pendingTransactionsRetryOptions: undefined,
    rpcUrls: {
      [RPCType.Public]: { http: ['https://make-cph.great-again.community'] },
      [RPCType.Default]: { http: ['https://make-cph.great-again.community'] },
      [RPCType.Interface]: { http: ['https://make-cph.great-again.community'] },
    },
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC, 100_000e6),
    stablecoins: [USDC],
    statusPage: undefined,
    supportsInterfaceClientSideRouting: false,
    supportsGasEstimates: true,
    supportsV4: false,
    urlParam: 'cypherium',
    wrappedNativeCurrency: {
      name: 'Wrapped Cypherium',
      symbol: 'WCPH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
    },
  } as const satisfies UniverseChainInfo,
} as Record<UniverseChainId, UniverseChainInfo>

export const GQL_MAINNET_CHAINS = Object.values(UNIVERSE_CHAIN_INFO)
  .filter((chain) => !chain.testnet && !chain.backendChain.isSecondaryChain)
  .map((chain) => chain.backendChain.chain)
  .filter((backendChain) => !!backendChain)

export const GQL_TESTNET_CHAINS = Object.values(UNIVERSE_CHAIN_INFO)
  .filter((chain) => chain.testnet && !chain.backendChain.isSecondaryChain)
  .map((chain) => chain.backendChain.chain)
  .filter((backendChain) => !!backendChain)

export const ALL_GQL_CHAINS: GqlChainId[] = [...GQL_MAINNET_CHAINS, ...GQL_TESTNET_CHAINS]
