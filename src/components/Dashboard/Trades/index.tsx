import React from 'react'
import { useQuery } from '@apollo/client'
import { Row, Spin } from 'antd'
import { useAtom, planAtom } from 'src/atoms'
import { TRADES_QUERY } from 'src/common/queries'
import { LoadingError } from 'src/ui-components'
import Trade from './Trade'

const Trades = () => {
  const [plan] = useAtom(planAtom)

  const { data, loading, error } = useQuery(TRADES_QUERY, {
    variables: {
      planName: plan,
    },
  })

  if (loading) return <Spin />
  if (error) return <LoadingError error={error} />

  return (
    <Row gutter={16}>
      {data?.signalsList.items.map((trade: any) => (
        <Trade trade={trade} key={trade.ticker + trade.action} />
      ))}
    </Row>
  )
}

export default Trades
