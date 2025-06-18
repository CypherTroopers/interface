import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { toGraphQLChain } from 'uniswap/src/features/chains/utils'
import { getChainIdFromBackendChain, getChainIdFromChainUrlParam, getChainUrlParam } from 'utils/chainParams'

describe('getChainFromChainUrlParam', () => {
  it('should return true for valid chain slug', () => {
    const validChainName = 'cypherium'
    expect(getChainIdFromChainUrlParam(validChainName)).toBe(UniverseChainId.Cypherium)
  })

  it('should return false for undefined chain slug', () => {
    const undefinedChainName = undefined
    expect(getChainIdFromChainUrlParam(undefinedChainName)).toBe(undefined)
  })

  it('should return false for invalid chain slug', () => {
    const invalidChainName = 'invalidchain'
    expect(getChainIdFromChainUrlParam(invalidChainName)).toBe(undefined)
  })

  it('should return false for a misconfigured chain slug', () => {
    const invalidChainName = 'eThErEuM'
    expect(getChainIdFromChainUrlParam(invalidChainName)).toBe(undefined)
  })
})

describe('getChainUrlParam', () => {
  it('should return url param for cypherium', () => {
    expect(getChainUrlParam(UniverseChainId.Cypherium)).toBe('cypherium')
  })
})

describe('getChainIdFromBackendChain', () => {
  it('should return url param for cypherium', () => {
    expect(getChainIdFromBackendChain(toGraphQLChain(UniverseChainId.Cypherium))).toBe(
      UniverseChainId.Cypherium,
    )
  })
})
