import React from 'react'
import PortfolioHoldings from './index'
import { PORTFOLIO_HOLDINGS } from '~/common/queries'
import { PORTFOLIO_HOLDINGS_MOCK } from 'src/tests/mocks'

export default {
  title: 'dashboard/portfolio/holdings',
  component: PortfolioHoldings,
  parameters: {
    layout: 'centered',
    padding: 32,
  },
}

export const holdings = () => <PortfolioHoldings />

holdings.parameters = {
  apolloClient: {
    mocks: [
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
