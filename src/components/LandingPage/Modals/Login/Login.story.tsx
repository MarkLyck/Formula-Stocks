import React from 'react'
import { USER_LOGIN } from '~/common/queries'
import { USER_SIGNUP_MOCK } from '~/tests/mocks'
import LoginModal from './index'
import LoginForm from './LoginForm'

export default {
  title: 'landing_page/modals/login',
  parameters: {
    layout: 'centered',
  },
}

const mocks = [
  {
    request: {
      query: USER_LOGIN,
    },
    result: {
      data: USER_SIGNUP_MOCK,
    },
  },
]

export const login_modal = () => <LoginModal onClose={() => {}} isVisible />
login_modal.parameters = {
  apolloClient: {
    mocks,
  },
}

export const login_form = () => <LoginForm />
login_form.parameters = {
  apolloClient: {
    mocks,
  },
}
