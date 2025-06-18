import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { isV4UnsupportedChain } from 'utils/networkSupportsV4'

describe('isV4UnsupportedChain', () => {
  it('returns true for Cypherium', () => {
    expect(isV4UnsupportedChain(UniverseChainId.Cypherium)).toBe(true)
  })
})
