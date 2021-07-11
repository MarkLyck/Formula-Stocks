import { gql } from '@apollo/client'

export const TRADE_HISTORY = gql`
  query TRADE_HISTORY($planName: String) {
    tradeHistoriesList(filter: { plan: { planID: { equals: $planName } } }) {
      items {
        symbol
        name
        obfuscatedSymbol
        buyPrice
        sellPrice
        percentIncrease
        startDate
        endDate
        daysHeld
      }
    }
  }
`
