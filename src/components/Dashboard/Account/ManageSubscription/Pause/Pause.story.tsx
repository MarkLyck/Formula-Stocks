import React from 'react'
import wait from 'waait'
import { withApolloProvider } from '~/../.storybook/decorators/withApollo'
import styled from '@emotion/styled'
import { UPDATE_SUBSCRIPTION } from '~/common/queries'
import { subscriptionMock, userMock } from '~/../tests/mocks'
import Pause, { PauseSubscriptionType } from './index'
import PauseSuccess, { PauseSuccessType } from './Success'

const Container = styled.div`
  margin: 32px;
  svg {
    margin-right: 8px;
  }
`

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
      type: UPDATE_SUBSCRIPTION,
      handler: async () => {
        await wait(1000)
        return updateSubscriptionResponse
      },
    },
  ],
}

export default {
  title: 'dashboard/account/subscription/pause',
  decorators: [withApolloProvider({ requestMockHandlers })],
  component: Pause,
}

export const pause = (args: PauseSubscriptionType) => (
  <Container>
    <Pause {...args} />
  </Container>
)
pause.args = {
  subscription: subscriptionMock,
  user: userMock,
}

export const success = (args: PauseSuccessType) => (
  <Container>
    <PauseSuccess {...args} />
  </Container>
)

success.args = {
  date: new Date(1994, 1, 17),
}
