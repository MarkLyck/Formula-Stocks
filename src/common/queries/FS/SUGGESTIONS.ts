import { gql } from '@apollo/client'

export const SUGGESTIONS_QUERY = gql`
  query SUGGESTIONS_QUERY($planName: String) {
    signalsList(filter: { plan: { planID: { equals: $planName } }, type: { equals: "suggestion" } }) {
      items {
        action
        advancedData
        name
        percentageWeight
        price
        ticker
        type
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
