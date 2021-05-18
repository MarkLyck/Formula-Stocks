import React from 'react'
import Performance from './index'
import { LAUNCH_PERFORMANCE_HISTORY, BACKTESTED_PERFORMANCE_HISTORY, MARKET_PRICE_HISTORY } from 'src/common/queries'
import {
  LAUNCH_PERFORMANCE_HISTORY_MOCK,
  MARKET_PRICE_HISTORY_MOCK,
  BACKTESTED_HISTORY_MOCK,
  MARKET_PRICES_HISTORY_SINCE_1970,
} from 'src/tests/mocks'

export default {
  title: 'landing page/performance/chart',
  component: Performance,
}

export const performance = () => <Performance />

performance.parameters = {
  chromatic: { delay: 500 },
  apolloClient: {
    mocks: [
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
          data: BACKTESTED_HISTORY_MOCK,
        },
      },
      {
        request: {
          query: MARKET_PRICE_HISTORY,
          variables: {
            marketType: 'DJIA',
            fromDate: '2009-01-30',
          },
        },
        result: {
          data: MARKET_PRICE_HISTORY_MOCK,
        },
      },
      {
        request: {
          query: MARKET_PRICE_HISTORY,
          variables: {
            marketType: 'SP500',
            fromDate: '1970-01-30',
          },
        },
        result: {
          data: MARKET_PRICES_HISTORY_SINCE_1970,
        },
      },
    ],
  },
}
