import { gql } from '@apollo/client'

export const SUGGESTIONS_QUERY = gql`
  query SUGGESTIONS_QUERY($planName: String) {
    signalsList(filter: { plan: { planID: { equals: $planName } }, type: { equals: "suggestion" } }) {
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
