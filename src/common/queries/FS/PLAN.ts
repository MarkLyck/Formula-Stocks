import { gql } from '@apollo/client'

export const LAUNCH_PERFORMANCE_HISTORY = gql`
  query {
    plan(planID: "business") {
      launchHistory
    }
  }
`

export const BACKTESTED_PERFORMANCE_HISTORY = gql`
  query {
    plan(planID: "business") {
      backtestedHistory
    }
  }
`