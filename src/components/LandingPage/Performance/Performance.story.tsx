import React from 'react'
import Performance from './index'
import { MockedProvider } from '@apollo/client/testing'
import { LAUNCH_PERFORMANCE_HISTORY, BACKTESTED_PERFORMANCE_HISTORY, MARKET_PRICE_HISTORY } from '~/common/queries'
import { LAUNCH_PERFORMANCE_HISTORY_MOCK, MARKET_PRICE_HISTORY_MOCK } from 'src/tests/mocks'

const mocks = [
  {
    request: {
      query: LAUNCH_PERFORMANCE_HISTORY,
    },
    result: {
      data: LAUNCH_PERFORMANCE_HISTORY_MOCK,
    },
  },
  {
    request: {
      query: BACKTESTED_PERFORMANCE_HISTORY,
    },
    result: {
      data: [],
    },
  },
  {
    request: {
      query: MARKET_PRICE_HISTORY,
      variables: {
        marketType: 'DJIA',
        fromDate: '2009-01-30',
      }
    },
    result: {
      data: MARKET_PRICE_HISTORY_MOCK,
    },
  },
]


export default {
  title: 'landing page/performance/chart',
  component: Performance,
}

export const performance = () => (
  <MockedProvider mocks={mocks}>
    <Performance />
  </MockedProvider>
)
