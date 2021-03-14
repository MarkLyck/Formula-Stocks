import React from 'react'
import ReportsPage from 'src/pages/dashboard/reports'
import { CURRENT_USER_QUERY, SEARCH_REPORTS_QUERY } from 'src/common/queries'
import { USER_MOCK, SEARCH_REPORTS_QUERY_MOCK } from 'src/tests/mocks'

export default {
  title: 'pages/dashboard/reports',
}

export const reports = () => <ReportsPage />

reports.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: CURRENT_USER_QUERY,
        },
        result: {
          data: USER_MOCK,
        },
      },
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
