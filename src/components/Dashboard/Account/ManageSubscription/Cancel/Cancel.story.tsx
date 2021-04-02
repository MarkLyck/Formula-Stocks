import React from 'react'
import wait from 'waait'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import { withApolloProvider } from '~/../.storybook/decorators/withApollo'
import styled from '@emotion/styled'
import { subscriptionMock, subscriptionCanceledMock, subscriptionCancelingMock, userMock } from '~/../tests/mocks'
import Cancel from './index'
import CancelModal from './Modal/index'
import CancelDiscountSuccess from './Modal/DiscountSuccess'
import Error from './Modal/Error'

import { CANCEL_SUBSCRIPTION, UPDATE_SUBSCRIPTION } from '~/common/queries'

const Container = styled.div`
  margin: 32px;
  max-width: 600px;
`

let cancelSubscriptionResponse: Promise<any> = Promise.resolve({
  data: {
    CANCEL_SUBSCRIPTION: {
      subscription: subscriptionMock,
    },
  },
  errors: [],
})
let updateSubscriptionResponse: Promise<any> = Promise.resolve({
  data: {
    UPDATE_SUBSCRIPTION: {
      success: true,
    },
  },
  errors: [],
})

const requestMockHandlers = {
  queries: [],
  mutations: [
    {
      type: CANCEL_SUBSCRIPTION,
      handler: async () => {
        await wait(1000)
        return cancelSubscriptionResponse
      },
    },
    {
      type: UPDATE_SUBSCRIPTION,
      handler: async () => {
        await wait(1000)
        return updateSubscriptionResponse
      },
    },
  ],
}

export default {
  title: 'dashboard/account/subscription/cancel',
  decorators: [withKnobs, withApolloProvider({ requestMockHandlers })],
}

export const cancel = () => {
  const options = {
    active: subscriptionMock,
    canceling: subscriptionCancelingMock,
    canceled: subscriptionCanceledMock,
    failed: null,
  }

  const defaultValue = subscriptionMock
  const subscription = select('subscription type', options, defaultValue, 'GROUP-ID1')

  return (
    <Container>
      <Cancel subscription={subscription} updateUser={() => {}} user={userMock} />
    </Container>
  )
}

export const cancel_modal = () => {
  const responseSuccess = boolean('cancel success', true)
  const discountSuccess = boolean('discount success', true)

  if (!responseSuccess) {
    cancelSubscriptionResponse = Promise.resolve({
      data: null,
      errors: [{ code: 0, title: 'Something went wrong' }],
    })
  }

  if (!discountSuccess) {
    updateSubscriptionResponse = Promise.resolve({
      data: null,
      errors: [{ code: 0, title: 'Something went wrong' }],
    })
  }

  return (
    <Container>
      <CancelModal
        open
        onModalDismiss={() => console.info('dismiss')}
        subscription={subscriptionMock}
        // @ts-ignore
        updateUser={() => {}}
        user={userMock}
      />
    </Container>
  )
}

export const discount_success_page = () => {
  return (
    <Container>
      <CancelDiscountSuccess onModalDismiss={() => console.info('dismiss')} />
    </Container>
  )
}
export const error_page = () => {
  return (
    <Container>
      <Error onModalDismiss={() => console.info('dismiss')} />
    </Container>
  )
}
