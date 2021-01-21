import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { USER_LOGIN } from 'src/common/queries'
import { USER_LOGIN_MOCK } from 'src/../tests/mocks'
import LoginModal from './index'
import LoginForm from './LoginForm'
// import ResetPassword from './ResetPassword'

export default {
  title: 'landing_page/modals/login',
  parameters: {
    layout: 'centered'
  }
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
    <LoginModal onClose={() => { }} isVisible />
  </MockedProvider>
)

export const login_form = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <LoginForm />
  </MockedProvider>
)

// export const reset_password = () => {
//   return (
//     <Container>
//       <ResetPassword backToLogin={() => { }} />
//     </Container>
//   )
// }
