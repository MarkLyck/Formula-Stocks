import React from 'react'
import { STATISTICS } from '~/common/queries'
import { STATISTICS_MOCK } from 'src/tests/mocks'
import ReturnsCalculatorModal from './index'

export default {
  title: 'landing_page/modals',
  parameters: {
    layout: 'centered',
  },
}

export const returns_calculator = () => <ReturnsCalculatorModal isVisible onClose={() => {}} />

returns_calculator.parameters = {
  // disables Chromatic on a story level
  chromatic: { disable: true },
  apolloClient: {
    mocks: [
      {
        request: {
          query: STATISTICS,
        },
        result: {
          data: STATISTICS_MOCK,
        },
      },
    ],
  },
}
