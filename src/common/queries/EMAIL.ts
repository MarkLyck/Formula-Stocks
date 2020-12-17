import { gql } from '@apollo/client'

export const GET_NEWSLETTER = gql`
  query newsletter($email: String!) {
    newsletter(email: $email) {
      id
      lists
    }
  }
`

export const CREATE_NEWSLETTER = gql`
  mutation newsletterCreate($email: String!, $firstName: String, $lists: [String]) {
    newsletterCreate(data: { email: $email, firstName: $firstName, lists: $lists }) {
      id
    }
  }
`

export const UPDATE_NEWSLETTER = gql`
  mutation newsletterUpdate($id: ID!, $lists: [String]) {
    newsletterUpdate(data: { id: $id, lists: $lists }) {
      id
    }
  }
`

export const ABANDONED_CART = gql`
  query ABANDONED_CART($email: String!) {
    ABANDONED_CART(email: $email) {
      success
    }
  }
`
