import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { USER_SIGNUP } from '~/common/queries'
import { USER_SIGNUP_MOCK } from 'src/tests/mocks'
import LoginModal from './index'
import SignupForm from './SignupForm'

export default {
  title: 'landing_page/modals/signup',
  parameters: {
    layout: 'centered',
  },
}

const mocks = [
  {
    request: {
      query: USER_SIGNUP,
    },
    result: {
      data: USER_SIGNUP_MOCK,
    },
  },
]

export const signup_modal = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <LoginModal onClose={() => {}} isVisible />
  </MockedProvider>
)

export const signup_form = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <SignupForm onSubmit={console.log} />
  </MockedProvider>
)
