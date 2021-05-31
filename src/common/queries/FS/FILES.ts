import { gql } from '@apollo/client'

export const FILE_STACK_INFO = gql`
  query {
    fileUploadInfo {
      policy
      signature
      apiKey
      path
    }
  }
`

export const FILE_CREATE_MUTATION = gql`
  mutation fileCreate($fileId: String!, $fileName: String) {
    fileCreate(data: { fileId: $fileId, filename: $fileName }) {
      id
    }
  }
`

export const LATEST_FILES = gql`
  query LATEST_FILES {
    filesList(first: 28, sort: { createdAt: DESC }, filter: { filename: { is_not_empty: true } }) {
      items {
        filename
        downloadUrl
        createdAt
      }
    }
  }
`
