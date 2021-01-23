import React from 'react'
import LatestSells from './index'
import { MockedProvider } from '@apollo/client/testing'
import { LATEST_SELL_SIGNALS } from '~/common/queries'
import { latestSellSignalsMock } from 'src/tests/mocks'

const mocks = [
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
  title: 'Landing page/latest sells',
  component: LatestSells,
}

export const latest_sells = () => (
  <MockedProvider mocks={mocks}>
    <LatestSells />
  </MockedProvider>
)
