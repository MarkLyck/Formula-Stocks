import { gql } from '@apollo/client'

export const STOCK_PRICE_HISTORY_SIMPLE = gql`
  query STOCK_PRICE_HISTORY_SIMPLE($symbol: String) {
    stockPrice(symbol: $symbol) {
      symbol
      historicalSimple
    }
  }
`

export const STOCK_PRICE_HISTORY = gql`
  query STOCK_PRICE_HISTORY_SIMPLE($symbol: String) {
    stockPrice(symbol: $symbol) {
      symbol
      historical
    }
  }
`
