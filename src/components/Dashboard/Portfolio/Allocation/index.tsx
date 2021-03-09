import React from 'react'
import { useQuery } from '@apollo/client'

import { PORTFOLIO_HOLDINGS } from 'src/common/queries'
import { DonutChart } from 'src/ui-components'
import { useAtom, planAtom } from 'src/atoms'

const Allocation = () => {
  const [plan] = useAtom(planAtom)
  const { data, loading } = useQuery(PORTFOLIO_HOLDINGS, {
    variables: { planName: plan },
  })

  const stocks: any[] = data?.portfolioHoldingsList?.items || []
  const chartData = stocks
    .map((stock) => ({
      title: stock.ticker.replace('_', '.'),
      value: stock.percentageWeight,
    }))
    .sort((a, b) => b.value - a.value)

  return (
    <div style={{ height: 200 }}>
      {/* @ts-ignore */}
      <DonutChart data={chartData} isLoading={loading} />
    </div>
  )
}

export default Allocation
