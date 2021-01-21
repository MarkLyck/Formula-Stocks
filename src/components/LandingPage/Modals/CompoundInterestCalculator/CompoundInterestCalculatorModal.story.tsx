import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { STATISTICS } from 'src/common/queries'
import { STATISTICS_MOCK } from 'src/../tests/mocks'
import CompoundInterestCalculatorModal from './index'

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


export const compound_interest_calculator = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <CompoundInterestCalculatorModal isVisible onClose={() => { }} />
  </MockedProvider>
)