import React from 'react'
import Newsletter from './index'
import { MockedProvider } from '@apollo/client/testing'
import { CREATE_NEWSLETTER } from 'src/common/queries'
// import { LAUNCH_PERFORMANCE_HISTORY_MOCK, MARKET_PRICE_HISTORY_MOCK } from 'src/../tests/mocks'


const mocks = [
  {
    request: {
      query: CREATE_NEWSLETTER,
    },
    result: {
      data: {}
    },
  },
]


export default {
  title: 'Landing page/newsletter',
  component: Newsletter,
  parameters: {
    layout: 'centered'
  }
}

export const newsletter = () => (
  <MockedProvider mocks={mocks}>
    <Newsletter />
  </MockedProvider>
)

const errorMocks = [
  {
    request: {
      query: CREATE_NEWSLETTER,
    },
    data: undefined,
    error: new Error('An error occurred'),
  },
]


export const newsletter_with_error = () => (
  <MockedProvider mocks={errorMocks}>
    <Newsletter />
  </MockedProvider>
)