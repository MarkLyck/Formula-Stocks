import React from 'react'
import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { TRADES_QUERY } from 'src/common/queries'
import Trade from './Trade'

const Trades = () => {
  const { data, loading, error } = useQuery(TRADES_QUERY, {
    variables: {
      planName: 'entry',
    },
  })

  if (error) return 'error'

  console.log('🚀 ~ file: index.tsx ~ line 8 ~ Trades ~ data', data)

  return (
    <List loading={loading} grid={{ gutter: 16, column: 1 }} dataSource={data?.signalsList?.items} renderItem={Trade} />
  )
}

export default Trades
