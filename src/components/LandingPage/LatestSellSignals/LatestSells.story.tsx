import React from 'react'
import LatestSells from './index'
import { LATEST_SELL_SIGNALS } from 'src/common/queries'
import { latestSellSignalsMock } from 'src/tests/mocks'

export default {
  title: 'Landing page/latest sells',
  component: LatestSells,
}

export const latest_sells = () => <LatestSells />

latest_sells.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: LATEST_SELL_SIGNALS,
        },
        result: {
          data: latestSellSignalsMock,
        },
      },
    ],
  },
}
