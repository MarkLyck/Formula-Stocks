import { gql } from '@apollo/client'

import { AUTH_PROFILE_ID } from '~/common/constants'

export const USER_SIGNUP = gql`
  mutation userSignUpWithPassword(
    $email: String!
    $billingInterval: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $coupon: String
    $stripeToken: JSON!
  ) {
    userSignUpWithPassword(
      authProfileId: "${AUTH_PROFILE_ID}"
      password: $password
      user: {
        email: $email
        billingInterval: $billingInterval
        firstName: $firstName
        lastName: $lastName
        coupon: $coupon
        stripe: { create: { token: $stripeToken } }
      }
    ) {
      id
    }
  }
`

// export const USER_SIGNUP_MANUAL = gql`
//   mutation userSignUpWithPassword(
//     $email: String!
//     $password: String!
//   ) {
//     userSignUpWithPassword(
//       authProfileId: "${AUTH_PROFILE_ID}"
//       password: $password
//       user: {
//         email: $email
//       }
//     ) {
//       id
//     }
//   }
// `

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(data: { email: $email, password: $password, authProfileId: "${AUTH_PROFILE_ID}" }) {
      success
      auth {
        idToken
        refreshToken
      }
    }
  }
`

export const CURRENT_USER_QUERY = gql`
  query {
    user {
      id
      createdAt
      email
      lastName
      firstName
      intros
      type
      phoneNumber
      stripe {
        subscription
        customer
        customerID
      }
    }
  }
`

export const USER_UPDATE = gql`
  mutation userUpdate($id: ID!, $cancelReason: String) {
    userUpdate(data: { id: $id, cancelReason: $cancelReason }) {
      id
      email
      cancelReason
    }
  }
`

export const USER_UPDATE_PHONE_NUMBER = gql`
  mutation userUpdate($id: ID!, $phoneNumber: String) {
    userUpdate(data: { id: $id, phoneNumber: $phoneNumber }) {
      id
      phoneNumber
    }
  }
`

export const SET_INTROS = gql`
  mutation userUpdate($id: ID!, $intros: JSON) {
    userUpdate(data: { id: $id, intros: $intros }) {
      id
      intros
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation userRefreshToken($email: String, $refreshToken: String!, $authProfileId: ID) {
    userRefreshToken(data: { email: $email, refreshToken: $refreshToken, authProfileId: $authProfileId }) {
      idToken
      refreshToken
    }
  }
`
