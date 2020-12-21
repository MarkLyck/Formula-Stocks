import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { STATISTICS } from '~/common/queries'
import { STATISTICS_MOCK } from '~/../tests/mocks'
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


export const statistics = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <Statistics />
  </MockedProvider>
)