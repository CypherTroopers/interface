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
  const testCases: Array<[UniverseChainId, string, string]> = [
    [UniverseChainId.Cypherium, '', 'Cypherium chain'],
  ]

  it.each(testCases)('returns correct path suffix for %s', (chainId, expectedSuffix, _testName) => {
    expect(getQuicknodeChainIdPathSuffix(chainId)).toBe(expectedSuffix)
  })
})

describe('getQuicknodeEndpointUrl', () => {
  it('constructs URL with different config values', () => {
    // Override config mock for this test
    jest.mocked(config).quicknodeEndpointName = 'different-endpoint'
    jest.mocked(config).quicknodeEndpointToken = 'different-token'

    const url = getQuicknodeEndpointUrl(UniverseChainId.Cypherium)
    expect(url).toBe('https://different-endpoint.quiknode.pro/different-token')

    // Reset mock to original values
    jest.mocked(config).quicknodeEndpointName = 'test-endpoint'
    jest.mocked(config).quicknodeEndpointToken = 'test-token-123'
  })

  it('throws error for unsupported chain', () => {
    // @ts-expect-error testing invalid chain id
    expect(() => getQuicknodeEndpointUrl(999999)).toThrow(
      'Chain 999999 does not have a corresponding QuickNode chain ID',
    )
  })

  it('handles all supported chains without throwing', () => {
    const url = getQuicknodeEndpointUrl(UniverseChainId.Cypherium)
    expect(url).toEqual('https://test-endpoint.quiknode.pro/test-token-123')
  })
})

describe('getQuicknodeChainId', () => {
  it('returns correct quicknode subdomain for the chain', () => {
    expect(getQuicknodeChainId(UniverseChainId.Cypherium)).toBe('')
  })

  it('throws error for unsupported chain', () => {
    // @ts-expect-error testing invalid chain id
    expect(() => getQuicknodeChainId(999999)).toThrow('Chain 999999 does not have a corresponding QuickNode chain ID')
  })
})
