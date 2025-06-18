import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { ExplorerDataType, getExplorerLink } from 'uniswap/src/utils/linking'

describe(getExplorerLink, () => {
  it('handles basic link cases', () => {
    expect(getExplorerLink(UniverseChainId.Cypherium, 'hash', ExplorerDataType.TRANSACTION)).toEqual(
      'https://cypherium.tryethernal.com/tx/hash',
    )
    expect(getExplorerLink(UniverseChainId.Cypherium, 'hash', ExplorerDataType.ADDRESS)).toEqual(
      'https://cypherium.tryethernal.com/address/hash',
    )
  })

  it('returns prefix if no data', () => {
    expect(getExplorerLink(UniverseChainId.Cypherium, undefined, ExplorerDataType.ADDRESS)).toEqual(
      'https://cypherium.tryethernal.com/',
    )
  })

  it('handles native currency', () => {
    expect(getExplorerLink(UniverseChainId.Cypherium, undefined, ExplorerDataType.NATIVE)).toEqual(
      'https://cypherium.tryethernal.com/',
    )
  })
})
