import { BTC_BSC, BUSD_BSC, DAI_BSC, ETH_BSC, USDC_BNB, USDC_BSC, USDT_BNB, USDT_BSC } from 'uniswap/src/constants/tokens'
import { UniverseChainId } from 'uniswap/src/features/chains/types'

describe('BNB token constants', () => {
  it('have the correct chainId', () => {
    expect(BTC_BSC.chainId).toBe(UniverseChainId.Bnb)
    expect(BUSD_BSC.chainId).toBe(UniverseChainId.Bnb)
    expect(DAI_BSC.chainId).toBe(UniverseChainId.Bnb)
    expect(ETH_BSC.chainId).toBe(UniverseChainId.Bnb)
    expect(USDC_BNB.chainId).toBe(UniverseChainId.Bnb)
    expect(USDC_BSC.chainId).toBe(UniverseChainId.Bnb)
    expect(USDT_BNB.chainId).toBe(UniverseChainId.Bnb)
    expect(USDT_BSC.chainId).toBe(UniverseChainId.Bnb)
  })
})
