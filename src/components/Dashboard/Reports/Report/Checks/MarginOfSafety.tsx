import { useQuery } from '@apollo/client'

import { FMP } from 'src/common/queries'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'
import { calculateGrowthRateByYear } from '../keyMetrics/utils/growthRates'

import { CheckCard, LoadingCard } from './CheckCard'

type CheckProps = {
  symbol: string
  price: number
}

export const MarginOfSafetyCheck = ({ symbol, price }: CheckProps) => {
  const { data: keyMetricsData, loading: keyMetricsLoading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=10`,
    },
  })
  const { data: incomeStatementData, loading: incomeStatementLoading } = useQuery(FMP, {
    variables: {
      endpoint: `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=10`,
    },
  })

  if (keyMetricsLoading || incomeStatementLoading) return <LoadingCard />
  if (!keyMetricsData?.FMP?.response || keyMetricsData.FMP.response.length === 0) return null
  if (!incomeStatementData?.FMP?.response || incomeStatementData.FMP.response.length === 0) return null

  const keyMetrics = keyMetricsData.FMP.response.slice().reverse()
  const incomeStatements = incomeStatementData.FMP.response.slice().reverse()

  const equityByYear = keyMetrics.map((metric: any) => metric.bookValuePerShare)
  const { growthRate9Years } = calculateGrowthRateByYear(equityByYear)

  if (!growthRate9Years || growthRate9Years <= 0) return null
  const equityGrowthRate = growthRate9Years / 100 + 1

  const peRatios = keyMetrics.map((metric: any) => metric.peRatio)
  const lowestPE = Math.min(...peRatios)
  const highestPE = Math.max(...peRatios)
  const averagePE = (lowestPE + highestPE) / 2
  const twiceTheGrowthRate = equityGrowthRate * 2

  // use the lowest of either average PE or 2x growth rate as the PE.
  const conservativePE = averagePE > twiceTheGrowthRate ? twiceTheGrowthRate : averagePE

  const currentEPS = incomeStatements[incomeStatements.length - 1].eps

  const currentEstimate = currentEPS * conservativePE
  const futureEstimate = currentEstimate * (equityGrowthRate ^ 10)

  // calculate todays sticker price assuming we want a minimum 15% return.
  const stickerPriceToday = futureEstimate / (1.15 ^ 10)

  if (stickerPriceToday < 0) return null

  let description = `${currencyRoundedFormatter.format(stickerPriceToday)}`
  let sentiment = 'neutral'

  const percentIncrease = ((price - stickerPriceToday) / stickerPriceToday) * 100

  if (price < stickerPriceToday) {
    description = `${currencyRoundedFormatter.format(stickerPriceToday)}, selling for ${percentIncrease.toFixed(
      0
    )}% under fair value`
    sentiment = 'success'
  } else {
    description = `${currencyRoundedFormatter.format(stickerPriceToday)}, selling for ${percentIncrease.toFixed(
      0
    )}% over fair value`
    sentiment = 'danger'
  }

  if (!price) {
    description = `${currencyRoundedFormatter.format(stickerPriceToday)}`
    sentiment = 'neutral'
  }

  return (
    <CheckCard
      icon={['fad', 'dollar-sign']}
      title="Fair value (simple)"
      description={description}
      // @ts-ignore
      sentiment={sentiment}
    ></CheckCard>
  )
}
