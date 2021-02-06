import React from 'react'
import Portfolio from './index'
import { LAUNCH_PERFORMANCE_HISTORY, PORTFOLIO_HOLDINGS } from '~/common/queries'
import { LAUNCH_PERFORMANCE_HISTORY_MOCK, PORTFOLIO_HOLDINGS_MOCK } from 'src/tests/mocks'

export default {
  title: 'dashboard/portfolio/portfolio',
}

export const portfolio = () => <Portfolio />

portfolio.parameters = {
  // disables Chromatic on a story level
  chromatic: { disable: true },
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
          query: PORTFOLIO_HOLDINGS,
          variables: {
            planName: 'entry',
          },
        },
        result: {
          data: PORTFOLIO_HOLDINGS_MOCK,
        },
      },
    ],
  },
}
