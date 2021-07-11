import { gql } from '@apollo/client'

export const SEARCH_REPORTS_QUERY = gql`
  query SEARCH_REPORTS_QUERY($search: String) {
    aIReportsList(
      filter: { OR: [{ ticker: { contains: $search } }, { name: { contains: $search } }] }
      sort: { aIScore: DESC }
    ) {
      items {
        aIScore
        name
        price
        scores
        ticker
        sector
        industry
        date
      }
    }
  }
`

export const GET_REPORT_QUERY = gql`
  query GET_REPORT_QUERY($ticker: String) {
    aIReport(ticker: $ticker) {
      name
      ticker
      aIScore
      scores
      price
    }
  }
`
