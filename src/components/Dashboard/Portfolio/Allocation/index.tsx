import React from 'react'
import { useQuery } from '@apollo/client'
import { Card } from 'antd'

import { PORTFOLIO_HOLDINGS } from 'src/common/queries'
import { BulletAllocationChart, LoadingError } from 'src/ui-components'
import useStore from 'src/lib/useStore'

const Allocation = () => {
  const plan = useStore((state: any) => state.plan)
  const { data, loading, error } = useQuery(PORTFOLIO_HOLDINGS, {
    variables: { planName: plan },
  })

  if (error) return <LoadingError error={error} />

  const stocks: any[] = data?.portfolioHoldingsList?.items || []

  const chartData = stocks
    .map((stock) => ({
      title: stock.ticker.replace('_', '.'),
      value: stock.percentageWeight,
    }))
    .sort((a, b) => b.value - a.value)

  return (
    <Card style={{ width: '100%', marginTop: 32 }}>
      <BulletAllocationChart data={chartData} isLoading={loading} />
    </Card>
  )
}

export default Allocation
