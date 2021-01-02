import React from 'react'
import Hero from './index'
import { MockedProvider } from '@apollo/client/testing'
import { STATISTICS, STATISTICS_SINCE_LAUNCH } from '~/common/queries'
import { STATISTICS_MOCK, STATISTICS_SINCE_LAUNCH_MOCK } from '~/../tests/mocks'

const mocks = [
  {
    request: {
      query: STATISTICS,
    },
    result: {
      data: STATISTICS_MOCK,
    },
  },
  {
    request: {
      query: STATISTICS_SINCE_LAUNCH,
    },
    result: {
      data: STATISTICS_SINCE_LAUNCH_MOCK,
    },
  },
]


export default {
  title: 'Landing page/hero',
}

export const hero = () => (
  <MockedProvider mocks={mocks}>
    <Hero showSignup={() => { }} />
  </MockedProvider>
)


hero.story = {
  parameters: {
    chromatic: { disable: true },
  },
}
