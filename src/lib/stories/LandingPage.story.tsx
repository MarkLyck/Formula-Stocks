import React from 'react'
import LandingPage from '../../pages'
import {
  LATEST_SELL_SIGNALS,
  LAUNCH_PERFORMANCE_HISTORY,
  BACKTESTED_PERFORMANCE_HISTORY,
  MARKET_PRICE_HISTORY,
  STATISTICS,
  STATISTICS_SINCE_LAUNCH,
} from 'src/common/queries'
import {
  latestSellSignalsMock,
  LAUNCH_PERFORMANCE_HISTORY_MOCK,
  MARKET_PRICE_HISTORY_MOCK,
  STATISTICS_MOCK,
  STATISTICS_SINCE_LAUNCH_MOCK,
} from 'src/tests/mocks'

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
      },
    },
    result: {
      data: MARKET_PRICE_HISTORY_MOCK,
    },
  },
  {
    request: {
      query: LATEST_SELL_SIGNALS,
    },
    result: {
      data: latestSellSignalsMock,
    },
  },
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
  title: 'pages/LandingPage',
}

export const landing_page = () => <LandingPage />
landing_page.parameters = {
  apolloClient: {
    mocks,
  },
}
