import React from 'react'
import dayjs from 'dayjs'
import { maxBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Legends, Legend } from '~/ui-components/Charts/Legends'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'
import theme from '~/lib/theme'
import { AreaChart } from '~/ui-components'
import { GraphContainer, ChartLoaderContainer } from './styles'

interface BacktestedChartType {
  isLoading: boolean
  error: any
  planPerformance: any
  marketPrices: any
  marketName: string
  name: string
}

let lastPlanDate = new Date()
const createPlanData = (data: any[]) => {
  // @ts-ignore
  lastPlanDate = dayjs(data[data.length - 1].date).endOf('day')

  return data.map((point: any, i: number) => {
    const balance = data[i].balance

    return {
      value: Number(balance),
      type: 'Formula Stocks (Backtested)',
      date: dayjs(point.date).startOf('day').toDate(),
    }
  })
}
const createMarketData = (data: any[]) => {
  const marketStartValue = data[0]?.price || 1
  const startValue = 25000

  return data.map((point: any, i: number) => {
    const percentIncrease = (data[i].price - marketStartValue) / marketStartValue

    return {
      value: Number(startValue + Math.floor(percentIncrease * startValue)),
      type: 'S&P500',
      date: dayjs(new Date(point.date)).startOf('day').toDate(),
    }
  })
}

const dollarFormatterRounded = (value: number) => currencyRoundedFormatter.format(value)

const BacktestedHistoryChart = ({
  isLoading,
  error,
  planPerformance,
  marketPrices,
  marketName,
  name,
}: BacktestedChartType) => {
  if (error) {
    return (
      <ChartLoaderContainer>
        <FontAwesomeIcon icon={['fad', 'exclamation-triangle']} size="4x" />
        <p>Error loading chart</p>
      </ChartLoaderContainer>
    )
  }
  if (isLoading) {
    return (
      <ChartLoaderContainer>
        <FontAwesomeIcon icon="spinner-third" spin size="4x" />
        <p>Loading chart</p>
      </ChartLoaderContainer>
    )
  }

  const planData: any[] = createPlanData(planPerformance)
  const marketData: any[] = createMarketData(marketPrices).filter((point) => dayjs(point.date).isBefore(lastPlanDate))
  const chartData = [...planData, ...marketData]

  const max = Math.ceil(maxBy(chartData, (point: any) => point.value).value)

  return (
    <GraphContainer>
      {/* @ts-ignore */}
      <Legends horizontal left={40} top={8}>
        {/* @ts-ignore */}
        <Legend color={theme.palette.primary[600]} width={40}>
          <p>{name}</p>
        </Legend>
        <Legend color={theme.palette.neutral[1200]}>
          <p>{marketName}</p>
        </Legend>
      </Legends>
      <AreaChart
        data={chartData}
        max={max}
        min={15000}
        dateMask="YYYY"
        labelFormatter={dollarFormatterRounded}
        tooltipValueFormatter={dollarFormatterRounded}
        log
      />
    </GraphContainer>
  )
}

export default BacktestedHistoryChart
