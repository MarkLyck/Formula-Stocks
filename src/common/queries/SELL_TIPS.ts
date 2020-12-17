import { gql } from '@apollo/client'

export const CREATE_SELL_TIP = gql`
  mutation CREATE_STOCKTIP(
    $ticker: String!
    $name: String!
    $buySignalID: ID
    $price: Float!
    $boughtAtPrice: Float!
    $date: DateTime
  ) {
    sellTipCreate(
      data: {
        ticker: $ticker
        name: $name
        price: $price
        boughtAtPrice: $boughtAtPrice
        date: $date
        action: "SELL"
        buyTips: { connect: { id: $buySignalID } }
      }
    ) {
      id
      ticker
      name
      price
      action
    }
  }
`
