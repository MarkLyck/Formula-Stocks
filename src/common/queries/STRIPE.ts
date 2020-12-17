import { gql } from '@apollo/client'

export const UPDATE_PAYMENT_DETAILS = gql`
  query UPDATE_PAYMENT_DETAILS($customerID: String!, $token: String!) {
    UPDATE_PAYMENT_DETAILS(customerID: $customerID, token: $token) {
      success
    }
  }
`

export const UPDATE_SUBSCRIPTION = gql`
  query UPDATE_SUBSCRIPTION($subscriptionID: String!, $coupon: String, $pause_collection: String) {
    UPDATE_SUBSCRIPTION(subscriptionID: $subscriptionID, coupon: $coupon, pause_collection: $pause_collection) {
      success
    }
  }
`

export const CANCEL_SUBSCRIPTION = gql`
  query CANCEL_SUBSCRIPTION($subscriptionID: String!, $cancel_at_period_end: Boolean!, $email: String!) {
    CANCEL_SUBSCRIPTION(subscriptionID: $subscriptionID, cancel_at_period_end: $cancel_at_period_end, email: $email) {
      subscription
    }
  }
`
