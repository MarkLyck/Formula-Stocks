import { gql } from '@apollo/client'

export const LATEST_STOCKTIP_QUERY = gql`
  query {
    stocktipsList(last: 1, filter: { action: { equals: "BUY" } }) {
      items {
        action
        name
        ticker
        price
        scores
        createdAt
        date
      }
    }
  }
`

export const GET_STOCKTIP_QUERY = gql`
  query stocktipsList($ticker: String!) {
    stocktipsList(last: 1, filter: { ticker: { equals: $ticker } }) {
      items {
        action
        name
        ticker
        price
        scores
        createdAt
        date
      }
    }
  }
`

export const GET_SELL_TIPS = gql`
  query sellTipsList($createdAt: DateTime!) {
    sellTipsList(filter: { createdAt: { gt: $createdAt } }) {
      items {
        id
        action
        name
        ticker
        price
        boughtAtPrice
        createdAt
        date
        buyTips {
          items {
            price
            createdAt
            date
          }
        }
      }
    }
  }
`

export const STOCKTIPS_COUNT = gql`
  query STOCKTIPS_COUNT($createdAt: DateTime!) {
    stocktipsList(filter: { createdAt: { gt: $createdAt } }) {
      count
    }
  }
`

export const ALL_STOCKTIPS_QUERY = gql`
  query ALL_STOCKTIPS_QUERY($createdAt: DateTime!) {
    stocktipsList(filter: { createdAt: { gt: $createdAt } }) {
      items {
        id
        action
        name
        ticker
        price
        createdAt
        date
        scores
        sellTip {
          date
          price
        }
      }
    }
  }
`

export const GET_BUY_SIGNALS = gql`
  query GET_BUY_SIGNALS($ticker: String!) {
    stocktipsList(filter: { ticker: { equals: $ticker } }) {
      items {
        id
        price
        createdAt
        date
      }
    }
  }
`

export const CREATE_STOCKTIP = gql`
  mutation CREATE_STOCKTIP($ticker: String!, $name: String!, $scores: JSON!, $price: Float!) {
    stocktipCreate(data: { ticker: $ticker, name: $name, price: $price, action: "BUY", scores: $scores }) {
      id
      ticker
      name
      price
      scores
      action
    }
  }
`

export const SEND_SIGNAL = gql`
  query SEND_SIGNAL_UPDATE($type: String!) {
    SEND_SIGNAL_UPDATE(type: $type) {
      success
    }
  }
`
