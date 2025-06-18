import { CYPHERIUM_LOGO } from 'ui/src/assets'
import { nativeOnChain } from 'uniswap/src/constants/tokens'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo'
import { isUniverseChainId } from 'uniswap/src/features/chains/types'
import { isAddress } from 'utilities/src/addresses'

export function getInitialLogoUrl(address?: string | null, chainId?: number | null, backupImg?: string | null) {
  const networkName = isUniverseChainId(chainId) ? getChainInfo(chainId).assetRepoNetworkName ?? 'ethereum' : 'ethereum'
  const checksummedAddress = isAddress(address)

  if (
    chainId === UniverseChainId.Cypherium &&
    address === nativeOnChain(chainId).wrapped.address
  ) {
    return CYPHERIUM_LOGO
  }

  if (checksummedAddress) {
    return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${checksummedAddress}/logo.png`
  } else {
    return backupImg ?? undefined
  }
}
