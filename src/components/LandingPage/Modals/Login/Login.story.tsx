import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { USER_LOGIN } from '~/common/queries'
import { USER_LOGIN_MOCK } from '~/../tests/mocks'
import Login from './index'
// import ResetPassword from './ResetPassword'

export default {
  title: 'landing_page/modals/login',
}

const mocks = [
  {
    request: {
      query: USER_LOGIN,
    },
    result: {
      data: USER_LOGIN_MOCK,
    },
  },
]


export const login_modal = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <Login onClose={() => { }} isVisible />
  </MockedProvider>
)

// export const reset_password = () => {
//   return (
//     <Container>
//       <ResetPassword backToLogin={() => { }} />
//     </Container>
//   )
// }
