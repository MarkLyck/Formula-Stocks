import React from 'react'
import { withKnobs, select } from '@storybook/addon-knobs'
// @ts-ignore
import { withApolloProvider } from '~/../.storybook/decorators/withApollo'
import styled from '@emotion/styled'
import { subscriptionMock, subscriptionCanceledMock, subscriptionCancelingMock, userMock } from '~/../tests/mocks'
import UpdatePaymentDetails from './index'

const Container = styled.div`
  margin: 32px;
  max-width: 600px;
`

const requestMockHandlers = {
  queries: [],
  mutations: [],
}

export default {
  title: 'dashboard/account/payment_details',
  decorators: [withKnobs, withApolloProvider({ requestMockHandlers })],
}

export const payment_details = () => {
  const options = {
    active: subscriptionMock,
    canceling: subscriptionCancelingMock,
    canceled: subscriptionCanceledMock,
  }

  const defaultValue = subscriptionMock
  // @ts-ignore
  const subscription = select('subscription type', options, defaultValue, 'GROUP-ID1')
  // @ts-ignore
  userMock.stripe.subscription = subscription

  return (
    <Container>
      <UpdatePaymentDetails customerID="cus_mock_id" />
    </Container>
  )
}
