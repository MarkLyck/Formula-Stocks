import { gql } from '@apollo/client'

export const LATEST_SELL_SIGNALS = gql`
  query {
    latestSellSignalsList(orderBy: createdAt_DESC, first: 10) {
      items {
        name
        ticker
        boughtAt
        soldAt
      }
    }
  }
`

export const SELL_SIGNALS_COUNT = gql`
  query sellTipsList($createdAt: DateTime!) {
    sellTipsList(filter: { createdAt: { gt: $createdAt } }) {
      count
    }
  }
`
