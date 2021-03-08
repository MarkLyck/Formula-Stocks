import React from 'react'
import { useQuery } from '@apollo/client'
import { List, Row } from 'antd'
import { TRADES_QUERY } from 'src/common/queries'
import Trade from './Trade'

const Trades = () => {
  const { data, loading, error } = useQuery(TRADES_QUERY, {
    variables: {
      planName: 'entry',
    },
  })

  if (error) return 'error'

  return (
    <Row gutter={16}>
      {data?.signalsList.items.map((trade: any) => (
        <Trade trade={trade} key={trade.ticker + trade.action} />
      ))}
    </Row>
  )

  return (
    <List loading={loading} grid={{ gutter: 16, column: 3 }} dataSource={data?.signalsList?.items} renderItem={Trade} />
  )
}

export default Trades
