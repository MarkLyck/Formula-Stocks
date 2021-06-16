import { useQuery } from '@apollo/client'
import { mean } from 'lodash'
import { FMP } from 'src/common/queries'
import { CheckCard, LoadingCard, CheckTag } from './CheckCard'

import { calculateGrowthRateByYear } from '../Growth/utils/growthRates'

type CheckProps = {
  symbol: string
}

export const EquityCheck = ({ symbol }: CheckProps) => {
  const { data, loading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=10`,
    },
  })

  if (loading) return <LoadingCard />
  if (!data?.FMP.response || data?.FMP.response.length === 0) return null

  const keyMetrics = data?.FMP.response.slice().reverse()
  const values = keyMetrics.map((metric: any) => metric.bookValuePerShare)
  const latestBVPS = values[values.length - 1]
  const { growthRates } = calculateGrowthRateByYear(values)

  const growthRateNumbers = growthRates.map((item: any) => item.growthRate)

  // don't show if data is invalid.
  if (latestBVPS === 0) return null

  const averageGrowthRate: number = mean(growthRateNumbers)
  const hasPositiveGrowth = averageGrowthRate > 0

  // TODO average growthRate

  // @ts-ignore
  let description = `${averageGrowthRate.toFixed(2)}%`
  let sentiment = 'neutral'

  if (hasPositiveGrowth) {
    sentiment = 'success'
  } else {
    sentiment = 'danger'
  }

  if (!description) return null

  const tags = []
  if (averageGrowthRate >= 10)
    tags.push(<CheckTag children="High Growth" color="success" icon={['fad', 'chart-line']} />)
  if (averageGrowthRate >= 0 && averageGrowthRate < 10)
    tags.push(<CheckTag children="Slow Growth" color="warning" icon={['fad', 'chart-line']} />)
  if (averageGrowthRate < 0)
    tags.push(<CheckTag children="Negative Growth" color="danger" icon={['fad', 'chart-line-down']} />)

  return (
    <CheckCard
      icon={['fad', hasPositiveGrowth ? 'chart-line' : 'chart-line-down']}
      title="Equity Growth"
      description={description}
      tags={tags}
      // @ts-ignore
      sentiment={sentiment}
    ></CheckCard>
  )
}
