import React from 'react'
import { useQuery } from '@apollo/client'
import { PORTFOLIO_HOLDINGS } from '~/common/queries'
import { DonutChart } from 'src/ui-components'

const Allocation = () => {
  const { data, loading } = useQuery(PORTFOLIO_HOLDINGS, {
    variables: { planName: 'entry' },
  })

  const stocks: any[] = data?.portfolioHoldingsList?.items || []
  const chartData = stocks.map((stock) => ({
    title: stock.ticker,
    value: stock.percentageWeight,
  }))

  return (
    <div style={{ height: 200 }}>
      {/* @ts-ignore */}
      <DonutChart data={chartData} isLoading={loading} />
    </div>
  )
}

export default Allocation
