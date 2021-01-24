import React from 'react'
import Portfolio from '../../pages/dashboard/portfolio'
import { MockedProvider } from '@apollo/client/testing'
import {
  CURRENT_USER_QUERY,
  LATEST_SELL_SIGNALS,
  LAUNCH_PERFORMANCE_HISTORY,
  PORTFOLIO_HOLDINGS,
} from '~/common/queries'
import {
  USER_MOCK,
  latestSellSignalsMock,
  LAUNCH_PERFORMANCE_HISTORY_MOCK,
  PORTFOLIO_HOLDINGS_MOCK,
} from 'src/tests/mocks'

const mocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: USER_MOCK,
    },
  },
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
      query: PORTFOLIO_HOLDINGS,
      variables: {
        planName: 'entry',
      },
    },
    result: {
      data: PORTFOLIO_HOLDINGS_MOCK,
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
]

export default {
  title: 'pages/portfolio',
}

export const portfolio_page = () => (
  <MockedProvider mocks={mocks}>
    <Portfolio />
  </MockedProvider>
)
