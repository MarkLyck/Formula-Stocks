import React from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { PORTFOLIO_HOLDINGS } from '~/common/queries'
import { Table } from 'antd'
import columns, { HoldingType } from './Columns'

const Container = styled.div`
  border-radius: 4px;
`

const Holdings = () => {
  const { data, loading } = useQuery(PORTFOLIO_HOLDINGS, {
    variables: { planName: 'entry' },
  })

  const holdings: HoldingType[] = data?.portfolioHoldingsList?.items || []

  return (
    <Container>
      <Table loading={loading} columns={columns} dataSource={holdings} pagination={false} rowKey="ticker" />
    </Container>
  )
}

export default Holdings
