import { gql } from '@apollo/client'

export const STOCK_QUERY = gql`
  query stock($ticker: String!) {
    stock(ticker: $ticker) {
      date
      latestPrice
      ticker
      sixMonthsPrices
      quote
      logo
    }
  }
`

export const STOCK_ALL_TIME_QUERY = gql`
  query stock($ticker: String!) {
    stock(ticker: $ticker) {
      date
      latestPrice
      historicPrices
      quote
      logo
      articles(first: 10, sort: { dateTime: DESC }) {
        items {
          dateTime
          headline
          summary
          source
          url
          image
        }
      }
      dividends {
        items {
          exDate
          paymentDate
          amount
          frequency
        }
      }
    }
  }
`

export const STOCK_ABOUT_QUERY = gql`
  query stock($ticker: String!) {
    stock(ticker: $ticker) {
      info
      logo
    }
  }
`

export const STOCK_ARTICLES_QUERY = gql`
  query stock($ticker: String!) {
    stock(ticker: $ticker) {
      articles(first: 10) {
        items {
          dateTime
          headline
          summary
          source
          url
          image
        }
      }
    }
  }
`

export const STOCK_STATS_QUERY = gql`
  query stock($ticker: String!) {
    stock(ticker: $ticker) {
      quote
      advancedStats
    }
  }
`

export const STOCK_FINANCIALS_QUERY = gql`
  query stock($ticker: String!) {
    stock(ticker: $ticker) {
      cashFlow
      balanceSheet
    }
  }
`

export const STOCK_LIST_QUERY = gql`
  query stocksList($tickers: [String!]!) {
    stocksList(filter: { ticker: { in: $tickers } }) {
      items {
        date
        latestPrice
        ticker
        logo
        dividends {
          items {
            exDate
            paymentDate
            amount
            frequency
          }
        }
      }
    }
  }
`

export const ALL_STOCKS_QUERY = gql`
  query stocksList {
    stocksList {
      items {
        latestPrice
        ticker
        info
      }
    }
  }
`

export const STOCK_SUBSCRIPTION = gql`
  subscription STOCK_SUBSCRIPTION($ticker: String!) {
    Stocks(filter: { node: { ticker: { equals: $ticker } } }) {
      node {
        latestPrice
        quote
      }
    }
  }
`
