import React from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { Table } from 'antd'

import { LoadingError } from 'src/ui-components'
import { useAtom, planAtom } from 'src/atoms'
import { PORTFOLIO_HOLDINGS } from 'src/common/queries'
import columns, { HoldingType } from './Columns'

const Container = styled.div`
  border-radius: 4px;
`

const Holdings = () => {
  const [plan] = useAtom(planAtom)

  const { data, loading, error } = useQuery(PORTFOLIO_HOLDINGS, {
    variables: { planName: plan },
  })
  if (error) return <LoadingError error={error} />

  const holdings: HoldingType[] = data?.portfolioHoldingsList?.items || []

  return (
    <Container>
      <Table loading={loading} columns={columns} dataSource={holdings} pagination={false} rowKey="ticker" />
    </Container>
  )
}

export default Holdings
