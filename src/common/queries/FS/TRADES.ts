import { gql } from '@apollo/client'

export const TRADES_QUERY = gql`
  query TRADES_QUERY($planName: String) {
    signalsList(filter: { plan: { planID: { equals: $planName } }, type: { equals: "trade" } }) {
      items {
        ticker
        action
        percentageWeight
        portfolioWeight
        price
        totalPortfolioWeight
        type
        boughtAt
        report {
          aIScore
        }
        stock_v2 {
          stockPrices {
            historicalSimple
            latestPrice
          }
          profile {
            image
            companyName
          }
        }
      }
    }
  }
`
