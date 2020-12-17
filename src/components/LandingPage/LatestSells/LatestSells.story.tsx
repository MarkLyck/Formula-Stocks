import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import LatestSells from './index'
import { LATEST_SELL_SIGNALS } from '~/common/queries'
import { latestSellSignalsMock } from '~/../tests/mocks'

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
  title: 'Sales page/latest sells',
  component: LatestSells,
}

export const latest_sells = () => (
  <MockedProvider mocks={mocks}>
    <LatestSells />
  </MockedProvider>
)
