import React from 'react'
import { STATISTICS } from '~/common/queries'
import { STATISTICS_MOCK } from 'src/tests/mocks'
import Statistics from './index'

export default {
  title: 'landing_page/statistics',
  component: Statistics,
}

const mocks = [
  {
    request: {
      query: STATISTICS,
    },
    result: {
      data: STATISTICS_MOCK,
    },
  },
]

export const statistics = () => <Statistics />
statistics.parameters = {
  apolloClient: {
    mocks,
  },
}
