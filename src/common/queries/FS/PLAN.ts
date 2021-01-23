import { gql } from '@apollo/client'

export const LAUNCH_PERFORMANCE_HISTORY = gql`
  query {
    plan(planID: "entry") {
      launchHistory
    }
  }
`

export const BACKTESTED_PERFORMANCE_HISTORY = gql`
  query {
    plan(planID: "entry") {
      backtestedHistory
    }
  }
`
