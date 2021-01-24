import { gql } from '@apollo/client'

export const PORTFOLIO_HOLDINGS = gql`
  query PORTFOLIO_HOLDINGS($planName: String) {
    portfolioHoldingsList(filter: { plan: { planID: { equals: $planName } } }) {
      items {
        daysOwned
        dividends
        numberHeld
        percentageWeight
        price
        purchasePrice
        ticker
        name
        date
        stock {
          date
          latestPrice
        }
      }
    }
  }
`

export const CASH_PERCENT = gql`
  query CASH_PERCENT($planName: String) {
    portfolioHoldingsList(filter: { ticker: { equals: "CASH" }, plan: { planID: { equals: $planName } } }) {
      items {
        percentageWeight
      }
    }
  }
`
