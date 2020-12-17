import { gql } from '@apollo/client'

export const SEARCH_REPORTS_QUERY = gql`
  query report($searchTerm: String) {
    aIReportsList(
      filter: { OR: [{ ticker: { contains: $searchTerm } }, { name: { contains: $searchTerm } }] }
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
  query report($ticker: String) {
    aIReport(ticker: $ticker) {
      aIScore
      scores
      price
    }
  }
`
