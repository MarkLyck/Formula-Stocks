import React from 'react'
import { USER_SIGNUP } from 'src/common/queries'
import { USER_SIGNUP_MOCK } from 'src/tests/mocks'
import LoginModal from './index'
import SignupForm from '.'

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

export const signup_modal = () => <LoginModal onClose={() => {}} isVisible />

signup_modal.parameters = {
  apolloClient: {
    mocks,
  },
}

export const signup_form = () => <SignupForm onSubmit={console.log} />

signup_form.parameters = {
  apolloClient: {
    mocks,
  },
}
