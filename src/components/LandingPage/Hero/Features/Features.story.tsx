import React from 'react'
import Features from './index'
import { STATISTICS, STATISTICS_SINCE_LAUNCH } from 'src/common/queries'
import { STATISTICS_MOCK, STATISTICS_SINCE_LAUNCH_MOCK } from 'src/tests/mocks'

export default {
  title: 'Landing page/features',
}

export const features = () => <Features />

features.parameters = {
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
