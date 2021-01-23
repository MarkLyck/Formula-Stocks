import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { STATISTICS } from '~/common/queries'
import { STATISTICS_MOCK } from '~/../tests/mocks'
import ReturnsCalculatorModal from './index'

export default {
  title: 'landing_page/modals',
  parameters: {
    layout: 'centered'
  }
}

const mocks = [
  {
    request: {
      query: STATISTICS,
    },
    result: {
      data: STATISTICS_MOCK,
    },
  },
]


export const returns_calculator = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <ReturnsCalculatorModal isVisible onClose={() => { }} />
  </MockedProvider>
)