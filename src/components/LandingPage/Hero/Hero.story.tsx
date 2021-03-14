import React from 'react'
import Hero from './index'
import { STATISTICS, STATISTICS_SINCE_LAUNCH } from 'src/common/queries'
import { STATISTICS_MOCK, STATISTICS_SINCE_LAUNCH_MOCK } from 'src/tests/mocks'

export default {
  title: 'Landing page/hero',
}

export const hero = () => <Hero showSignup={() => {}} />

hero.parameters = {
  chromatic: { disable: true },
  apolloClient: {
    mocks: [
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
    ],
  },
}
