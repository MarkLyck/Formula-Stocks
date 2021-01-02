import React from 'react'
import Features from './index'
import { MockedProvider } from '@apollo/client/testing'
import { STATISTICS, STATISTICS_SINCE_LAUNCH } from '~/common/queries'
import { STATISTICS_MOCK, STATISTICS_SINCE_LAUNCH_MOCK } from '~/../tests/mocks'

const mocks = [
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
  title: 'Landing page/features',
}

export const features = () => (
  <MockedProvider mocks={mocks}>
    <Features />
  </MockedProvider>
)