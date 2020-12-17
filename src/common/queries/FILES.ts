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
    fileCreate(data: { fileId: $fileId, filename: $fileName, public: true }) {
      id
      downloadUrl
      shareUrl
      public
    }
  }
`

// export const GET_FILE = gql`
//   query GET_FILE {
//     filesList(first: 28, sort: { createdAt: DESC }) {
//       items {
//         filename
//         downloadUrl
//         createdAt
//       }
//     }
//   }
// `
