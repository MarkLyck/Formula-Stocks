import React from 'react'
import Reports from './index'
import { SEARCH_REPORTS_QUERY } from 'src/common/queries'
import { SEARCH_REPORTS_QUERY_MOCK } from 'src/tests/mocks'

export default {
  title: 'dashboard/reports',
}

export const HappyPath = () => <Reports />

HappyPath.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: SEARCH_REPORTS_QUERY,
          variables: {
            search: '',
          },
        },
        result: {
          data: SEARCH_REPORTS_QUERY_MOCK,
        },
      },
    ],
  },
}
