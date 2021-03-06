import { useQuery } from '@apollo/client'

import { FMP } from 'src/common/queries'
import { CheckCard, LoadingCard } from './CheckCard'

import { calculateGrowthRateByYear } from '../Growth/utils/growthRates'

type CheckProps = {
  symbol: string
}

export const SalesCheck = ({ symbol }: CheckProps) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=10`,
    },
  })

  if (loading) return <LoadingCard />
  if (!data?.FMP.response || data?.FMP.response.length === 0) return null

  const keyMetrics = data?.FMP.response.slice().reverse()
  const revenueByYear = keyMetrics.map((metric: any) => metric.revenue)
  const latestBVPS = revenueByYear[revenueByYear.length - 1]
  const hasPositiveGrowth = revenueByYear[0] < latestBVPS
  const { growthRate9Years } = calculateGrowthRateByYear(revenueByYear)

  // don't show if data is invalid.
  if (latestBVPS === 0) return null

  let isConsistentlyGrowing = true

  revenueByYear.forEach((value: number, i: number) => {
    if (i === 0) return
    if (value < revenueByYear[i - 1]) {
      isConsistentlyGrowing = false
    }
  })

  let description = ''
  let sentiment = 'neutral'

  if (hasPositiveGrowth) {
    if (isConsistentlyGrowing) {
      description = 'Consistently growing YoY'
      sentiment = 'success'
      if (growthRate9Years && growthRate9Years >= 10) {
        description = `Consistently growing YoY with a ${growthRate9Years.toFixed(2)}% growth rate`
      }
      if (growthRate9Years && growthRate9Years < 10) {
        description = `Consistently growing YoY with a ${growthRate9Years.toFixed(2)}% growth rate`
        sentiment = 'neutral'
      }
    }
    if (!isConsistentlyGrowing) {
      if (growthRate9Years && growthRate9Years >= 10) {
        description = `+${growthRate9Years.toFixed(2)}% growth rate (inconsistent)`
        sentiment = 'success'
      } else if (growthRate9Years && growthRate9Years < 10) {
        description = `+${growthRate9Years.toFixed(2)}% growth rate (inconsistent)`
        sentiment = 'warning'
      }
    }
  } else {
    description = `${growthRate9Years && growthRate9Years.toFixed(2)}% and declining`
    sentiment = 'danger'
  }

  if (!description) return null

  return (
    <CheckCard
      icon={['fad', hasPositiveGrowth ? 'chart-line' : 'chart-line-down']}
      title="Revenue Growth"
      description={description}
      // @ts-ignore
      sentiment={sentiment}
    ></CheckCard>
  )
}
