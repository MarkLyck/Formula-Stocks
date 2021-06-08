import { gql } from '@apollo/client'

export const FMP = gql`
  query FMP($endpoint: String!) {
    FMP(endpoint: $endpoint) {
      response
    }
  }
`
