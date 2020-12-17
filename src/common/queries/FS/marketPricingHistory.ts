import { gql } from '@apollo/client'

export const MARKET_PRICE_HISTORY = gql`
  query MARKET_PRICE_HISTORY($marketType: String, $fromDate: Date) {
    marketPricingHistoriesList(
      filter: { type: { equals: $marketType }, date: { gte: $fromDate } }
      sort: { date: ASC }
    ) {
      items {
        price
        date
      }
    }
  }
`
