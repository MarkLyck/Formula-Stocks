import { gql } from '@apollo/client'

export const STOCK_REPORT = gql`
  query STOCK_REPORT($symbol: String!) {
    stocks_v2(symbol: $symbol) {
      stockPrices {
        latestPrice
      }
      profile {
        image
        industry
        sector
        website
        companyName
        symbol
      }
    }
  }
`
