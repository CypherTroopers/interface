import { config } from 'uniswap/src/config'
import {
  getQuicknodeChainId,
  getQuicknodeChainIdPathSuffix,
  getQuicknodeEndpointUrl,
} from 'uniswap/src/features/chains/chainInfo'
import { UniverseChainId } from 'uniswap/src/features/chains/types'

jest.mock('uniswap/src/config', () => ({
  config: {
    quicknodeEndpointName: 'test-endpoint',
    quicknodeEndpointToken: 'test-token-123',
  },
}))

describe('getQuicknodeChainIdPathSuffix', () => {
  it('returns empty suffix for Cypherium', () => {
    expect(getQuicknodeChainIdPathSuffix(UniverseChainId.Cypherium)).toBe('')
  })
})

describe('getQuicknodeEndpointUrl', () => {
  it('constructs URL with config values', () => {
    const url = getQuicknodeEndpointUrl(UniverseChainId.Cypherium)
    expect(url).toBe('https://test-endpoint.quiknode.pro/test-token-123')
  })

  it('throws error for unsupported chain', () => {
    // @ts-expect-error testing invalid chain id
    expect(() => getQuicknodeEndpointUrl(999999)).toThrow(
      'Chain 999999 does not have a corresponding QuickNode chain ID',
    )
  })

  it('handles Cypherium without throwing', () => {
    const url = getQuicknodeEndpointUrl(UniverseChainId.Cypherium)
    expect(url).toBe('https://test-endpoint.quiknode.pro/test-token-123')
  })
})

describe('getQuicknodeChainId', () => {
  it('returns correct quicknode subdomain for Cypherium', () => {
    expect(getQuicknodeChainId(UniverseChainId.Cypherium)).toBe('')
  })

  it('throws error for unsupported chain', () => {
    // @ts-expect-error testing invalid chain id
    expect(() => getQuicknodeChainId(999999)).toThrow('Chain 999999 does not have a corresponding QuickNode chain ID')
  })
})
