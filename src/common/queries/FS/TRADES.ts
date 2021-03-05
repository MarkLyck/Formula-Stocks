import { gql } from '@apollo/client'

export const TRADES_QUERY = gql`
  query TRADES_QUERY($planName: String) {
    signalsList(filter: { plan: { planID: { equals: $planName } }, type: { equals: "trade" } }) {
      items {
        action
        advancedData
        name
        percentageWeight
        portfolioWeight
        price
        ticker
        totalPortfolioWeight
        type
        boughtAt
        report {
          aIScore
        }
        stock {
          ticker
          sixMonthsPrices
          latestPrice
        }
      }
    }
  }
`
