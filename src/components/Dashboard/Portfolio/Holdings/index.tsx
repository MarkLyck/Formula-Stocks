import React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { Table } from 'antd'

import { LoadingError } from 'src/ui-components'
import useStore from 'src/lib/useStore'
import { PORTFOLIO_HOLDINGS } from 'src/common/queries'
import columns, { HoldingType } from './Columns'

const Container = styled.div`
  border-radius: 4px;
`

const Holdings = () => {
  const router = useRouter()
  const plan = useStore((state: any) => state.plan)

  const { data, loading, error } = useQuery(PORTFOLIO_HOLDINGS, {
    variables: { planName: plan },
  })
  if (error) return <LoadingError error={error} />

  const holdings: HoldingType[] = data?.portfolioHoldingsList?.items || []

  return (
    <Container>
      <Table
        loading={loading}
        columns={columns}
        dataSource={holdings}
        pagination={false}
        rowKey="ticker"
        onRow={(record) => ({
          onClick: () => router.push(`/dashboard/reports/${record.ticker.replace('_', '.')}`),
        })}
      />
    </Container>
  )
}

export default Holdings
