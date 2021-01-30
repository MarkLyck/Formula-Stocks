import React from 'react'
import { useQuery } from '@apollo/client'
import { PORTFOLIO_HOLDINGS } from '~/common/queries'
import { Table, Typography } from 'antd'
import columns, { HoldingType } from './Columns'

const { Title } = Typography

const Holdings = () => {
  const { data, loading } = useQuery(PORTFOLIO_HOLDINGS, {
    variables: { planName: 'entry' },
  })

  const holdings: HoldingType[] = data?.portfolioHoldingsList?.items || []

  return (
    <div>
      <Title level={4}>Portfolio</Title>
      <Table loading={loading} columns={columns} dataSource={holdings} pagination={false} />
    </div>
  )
}

export default Holdings
