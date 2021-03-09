import React from 'react'
import { useQuery } from '@apollo/client'
import { List, Row } from 'antd'
import { useAtom, planAtom } from 'src/atoms'
import { TRADES_QUERY } from 'src/common/queries'
import Trade from './Trade'

const Trades = () => {
  const [plan] = useAtom(planAtom)

  const { data, loading, error } = useQuery(TRADES_QUERY, {
    variables: {
      planName: plan,
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
