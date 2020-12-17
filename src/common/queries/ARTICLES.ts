import { gql } from '@apollo/client'

export const ALL_ARTICLES_QUERY = gql`
  query ALL_ARTICLES_QUERY {
    articlesList {
      items {
        title
        author
        id
      }
    }
  }
`
export const ARTICLE_BY_TITLE = gql`
  query ARTICLE_BY_TITLE($title: String!) {
    article(title: $title) {
      title
      author
      body
    }
  }
`

export const CREATE_ARTICLE = gql`
  mutation articleCreate($title: String!, $body: JSON!) {
    articleCreate(data: { title: $title, body: $body }) {
      id
    }
  }
`
