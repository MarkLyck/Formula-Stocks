import { gql } from '@apollo/client'

export const ALERT = gql`
  query {
    alertsList(filter: { active: { equals: true } }) {
      items {
        id
        title
        message
      }
    }
  }
`
