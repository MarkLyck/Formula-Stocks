import React from 'react'
import dayjs from 'dayjs'
import { maxBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Legends, Legend } from 'src/ui-components/Charts/Legends'
import theme from 'src/lib/theme'
import { AreaChart } from 'src/ui-components'
import { GraphContainer, ChartLoaderContainer } from './styles'

interface LaunchChartType {
  isLoading: boolean
  error?: any
  planPerformance: any
  marketPrices: any
  marketName: string
  name: string
}

let lastPlanDate = new Date()

const createPlanData = (data: any[]) => {
  const startValue = data[0].balance

  // @ts-ignore
  lastPlanDate = dayjs(data[data.length - 1].date).endOf('day')

  return data.map((point: any, i: number) => {
    const balance = (((data[i].balance - startValue) / startValue) * 100).toFixed(2)

    return {
      value: Number(balance),
      type: 'Formula Stocks',
      date: dayjs(point.date).startOf('day').toDate(),
    }
  })
}

const createMarketData = (data: any[]) => {
  const marketStartValue = data.length ? Number(data[0].price) : 0

  return data.map((point: any, i: number) => {
    const balance = (((data[i].price - marketStartValue) / marketStartValue) * 100).toFixed(2)

    return {
      value: Number(balance),
      type: 'DJIA',
      date: dayjs(new Date(point.date)).startOf('day').toDate(),
    }
  })
}

const percentFormatter = (value: number) => `${value}%`

const LaunchChart = ({ isLoading, error, planPerformance, marketPrices, marketName, name }: LaunchChartType) => {
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
    <GraphContainer data-chromatic="ignore">
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
        min={0}
        yTickSpace={100}
        labelFormatter={percentFormatter}
        tooltipValueFormatter={(value: number) => `${value > 0 ? '+' : ''}${value}%`}
      />
    </GraphContainer>
  )
}

export default LaunchChart
