import { gql } from '@apollo/client'

export const LAUNCH_PERFORMANCE_HISTORY = gql`
  query($plan: String) {
    plan(planID: $plan) {
      launchHistory
    }
  }
`

export const BACKTESTED_PERFORMANCE_HISTORY = gql`
  query($plan: String) {
    plan(planID: $plan) {
      backtestedHistory
    }
  }
`
