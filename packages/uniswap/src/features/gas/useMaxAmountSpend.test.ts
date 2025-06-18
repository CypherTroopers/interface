import { CurrencyAmount } from '@uniswap/sdk-core'
import JSBI from 'jsbi'
import { DAI } from 'uniswap/src/constants/tokens'
import {
  useMaxAmountSpend,
  useMinEthForGas,
} from 'uniswap/src/features/gas/useMaxAmountSpend'
import { MAINNET_CURRENCY } from 'uniswap/src/test/fixtures'

jest.mock('uniswap/src/features/gating/hooks', () => {
  return {
    useDynamicConfigValue: jest.fn().mockImplementation((config: unknown, key: unknown, defaultVal: unknown) => {
      return defaultVal
    }),
  }
})

describe(useMaxAmountSpend, () => {
  it('handles undefined', () => {
    expect(useMaxAmountSpend({ currencyAmount: undefined })).toEqual(undefined)
    expect(useMaxAmountSpend({ currencyAmount: null })).toEqual(undefined)
  })

  it('handles token amounts', () => {
    const tokenAmount = CurrencyAmount.fromRawAmount(DAI, '100000000')
    expect(useMaxAmountSpend({ currencyAmount: tokenAmount })).toBe(tokenAmount)
  })

  // ETH Mainnet

  it('reserves gas for large amounts on ETH Mainnet', () => {
    const MIN_ETH_FOR_GAS = useMinEthForGas()
    const amount = CurrencyAmount.fromRawAmount(
      MAINNET_CURRENCY,
      JSBI.add(JSBI.BigInt(99), JSBI.BigInt(MIN_ETH_FOR_GAS)),
    )
    const amount1Spend = useMaxAmountSpend({ currencyAmount: amount })
    expect(amount1Spend?.quotient.toString()).toEqual('99')
  })

  it('handles small amounts on ETH Mainnet', () => {
    const MIN_ETH_FOR_GAS = useMinEthForGas()
    const amount = CurrencyAmount.fromRawAmount(
      MAINNET_CURRENCY,
      JSBI.subtract(JSBI.BigInt(99), JSBI.BigInt(MIN_ETH_FOR_GAS)),
    )
    const amount1Spend = useMaxAmountSpend({ currencyAmount: amount })
    expect(amount1Spend?.quotient.toString()).toEqual('0')
  })

})
